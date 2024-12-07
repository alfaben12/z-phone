lib.callback.register('z-phone:server:GetBank', function(source)
    local Player = xCore.GetPlayerBySource(source)
    if Player ~= nil then
        local citizenid = Player.citizenid

        local histories = xCore.bankHistories(citizenid)
        local bills = xCore.bankInvoices(citizenid)

        return {
            histories = histories,
            bills = bills,
            balance = Player.money.bank
        }
    end
    return {}
end)

lib.callback.register('z-phone:server:PayInvoice', function(source, body)
    local Player = xCore.GetPlayerBySource(source)
    if Player == nil then 
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Wallet",
            message = "Failed to pay bill"
        })
        return false
    end

    if Player.money.bank < body.amount then 
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Wallet",
            message = "Balance is not enough"
        })
        return false
    end
    
    local citizenid = Player.citizenid
    local invoice = xCore.bankInvoiceByCitizenID(body.id, citizenid)

    if not invoice then 
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Wallet",
            message = "Failed to pay bill"
        })
        return false
    end

    Player.removeAccountMoney('bank', invoice.amount, invoice.reason)
    
    xCore.AddMoneyBankSociety(invoice.society, invoice.amount, invoice.reason)
    xCore.deleteBankInvoiceByID(invoice.id)
    
    TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
        type = "Notification",
        from = "Wallet",
        message = "Success pay bill"
    })
    return true
end)

lib.callback.register('z-phone:server:TransferCheck', function(source, body)
    local Player = xCore.GetPlayerBySource(source)
    if Player == nil then 
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

    local citizenid = Player.citizenid
    local queryGetCitizenByIban = "select citizenid from zp_users where iban = ?"
    local receiverCitizenid = MySQL.scalar.await(queryGetCitizenByIban, {
        body.iban
    })

    if not receiverCitizenid then
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

    if receiverCitizenid == citizenid then
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

    local ReceiverPlayer = xCore.GetPlayerByIdentifier(receiverCitizenid)
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
        name = ReceiverPlayer.charinfo.firstname .. ' '.. ReceiverPlayer.charinfo.lastname
    }
end)

lib.callback.register('z-phone:server:Transfer', function(source, body)
    local Player = xCore.GetPlayerBySource(source)
    if Player == nil then 
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Wallet",
            message = "Failed to check receiver!"
        })
        return false
    end

    local citizenid = Player.citizenid

    if Player.money.bank < body.total then 
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Wallet",
            message = "Balance is not enough"
        })
        return false
    end
    
    local queryGetCitizenByIban = "select citizenid from zp_users where iban = ?"
    local receiverCitizenid = MySQL.scalar.await(queryGetCitizenByIban, {
        body.iban
    })

    if not receiverCitizenid then
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Wallet",
            message = "IBAN not registered!"
        })
        return false
    end

    if receiverCitizenid == citizenid then
        TriggerClientEvent("z-phone:client:sendNotifInternal", source, {
            type = "Notification",
            from = "Wallet",
            message = "Cannot transfer to your self!"
        })
        return false
    end

    local ReceiverPlayer = xCore.GetPlayerByIdentifier(receiverCitizenid)
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
    Player.removeAccountMoney('bank', body.total, senderReason)
    ReceiverPlayer.addAccountMoney('bank', body.total, receiverReason)

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
    MySQL.Async.insert('INSERT INTO zp_emails (institution, citizenid, subject, content) VALUES (?, ?, ?, ?)', {
        "wallet",
        Player.citizenid,
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