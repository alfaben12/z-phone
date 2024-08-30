local QBCore = exports['qb-core']:GetCoreObject()
local WebHook = 'https://discord.com/api/webhooks/1266709115313328160/jU0lELlscEJYAr4_lHXmFfSwFt37mPrFKNas4EgEJsTcsR-_FnyYKVDj26mT5H8e4ljR'

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

QBCore.Functions.CreateCallback('z-phone:server:GetWebhook', function(_, cb)
    if WebHook ~= '' then
        cb(WebHook)
    else
        print('Set your webhook to ensure that your camera will work!!!!!! Set this on line 10 of the server sided script!!!!!')
        cb(nil)
    end
end)