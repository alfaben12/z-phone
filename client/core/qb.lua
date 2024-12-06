if Config.Core == "QB" then 
    xCore = {}
    local QB = exports["qb-core"]:GetCoreObject()

    xCore.GetPlayerData = function()
        local ply = QB.Functions.GetPlayerData()
        if not ply then return nil end
        return {
            citizenid = ply.citizenid
        }
    end

    xCore.Notify = function(msg, typ, time)
        TriggerEvent('chat:addMessage', {
            color = {0, 255, 0},
            multiline = false,
            args = {"PHONE", msg}
        })
    end

    xCore.HasItemByName = function(item)
        return QB.Functions.HasItem(item)
    end

    xCore.GetClosestPlayer = function ()
        return QB.Functions.GetClosestPlayer()
    end
end