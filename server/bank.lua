local QBCore = exports['qb-core']:GetCoreObject()

lib.callback.register('z-phone:server:GetBank', function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local citizenid = Player.PlayerData.citizenid
        local queryHistories = [[
            select
                bs.statement_type as type,
                bs.reason as label,
                bs.amount as total,
                DATE_FORMAT(bs.date, '%y/%m/%d %H:%i') as created_at
            from bank_statements as bs
            where bs.citizenid = ? order by bs.id desc
        ]]

        local querybill = [[
            select
                pi.id,
                pi.society,
                pi.reason,
                pi.amount,
                pi.sendercitizenid,
                DATE_FORMAT(pi.created_at, '%y/%m/%d %H:%i') as created_at
            from phone_invoices as pi
            where pi.citizenid = ? order by pi.id desc
        ]]

        local histories = MySQL.query.await(queryHistories, {
            citizenid
        })

        local bills = MySQL.query.await(querybill, {
            citizenid
        })

        if not histories then
            histories = {}
        end

        if not bills then
            bills = {}
        end

        return {
            histories = histories,
            bills = bills,
            balance = Player.PlayerData.money['bank']
        }
    end
    return {}
end)


lib.callback.register('z-phone:server:PayInvoice', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player == nil then 
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Bank",
            message = "Failed to pay bill"
        })
        return false
    end

    local citizenid = Player.PlayerData.citizenid
    local query = [[
        select pi.* from phone_invoices pi WHERE pi.id = ? and pi.citizenid = ? LIMIT 1
    ]]

    local invoice = MySQL.single.await(query, {
        body.id,
        citizenid
    })

    if not invoice then 
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Bank",
            message = "Failed to pay bill"
        })
        return false
    end

    if Player.PlayerData.money.bank < invoice.amount then 
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Bank",
            message = "Balance is not enough"
        })
        return false
    end

    Player.Functions.RemoveMoney('bank', invoice.amount, invoice.reason)
    exports['qb-banking']:AddMoney(invoice.society, invoice.amount, invoice.reason)
    MySQL.insert.await('INSERT INTO bank_statements (citizenid, account_name, amount, reason, statement_type) VALUES (?, ?, ?, ?, ?)', { citizenid, 'checking', invoice.amount, invoice.reason, 'withdraw' })
    MySQL.query('DELETE FROM phone_invoices WHERE id = ?', { invoice.id })
    
    TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
        type = "Notification",
        from = "Bank",
        message = "Success pay bill"
    })
    return true
end)