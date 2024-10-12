if Config.Core == "QB" then 
    xCore = {}
    local QB = exports["qb-core"]:GetQBObject()

    xCore.GetPlayerBySource = function(source)
        local ply = QB.Functions.GetPlayer(source)
        if not ply then return nil end
        return {
            source = ply.PlayerData.source,
            citizenid = ply.PlayerData.citizenid,
            name = ply.PlayerData.charinfo.firstname .. ' '.. ply.charinfo.lastname,
            job = {
                name = ply.PlayerData.job.name,
                label = ply.PlayerData.job.label
            }
        }
    end

    xCore.GetPlayerByIdentifier = function(identifier)
        local ply = QB.Functions.GetPlayerByCitizenId(identifier)
        if not ply then return nil end
        return {
            source = ply.PlayerData.source,
            citizenid = ply.PlayerData.citizenid,
            name = ply.PlayerData.charinfo.firstname .. ' '.. ply.charinfo.lastname,
            job = {
                name = ply.PlayerData.job.name,
                label = ply.PlayerData.job.label
            }
        }
    end

    xCore.HasItemByName = function(source, item)
        local ply = QB.Functions.GetPlayer(source)
        if not ply then return nil end
        return ply.Functions.HasItem(item) ~= nil
    end

    xCore.queryPlayerVehicles = function()
        local query = [[
            select 
                pv.vehicle,
                pv.plate,
                pv.garage,
                pv.fuel,
                pv.engine,
                pv.body,
                pv.state,
                DATE_FORMAT(pv.created_at, '%d %b %Y %H:%i') as created_at
            from player_vehicles pv WHERE pv.citizenid = ? order by plate asc
        ]]

        return query
    end

    xCore.queryPlayerHouses = function()
        -- ADJUST QUERY FROM YOUR TABLE HOUSING
        local query = [[
            SELECT 
                hl.id,
                hl.label AS name, 
                hl.tier,
                hl.coords,
                0 as is_has_garage, 
                1 AS is_house_locked, 
                1 AS is_garage_locked, 
                1 AS is_stash_locked, 
                ph.keyholders 
            FROM 
                houselocations hl 
            LEFT JOIN player_houses ph ON hl.name = ph.house 
            WHERE ph.citizenid = ?
            ORDER BY ph.id DESC
        ]]

        return query
    end
end