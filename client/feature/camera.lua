local frontCam = false

local function SaveToInternalGallery()
    BeginTakeHighQualityPhoto()
    SaveHighQualityPhoto(0)
    FreeMemoryForHighQualityPhoto()
end

local function CellFrontCamActivate(activate)
    return Citizen.InvokeNative(0x2491A93618B7D838, activate)
end

RegisterNUICallback('TakePhoto', function(_, cb)
    -- SendNUIMessage({
    --     event = 'z-phone',
    --     isOpen = false,
    -- })
    
    SetNuiFocus(false, false)
    CreateMobilePhone(1)
    CellCamActivate(true, true)
    local takePhoto = true
    while takePhoto do
        if IsControlJustPressed(1, 27) then -- Toogle Mode
            frontCam = not frontCam
            CellFrontCamActivate(frontCam)
        elseif IsControlJustPressed(1, 177) then -- CANCEL
            DestroyMobilePhone()
            CellCamActivate(false, false)
            cb(nil)
            break
        elseif IsControlJustPressed(1, 176) then -- TAKE.. PIC
            lib.callback('z-phone:server:GetWebhook', false, function(hook)
            if not hook then
                    xCore.Notify('Camera not setup', 'error', 3000)
                    return
                end
                exports['screenshot-basic']:requestScreenshotUpload(tostring(hook), 'files[]', function(data)
                    SaveToInternalGallery()
                    local image = json.decode(data)
                    DestroyMobilePhone()
                    CellCamActivate(false, false)
                    cb(image.attachments[1].proxy_url)
                    takePhoto = false
                end)
            end)
        end
        HideHudComponentThisFrame(7)
        HideHudComponentThisFrame(8)
        HideHudComponentThisFrame(9)
        HideHudComponentThisFrame(6)
        HideHudComponentThisFrame(19)
        HideHudAndRadarThisFrame()
        EnableAllControlActions(0)
        Wait(0)
    end
    Wait(1000)
    -- OpenPhone()
    SetNuiFocus(true, true)
    if not PhoneData.CallData.InCall then
        DoPhoneAnimation('cellphone_text_in')
    else
        DoPhoneAnimation('cellphone_call_to_text')
    end
end)