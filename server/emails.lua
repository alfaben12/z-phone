lib.callback.register('z-phone:server:GetEmails', function(source)
    local xPlayer = Config.Framework.GetPlayerObject(source)
    if xPlayer == nil then return false end 
        
	local citizenid = Config.Framework.GetCitizenId(xPlayer)
    local query = [[
        SELECT 
            id,
            institution,
            citizenid,
            subject,
            content,
            is_read,
            DATE_FORMAT(created_at, '%d %b %Y %H:%i') as created_at
        FROM zp_emails WHERE citizenid = ? ORDER BY id DESC LIMIT 100
    ]]
    local result = MySQL.query.await(query, {citizenid})

    if not result then
        return {}
    end

    return result
end)
