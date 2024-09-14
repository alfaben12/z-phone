local QBCore = exports['qb-core']:GetCoreObject()

lib.callback.register('z-phone:server:GetContacts', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = [[
            select 
                zpc.contact_name as name,
                DATE_FORMAT(zpc.created_at, '%Y/%m/%d %H:%i') as add_at,
                zpc.contact_citizenid,
                zpu.avatar,
                zpu.phone_number
            from zp_contacts zpc
            JOIN zp_users zpu ON zpu.citizenid = zpc.contact_citizenid
            WHERE zpc.citizenid = ? ORDER BY zpc.contact_name ASC
        ]]

        local result = MySQL.query.await(query, {
            citizenid
        })

        if result then
            return result
        else
            return {}
        end
    end
    return {}
end)

lib.callback.register('z-phone:server:DeleteContact', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = [[
            DELETE FROM zp_contacts WHERE citizenid = ? and contact_citizenid = ?
        ]]

        MySQL.query.await(query, {
            citizenid,
            body.contact_citizenid
        })

        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Contact",
            message = "Success delete contact!"
        })
        return true
    end
    return false
end)

lib.callback.register('z-phone:server:UpdateContact', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = [[
            UPDATE zp_contacts SET contact_name = ? WHERE contact_citizenid = ? AND citizenid = ?
        ]]

        MySQL.update.await(query, {
            body.name,
            body.contact_citizenid,
            citizenid
        })
        
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Contact",
            message = "Success update contact!"
        })
        return true
    end
    return false
end)