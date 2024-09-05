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
            where bs.citizenid = ?
        ]]

        local querybill = [[
            select
                pi.society as type,
                "-" as label,
                pi.amount as total,
                DATE_FORMAT(pi.created_at, '%y/%m/%d %H:%i') as created_at
            from phone_invoices as pi
            where pi.citizenid = ?
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