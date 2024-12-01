RegisterNUICallback('get-emails', function(_, cb)
    lib.callback('z-phone:server:GetEmails', false, function(emails)
        for i, v in pairs(emails) do
            local job = Config.Services[v.institution]
            emails[i].avatar = 'https://raw.githubusercontent.com/alfaben12/kmrp-assets/main/logo/business/'.. v.institution ..'.png'
            emails[i].name = job and job.label or v.institution:gsub("(%l)(%w*)", function(a,b) return string.upper(a)..b end)
        end
        cb(emails)
    end)
end)