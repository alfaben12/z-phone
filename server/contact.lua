local QBCore = exports['qb-core']:GetCoreObject()

lib.callback.register('z-phone:server:GetContacts', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = [[
            select 
                zpc.contact_name as name,
                DATE_FORMAT(zpc.created_at, '%y/%m/%d %H:%i') as add_at,
                zpu.avatar,
                zpu.phone_number
            from zp_contacts zpc
            JOIN zp_users zpu ON zpu.citizenid = zpc.contact_citizenid
            WHERE zpc.citizenid = ?
        ]]

        local result = MySQL.query.await(query, {
            citizenid
        })

        if result then
            return result
        else
            return nil
        end
    end
    return nil
end)