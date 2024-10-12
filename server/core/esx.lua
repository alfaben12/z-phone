if Config.Core == "ESX" then 
    xCore = {}
    local ESX = exports["es_extended"]:getSharedObject()
    local ox_inventory = exports.ox_inventory

    xCore.GetPlayerBySource = function(source)
        local ply = ESX.GetPlayerFromId(source)
        if not ply then return nil end

        return {
            source = ply.source,
            citizenid = ply.identifier,
            name = ply.getName(),
            job = {
                name = ply.job.name,
                label = ply.job.label
            }
        }
    end

    xCore.GetPlayerByIdentifier = function(identifier)
        local ply = ESX.GetPlayerFromIdentifier(identifier)
        if not ply then return nil end

        return {
            source = ply.source,
            citizenid = ply.identifier,
            name = ply.getName(),
            job = {
                name = ply.job.name,
                label = ply.job.label
            }
        }
    end

    xCore.HasItemByName = function(source, item)
        return ox_inventory:GetItem(source, item, nil, false).count >= 1
    end

    xCore.queryPlayerVehicles = function()
        -- state
        -- 1 = Garaged
        -- 2 = Impound
        -- 3 = Outside
        -- defaukl = Outside

        -- ADJUST QUERY FROM YOUR TABLE VEHICLE
        local query = [[
            select 
                "default" as vehicle,
                v.plate,
                v.parking as garage,
                100 as fuel,
                100 as engine,
                100 as body,
                v.stored as state,
                DATE_FORMAT(now(), '%d %b %Y %H:%i') as created_at
            from owned_vehicles v WHERE v.owner = ? order by plate asc
        ]]

        return query
    end

    xCore.queryPlayerHouses = function()
        -- ADJUST QUERY FROM YOUR TABLE HOUSING
        local query = [[
        SELECT 
                hl.id,
                hl.name, 
                0 as tier,
                null as coords,
                0 as is_has_garage, 
                1 AS is_house_locked, 
                1 AS is_garage_locked, 
                1 AS is_stash_locked, 
                '[]' as keyholders 
            FROM 
                datastore_data hl 
            WHERE hl.owner = ? and hl.name = 'property'
            ORDER BY hl.id DESC
        ]]

        return query
    end
end