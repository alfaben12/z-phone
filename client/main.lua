RegisterNetEvent("z-phone:client:open", function()
    SetNuiFocus(true, true)
    SendNUIMessage({
        event = "z-phone",
        isOpen = true
    })
end)