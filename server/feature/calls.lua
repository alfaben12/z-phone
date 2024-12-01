local InCalls = {}

lib.callback.register('z-phone:server:StartCall', function(source, body)
    local Player = xCore.GetPlayerBySource(source)
    if not Player then return false end

    local citizenid = Player.citizenid
    local userQuery = [[
        SELECT zpu.* FROM zp_users zpu WHERE zpu.phone_number = ? LIMIT 1
    ]]

    local targetUser = MySQL.single.await(userQuery, {
        body.to_phone_number
    })

    if not targetUser then
        return {
            is_valid = false,
            message = "Phone number not registered!"
        }
    end

    if targetUser.is_donot_disturb then
        return {
            is_valid = false,
            message = "Person is busy!"
        }
    end
    
    if InCalls[targetUser.citizenid] then
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Phone",
            message = "Person in a call!"
        })

        return {
            is_valid = false,
            message = "Person in a call!"
        }  
    end

    local contactNameQuery = [[
        SELECT zpc.contact_name FROM zp_contacts zpc WHERE zpc.citizenid = ? AND zpc.contact_citizenid = ?
    ]]

    local contactNameTarget = MySQL.scalar.await(contactNameQuery, {
        citizenid,
        targetUser.citizenid
    })

    if not contactNameTarget then
        contactNameTarget = body.to_phone_number
    end

    local TargetPlayer = xCore.GetPlayerByIdentifier(targetUser.citizenid)
    if not TargetPlayer then
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Phone",
            message = "Person is unavailable to call!"
        })

        return {
            is_valid = false,
            message = "Person is unavailable to call!"
        } 
    end

    local contactNameCaller = MySQL.scalar.await(contactNameQuery, {
        targetUser.citizenid,
        citizenid
    })

    if not contactNameCaller then
        contactNameCaller = body.from_phone_number
    end

    if body.is_anonim then
        contactNameCaller = "Anonim"
        body.from_avatar = ""
    end

    TriggerClientEvent("z-phone:client:sendNotifIncomingCall", TargetPlayer.source, {
        from = contactNameCaller,
        photo = body.from_avatar,
        message = "Incoming call..",
        to_source = source,
        from_source = TargetPlayer.source,
        to_person_for_caller = contactNameTarget,
        to_photo_for_caller = targetUser.avatar,
        call_id = body.call_id
    })

    TriggerClientEvent("z-phone:client:sendNotifStartCall", source, {
        to_person = contactNameTarget,
        photo = targetUser.avatar,
        to_source = TargetPlayer.source,
        from_source = source,
    })

    local historyQuery = "INSERT INTO zp_calls_histories (citizenid, to_citizenid, flag, is_anonim) VALUES (?, ?, ?, ?)"
    MySQL.Async.insert(historyQuery, {
        citizenid,
        targetUser.citizenid,
        "OUT",
        body.is_anonim
    })

    MySQL.Async.insert(historyQuery, {
        targetUser.citizenid,
        citizenid,
        "IN",
        body.is_anonim
    })

    InCalls[citizenid] = true
    return {
        is_valid = true,
        to_source =TargetPlayer.source,
        message = "Waiting for response!"
    }  
end)

lib.callback.register('z-phone:server:CancelCall', function(source, body)
    local Player1 = xCore.GetPlayerBySource(source)
    local Player2 = xCore.GetPlayerBySource(body.to_source)
    
    TriggerClientEvent("z-phone:client:closeCall", body.to_source)
    TriggerClientEvent("z-phone:client:closeCallSelf", source)

    InCalls[Player1.citizenid] = nil
    InCalls[Player2.citizenid] = nil

    return true
end)

lib.callback.register('z-phone:server:DeclineCall', function(source, body)
    local Player1 = xCore.GetPlayerBySource(source)
    local Player2 = xCore.GetPlayerBySource(body.to_source)

    InCalls[Player1.citizenid] = nil
    InCalls[Player2.citizenid] = nil

    TriggerClientEvent("z-phone:client:closeCallSelf", body.to_source)
    TriggerClientEvent("z-phone:client:closeCall", source)

    TriggerClientEvent("z-phone:client:sendNotifInternal", body.to_source, {
        type = "Notification",
        from = "Phone",
        message = "Call declined!"
    })
    return true
end)

lib.callback.register('z-phone:server:AcceptCall', function(source, body)
    local Player1 = xCore.GetPlayerBySource(source)
    local Player2 = xCore.GetPlayerBySource(body.to_source)

    InCalls[Player1.citizenid] = true
    InCalls[Player2.citizenid] = true

    -- CALLER
    TriggerClientEvent("z-phone:client:setInCall", body.to_source, {
        from = body.to_person_for_caller,
        photo = body.to_photo_for_caller,
        from_source = body.to_source,
        to_source = source,
        call_id = body.call_id
    })

    -- RECEIVER
    TriggerClientEvent("z-phone:client:setInCall", source, {
        from = body.from,
        photo = body.photo,
        from_source = source,
        to_source = body.to_source,
        call_id = body.call_id
    })

    return true
end)

lib.callback.register('z-phone:server:EndCall', function(source, body)
    local Player1 = xCore.GetPlayerBySource(source)
    local Player2 = xCore.GetPlayerBySource(body.to_source)

    InCalls[Player1.citizenid] = nil
    InCalls[Player2.citizenid] = nil
    
    TriggerClientEvent("z-phone:client:sendNotifInternal", body.to_source, {
        type = "Notification",
        from = "Phone",
        message = "Call ended!"
    })

    TriggerClientEvent("z-phone:client:closeCall", body.to_source)
    TriggerClientEvent("z-phone:client:closeCallSelf", source)

    return true
end)

lib.callback.register('z-phone:server:GetCallHistories', function(source)
    local Player = xCore.GetPlayerBySource(source)
    if not Player then return false end

    local citizenid = Player.citizenid
    local query = [[
        SELECT 
            CASE
                WHEN zpc.contact_name IS NULL THEN
                  ""  
                ELSE zpu.avatar
            END AS avatar,
            IFNULL(zpc.contact_name, zpu.phone_number) AS to_person,
            DATE_FORMAT(zpch.created_at, '%d %b %Y %H:%i') as created_at,
            zpch.flag,
            zpch.is_anonim
        FROM zp_calls_histories zpch
        LEFT JOIN zp_users zpu ON zpu.citizenid = zpch.to_citizenid
        LEFT JOIN zp_contacts zpc ON zpc.contact_citizenid = zpch.to_citizenid
        WHERE zpch.citizenid = ? ORDER BY zpch.id DESC LIMIT 100
    ]]

    local histories = MySQL.query.await(query, {
        citizenid
    })
    
    if not histories then
        histories = {}
    end

    return histories
end)