local QBCore = exports['qb-core']:GetCoreObject()

lib.callback.register('z-phone:server:GetEmails', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = [[
            SELECT 
                id,
                institution,
                citizenid,
                subject,
                content,
                is_read,
                DATE_FORMAT(created_at, '%y/%m/%d %H:%i') as created_at
            FROM zp_emails WHERE citizenid = ? ORDER BY id DESC LIMIT 100
        ]]
        local result = MySQL.query.await(query, {citizenid})

        if result then
            return result
        else
            return {}
        end
    end

    return {}
end)