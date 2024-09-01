local QBCore = exports['qb-core']:GetCoreObject()

lib.callback.register('z-phone:server:GetServices', function(source)
    return QBCore.Shared.Jobs
end)