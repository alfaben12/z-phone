local WebHook = 'https://discord.com/api/webhooks/1266709115313328160/jU0lELlscEJYAr4_lHXmFfSwFt37mPrFKNas4EgEJsTcsR-_FnyYKVDj26mT5H8e4ljR'

lib.callback.register('z-phone:server:HasPhone', function(source)
    return exports.ox_inventory:GetItem(source, 'phone') ~= nil
end)

lib.callback.register('z-phone:server:GetWebhook', function(_)
    if WebHook ~= '' then
        return WebHook
    else
        print('Set your webhook to ensure that your camera will work!!!!!! Set this on line 10 of the server sided script!!!!!')
        return nil
    end
end)
