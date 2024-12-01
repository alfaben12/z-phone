PlayerJob = {}
Profile = {}
PhoneData = {
    SignalZone = Config.Signal.DefaultSignalZones,
    MetaData = {},
    isOpen = false,
    PlayerData = nil,
    AnimationData = {
        lib = nil,
        anim = nil,
    },
    CallData = {
        InCall = false,
        CallId = nil,
        AnsweredCall = false
    },
}

CreateThread(function()
    Wait(500)
    if next(Profile) == nil then
        lib.callback('z-phone:server:GetProfile', false, function(profile)
            Profile = profile
        end)
    end
end)

function GetStreetName()
    local pos = GetEntityCoords(PlayerPedId())
    local s1, s2 = GetStreetNameAtCoord(pos.x, pos.y, pos.z)
    local street1 = GetStreetNameFromHashKey(s1)
    local street2 = GetStreetNameFromHashKey(s2)
    local streetLabel = street1
    if street2 ~= nil then
        streetLabel = streetLabel .. ' ' .. street2
    end

    return streetLabel
end

local function DisableDisplayControlActions()
    DisableControlAction(0, 1, true)   -- disable mouse look
    DisableControlAction(0, 2, true)   -- disable mouse look
    DisableControlAction(0, 3, true)   -- disable mouse look
    DisableControlAction(0, 4, true)   -- disable mouse look
    DisableControlAction(0, 5, true)   -- disable mouse look
    DisableControlAction(0, 6, true)   -- disable mouse look
    DisableControlAction(0, 263, true) -- disable melee
    DisableControlAction(0, 264, true) -- disable melee
    DisableControlAction(0, 257, true) -- disable melee
    DisableControlAction(0, 140, true) -- disable melee
    DisableControlAction(0, 141, true) -- disable melee
    DisableControlAction(0, 142, true) -- disable melee
    DisableControlAction(0, 143, true) -- disable melee
    DisableControlAction(0, 177, true) -- disable escape
    DisableControlAction(0, 200, true) -- disable escape
    DisableControlAction(0, 202, true) -- disable escape
    DisableControlAction(0, 322, true) -- disable escape
    DisableControlAction(0, 245, true) -- disable chat
end

function OpenPhone()
    local hasWeapon, weaponHash = GetCurrentPedWeapon(PlayerPedId(), true)
    if weaponHash ~= GetHashKey("WEAPON_UNARMED") then
        xCore.Notify("Cannot open phone!", 'error', 3000)
        return
    end

    lib.callback('z-phone:server:HasPhone', false, function(HasPhone)
        if HasPhone then
            PhoneData.PlayerData = xCore.GetPlayerData()
            SetNuiFocus(true, true)
            -- SetNuiFocusKeepInput(true)
            SendNUIMessage({
                event = 'z-phone',
                isOpen = true,
            })
            PhoneData.isOpen = true

            CreateThread(function()
                while PhoneData.isOpen do
                    DisableDisplayControlActions()
                    Wait(1)
                end
            end)

            if not PhoneData.CallData.InCall then
                DoPhoneAnimation('cellphone_text_in')
            else
                DoPhoneAnimation('cellphone_call_to_text')
            end

            SetTimeout(250, function()
                newPhoneProp()
            end)
        else
            xCore.Notify("You don't have a phone", 'error', 3000)
        end
    end)
end

RegisterCommand('phone', function()
    local PlayerData = xCore.GetPlayerData()
    if not PhoneData.isOpen and PlayerData then
        OpenPhone()
    end
end)

RegisterKeyMapping('phone', 'Open Phone', 'keyboard', Config.OpenPhone)

RegisterNUICallback('close', function(_, cb)
    if not PhoneData.CallData.InCall then
        DoPhoneAnimation('cellphone_text_out')
        SetTimeout(400, function()
            StopAnimTask(PlayerPedId(), PhoneData.AnimationData.lib, PhoneData.AnimationData.anim, 2.5)
            deletePhone()
            PhoneData.AnimationData.lib = nil
            PhoneData.AnimationData.anim = nil
        end)
    else
        PhoneData.AnimationData.lib = nil
        PhoneData.AnimationData.anim = nil
        DoPhoneAnimation('cellphone_text_to_call')
    end
    SetNuiFocus(false, false)
    SetNuiFocusKeepInput(false)

    local position = GetEntityCoords(PlayerPedId(), false)
	local object = GetClosestObjectOfType(position.x, position.y, position.z, 5.0, GetHashKey("prop_amb_phone"), false, false, false)
    if object ~= 0 then
		DeleteObject(object)
	end

    SetTimeout(500, function()
        PhoneData.isOpen = false
    end)
    cb('ok')
end)