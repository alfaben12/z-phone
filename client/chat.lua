RegisterNUICallback('get-chats', function(_, cb)
    QBCore.Functions.TriggerCallback('z-phone:server:GetChats', function(chats)
        cb(chats)
    end)
end)

RegisterNUICallback('get-chatting', function(body, cb)
    QBCore.Functions.TriggerCallback('z-phone:server:GetChatting', function(chatting)
        cb(chatting)
    end, body)
end)

RegisterNUICallback('send-chatting', function(body, cb)
    QBCore.Functions.TriggerCallback('z-phone:server:SendChatting', function(isOk)
        cb(isOk)
    end, body)
end)

RegisterNetEvent('z-phone:client:sendNotifMessage', function(message)
    if PhoneData.isOpen then
        SendNUIMessage({
            event = 'z-phone',
            notification = {
                type = "New Message",
                from = message.from,
                message = message.message,
                media = message.media,
                from_citizenid = message.from_citizenid,
            },
        })
    end
    
end)

RegisterNUICallback('send-new-chat', function(body, cb)
    QBCore.Functions.TriggerCallback('z-phone:server:SendChatting', function(isOk)
        cb(isOk)
    end, body)
end)