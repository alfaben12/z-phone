RegisterNUICallback('new-or-continue-chat', function(body, cb)
    lib.callback('z-phone:server:StartOrContinueChatting', false, function(chatting)
        cb(chatting)
    end, body)
end)

RegisterNUICallback('get-chats', function(_, cb)
    lib.callback('z-phone:server:GetChats', false, function(chats)
        cb(chats)
    end)
end)

RegisterNUICallback('get-chatting', function(body, cb)
    lib.callback('z-phone:server:GetChatting', false, function(chatting)
        cb(chatting)
    end, body)
end)

RegisterNUICallback('send-chatting', function(body, cb)
    if Profile.inetmax_balance < Config.App.InetMax.InetMaxUsage.MessageSend then
        TriggerEvent("z-phone:client:sendNotifInternal", {
            type = "Notification",
            from = Config.App.InetMax.Name,
            message = Config.MsgNotEnoughInternetData
        })
        cb(false)
        return
    end

    lib.callback('z-phone:server:SendChatting', false, function(isOk)
        TriggerServerEvent("z-phone:server:usage-internet-data", Config.App.Message.Name, Config.App.InetMax.InetMaxUsage.MessageSend)
        cb(isOk)
    end, body)
end)