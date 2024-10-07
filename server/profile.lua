

lib.callback.register('z-phone:server:GetProfile', function(source, body)
    local xPlayer = Config.Framework.GetPlayerObject(source)
    if xPlayer == nil then return nil end
        
	local citizenid = Config.Framework.GetCitizenId(xPlayer)
    local query = [[
        select 
            zpu.citizenid,
            zpu.phone_number,
            zpu.created_at,
            zpu.last_seen,
            zpu.avatar,
            zpu.unread_message_service,
            zpu.unread_message,
            zpu.wallpaper,
            zpu.is_anonim,
            zpu.is_donot_disturb,
            zpu.frame,
            zpu.iban,
            zpu.active_loops_userid,
            zpu.inetmax_balance,
            zpu.phone_height
        from zp_users zpu WHERE zpu.citizenid = ? LIMIT 1
    ]]

    local result = MySQL.single.await(query, {
        citizenid
    })

    if not result then
        local phone_number = math.random(81, 89) .. tostring(math.random(100000, 999999))
        local iban = math.random(7, 9) .. tostring(math.random(1000000000, 9999999999))
			
        local queryNew = "INSERT INTO zp_users (citizenid, phone_number, iban, inetmax_balance) VALUES (?, ?, ?, ?)"

        local id = MySQL.insert.await(queryNew, {
            citizenid,
            phone_number,
            iban,
            5000000
        })

        result = MySQL.single.await(query, {
            citizenid
        })
    end

    result.name = Player.PlayerData.charinfo.firstname .. ' '.. Player.PlayerData.charinfo.lastname
    result.job = {}
    result.job.name = Player.PlayerData.job.name
    result.job.label = Player.PlayerData.job.label
    result.signal = Config.Signal.Zones[Config.Signal.DefaultSignalZones].ChanceSignal
    return result
end)

lib.callback.register('z-phone:server:UpdateProfile', function(source, body)
    local affectedRows = nil
    local xPlayer = Config.Framework.GetPlayerObject(source)
    if xPlayer ~= nil then
	    local citizenid = Config.Framework.GetCitizenId(xPlayer)
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
        elseif body.type == 'frame' then
            affectedRows = MySQL.update.await('UPDATE zp_users SET frame = ? WHERE citizenid = ?', {
                body.value, citizenid
            })
        elseif body.type == 'phone_height' then
            affectedRows = MySQL.update.await('UPDATE zp_users SET phone_height = ? WHERE citizenid = ?', {
                body.value, 
                citizenid
            })
            
        else
            print("RETRIGER DETECTED, SHOULD BANN IF NEEDED")
        end

        if affectedRows then
            TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
                type = "Notification",
                from = "Setting",
                message = "Success updated!"
            })
            return true
        else
            return false
        end
    end

    return false
end)
