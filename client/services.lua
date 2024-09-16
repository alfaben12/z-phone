RegisterNUICallback('get-services', function(_, cb)
    local services = {
        "goverment",
        "police",
        "ambulance",
        "realestate",
        "kmmechanic",
        "taxi",
        "kmpedagang",
        "reporter",
    }
    local ServicesFormatted = {}

    for i, v in ipairs(services) do
        if QBCore.Shared.Jobs[v] ~= nil then
            ServicesFormatted[#ServicesFormatted + 1] = {
                logo = 'https://raw.githubusercontent.com/alfaben12/kmrp-assets/main/logo/business/goverment.png',
                service = QBCore.Shared.Jobs[v].label,
                job = v,
                type = QBCore.Shared.Jobs[v].type and QBCore.Shared.Jobs[v].type or "General",
            }
        end
    end

    lib.callback('z-phone:server:GetServices', false, function(messages)
        cb({ list = ServicesFormatted, reports = messages})
    end)
end)

RegisterNUICallback('send-message-service', function(body, cb)
    lib.callback('z-phone:server:SendMessageService', false, function(isOk)
        cb(isOk)
    end, body)
end)

RegisterNUICallback('solved-message-service', function(body, cb)
    lib.callback('z-phone:server:SolvedMessageService', false, function(isOk)
        cb(isOk)
    end, body)
end)