RegisterNUICallback('get-houses', function(_, cb)
    lib.callback('z-phone:server:GetHouses', false, function(houses)
        for i, v in pairs(houses) do
            houses[i].image = "https://raw.githubusercontent.com/alfaben12/kmrp-assets/main/houses/".. v.id ..".jpg"
            houses[i].keyholders = json.decode(v.keyholders)
        end

        cb(houses)
    end)
end)

RegisterNUICallback('get-direction', function(body, cb)
    SetNewWaypoint(body.coords.enter.x, body.coords.enter.y)
    lib.notify({
        title = 'GPS',
        description = 'GPS has been set to ' .. body.name .. '!',
        type = 'success'
    })
    cb("ok")
end)
