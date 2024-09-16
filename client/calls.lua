local function GenerateCallId(caller, target)
    local CallId = math.ceil(((tonumber(caller) + tonumber(target)) / 100 * 1))
    return CallId
end

RegisterNUICallback('start-call', function(body, cb)
    if PhoneData.CallData.InCall then
        TriggerEvent("z-phone:client:sendNotifInternal", {
            type = "Notification",
            from = "Call",
            message = "You're in a call!"
        })
        cb(false)
        return
    end

    local callId = GenerateCallId(Profile.phone_number, body.to_phone_number)
    body.call_id = callId

    lib.callback('z-phone:server:StartCall', false, function(res)
        if res.is_valid then
            PhoneData.CallData.InCall = true
            if PhoneData.isOpen then
                DoPhoneAnimation('cellphone_text_to_call')
            else
                DoPhoneAnimation('cellphone_call_listen_base')
            end

            PhoneData.CallData.CallId = callId
        end
        
        cb(res)
    end, body)
end)

RegisterNUICallback('cancel-call', function(body, cb)
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
        cb(false)
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
