RegisterNUICallback('get-photos', function(_, cb)
    lib.callback('z-phone:server:GetPhotos', false, function(photos)
        cb(photos)
    end)
end)

RegisterNUICallback('save-photos', function(body, cb)
    body.location = GetStreetName()
    lib.callback('z-phone:server:SavePhotos', false, function(isOk)
        if isOk then
            lib.notify({
                title = 'Photos',
                description = 'Successful save to gallery!',
                type = 'success'
            })
        end
        cb(isOk)
    end, body)
end)

RegisterNUICallback('delete-photos', function(body, cb)
    lib.callback('z-phone:server:DeletePhotos', false, function(isOk)
        if isOk then
            lib.notify({
                title = 'Photos',
                description = 'Successful delete from gallery!',
                type = 'success'
            })
        end

        lib.callback('z-phone:server:GetPhotos', false, function(photos)
            cb(photos)
        end)
    end, body)
end)
