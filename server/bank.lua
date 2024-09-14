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
                DATE_FORMAT(bs.date, '%Y/%m/%d %H:%i') as created_at
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
                DATE_FORMAT(pi.created_at, '%Y/%m/%d %H:%i') as created_at
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

    if Player.PlayerData.money.bank < body.amount then 
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Bank",
            message = "Balance is not enough"
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

    Player.Functions.RemoveMoney('bank', invoice.amount, invoice.reason)
    exports['qb-banking']:AddMoney(invoice.society, invoice.amount, invoice.reason)
    MySQL.query('DELETE FROM phone_invoices WHERE id = ?', { invoice.id })
    
    TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
        type = "Notification",
        from = "Bank",
        message = "Success pay bill"
    })
    return true
end)

lib.callback.register('z-phone:server:TransferCheck', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player == nil then 
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Bank",
            message = "Failed to check receiver!"
        })
        return {
            isValid = false,
            name = ""
        }
    end

    local citizenid = Player.PlayerData.citizenid
    local queryGetCitizenByIban = "select citizenid from zp_users where iban = ?"
    local receiverCitizenid = MySQL.scalar.await(queryGetCitizenByIban, {
        body.iban
    })

    if not receiverCitizenid then
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Bank",
            message = "IBAN not registered!"
        })
        return {
            isValid = false,
            name = ""
        }
    end

    if receiverCitizenid == citizenid then
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Bank",
            message = "Cannot transfer to your self!"
        })
        return {
            isValid = false,
            name = ""
        }
    end

    local ReceiverPlayer = QBCore.Functions.GetPlayerByCitizenId(receiverCitizenid)
    if ReceiverPlayer == nil then 
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Bank",
            message = "Receiver is offline!"
        })
        return {
            isValid = false,
            name = ""
        }
    end

    return {
        isValid = true,
        name = ReceiverPlayer.PlayerData.charinfo.firstname .. ' '.. ReceiverPlayer.PlayerData.charinfo.lastname
    }
end)

lib.callback.register('z-phone:server:Transfer', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player == nil then 
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Bank",
            message = "Failed to check receiver!"
        })
        return false
    end

    local citizenid = Player.PlayerData.citizenid
    local queryGetCitizenByIban = "select citizenid from zp_users where iban = ?"
    local receiverCitizenid = MySQL.scalar.await(queryGetCitizenByIban, {
        body.iban
    })

    if not receiverCitizenid then
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Bank",
            message = "IBAN not registered!"
        })
        return false
    end

    if receiverCitizenid == citizenid then
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Bank",
            message = "Cannot transfer to your self!"
        })
        return false
    end

    local ReceiverPlayer = QBCore.Functions.GetPlayerByCitizenId(receiverCitizenid)
    if ReceiverPlayer == nil then 
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Bank",
            message = "Receiver is offline!"
        })
        return false
    end

    local senderReason = string.format("%s - to %s", body.note, body.iban)
    local receiverReason = string.format("%s - from %s", "Transfer received", body.iban)
    Player.Functions.RemoveMoney('bank', body.total, senderReason)
    ReceiverPlayer.Functions.AddMoney('bank', body.total, receiverReason)
    return true
end)