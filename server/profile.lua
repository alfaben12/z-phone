local QBCore = exports['qb-core']:GetCoreObject()

QBCore.Functions.CreateCallback('z-phone:server:GetProfile', function(source, cb, body)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = [[
            select * from zp_users zpu WHERE zpu.citizenid = ? LIMIT 1
        ]]

        local result = MySQL.single.await(query, {
            citizenid
        })
        result.name = Player.PlayerData.charinfo.firstname .. ' '.. Player.PlayerData.charinfo.lastname

        if result then
            cb(result)
        else
            cb(nil)
        end
    end
end)

QBCore.Functions.CreateCallback('z-phone:server:UpdateProfile', function(source, cb, body)
    local affectedRows = nil
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        if body.type == 'avatar' then
            affectedRows = MySQL.update.await('UPDATE zp_users SET avatar = ? WHERE citizenid = ?', {
                body.value, citizenid
            })
        elseif body.type == 'wallpaper' then
            affectedRows = MySQL.update.await('UPDATE zp_users SET wallpaper = ? WHERE citizenid = ?', {
                body.value, citizenid
            })
        elseif body.type == 'is_anonim' then
            affectedRows = MySQL.update.await('UPDATE zp_users SET is_anonim = ? WHERE citizenid = ?', {
                body.value, citizenid
            })
        elseif body.type == 'is_donot_disturb' then
            affectedRows = MySQL.update.await('UPDATE zp_users SET is_donot_disturb = ? WHERE citizenid = ?', {
                body.value, citizenid
            })
        else
            print("RETRIGER DETECTED, SHOULD BANN IF NEEDED")
        end

        if affectedRows then
            cb(true)
        else
            cb(false)
        end
    end
end)