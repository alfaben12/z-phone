import React, { createContext, useState } from "react";
import { MENU_LOCKSCREEN } from "../constant/menu";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const date = new Date();

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  };

  const jakartaTime = date.toLocaleString("en-US", options);

  const [time, setTime] = useState(jakartaTime);
  const [menu, setMenu] = useState(MENU_LOCKSCREEN);
  const [notificationMessage, setNotificationMessage] = useState({
    type: null,
  });
  const [notificationCall, setNotificationCall] = useState({
    type: null,
  });
  const [notificationNews, setNotificationNews] = useState({
    type: null,
  });
  const [profile, setProfile] = useState({
    name: "Alfaben Doe",
    phone: "085123876",
    photo:
      "https://assetsio.gnwcdn.com/gta-online-rockstar-newswire-image-character-in-warehouse.jpg",
    // wallpaper:
    //   "https://i.ibb.co.com/DV7d6xF/i-Phone-15-Pro-Black-Titanium-wallpaper.jpg",
    wallpaper: "https://i.ibb.co.com/NtSprsq/bg.png",
    unread_message_service: 9,
    unread_message: 10,
  });
  const [contacts, setContacts] = useState([]);
  const [contactsBk, setContactsBk] = useState([]);
  const [chats, setChats] = useState([]);
  const [chatsBk, setChatsBk] = useState([]);
  const [chatting, setChatting] = useState({});
  const [emails, setEmails] = useState([]);
  const [emailsBk, setEmailsBk] = useState([]);
  const [email, setEmail] = useState(null);
  const [ads, setAds] = useState([]);
  const [garages, setGarages] = useState([]);
  const [garagesBk, setGaragesBk] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [bank, setBank] = useState(null);
  const [houses, setHouses] = useState([]);
  const [services, setServices] = useState([]);
  const [callHistories, setCallHistories] = useState([]);
  const [news, setNews] = useState([]);
  const [newsStreams, setNewsStreams] = useState([]);
  const [notificationInternal, setNotificationInternal] = useState({
    type: null,
  });

  return (
    <MenuContext.Provider
      value={{
        time,
        menu,
        setMenu,
        notificationMessage,
        setNotificationMessage,
        notificationCall,
        setNotificationCall,
        notificationNews,
        setNotificationNews,
        profile,
        setProfile,
        contacts,
        setContacts,
        contactsBk,
        setContactsBk,
        chats,
        setChats,
        chatsBk,
        setChatsBk,
        chatting,
        setChatting,
        emails,
        setEmails,
        emailsBk,
        setEmailsBk,
        email,
        setEmail,
        ads,
        setAds,
        garagesBk,
        setGaragesBk,
        garages,
        setGarages,
        photos,
        setPhotos,
        tweets,
        setTweets,
        bank,
        setBank,
        houses,
        setHouses,
        services,
        setServices,
        callHistories,
        setCallHistories,
        news,
        setNews,
        newsStreams,
        setNewsStreams,
        notificationInternal,
        setNotificationInternal,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
