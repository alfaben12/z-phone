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
                type = QBCore.Shared.Jobs[v].type and QBCore.Shared.Jobs[v].type or "General",
            }
        end
    end

    cb(ServicesFormatted)
end)

RegisterNUICallback('send-chat-services', function(body, cb)
    cb('ok')
end)