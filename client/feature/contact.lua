RegisterNUICallback('get-contacts', function(_, cb)
    lib.callback('z-phone:server:GetContacts', false, function(contacts)
        cb(contacts)
    end)
end)

RegisterNUICallback('delete-contact', function(body, cb)
    lib.callback('z-phone:server:DeleteContact', false, function(isOk)
        cb(isOk)
    end, body)
end)

RegisterNUICallback('update-contact', function(body, cb)
    lib.callback('z-phone:server:UpdateContact', false, function(isOk)
        cb(isOk)
    end, body)
end)

RegisterNUICallback('save-contact', function(body, cb)
    lib.callback('z-phone:server:SaveContact', false, function(isOk)
        cb(isOk)
    end, body)
end)

RegisterNUICallback('get-contact-requests', function(_, cb)
    lib.callback('z-phone:server:GetContactRequest', false, function(requests)
        cb(requests)
    end)
end)

RegisterNUICallback('share-contact', function(body, cb)
    local closestPlayer, distance = xCore.GetClosestPlayer()
    local ped = PlayerPedId()

    if not (distance ~= -1 and distance < 2 and GetEntitySpeed(ped) < 5.0 and not IsPedRagdoll(ped)) then
        TriggerEvent("z-phone:client:sendNotifInternal", {
            type = "Notification",
            from = "Contact",
            message = "Cannot share contact!"
        })
        cb(false)
        return
    end

    body.to_source = GetPlayerServerId(closestPlayer)
    lib.callback('z-phone:server:ShareContact', false, function(isOk)
        TriggerEvent("z-phone:client:sendNotifInternal", {
            type = "Notification",
            from = "Contact",
            message = "Success share contact!"
        })
        cb(isOk)
    end, body)
end)

RegisterNUICallback('delete-contact-requests', function(body, cb)
    lib.callback('z-phone:server:DeleteContactRequest', false, function(isOk)
        cb(isOk)
    end, body)
end)