Config = {}

Config.OpenPhone = 'M'
Config.RepeatTimeout = 3000
Config.CallRepeats = 5

Config.App = {
    InetMax = {
        Name = "InetMax",
        InetMaxIsUse = true,
        TopupRate = {
            InKB = 1000000, -- 1 GB
            Price = 100
        },
        InetMaxUsage = {
            -- IN KB
            MessageSend = math.random(1000, 1500),
            LoopsPostTweet = math.random(3000, 5000),
            LoopsPostComment = math.random(1000, 3000),
            AdsPost = math.random(3000, 5000),
            PhoneCall = math.random(20000, 50000),
            ServicesMessage = math.random(500, 1000),
            BankCheckTransferReceiver = math.random(300, 500),
            BankTransfer = math.random(10000, 20000),
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