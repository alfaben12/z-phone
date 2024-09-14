local QBCore = exports['qb-core']:GetCoreObject()

lib.callback.register('z-phone:server:StartOrContinueChatting', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)

    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local queryGetConversationID = [[
            WITH ConversationParticipants AS (
                SELECT conversationid
                FROM zp_conversation_participants
                WHERE citizenid IN (?, ?)
                GROUP BY conversationid
                HAVING COUNT(DISTINCT citizenid) = 2
            ),
            InvalidConversations AS (
                SELECT conversationid
                FROM zp_conversation_participants
                GROUP BY conversationid
                HAVING COUNT(DISTINCT citizenid) > 2
            )
            SELECT 
                CASE 
                    WHEN EXISTS (SELECT 1 FROM InvalidConversations) THEN NULL
                    ELSE (SELECT conversationid FROM ConversationParticipants)
                END AS conversationid
        ]]

        local conversationid = MySQL.scalar.await(queryGetConversationID, {
            citizenid,
            body.to_citizenid
        })
        
        if conversationid == nil then
            local queryNewConv = "INSERT INTO zp_conversations (is_group) VALUES (?)"
            conversationid = MySQL.insert.await(queryNewConv, {
                false,
            })

            local queryParticipant = "INSERT INTO zp_conversation_participants (conversationid, citizenid) VALUES (?, ?)"
            local participanOne = MySQL.insert.await(queryParticipant, {
                conversationid,
                citizenid,
            })

            local participanOne = MySQL.insert.await(queryParticipant, {
                conversationid,
                body.to_citizenid,
            })
        end

        local queryChatting = [[
            SELECT
                from_user.avatar,
				from_user.citizenid,
                CASE
                    WHEN c.is_group = 0 THEN
                        COALESCE(
                            contact.contact_name,
                            from_user.phone_number
                        )
                    ELSE c.name
                END AS conversation_name,
                DATE_FORMAT(from_user.last_seen, '%y/%m/%d %H:%i') as last_seen,
                0 as isRead,
                c.id as conversationid,
				c.is_group
            FROM
                zp_conversations c
            JOIN
                zp_conversation_participants p
                ON c.id = p.conversationid
            LEFT JOIN
                zp_conversation_participants other_participant
                ON c.id = other_participant.conversationid
                AND other_participant.citizenid != p.citizenid
            LEFT JOIN
                zp_users from_user
                ON other_participant.citizenid = from_user.citizenid
            LEFT JOIN
                zp_contacts contact
                ON contact.citizenid = p.citizenid
                AND contact.contact_citizenid = other_participant.citizenid
            WHERE
                c.id = ? and p.citizenid = ?
            LIMIT 1
            ]]
                
        local result = MySQL.single.await(queryChatting, {
            conversationid,
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

lib.callback.register('z-phone:server:GetChats', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = [[
            WITH LatestMessages AS (
                SELECT
                    conversationid,
                    content,
                    created_at,
                    ROW_NUMBER() OVER (PARTITION BY conversationid ORDER BY created_at DESC) AS rn
                FROM
                    zp_conversation_messages
            )
            SELECT
                from_user.avatar,
				from_user.citizenid,
                CASE
                    WHEN c.is_group = 0 THEN
                        COALESCE(
                            contact.contact_name,
                            from_user.phone_number
                        )
                    ELSE c.name
                END AS conversation_name,
                DATE_FORMAT(from_user.last_seen, '%y/%m/%d %H:%i') as last_seen,
                0 as isRead,
				CASE
                    WHEN last_msg.content = '' THEN
                        'media'
                    ELSE last_msg.content
                END AS last_message,
                DATE_FORMAT(last_msg.created_at, '%H:%i') AS last_message_time,
                c.id as conversationid,
				c.is_group
            FROM
                zp_conversations c
            JOIN
                zp_conversation_participants p
                ON c.id = p.conversationid
            LEFT JOIN
                zp_conversation_participants other_participant
                ON c.id = other_participant.conversationid
                AND other_participant.citizenid != p.citizenid
            LEFT JOIN
                zp_users from_user
                ON other_participant.citizenid = from_user.citizenid
            LEFT JOIN
                zp_contacts contact
                ON contact.citizenid = p.citizenid
                AND contact.contact_citizenid = other_participant.citizenid
            LEFT JOIN
                LatestMessages last_msg
                ON c.id = last_msg.conversationid AND last_msg.rn = 1
            WHERE
                p.citizenid = ?
            ORDER BY
                last_msg.created_at DESC
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

lib.callback.register('z-phone:server:GetChatting', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)

    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = [[
            select 
                zpcm.content as message,
                zpcm.media,
                DATE_FORMAT(zpcm.created_at, '%y/%m/%d %H:%i') as time,
                zpcm.sender_citizenid
            from zp_conversation_messages zpcm WHERE conversationid = ?
        ]]

        local result = MySQL.query.await(query, {
            body.conversationid
        })

        if result then
            return result
        else
            return {}
        end
    end
    return {}
end)

lib.callback.register('z-phone:server:SendChatting', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)

    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = "INSERT INTO zp_conversation_messages (conversationid, sender_citizenid, content, media) VALUES (?, ?, ?, ?)"

        local id = MySQL.insert.await(query, {
            body.conversationid,
            citizenid,
            body.message,
            body.media,
        })

        if id then
            local contactName = MySQL.scalar.await([[
                SELECT
                COALESCE(
                    (SELECT contact_name FROM zp_contacts WHERE citizenid = ? and contact_citizenid = ?),
                    (SELECT phone_number FROM zp_users WHERE citizenid = ?)
                ) AS name
            ]], { body.to_citizenid, citizenid, citizenid })
            if contactName then
                body.from = contactName
                body.from_citizenid = citizenid
                local TargetPlayer = QBCore.Functions.GetPlayerByCitizenId(body.to_citizenid)
                if TargetPlayer ~= nil then
                    TriggerClientEvent("z-phone:client:sendNotifMessage", TargetPlayer.PlayerData.source, body)
                end
            end

            return true
        else
            return false
        end
    end
    return false
end)