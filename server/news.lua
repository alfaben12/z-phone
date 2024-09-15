local QBCore = exports['qb-core']:GetCoreObject()

lib.callback.register('z-phone:server:GetNews', function(source, body)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player ~= nil then
        local query = [[
            SELECT 
                id,
                reporter,
                company,
                image,
                title,
                body,
                stream,
                is_stream,
                DATE_FORMAT(created_at, '%d/%m/%y %H:%i') as created_at
            FROM zp_news WHERE is_stream = ? ORDER BY id DESC
        ]]
        local resultNews = MySQL.query.await(query, {false})
        local resultNewsStream = MySQL.query.await(query, {true})

        return {
            news = resultNews,
            streams = resultNewsStream,
        }
    end

    return {}
end)