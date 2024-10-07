lib.callback.register('z-phone:server:GetVehicles', function(source, body)
    local xPlayer = Config.Framework.GetPlayerObject(source)
    if xPlayer then
        local identifier = Config.Framework.GetCitizenId(xPlayer)
        local query = [[
            SELECT 
                ov.vehicle, 
                ov.plate, 
                ov.garage, 
                ov.fuel, 
                ov.engine, 
                ov.body, 
                ov.state, 
                v.model,
                v.brand,
                v.type,
                v.category,
                DATE_FORMAT(ov.created_at, '%d %b %Y %H:%i') AS created_at
            FROM owned_vehicles ov
            INNER JOIN vehicles v ON ov.vehicle = v.model
            WHERE ov.owner = ?
            ORDER BY ov.plate ASC
        ]]

        local result = MySQL.query.await(query, { identifier })

        if result then
            return result
        else
            return {}
        end
    end
    return {}
end)
