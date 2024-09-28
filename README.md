# Z-Phone

Welcome to **Z-Phone**, the open-source initiative that transforms the in-game mobile experience in FiveM by introducing a sleek, iPhone-inspired design that prioritizes simplicity and elegance.

## Objective

Our goal is to create a visually appealing and user-friendly phone interface that enhances the gameplay experience without overwhelming players. By focusing on essential features and an intuitive layout, we hope to make communication in the game more enjoyable and immersive.

## Inspiration

This project is inspired by **QBPhone** from **QBCore**, combining its core functionalities with a fresh aesthetic that appeals to modern users. Our redesign aims to modernize the user experience while retaining the familiar features players love.

## Dependencies

- **[QB Core](https://github.com/qbcore-framework/qb-core "QB Core")**: This project relies on the QBCore framework for core functionalities.
- **[QB Banking](https://github.com/qbcore-framework/qb-banking "QB Banking")**: QB Banking is need for digital banking app.
- **[OX Lib](https://github.com/overextended/ox_lib "OX Lib")**: OX Lib is also required to ensure seamless integration with existing systems.

## Tech Stack

We are using the following technologies to build this project:

- **React.js**: For creating a dynamic and responsive user interface.
- **Tailwind CSS**: To style our components with a utility-first approach, ensuring a clean and modern design.

## Contributing

We welcome contributions from the community! Feel free to open issues, submit pull requests, or suggest features. Together, we can make the Z-Phone experience better for everyone.

## License

This project is licensed under the DWYWDBM License - see the [LICENSE](https://github.com/alfaben12/z-phone/blob/main/LICENSE) file for details.

---

Thank you for checking out Z-Phone! We hope you enjoy the new experience as much as we enjoyed creating it.

---

## Ready to Use???

#### (Optional) **BANK TRANSACTION**

If you want all bank transactions recorded, then do it
in **qb-core/server/player.lua**

**function self.Functions.AddMoney**

```lua
-- OTHERS CODE
if not self.Offline then
    -- OTHERS CODE
    if moneytype == 'bank' then
        MySQL.Async.insert('INSERT INTO bank_statements (citizenid, account_name, amount, reason, statement_type) VALUES (?, ?, ?, ?, ?)', {
            self.PlayerData.citizenid,
            'checking',
            amount,
            reason,
            'deposit'
        })
    end
    -- OTHERS CODE
end
```

**self.Functions.RemoveMoney**

```lua
-- OTHERS CODE
if not self.Offline then
    -- OTHERS CODE
   if moneytype == 'bank' then
        MySQL.Async.insert('INSERT INTO bank_statements (citizenid, account_name, amount, reason, statement_type) VALUES (?, ?, ?, ?, ?)', {
            self.PlayerData.citizenid,
            'checking',
            amount,
            reason,
            'withdraw'
        })
        TriggerClientEvent('qb-phone:client:RemoveBankMoney', self.PlayerData.source, amount)
    end
    -- OTHERS CODE
end
```

#### (Required) **IMPORT SOUND**

Go to https://github.com/alfaben12/z-phone/tree/main/html/sounds copy all files then paste to resources/[standalone]/interact-sound/client/html/sounds

#### (Required) **IMPORT DATABASE**

Go to https://github.com/alfaben12/z-phone/blob/main/z-phone.sql import query to your database to add all table for support z-phone

#### (Required) **NEW COLUMN**

ALTER TABLE phone_invoices ADD reason varchar(255);
ALTER TABLE phone_invoices ADD created_at DATETIME DEFAULT CURRENT_TIMESTAMP;

This query included on z-phone.sql

## IMPORTANT NOTES

Default phone number in QBCore may not be compatible with z-phone. If you use QBCore.Functions.GetPlayerByPhone(number) with a z-phone number, it is likely to return incorrect results. To avoid this issue, it's essential to synchronize the z-phone numbers with the QBCore character information (on table players, column charinfo, key phone).

## BTW

I forgot where I downloaded this iPhone object, as far as I remember I downloaded it from forum.cfx.re, remind me if you know the author.

Please note that in V1.x.x, z-phone has not been optimized. If you want it optimized, that's fine and don't forget to make a pull request.

## DISCUSSION
https://discord.com/channels/1012753553418354748/1289265300457525269/1289265300457525269

## SUPPORT

Thank you for your support! [ko-fi](https://ko-fi.com/alfaben)
