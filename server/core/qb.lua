if Config.Core == "QB" then 
    xCore = {}
    local QB = exports["qb-core"]:GetCoreObject()
    local ox_inventory = exports.ox_inventory

    xCore.GetPlayerBySource = function(source)
        local ply = QB.Functions.GetPlayer(source)
        if not ply then return nil end

        return {
            source = ply.PlayerData.source,
            citizenid = ply.PlayerData.citizenid,
            name = ply.PlayerData.charinfo.firstname .. ' '.. ply.PlayerData.charinfo.lastname,
            job = {
                name = ply.PlayerData.job.name,
                label = ply.PlayerData.job.label
            },
            money = {
                cash = ply.PlayerData.money.cash,
                bank = ply.PlayerData.money.bank,
            },
            removeCash = function (amount)
                ply.Functions.RemoveMoney('cash', amount)
            end,
            removeAccountMoney = function (account, amount, reason)
                ply.Functions.RemoveMoney(account, amount, reason)
            end,
            addAccountMoney = function (account, amount, reason)
                ply.Functions.RemoveMoney(account, amount, reason)
            end
        }
    end

    xCore.GetPlayerByIdentifier = function(identifier)
        local ply = QB.Functions.GetPlayerByCitizenId(identifier)
        if not ply then return nil end
        return {
            source = ply.PlayerData.source,
            citizenid = ply.PlayerData.citizenid,
            name = ply.PlayerData.charinfo.firstname .. ' '.. ply.PlayerData.charinfo.lastname,
            job = {
                name = ply.PlayerData.job.name,
                label = ply.PlayerData.job.label
            },
            money = {
                cash = ply.PlayerData.money.cash,
                bank = ply.PlayerData.money.bank,
            },
            removeCash = function (amount)
                ply.Functions.RemoveMoney('cash', amount)
            end,
            removeAccountMoney = function (account, amount, reason)
                ply.Functions.RemoveMoney(account, amount, reason)
            end,
            addAccountMoney = function (account, amount, reason)
                ply.Functions.RemoveMoney(account, amount, reason)
            end
        }
    end

    xCore.HasItemByName = function(source, item)
        if GetResourceState('ox_inventory') == 'started' then
            return ox_inventory:GetItem(source, item, nil, false).count >= 1
        else
            local ply = QB.Functions.GetPlayer(source)
            if not ply then return nil end
            return ply.Functions.HasItem(item) ~= nil
        end
    end

    xCore.AddMoneyBankSociety = function(society, amount, reason)
        exports['qb-banking']:AddMoney(society, amount, reason)
    end

    xCore.queryPlayerVehicles = function()
        local query = [[
            select 
                pv.vehicle,
                pv.plate,
                pv.garage,
                pv.fuel,
                pv.engine,
                pv.body,
                pv.state,
                DATE_FORMAT(now(), '%d %b %Y %H:%i') as created_at
            from player_vehicles pv WHERE pv.citizenid = ? order by plate asc
        ]]

        return query
    end

    xCore.queryPlayerHouses = function()
        -- ADJUST QUERY FROM YOUR TABLE HOUSING
        local query = [[
            SELECT 
                hl.id,
                hl.label AS name, 
                hl.tier,
                hl.coords,
                0 as is_has_garage, 
                1 AS is_house_locked, 
                1 AS is_garage_locked, 
                1 AS is_stash_locked, 
                ph.keyholders 
            FROM 
                houselocations hl 
            LEFT JOIN player_houses ph ON hl.name = ph.house 
            WHERE ph.citizenid = ?
            ORDER BY ph.id DESC
        ]]

        return query
    end

    xCore.bankHistories = function(citizenid)
        local query = [[
            select
                bs.statement_type as type,
                bs.reason as label,
                bs.amount as total,
                DATE_FORMAT(bs.date, '%d/%m/%Y %H:%i') as created_at
            from bank_statements as bs
            where bs.citizenid = ? order by bs.id desc
        ]]

        local histories = MySQL.query.await(query, { citizenid })
        if not histories then
            histories = {}
        end

        return histories
    end

    xCore.bankInvoices = function(citizenid)
        local query = [[
            select
                pi.id,
                pi.society,
                '-' as reason,
                pi.amount,
                pi.sendercitizenid,
                DATE_FORMAT(now(), '%d/%m/%Y %H:%i') as created_at
            from phone_invoices as pi
            where pi.citizenid = ? order by pi.id desc
        ]]

        local bills = MySQL.query.await(query, { citizenid })
        if not bills then
            bills = {}
        end

        return bills
    end

    xCore.bankInvoiceByCitizenID = function(id, citizenid)
        local query = [[
            select pi.id, pi.amount, pi.reason, pi.society, pi.amount from phone_invoices pi WHERE pi.id = ? and pi.citizenid = ? LIMIT 1
        ]]

        return MySQL.single.await(query, {id, citizenid})
    end

    xCore.deleteBankInvoiceByID = function(id)
        local query = [[
            DELETE FROM phone_invoices WHERE id = ?
        ]]

        MySQL.query(query, { id })
    end
end
