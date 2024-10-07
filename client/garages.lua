RegisterNUICallback('get-garages', function(_, cb)
    lib.callback('z-phone:server:GetVehicles', false, function(vehicles)
        local VehiclesFormatted = {}
        for _, v in pairs(vehicles) do
            VehiclesFormatted[#VehiclesFormatted + 1] = {
                name = v.model or 'Unknown Vehicle',  -- Use vehicle model directly
                image = "https://raw.githubusercontent.com/alfaben12/kmrp-assets/main/images/".. v.vehicle ..".png",
                brand = v.brand or '',
                model = v.model or '',
                type = v.type or '',
                category = v.category or '',
                plate = v.plate,
                garage = v.garage,
                state = v.state,
                fuel = v.fuel,
                engine = v.engine,
                body = v.body,
                created_at = v.created_at,
            }
        end
        cb(VehiclesFormatted)
    end)
end)
