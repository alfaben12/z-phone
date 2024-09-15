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

RegisterNetEvent('z-phone:client:sendNotifIncomingCall', function(message)
    if PhoneData.isOpen then
        SendNUIMessage({
            event = 'z-phone',
            notification = {
                type = 'Incoming Call',
                from = message.from,
                photo = message.photo,
                from_source = message.from_source,
                to_source = message.to_source,
            },
        })
    else
        SendNUIMessage({
            event = 'z-phone',
            outsideCallNotif = {
                from = message.from,
                photo = message.photo,
                message = message.message,
                from_source = message.from_source,
                to_source = message.to_source,
            },
        })
    end
end)

RegisterNetEvent('z-phone:client:sendNotifStartCall', function(message)
    SendNUIMessage({
        event = 'z-phone',
        notification = {
            type = 'Calling...',
            to_person = message.to_person,
            photo = message.photo,
            from_source = message.from_source,
            to_source = message.to_source,
        },
    })
end)

RegisterNetEvent('z-phone:client:closeCall', function()
    SendNUIMessage({
        event = 'z-phone',
        closeCall = {
            type = "CLOSE_CALL",
        },
    })
end)