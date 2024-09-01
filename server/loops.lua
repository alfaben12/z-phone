local QBCore = exports['qb-core']:GetCoreObject()

lib.callback.register('z-phone:server:GetTweets', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = [[
            SELECT
                zpt.id,
                zpt.citizenid,
                zpt.tweet,
                zpt.media,
                CONCAT(
                    JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.firstname')), 
                    ' ', 
                    JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.lastname'))
                ) AS name,
                zpu.avatar,
                zpu.loops_username AS username,
                DATEDIFF(CURDATE(), zpt.created_at) AS created_at,
                COUNT(zptc.id) AS comment,
                0 AS repost
            FROM
                zp_tweets zpt
            JOIN zp_users zpu ON zpu.citizenid = zpt.citizenid
            JOIN players p ON p.citizenid = zpt.citizenid
            LEFT JOIN zp_tweet_comments zptc ON zptc.tweetid = zpt.id
            GROUP BY zpt.id, zpt.tweet, zpt.media, zpu.avatar, zpu.loops_username, zpu.created_at, name
            ORDER BY zpt.id DESC
        ]]

        local result = MySQL.query.await(query)

        if result then
            return result
        else
            return nil
        end
    end
    return nil
end)

lib.callback.register('z-phone:server:GetComments', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = [[
            SELECT
                zptc.comment,
                CONCAT(
                    JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.firstname')), 
                    ' ', 
                    JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.lastname'))
                ) AS name,
                zpu.avatar,
                zpu.loops_username AS username,
                DATEDIFF(CURDATE(), zptc.created_at) AS created_at
            FROM
                zp_tweet_comments zptc
            JOIN zp_users zpu ON zpu.citizenid = zptc.citizenid
            JOIN players p ON p.citizenid = zptc.citizenid
            WHERE zptc.tweetid = ?
            ORDER BY zptc.id DESC
        ]]

        local result = MySQL.query.await(query, {body.tweetid})

        if result then
            return result
        else
            return nil
        end
    end
    return nil
end)

lib.callback.register('z-phone:server:SendTweet', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)

    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = "INSERT INTO zp_tweets (citizenid, tweet, media) VALUES (?, ?, ?)"

        local id = MySQL.insert.await(query, {
            citizenid,
            body.tweet,
            body.media
        })

        if id then
            TriggerClientEvent("z-phone:client:sendNotifInternal", Player.PlayerData.source, {
                type = "Notification",
                from = "Loops",
                message = "Tweet posted!"
            })
            return true
        else
            return false
        end
    end
    return false
end)


lib.callback.register('z-phone:server:SendTweetComment', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)

    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = "INSERT INTO zp_tweet_comments (tweetid, citizenid, comment) VALUES (?, ?, ?)"

        local id = MySQL.insert.await(query, {
            body.tweetid,
            citizenid,
            body.comment
        })

        if id then
            local TargetPlayer = QBCore.Functions.GetPlayerByCitizenId(body.tweet_citizenid)
            if TargetPlayer ~= nil then
                TriggerClientEvent("z-phone:client:sendNotifInternal", TargetPlayer.PlayerData.source, {
                    type = "Notification",
                    from = "Loops",
                    message = "@"..body.username .. " comment tweet"
                })
            end
            return true
        else
            return false
        end
    end
    return false
end)