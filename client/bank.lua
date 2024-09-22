RegisterNUICallback('get-bank', function(_, cb)
    lib.callback('z-phone:server:GetBank', false, function(bank)
        cb(bank)
    end)
end)

RegisterNUICallback('pay-invoice', function(body, cb)
    lib.callback('z-phone:server:PayInvoice', false, function(isOk)
        cb(isOk)
    end, body)
end)

RegisterNUICallback('transfer-check', function(body, cb)
    if not IsAllowToSendOrCall() then
        TriggerEvent("z-phone:client:sendNotifInternal", {
            type = "Notification",
            from = Config.App.InetMax.Name,
            message = Config.MsgSignalZone
        })
        cb(false)
        return
    end

    if Profile.inetmax_balance < Config.App.InetMax.InetMaxUsage.BankCheckTransferReceiver then
        TriggerEvent("z-phone:client:sendNotifInternal", {
            type = "Notification",
            from = Config.App.InetMax.Name,
            message = Config.MsgNotEnoughInternetData
        })
        cb(false)
        return
    end
    
    lib.callback('z-phone:server:TransferCheck', false, function(result)
        TriggerServerEvent("z-phone:server:usage-internet-data", Config.App.Wallet.Name, Config.App.InetMax.InetMaxUsage.BankCheckTransferReceiver)
        cb(result)
    end, body)
end)

RegisterNUICallback('transfer', function(body, cb)
    if not IsAllowToSendOrCall() then
        TriggerEvent("z-phone:client:sendNotifInternal", {
            type = "Notification",
            from = Config.App.InetMax.Name,
            message = Config.MsgSignalZone
        })
        cb(false)
        return
    end
    
    if Profile.inetmax_balance < Config.App.InetMax.InetMaxUsage.BankTransfer then
        TriggerEvent("z-phone:client:sendNotifInternal", {
            type = "Notification",
            from = Config.App.InetMax.Name,
            message = Config.MsgNotEnoughInternetData
        })
        cb(false)
        return
    end

    lib.callback('z-phone:server:Transfer', false, function(isOk)
        TriggerServerEvent("z-phone:server:usage-internet-data", Config.App.Wallet.Name, Config.App.InetMax.InetMaxUsage.BankTransfer)
        cb(isOk)
    end, body)
end)