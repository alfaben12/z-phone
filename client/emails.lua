RegisterNUICallback('get-emails', function(_, cb)
    lib.callback('z-phone:server:GetEmails', false, function(emails)
        print("OKKK")
        for i, v in pairs(emails) do
            local job = QBCore.Shared.Jobs[v.institution]
            emails[i].avatar = 'https://raw.githubusercontent.com/alfaben12/kmrp-assets/main/logo/business/'.. v.institution ..'.png'
            emails[i].name = job.label
        end
        cb(emails)
    end)
end)