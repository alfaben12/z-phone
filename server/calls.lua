local QBCore = exports['qb-core']:GetCoreObject()

lib.callback.register('z-phone:server:StartCall', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return end

    local citizenid = Player.PlayerData.citizenid
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

    local TargetPlayer = QBCore.Functions.GetPlayerByCitizenId(targetUser.citizenid)
    if not TargetPlayer then
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Phone Call",
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

    TriggerClientEvent("z-phone:client:sendNotifIncomingCall", TargetPlayer.PlayerData.source, {
        from = contactNameCaller,
        photo = body.from_avatar,
        message = "Incoming call..",
        to_source = source,
        from_source = TargetPlayer.PlayerData.source,
    })

    TriggerClientEvent("z-phone:client:sendNotifStartCall", source, {
        to_person = contactNameTarget,
        photo = targetUser.avatar,
        to_source = TargetPlayer.PlayerData.source,
        from_source = source,
    })

    local historyCallerQuery = "INSERT INTO zp_calls_histories (citizenid, to_citizenid, flag) VALUES (?, ?, ?)"
    MySQL.Async.insert(historyCallerQuery, {
        citizenid,
        targetUser.citizenid,
        "OUT"
    })

    MySQL.Async.insert(historyCallerQuery, {
        targetUser.citizenid,
        citizenid,
        "IN"
    })

    return {
        is_valid = true,
        message = "Waiting for response!"
    }  
end)

lib.callback.register('z-phone:server:CancelCall', function(source, body)
    TriggerClientEvent("z-phone:client:closeCall", body.to_source)
    TriggerClientEvent("z-phone:client:closeCall", source)
    return true
end)

lib.callback.register('z-phone:server:DeclineCall', function(source, body)
    TriggerClientEvent("z-phone:client:closeCall", body.to_source)
    TriggerClientEvent("z-phone:client:closeCall", source)

    TriggerClientEvent("z-phone:client:sendNotifInternal", body.to_source, {
        type = "Notification",
        from = "Phone Call",
        message = "Call declined!"
    })
    return true
end)

lib.callback.register('z-phone:server:GetCallHistories', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if not Player then return end

    local citizenid = Player.PlayerData.citizenid
    local query = [[
        SELECT 
            CASE
                WHEN zpc.contact_name IS NULL THEN
                  ""  
                ELSE zpu.avatar
            END AS avatar,
            IFNULL(zpc.contact_name, zpu.phone_number) AS to_person,
            DATE_FORMAT(zpch.created_at, '%d %b %Y %H:%i') as created_at,
            zpch.flag
        FROM zp_calls_histories zpch
        LEFT JOIN zp_users zpu ON zpu.citizenid = zpch.to_citizenid
        LEFT JOIN zp_contacts zpc ON zpc.contact_citizenid = zpch.to_citizenid
        WHERE zpch.citizenid = ? ORDER BY zpch.id DESC
    ]]

    local histories = MySQL.query.await(query, {
        citizenid
    })
    
    if not histories then
        histories = {}
    end

    return histories
end)