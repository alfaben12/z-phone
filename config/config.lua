Config = {}

Config.Debug = false
Config.Core = "QBX" -- QB,ESX or QBX
Config.OpenPhone = 'M'
Config.RepeatTimeout = 3000
Config.CallRepeats = 5

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

Config.Services = {
    goverment = {
        job = "goverment",
        name = "Goverment",
        type = "General"
    },
    police = {
        job = "police",
        name = "Police",
        type = "General"
    },
    ambulance = {
        job = "ambulance",
        name = "Ambulance",
        type = "Health"
    },
    realestate = {
        job = "realestate",
        name = "Real Estate",
        type = "Property"
    },
    taxi = {
        job = "taxi",
        name = "Taxi",
        type = "Transport"
    },
    burgershot = {
        job = "burgershot",
        name = "Burger Shot",
        type = "Food"
    },
    kfc = {
        job = "kfc",
        name = "KFC",
        type = "Food"
    },
}