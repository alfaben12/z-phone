local QBCore = exports['qb-core']:GetCoreObject()

lib.callback.register('z-phone:server:GetAds', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = [[
            select 
                zpa.content,
                zpa.media,
                zpa.citizenid,
                DATE_FORMAT(zpa.created_at, '%y/%m/%d %H:%i') as time,
                zpu.avatar,
                zpu.phone_number,
                CONCAT(
                    JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.firstname')), ' ', 
                    JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.lastname'))
                ) AS name
            from zp_ads zpa
            JOIN zp_users zpu ON zpu.citizenid = zpa.citizenid
            JOIN players p ON p.citizenid = zpa.citizenid
            ORDER BY zpa.id DESC
            LIMIT 100
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

lib.callback.register('z-phone:server:SendAds', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)

    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = "INSERT INTO zp_ads (citizenid, media, content) VALUES (?, ?, ?)"

        local id = MySQL.insert.await(query, {
            citizenid,
            body.media,
            body.content,
        })

        if id then
            TriggerClientEvent("z-phone:client:sendNotifInternal", -1, {
                type = "Notification",
                from = "Ads",
                message = "New ads posted!"
            })
            return true
        else
            return false
        end
    end

    return false
end)