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
    else
        SendNUIMessage({
            event = 'z-phone',
            outsideMessageNotif = {
                from = message.from,
                message = "New message!"
            },
        })
    end
end)

RegisterNetEvent('z-phone:client:sendNotifInternal', function(message)
    if PhoneData.isOpen then
        SendNUIMessage({
            event = 'z-phone',
            notification = {
                type = "Notification",
                from = message.from,
                message = message.message
            },
        })
    end
end)