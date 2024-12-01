lib.callback.register('z-phone:server:LoopsLogin', function(source, body)
    local Player = xCore.GetPlayerBySource(source)

    if Player ~= nil then
        local citizenid = Player.citizenid
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

        local profileQuery = [[
            SELECT 
                zplu.id,
                zplu.fullname,
                zplu.username,
                zplu.avatar,
                zplu.cover,
                zplu.bio,
                DATE_FORMAT(zplu.join_at, '%d %b %Y') as join_at,
                zplu.is_verified,
                zplu.is_allow_message,
                zplu.phone_number
            FROM zp_loops_users zplu
            WHERE zplu.id = ?
        ]]

        local profile = MySQL.single.await(profileQuery, {
            id
        })

        return {
            is_valid = true,
            message = "Welcome back @".. body.username,
            profile = profile
        }
    end

    return {
        is_valid = false,
        message = "Try again later!",
    }
end)

lib.callback.register('z-phone:server:LoopsSignup', function(source, body)
    local Player = xCore.GetPlayerBySource(source)

    if Player ~= nil then
        local citizenid = Player.citizenid
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
            TriggerClientEvent("z-phone:client:sendNotifInternal", Player.source, {
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
                Player.citizenid,
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
    local Player = xCore.GetPlayerBySource(source)
    if Player ~= nil then
        local citizenid = Player.citizenid
        local query = [[
            SELECT
                zpt.id,
                zpt.tweet,
                zpt.media,
                zplu.id as loops_userid,
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
    local Player = xCore.GetPlayerBySource(source)
    if Player ~= nil then
        local citizenid = Player.citizenid
        local query = [[
            SELECT
                zptc.comment,
                zplu.id as loops_userid,
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
    local Player = xCore.GetPlayerBySource(source)

    if Player ~= nil then
        local citizenid = Player.citizenid

        local getLoopsUserIDQuery = "select active_loops_userid from zp_users where citizenid = ?"
        local loopsUserID = MySQL.scalar.await(getLoopsUserIDQuery, {
            citizenid
        })

        if loopsUserID == 0 then 
            TriggerClientEvent("z-phone:client:sendNotifInternal", Player.source, {
                type = "Notification",
                from = "Loops",
                message = "Please re-login to post tweet!"
            })
            return 
        end

        local query = "INSERT INTO zp_tweets (loops_userid, tweet, media) VALUES (?, ?, ?)"
        local id = MySQL.insert.await(query, {
            loopsUserID,
            body.tweet,
            body.media
        })

        if id then
            TriggerClientEvent("z-phone:client:sendNotifInternal", Player.source, {
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
    local Player = xCore.GetPlayerBySource(source)

    if Player ~= nil then
        local citizenid = Player.citizenid
        local getLoopsUserIDQuery = "select active_loops_userid from zp_users where citizenid = ?"
        local loopsUserID = MySQL.scalar.await(getLoopsUserIDQuery, {
            citizenid
        })

        if loopsUserID == 0 then 
            TriggerClientEvent("z-phone:client:sendNotifInternal", Player.source, {
                type = "Notification",
                from = "Loops",
                message = "Please re-login to comment tweet!"
            })
            return 
        end

        local query = "INSERT INTO zp_tweet_comments (tweetid, loops_userid, comment) VALUES (?, ?, ?)"
        local id = MySQL.insert.await(query, {
            body.tweetid,
            loopsUserID,
            body.comment
        })

        if id then
            local queryNotification = [[
                SELECT citizenid FROM zp_users WHERE active_loops_userid = ?
            ]]
            local notifications = MySQL.query.await(queryNotification, {body.loops_userid})

            if not notifications then
                return true
            end

            for i, v in pairs(notifications) do
                local TargetPlayer = xCore.GetPlayerByIdentifier(v.citizenid)
                if TargetPlayer ~= nil and TargetPlayer.source ~= source then
                    TriggerClientEvent("z-phone:client:sendNotifInternal", TargetPlayer.source, {
                        type = "Notification",
                        from = "Loops",
                        message = "@"..body.comment_username .. " reply on your tweet"
                    })
                end
            end
            return true
        else
            return false
        end
    end
    return false
end)

lib.callback.register('z-phone:server:UpdateLoopsProfile', function(source, body)
    local Player = xCore.GetPlayerBySource(source)
    if Player ~= nil then
        local citizenid = Player.citizenid

        local checkUsernameQuery = "select id from zp_loops_users where username = ? and id != ?"
        local duplicateUsername = MySQL.scalar.await(checkUsernameQuery, {
            body.username,
            body.id,
        })
    
        if duplicateUsername then
            return {
                is_valid = false,
                message = "@"..body.username .. " not available",
            }
        end
        
        local activeLoopsUserIDQuery = "select active_loops_userid from zp_users where citizenid = ?"
        local activeLoopsUserID = MySQL.scalar.await(activeLoopsUserIDQuery, {
            citizenid,
        })
    
        if activeLoopsUserID == 0 then
            return {
                is_valid = false,
                message = "Please re-login to update profile!"
            }
        end

        local affectedRow = MySQL.update.await([[
            UPDATE zp_loops_users SET 
                fullname = ?,
                username = ?,
                bio = ?,
                avatar = ?,
                cover = ?,
                is_allow_message = ?,
                phone_number = ?
            WHERE id = ?
        ]], {
            body.fullname,
            body.username,
            body.bio,
            body.avatar,
            body.cover,
            body.is_allow_message,
            body.phone_number,
            activeLoopsUserID,
        })

        if affectedRow then
            local profileQuery = [[
                SELECT 
                    zplu.id,
                    zplu.fullname,
                    zplu.username,
                    zplu.avatar,
                    zplu.cover,
                    zplu.bio,
                    DATE_FORMAT(zplu.join_at, '%d %b %Y') as join_at,
                    zplu.is_verified,
                    zplu.is_allow_message,
                    zplu.phone_number
                FROM zp_loops_users zplu
                WHERE zplu.id = ?
            ]]

            local profile = MySQL.single.await(profileQuery, {
                activeLoopsUserID
            })

            TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
                type = "Notification",
                from = "Loops",
                message = "Success update account!"
            })
            return {
                is_valid = true,
                message = "Success update account!",
                profile = profile
            }
        end
        
        return {
            is_valid = false,
            message = "Please try again later!",
        }
    end
    return {
        is_valid = false,
        message = "Please try again later!",
    }
end)

lib.callback.register('z-phone:server:GetLoopsProfile', function(source, body)
    local Player = xCore.GetPlayerBySource(source)
    if Player ~= nil then
        local citizenid = Player.citizenid
        if body.id == 0 then
            return {
                is_me = false,
                profile = {},
                tweets = {},
                replies = {}
            }
        end

        local activeLoopsUserIDQuery = "select active_loops_userid from zp_users where citizenid = ?"
        local activeLoopsUserID = MySQL.scalar.await(activeLoopsUserIDQuery, {
            citizenid,
        })
    
        if activeLoopsUserID == 0 then
            return {
                is_me = false,
                profile = {},
                tweets = {},
                replies = {}
            }
        end

        local profileQuery = [[
            SELECT 
                zplu.id,
                zplu.fullname,
                zplu.username,
                zplu.avatar,
                zplu.cover,
                zplu.bio,
                DATE_FORMAT(zplu.join_at, '%d %b %Y') as join_at,
                zplu.is_verified,
                zplu.is_allow_message,
                zplu.phone_number,
                zplu.citizenid
            FROM zp_loops_users zplu
            WHERE zplu.id = ?
        ]]

        local profile = MySQL.single.await(profileQuery, {
            body.id
        })

        if not profile then
            return {
                is_me = false,
                profile = {},
                tweets = {},
                replies = {}
            }
        end
        
        local tweetsQuery = [[
            SELECT
                zpt.id,
                zpt.tweet,
                zpt.media,
                zplu.id as loops_userid,
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
            WHERE zpt.loops_userid = ?
            GROUP BY zpt.id, zpt.tweet, zpt.media, zplu.avatar, zplu.username, zplu.join_at, name
            ORDER BY zpt.id DESC
            LIMIT 100
        ]]

        local repliesQuery = [[
            SELECT
                zpt.id,
                zpt.tweet,
                zpt.media,
                zplu.id as loops_userid,
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
            WHERE zpt.id in (SELECT zptc2.tweetid FROM zp_tweet_comments zptc2 WHERE zptc2.loops_userid = ? GROUP BY zptc2.tweetid) AND zpt.loops_userid != ?
            GROUP BY zpt.id, zpt.tweet, zpt.media, zplu.avatar, zplu.username, zplu.join_at, name
            ORDER BY zpt.id DESC
            LIMIT 100
        ]]

        local tweets = MySQL.query.await(tweetsQuery, {
            body.id
        })

        local replies = MySQL.query.await(repliesQuery, {
            body.id,
            body.id,
        })

        return {
            is_me = activeLoopsUserID == profile.id,
            profile = profile,
            tweets = tweets,
            replies = replies
        }
    end
    
    return {
        is_me = false,
        profile = {},
        tweets = {},
        replies = {}
    }
end)

lib.callback.register('z-phone:server:UpdateLoopsLogout', function(source, body)
    local Player = xCore.GetPlayerBySource(source)
    if Player ~= nil then
        local citizenid = Player.citizenid

        local affectedRow = MySQL.update.await([[
            UPDATE zp_users SET 
                active_loops_userid = ?
            WHERE citizenid = ?
        ]], {
            0,
            citizenid
        })

        
        return true
    end

    return true
end)