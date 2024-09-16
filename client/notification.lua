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
                to_person_for_caller = message.to_person_for_caller,
                to_photo_for_caller = message.to_photo_for_caller,
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
                to_person_for_caller = message.to_person_for_caller,
                to_photo_for_caller = message.to_photo_for_caller,
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

RegisterNetEvent('z-phone:client:setInCall', function(message)
    SendNUIMessage({
        event = 'z-phone',
        notification = {
            type = "In Call",
            from = message.from,
            photo = message.photo,
            from_source = message.from_source,
            to_source = message.to_source,
        },
    })
end)

RegisterNetEvent('z-phone:client:closeCall', function()
    if PhoneData.CallData.InCall then
        PhoneData.CallData.InCall = false
        DoPhoneAnimation('cellphone_text_in')
    end

    SendNUIMessage({
        event = 'z-phone',
        closeCall = {
            type = "CLOSE_CALL",
        },
    })
end)