local QBCore = exports['qb-core']:GetCoreObject()

lib.callback.register('z-phone:server:GetVehicles', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid

        -- Adjusted SQL query: Removed `created_at`
        local query = [[
            select 
                vehicle,
                plate,
                garage,
                fuel,
                engine,
                body,
                state
            from player_vehicles WHERE citizenid = ? order by plate asc
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
