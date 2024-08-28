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
    CASE
        WHEN c.is_group = 0 THEN
            COALESCE(
                contact.contact_name,
                from_user.phone_number
            )
        ELSE c.name
    END AS conversation_name,
    from_user.last_seen,
    0 as isRead,
    last_msg.content AS last_message,
    last_msg.created_at AS last_message_time
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
    p.citizenid = 'citizen001'
ORDER BY
    c.created_at DESC;