RegisterNUICallback('get-profile', function(_, cb)
    QBCore.Functions.TriggerCallback('z-phone:server:GetProfile', function(profile)
        cb(profile)
    end)
end)

RegisterNUICallback('update-profile', function(body, cb)
    QBCore.Functions.TriggerCallback('z-phone:server:UpdateProfile', function(isOk)
        print(isOk)
        if isOk then
            QBCore.Functions.TriggerCallback('z-phone:server:GetProfile', function(profile)
                cb(profile)
            end)
        end
    end, body)
end)