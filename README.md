# Z-Phone

Welcome to **Z-Phone**, the open-source initiative that transforms the in-game mobile experience in FiveM by introducing a sleek, iPhone-inspired design that prioritizes simplicity and elegance.

## Objective

Our goal is to create a visually appealing and user-friendly phone interface that enhances the gameplay experience without overwhelming players. By focusing on essential features and an intuitive layout, we hope to make communication in the game more enjoyable and immersive.

## Inspiration

This project is inspired by **QBPhone** from **QBCore**, combining its core functionalities with a fresh aesthetic that appeals to modern users. Our redesign aims to modernize the user experience while retaining the familiar features players love.

## Dependencies

- **[ESX Core](https://github.com/esx-framework/esx_core "ESX Core")**: This project relies on the ESX framework for core functionalities.
- here was a dependency for qb_banking, you do not need esx_banking for this version.
- **[OX Lib](https://github.com/overextended/ox_lib "OX Lib")**: OX Lib is also required to ensure seamless integration with existing systems.
- **[OX Inventory](https://github.com/overextended/ox_inventory "OX Inventory")**: OX Inventory is also required for item handling.

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

#### (Required) **IMPORT SOUND**

Go to https://github.com/alfaben12/z-phone/tree/main/html/sounds copy all files then paste to resources/[standalone]/interact-sound/client/html/sounds

#### (Required) **IMPORT DATABASE**

Go to https://github.com/alfaben12/z-phone/blob/main/z-phone.sql import query to your database to add all table for support z-phone

#### (Required) **NEW COLUMN**

ALTER TABLE phone_invoices ADD reason varchar(255);
ALTER TABLE phone_invoices ADD created_at DATETIME DEFAULT CURRENT_TIMESTAMP;

This query included on z-phone.sql

## IMPORTANT NOTES

Here was note for changing the phone number, but in this version it generates a new phone number for each person

## BTW

I forgot where I downloaded this iPhone object, as far as I remember I downloaded it from forum.cfx.re, remind me if you know the author.

Please note that in V1.x.x, z-phone has not been optimized. If you want it optimized, that's fine and don't forget to make a pull request.

## DISCUSSION
https://discord.com/channels/1012753553418354748/1289265300457525269/1289265300457525269

## SUPPORT

Thank you for your support! [ko-fi](https://ko-fi.com/alfaben)
