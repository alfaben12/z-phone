lib.callback.register('z-phone:server:GetVehicles', function(source, body)
    local Player = xCore.GetPlayerBySource(source)
    if Player == nil then return {} end

    local citizenid = Player.citizenid
    local query = xCore.queryPlayerVehicles()
    local result = MySQL.query.await(query, {
        citizenid
    })

    if not result then
        return {}
    end
    return result
end)