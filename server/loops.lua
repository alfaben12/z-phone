local QBCore = exports['qb-core']:GetCoreObject()

lib.callback.register('z-phone:server:LoopsLogin', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)

    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local checkUserQuery = "select id from zp_loops_users where username = ? and password = ?"
        local id = MySQL.scalar.await(checkUserQuery, {
            body.username,
            body.password,
        })
    
        if not id then
            return {
                is_valid = false,
                message = "Incorrect username or password",
            }
        end

        MySQL.update.await('UPDATE zp_users SET active_loops_userid = ? WHERE citizenid = ?', {
            id, 
            citizenid
        })

        return {
            is_valid = true,
            message = "Welcome back @".. body.username,
        }
    end

    return {
        is_valid = false,
        message = "Try again later!",
    }
end)

lib.callback.register('z-phone:server:LoopsSignup', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)

    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local checkUsernameQuery = "select id from zp_loops_users where username = ?"
        local duplicateUsername = MySQL.scalar.await(checkUsernameQuery, {
            body.username
        })
    
        if duplicateUsername then
            return {
                is_valid = false,
                message = "@"..body.username .. " not available",
            }
        end

        local query = "INSERT INTO zp_loops_users (citizenid, username, password, fullname, phone_number) VALUES (?, ?, ?, ?, ?)"
        local id = MySQL.insert.await(query, {
            citizenid,
            body.username,
            body.password,
            body.fullname,
            body.phone_number,
        })

        if id then
            TriggerClientEvent("z-phone:client:sendNotifInternal", Player.PlayerData.source, {
                type = "Notification",
                from = "Loops",
                message = "Awesome, let's signin!"
            })
            local content = [[
Welcome aboard! \
\
Username: @%s \
Fullname : %s \
Password : %s \
Phone Number : %s \
\
We're thrilled to have you join our community. Your Loops account signup was successful created, and you’re now all set to explore everything. \
To get started, log in to your account and check out all tweets. \
\
We're excited to see you dive in and start exploring. Welcome to the Loopsverse!
    ]]
            MySQL.single.await('INSERT INTO zp_emails (institution, citizenid, subject, content) VALUES (?, ?, ?, ?)', {
                "loops",
                Player.PlayerData.citizenid,
                "Your account ".. body.username .. " Has Been Created",
                string.format(content, body.username, body.fullname, body.password,  body.phone_number),
            })
            return {
                is_valid = true,
                message = "Loops ".. body.username .. " Has Been Created",
            }
        else
            return {
                is_valid = false,
                message = "Find others username!",
            }
        end
    end

    return {
        is_valid = false,
        message = "Try again later!",
    }
end)

lib.callback.register('z-phone:server:GetTweets', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = [[
            SELECT
                zpt.id,
                zpt.tweet,
                zpt.media,
				zplu.citizenid,
                zplu.fullname AS name,
                zplu.avatar,
                CONCAT("@", zplu.username) as username,
                DATEDIFF(CURDATE(), zpt.created_at) AS created_at,
                COUNT(zptc.id) AS comment,
                0 AS repost
            FROM
                zp_tweets zpt
            JOIN zp_loops_users zplu ON zplu.id = zpt.loops_userid
            LEFT JOIN zp_tweet_comments zptc ON zptc.tweetid = zpt.id
            GROUP BY zpt.id, zpt.tweet, zpt.media, zplu.avatar, zplu.username, zplu.join_at, name
            ORDER BY zpt.id DESC
            LIMIT 100
        ]]

        local result = MySQL.query.await(query)

        if result then
            return result
        else
            return {}
        end
    end
    return {}
end)

lib.callback.register('z-phone:server:GetComments', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = [[
            SELECT
                zptc.comment,
                zplu.fullname AS name,
                zplu.avatar,
                CONCAT("@", zplu.username) as username,
                DATEDIFF(CURDATE(), zptc.created_at) AS created_at
            FROM
                zp_tweet_comments zptc
            JOIN zp_loops_users zplu ON zplu.id = zptc.loops_userid
            WHERE zptc.tweetid = ?
            ORDER BY zptc.id DESC
        ]]

        local result = MySQL.query.await(query, {body.tweetid})

        if result then
            return result
        else
            return {}
        end
    end
    return {}
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
            if TargetPlayer ~= nil and TargetPlayer.PlayerData.source ~= source then
                TriggerClientEvent("z-phone:client:sendNotifInternal", TargetPlayer.PlayerData.source, {
                    type = "Notification",
                    from = "Loops",
                    message = "@"..body.username .. " reply on your tweet"
                })
            end
            return true
        else
            return false
        end
    end
    return false
end)