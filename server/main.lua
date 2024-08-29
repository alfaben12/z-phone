local QBCore = exports['qb-core']:GetCoreObject()

QBCore.Functions.CreateCallback('z-phone:server:HasPhone', function(source, cb)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local HasPhone = Player.Functions.GetItemByName('phone')
        if HasPhone ~= nil then
            cb(true)
        else
            cb(false)
        end
    end
end)

QBCore.Functions.CreateCallback('z-phone:server:GetProfile', function(source, cb, body)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = [[
            select 
                zpu.phone_number as phone,
                zpu.avatar as photo,
                zpu.wallpaper,
                zpu.unread_message_service,
                zpu.unread_message,
                zpu.citizenid
            from zp_users zpu WHERE zpu.citizenid = ? LIMIT 1
        ]]

        local result = MySQL.single.await(query, {
            citizenid
        })
        result.name = Player.PlayerData.charinfo.firstname .. ' '.. Player.PlayerData.charinfo.lastname

        if result then
            cb(result)
        else
            cb({})
        end
    end
end)