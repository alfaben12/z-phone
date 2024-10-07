lib.callback.register('z-phone:server:GetAds', function(source)
    local xPlayer = Config.Framework.GetPlayerObject(source)
    if xPlayer ~= nil then
        local citizenid = Config.Framework.GetCitizenId(xPlayer)

        local query = [[
            select 
                zpa.content,
                zpa.media,
                zpa.citizenid,
                DATE_FORMAT(zpa.created_at, '%d/%m/%Y %H:%i') as time,
                zpu.avatar,
                zpu.phone_number,
                CONCAT(
                    JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.firstname')), ' ', 
                    JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.lastname'))
                ) AS name
            from zp_ads zpa
            JOIN zp_users zpu ON zpu.citizenid = zpa.citizenid
            JOIN users p ON p.identifier = zpa.citizenid
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
    local xPlayer = Config.Framework.GetPlayerObject(source)

    if xPlayer ~= nil then
        local citizenid = Config.Framework.GetCitizenId(xPlayer)
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
