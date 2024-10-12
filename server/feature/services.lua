lib.callback.register('z-phone:server:GetServices', function(source)
    local Player = xCore.GetPlayerBySource(source)
    if Player == nil then return false end

    local job = Player.job
    local citizenid = Player.citizenid
    local query = [[
        SELECT 
            zpu.phone_number,
            zpsm.id,
            zpsm.citizenid,
            zpsm.message,
            DATE_FORMAT(zpsm.created_at, '%d/%m/%Y %H:%i') as created_at
        FROM zp_service_messages zpsm 
        JOIN zp_users zpu ON zpu.citizenid = zpsm.citizenid
        WHERE zpsm.service = ? AND zpsm.solved_by_citizenid IS NULL
        ORDER BY id DESC LIMIT 100
    ]]
    local result = MySQL.query.await(query, { job.name })

    if not result then
        return {}
    end

    return result
end)


lib.callback.register('z-phone:server:SendMessageService', function(source, body)
    local Player = xCore.GetPlayerBySource(source)
    if Player == nil then return false end
    
    local citizenid = Player.citizenid
    local query = "INSERT INTO zp_service_messages (citizenid, message, service) VALUES (?, ?, ?)"

    local id = MySQL.insert.await(query, {
        citizenid,
        body.message,
        body.job,
    })

    if not id then
        return false
    end
    
    TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
        type = "Notification",
        from = "Services",
        message = "Message sended!"
    })
    return true
end)

lib.callback.register('z-phone:server:SolvedMessageService', function(source, body)
    local Player = xCore.GetPlayerBySource(source)
    if Player == nil then return false end

    local citizenid = Player.citizenid
    MySQL.update.await('UPDATE zp_service_messages SET solved_by_citizenid = ?, solved_reason = ? WHERE id = ?', {
        citizenid,
        body.reason, 
        body.id,
    })
    
    TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
        type = "Notification",
        from = "Services",
        message = "Message service solved!"
    })

    return true
end)