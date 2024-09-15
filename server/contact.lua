local QBCore = exports['qb-core']:GetCoreObject()

lib.callback.register('z-phone:server:GetContacts', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = [[
            select 
                zpc.contact_name as name,
                DATE_FORMAT(zpc.created_at, '%d/%m/%y %H:%i') as add_at,
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

lib.callback.register('z-phone:server:SaveContact', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local queryCheckPhoneNumber = [[
            select zpu.* from zp_users zpu WHERE zpu.phone_number = ? LIMIT 1
        ]]
        local phoneNumber = MySQL.single.await(queryCheckPhoneNumber, {
            body.phone_number,
        })
        if not phoneNumber then
            TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
                type = "Notification",
                from = "Contact",
                message = "Phone Number not registered!"
            })
            return false
        end

        local queryCheckDuplicate = [[
            select zpc.* from zp_contacts zpc WHERE zpc.contact_citizenid = ? and zpc.citizenid = ? LIMIT 1
        ]]
        local isDuplicate = MySQL.single.await(queryCheckDuplicate, {
            phoneNumber.citizenid,
            citizenid
        })

        if isDuplicate then
            TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
                type = "Notification",
                from = "Contact",
                message = "Duplicate contact (".. isDuplicate.contact_name ..")!"
            })
            return false
        end

        local queryInsert = "INSERT INTO zp_contacts (citizenid, contact_citizenid, contact_name) VALUES (?, ?, ?)"
        local contactId = MySQL.insert.await(queryInsert, {
            citizenid,
            phoneNumber.citizenid,
            body.name
        })
        
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Contact",
            message = "Success save contact!"
        })
        return true
    end
    return false
end)