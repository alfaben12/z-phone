local QBCore = exports['qb-core']:GetCoreObject()

lib.callback.register('z-phone:server:GetHouses', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = [[
            SELECT 
                hl.id,
                hl.label AS name, 
                hl.tier,
                hl.coords,
                CASE WHEN hl.garage = NULL 
                or hl.garage = '' THEN 0 ELSE 1 END AS is_has_garage, 
                hl.locked AS is_house_locked, 
                hl.garagelocked AS is_garage_locked, 
                hl.stashlocked AS is_stash_locked, 
                ph.keyholders 
            FROM 
                houselocations hl 
            LEFT JOIN player_houses ph ON hl.name = ph.house 
            WHERE ph.citizenid = ?
            ORDER BY ph.id DESC
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