local QBCore = exports['qb-core']:GetCoreObject()

QBCore.Functions.CreateCallback('z-phone:server:HasPhone', function(source, cb)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local HasPhone = Player.Functions.GetItemByName('phone')
        if HasPhone ~= nil then
            cb(true)
        else
            cb(false)
        end
    end
end)