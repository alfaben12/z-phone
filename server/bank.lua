lib.callback.register('z-phone:server:GetBank', function(source)
    local xPlayer = Config.Framework.GetPlayerObject(source)
    if xPlayer ~= nil then
        local identifier = Config.Framework.GetCitizenId(xPlayer)
        local queryHistories = [[
            select
                bs.statement_type as type,
                bs.reason as label,
                bs.amount as total,
                DATE_FORMAT(bs.date, '%d/%m/%Y %H:%i') as created_at
            from bank_statements as bs
            where bs.identifier = ? order by bs.id desc
        ]]

        local querybill = [[
            select
                pi.id,
                pi.society,
                pi.reason,
                pi.amount,
                pi.senderidentifier,
                DATE_FORMAT(pi.created_at, '%d/%m/%Y %H:%i') as created_at
            from phone_invoices as pi
            where pi.identifier = ? order by pi.id desc
        ]]

        local histories = MySQL.query.await(queryHistories, {
            identifier
        })

        local bills = MySQL.query.await(querybill, {
            identifier
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
            balance = GetBankMoney(xPlayer)
        }
    end
    return {}
end)

lib.callback.register('z-phone:server:PayInvoice', function(source, body)
    local xPlayer = Config.Framework.GetPlayerObject(source)
    if xPlayer == nil then 
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Wallet",
            message = "Failed to pay bill"
        })
        return false
    end

    if Config.Framework.GetBankMoney(xPlayer) < body.amount then 
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Wallet",
            message = "Balance is not enough"
        })
        return false
    end
    
    local identifier = Config.Framework.GetCitizenId(xPlayer)
    local query = [[
        select pi.* from phone_invoices pi WHERE pi.id = ? and pi.identifier = ? LIMIT 1
    ]]

    local invoice = MySQL.single.await(query, {
        body.id,
        identifier
    })

    if not invoice then 
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Wallet",
            message = "Failed to pay bill"
        })
        return false
    end

    Config.Framework.RemoveBankMoney(xPlayer, invoice.amount, invoice.reason)
    Config.Framework.AddMoneyToSociety(invoice.society, invoice.amount)
    MySQL.query('DELETE FROM phone_invoices WHERE id = ?', { invoice.id })
    
    TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
        type = "Notification",
        from = "Wallet",
        message = "Success pay bill"
    })
    return true
end)

lib.callback.register('z-phone:server:TransferCheck', function(source, body)
    local xPlayer = Config.Framework.GetPlayerObject(source)
    if xPlayer == nil then 
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Wallet",
            message = "Failed to check receiver!"
        })
        return {
            isValid = false,
            name = ""
        }
    end

    local identifier = Config.Framework.GetCitizenId(xPlayer)
    local queryGetCitizenByIban = "select identifier from zp_users where iban = ?"
    local receiverIdentifier = MySQL.scalar.await(queryGetCitizenByIban, {
        body.iban
    })

    if not receiverIdentifier then
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Wallet",
            message = "IBAN not registered!"
        })
        return {
            isValid = false,
            name = ""
        }
    end

    if receiverIdentifier == identifier then
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Wallet",
            message = "Cannot transfer to your self!"
        })
        return {
            isValid = false,
            name = ""
        }
    end

    local ReceiverPlayer = Config.Framework.GetPlayerObjectFromRockstar(receiverIdentifier)
    if ReceiverPlayer == nil then 
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Wallet",
            message = "Receiver is offline!"
        })
        return {
            isValid = false,
            name = ""
        }
    end

    return {
        isValid = true,
        name = ReceiverPlayer.getName()
    }
end)

lib.callback.register('z-phone:server:Transfer', function(source, body)
    local xPlayer = Config.Framework.GetPlayerObject(source)
    if xPlayer == nil then 
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Wallet",
            message = "Failed to check receiver!"
        })
        return false
    end

    local identifier = Config.Framework.GetCitizenId(xPlayer)

    if Config.Framework.GetBankMoney(xPlayer) < body.total then 
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Wallet",
            message = "Balance is not enough"
        })
        return false
    end
    
    local queryGetCitizenByIban = "select identifier from zp_users where iban = ?"
    local receiverIdentifier = MySQL.scalar.await(queryGetCitizenByIban, {
        body.iban
    })

    if not receiverIdentifier then
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Wallet",
            message = "IBAN not registered!"
        })
        return false
    end

    if receiverIdentifier == identifier then
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Wallet",
            message = "Cannot transfer to your self!"
        })
        return false
    end

    local ReceiverPlayer = Config.Framework.GetPlayerObjectFromRockstar(receiverIdentifier)
    if ReceiverPlayer == nil then 
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Wallet",
            message = "Receiver is offline!"
        })
        return false
    end

    local senderReason = string.format("Transfer send: %s - to %s", body.note, body.iban)
    local receiverReason = string.format("%s - from %s", "Transfer received", body.iban)
    Config.Framework.RemoveBankMoney(xPlayer, body.total, senderReason)
    Config.Framework.AddBankMoney(ReceiverPlayer, body.total, receiverReason)

    local content = [[
We are pleased to inform you that your recent money transfer has been successfully completed. 
\
Here are the details of the transaction:
\
Total: %s \
IBAN : %s \
Note : %s \
\
If you have any questions or need further assistance, please don't hesitate to reach out.
\
Thank you for choosing our services!
    ]]
    MySQL.Async.insert('INSERT INTO zp_emails (institution, identifier, subject, content) VALUES (?, ?, ?, ?)', {
        "wallet",
        Config.Framework.GetCitizenId(xPlayer),
        "Successful Money Transfer Confirmation",
        string.format(content, body.total, body.iban, body.note),
    })

    TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
        type = "Notification",
        from = "Wallet",
        message = "Successful Money Transfer"
    })

    TriggerClientEvent("z-phone:client:sendNotifInternal", ReceiverPlayer.source, {
        type = "Notification",
        from = "Wallet",
        message = "Received Money Transfer"
    })
    return true
end)
