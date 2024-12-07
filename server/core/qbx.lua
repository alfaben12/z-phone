if Config.Core == "QBX" then 
    xCore = {}
    local QBX = exports["qb-core"]:GetCoreObject()
    local ox_inventory = exports.ox_inventory

    xCore.GetPlayerBySource = function(source)
        local ply = QBX.Functions.GetPlayer(source)
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
        local ply = QBX.Functions.GetPlayerByCitizenId(identifier)
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
        return ox_inventory:GetItem(source, item, nil, false).count >= 1
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
                hl.property_name AS name, 
                0 as tier,
                hl.coords,
                0 as is_has_garage, 
                1 AS is_house_locked, 
                1 AS is_garage_locked, 
                1 AS is_stash_locked, 
                hl.keyholders 
            FROM 
                properties hl 
            WHERE hl.owner = ?
            ORDER BY hl.id DESC
        ]]

        return query
    end

    xCore.bankHistories = function(citizenid)
        local query = [[
            select transactions
            from player_transactions
            where id = ? order by id desc
        ]]

        local histories = MySQL.single.await(query, { citizenid })
        if not histories then
            histories = {}
        else
            histories = json.decode(histories.transactions)
        end

        local historiesNew = {}
        for i, v in pairs(histories) do
            historiesNew[#historiesNew + 1] = {
                type = v.trans_type,
                label = v.title,
                total = v.amount,
                created_at = os.date("%Y-%m-%d %H:%M:%S", v.time),
            }
        end
        return historiesNew
    end

    xCore.bankInvoices = function(citizenid)
        -- local query = [[
        --     select
        --         pi.id,
        --         pi.society,
        --         '-' as reason,
        --         pi.amount,
        --         pi.sendercitizenid,
        --         DATE_FORMAT(now(), '%d/%m/%Y %H:%i') as created_at
        --     from phone_invoices as pi
        --     where pi.citizenid = ? order by pi.id desc
        -- ]]

        -- local bills = MySQL.query.await(querybill, { citizenid })

        -- if not histories then
        --     bills = {}
        -- end

        -- return bills
        return {}
    end

    xCore.bankInvoiceByCitizenID = function(id, citizenid)
        -- local query = [[
        --     select pi.id, pi.amount, pi.reason, pi.society, pi.amount from phone_invoices pi WHERE pi.id = ? and pi.citizenid = ? LIMIT 1
        -- ]]

        -- return MySQL.single.await(query, {id, citizenid})
        lib.print.info("CHANGE THIS CODE TO USE INVOICE bankInvoiceByCitizenID")
        return nil
    end

    xCore.deleteBankInvoiceByID = function(id)
        lib.print.info("CHANGE THIS CODE TO USE INVOICE deleteBankInvoiceByID")

        -- local query = [[
        --     DELETE FROM phone_invoices WHERE id = ?
        -- ]]
        -- MySQL.query(query, { id })
    end
end