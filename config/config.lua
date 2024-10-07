ESX = exports["es_extended"]:getSharedObject()

Config = {}

Config.Debug = false
Config.OpenPhone = 'M'
Config.RepeatTimeout = 3000
Config.CallRepeats = 5

Config.Framework = { -- ALL OF THIS IS MADE FOR ESX CURRENTLY, EDIT IT FOR YOUR FRAMEWORK

    -- SHARED --
    AvailableServices =  { -- sorry leaving this, I dont know esx's services, I use my own
        "goverment",
        "police",
        "ambulance",
        "realestate",
        "kmmechanic",
        "taxi",
        "kmpedagang",
        "reporter",
    },

    -- CLIENT --
    GetJobs = function()
        return ESX.GetJobs();
    end,

    GetPlayerData = function()
        return ESX.GetPlayerData();
    end,

    -- SERVER --
    GetPlayerObject = function(source)
        -- This function gets a ESX player object from a server id. Returns nil for invalid players.
        return ESX.GetPlayerFromId;
    end,

    GetPlayerFromRockstar = function(identifier)
        -- This function returns the ESX player from the Rockstar identifier. Returns nil if no player is found.
        return ESX.GetPlayerFromIdentifier(identifier);
    end,

    GetCitizenId = function(Player)
        return Player.identifier or xPlayer.getIdentifier();
    end,

    GetBankMoney = function(Player)
        Player.getAccount('bank').money;
    end,

    RemoveBankMoney = function(Player, amount, reason)
        Player.removeAccountMoney('bank', amount, reason);
    end,

    AddBankMoney = function(Player, amount, reason)
        Player.addAccountMoney('bank', amount, reason);
    end,

    AddMoneyToSociety = function(society, amount)
        TriggerEvent('esx_addonaccount:getSharedAccount', invoice.society, function(account)
            account.addMoney(invoice.amount);
        end)
    end,

    
}

Config.App = {
    InetMax = {
        Name = "InetMax",
        IsUseInetMax = true,
        TopupRate = {
            InKB = 1000000, -- 1 GB
            Price = 100
        },
        InetMaxUsage = {
            -- IN KB
            MessageSend = math.random(10000, 15000),
            LoopsPostTweet = math.random(50000, 150000),
            LoopsPostComment = math.random(10000, 30000),
            AdsPost = math.random(50000, 150000),
            PhoneCall = math.random(300000, 800000),
            ServicesMessage = math.random(5000, 10000),
            BankCheckTransferReceiver = math.random(5000, 15000),
            BankTransfer = math.random(100000, 200000),
        },
        SocietySeller = "government"
    },
    Phone = {
        Name = "Phone"
    },
    Ads = {
        Name = "Ads"
    },
    Loops = {
        Name = "Loops"
    },
    Services = {
        Name = "Services"
    },
    Message = {
        Name = "Message"
    },
    Wallet = {
        Name = "Wallet"
    },
}

Config.MsgNotEnoughInternetData = "Your internet data not enough!"
Config.MsgSignalZone = "No Signal"

Config.Signal = {
    IsUse = false,
    DefaultSignalZones = "FULL_SIGNAL",
    Zones = {
        ["FULL_SIGNAL"] = {
            CenterCoords = vec3(49.58, -1560.84, 29.38),
            Radius = 3,
            ChanceSignal = 1 -- MAX = 1
        },
        ["0_SIGNAL_1"] = {
            CenterCoords = vec3(47.71, -1536.74, 29.29),
            Radius = 3,
            ChanceSignal = 0.0
        },
        ["1_SIGNAL_1"] = {
            CenterCoords = vec3(42.48, -1543.57, 29.27),
            Radius = 3,
            ChanceSignal = 0.25
        },
        ["2_SIGNAL_1"] = {
            CenterCoords = vec3(37.75, -1548.99, 29.28),
            Radius = 3,
            ChanceSignal = 0.5
        },
        ["3_SIGNAL_1"] = {
            CenterCoords = vec3(43.09, -1555.95, 29.28),
            Radius = 3,
            ChanceSignal = 0.75
        }
    }
}
