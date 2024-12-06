RegisterNUICallback('get-profile', function(_, cb)
    lib.callback('z-phone:server:GetProfile', false, function(profile)
        cb(profile)
    end)
end)

RegisterNUICallback('update-profile', function(body, cb)
    lib.callback('z-phone:server:UpdateProfile', false, function(isOk)
        if isOk then
            lib.callback('z-phone:server:GetProfile', false, function(profile)
                Profile = profile
                cb(profile)
            end)
        end
    end, body)
end)