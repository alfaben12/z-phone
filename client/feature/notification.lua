RegisterNetEvent('z-phone:client:sendNotifMessage', function(message)
    TriggerServerEvent('InteractSound_SV:PlayOnSource', 'monkeyopening', 0.2)
    if xCore.HasItemByName('phone') then
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
    end
end)

RegisterNetEvent('z-phone:client:sendNotifInternal', function(message)
    if xCore.HasItemByName('phone') then
        if PhoneData.isOpen then
            SendNUIMessage({
                event = 'z-phone',
                notification = {
                    type = "Notification",
                    from = message.from,
                    message = message.message
                },
            })
        else
            xCore.Notify(string.format("[%s] %s", message.from, message.message), 'info', 5000)
        end
    end
end)

RegisterNetEvent('z-phone:client:sendNotifIncomingCall', function(message)
    PhoneData.CallData.InCall = true
    PhoneData.CallData.CallId = message.call_id

    if xCore.HasItemByName('phone') then
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
                    call_id = message.call_id
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
                    call_id = message.call_id
                },
            })
        end

        local RepeatCount = 0
        for _ = 1, Config.CallRepeats + 1, 1 do
            if not PhoneData.CallData.AnsweredCall then
                if RepeatCount + 1 ~= Config.CallRepeats + 1 then
                    if PhoneData.CallData.InCall then
                        RepeatCount = RepeatCount + 1
                        TriggerServerEvent('InteractSound_SV:PlayOnSource', 'ringing', 0.2)
                    else
                        break
                    end
                    Wait(Config.RepeatTimeout)
                else
                    PhoneData.CallData.CallId = nil
                    PhoneData.CallData.InCall = false

                    TriggerEvent("z-phone:client:sendNotifInternal", {
                        type = "Notification",
                        from = "Phone",
                        message = "Call not answered"
                    })
                    cb(false)
                    
                    lib.callback('z-phone:server:EndCall', false, function(isOk)
                        cb(isOk)
                    end, { to_source = message.from_source })
                    break
                end
            end
        end
    end
end)

RegisterNetEvent('z-phone:client:sendNotifStartCall', function(message)
    if xCore.HasItemByName('phone') then
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
    end
end)

RegisterNetEvent('z-phone:client:setInCall', function(message)
    PhoneData.CallData.AnsweredCall = true
    PhoneData.CallData.InCall = true
    PhoneData.CallData.CallId = message.call_id
    exports['pma-voice']:addPlayerToCall(message.call_id)

    SendNUIMessage({
        event = 'z-phone',
        notification = {
            type = "In Call",
            from = message.from,
            photo = message.photo,
            from_source = message.from_source,
            to_source = message.to_source,
            call_id = message.call_id
        },
    })
end)

RegisterNetEvent('z-phone:client:closeCall', function()
    if PhoneData.CallData.InCall and PhoneData.CallData.AnsweredCall then
        DoPhoneAnimation('cellphone_text_in')
    end

    if PhoneData.CallData.CallId then
        exports['pma-voice']:removePlayerFromCall(PhoneData.CallData.CallId)
    end
    
    PhoneData.CallData.AnsweredCall = false
    PhoneData.CallData.InCall = false
    PhoneData.CallData.CallId = nil

    SendNUIMessage({
        event = 'z-phone',
        closeCall = {
            type = "CLOSE_CALL",
        },
    })
end)

RegisterNetEvent('z-phone:client:closeCallSelf', function()
    if PhoneData.CallData.InCall then
        DoPhoneAnimation('cellphone_text_in')
    end

    if PhoneData.CallData.CallId then
        exports['pma-voice']:removePlayerFromCall(PhoneData.CallData.CallId)
    end
    
    PhoneData.CallData.AnsweredCall = false
    PhoneData.CallData.InCall = false
    PhoneData.CallData.CallId = nil

    SendNUIMessage({
        event = 'z-phone',
        closeCall = {
            type = "CLOSE_CALL",
        },
    })
end)