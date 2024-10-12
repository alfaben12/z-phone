RegisterNUICallback('get-services', function(_, cb)
    local list = {}
    for i, v in pairs(Config.Services) do
        list[#list + 1] = {
            logo = 'https://raw.githubusercontent.com/alfaben12/kmrp-assets/main/logo/business/goverment.png',
            service = v.name,
            job = v.job,
            type = v.type,
        }
    end

    lib.callback('z-phone:server:GetServices', false, function(messages)
        cb({ list = list, reports = messages})
    end)
end)

RegisterNUICallback('send-message-service', function(body, cb)
    if not IsAllowToSendOrCall() then
        TriggerEvent("z-phone:client:sendNotifInternal", {
            type = "Notification",
            from = Config.App.InetMax.Name,
            message = Config.MsgSignalZone
        })
        cb(false)
        return
    end

    if Profile.inetmax_balance < Config.App.InetMax.InetMaxUsage.ServicesMessage then
        TriggerEvent("z-phone:client:sendNotifInternal", {
            type = "Notification",
            from = Config.App.InetMax.Name,
            message = Config.MsgNotEnoughInternetData
        })
        cb(false)
        return
    end
    
    lib.callback('z-phone:server:SendMessageService', false, function(isOk)
        TriggerServerEvent("z-phone:server:usage-internet-data", Config.App.Services.Name, Config.App.InetMax.InetMaxUsage.ServicesMessage)
        cb(isOk)
    end, body)
end)

RegisterNUICallback('solved-message-service', function(body, cb)
    lib.callback('z-phone:server:SolvedMessageService', false, function(isOk)
        cb(isOk)
    end, body)
end)