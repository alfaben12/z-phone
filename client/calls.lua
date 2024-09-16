RegisterNUICallback('start-call', function(body, cb)
    if PhoneData.CallData.InCall then
        TriggerEvent("z-phone:client:sendNotifInternal", {
            type = "Notification",
            from = "Call",
            message = "You're in a call!"
        })
        return
    end

    lib.callback('z-phone:server:StartCall', false, function(res)
        if res.is_valid then
            PhoneData.CallData.InCall = true
            if PhoneData.isOpen then
                DoPhoneAnimation('cellphone_text_to_call')
            else
                DoPhoneAnimation('cellphone_call_listen_base')
            end
        end
        
        cb(res)
    end, body)
end)

RegisterNUICallback('cancel-call', function(body, cb)
    DoPhoneAnimation('cellphone_text_in')
    PhoneData.CallData.InCall = false

    lib.callback('z-phone:server:CancelCall', false, function(isOk)
        cb(isOk)
    end, body)
end)

RegisterNUICallback('decline-call', function(body, cb)
    lib.callback('z-phone:server:DeclineCall', false, function(isOk)
        cb(isOk)
    end, body)
end)

RegisterNUICallback('end-call', function(body, cb)
    DoPhoneAnimation('cellphone_text_in')
    PhoneData.CallData.InCall = false
    
    lib.callback('z-phone:server:EndCall', false, function(isOk)
        cb(isOk)
    end, body)
end)

RegisterNUICallback('accept-call', function(body, cb)
    if PhoneData.CallData.InCall then
        TriggerEvent("z-phone:client:sendNotifInternal", {
            type = "Notification",
            from = "Call",
            message = "You're in a call!"
        })
        return
    end

    if PhoneData.isOpen then
        DoPhoneAnimation('cellphone_text_to_call')
    else
        DoPhoneAnimation('cellphone_call_listen_base')
    end

    PhoneData.CallData.InCall = true
    lib.callback('z-phone:server:AcceptCall', false, function(isOk)
        cb(isOk)
    end, body)
end)

RegisterNUICallback('get-call-histories', function(_, cb)
    lib.callback('z-phone:server:GetCallHistories', false, function(histories)
        cb(histories)
    end)
end)