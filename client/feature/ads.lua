RegisterNUICallback('get-ads', function(_, cb)
    lib.callback('z-phone:server:GetAds', false, function(ads)
        cb(ads)
    end)
end)

RegisterNUICallback('send-ads', function(body, cb)
    if not IsAllowToSendOrCall() then
        TriggerEvent("z-phone:client:sendNotifInternal", {
            type = "Notification",
            from = Config.App.InetMax.Name,
            message = Config.MsgSignalZone
        })
        cb(false)
        return
    end
    
    if Profile.inetmax_balance < Config.App.InetMax.InetMaxUsage.AdsPost then
        TriggerEvent("z-phone:client:sendNotifInternal", {
            type = "Notification",
            from = Config.App.InetMax.Name,
            message = Config.MsgNotEnoughInternetData
        })
        cb(false)
        return
    end

    lib.callback('z-phone:server:SendAds', false, function(isOk)
        lib.callback('z-phone:server:GetAds', false, function(ads)
            TriggerServerEvent("z-phone:server:usage-internet-data", Config.App.Ads.Name, Config.App.InetMax.InetMaxUsage.AdsPost)
            cb(ads)
        end)
    end, body)
end)