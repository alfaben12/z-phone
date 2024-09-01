local QBCore = exports['qb-core']:GetCoreObject()

lib.callback.register('z-phone:server:GetPhotos', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = [[
            select 
                zpp.id,
                zpp.media as photo,
                DATE_FORMAT(zpp.created_at, '%y/%m/%d %H:%i') as created_at
            from zp_photos zpp
            WHERE zpp.citizenid = ?
        ]]

        local result = MySQL.query.await(query, {
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

lib.callback.register('z-phone:server:SavePhotos', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = "INSERT INTO zp_photos (citizenid, media, location) VALUES (?, ?, ?)"

        local id = MySQL.insert.await(query, {
            citizenid,
            body.url,
            body.location,
        })

        if id then
            return true
        else
            return false
        end
    end
    return false
end)

lib.callback.register('z-phone:server:DeletePhotos', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local query = "DELETE from zp_photos WHERE id = ? AND citizenid = ?"

        MySQL.query.await(query, {
            body.id,
            citizenid,
        })

        return true
    end
    return false
end)