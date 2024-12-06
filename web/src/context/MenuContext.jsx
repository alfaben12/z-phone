import React, { createContext, useEffect, useState } from "react";
import { MENU_LOCKSCREEN, CFG_TIMEZONE } from "../constant/menu";

const MenuContext = createContext({
  time: "",
  menus: null,
  menu: MENU_LOCKSCREEN,
  resolution: {
    frameWidth: 300,
    frameHeight: 620,
    layoutWidth: 280,
    layoutHeight: 600,
    radius: 40,
    margin: 20,
    scale: 1,
  },
  notificationCall: {
    type: "",
  },
  notificationNews: {
    type: "",
  },
  notificationInternal: {
    type: "",
  },
  profile: {
    name: "",
    phone: "",
    avatar: "",
    // wallpaper:
    //   "https://i.ibb.co.com/DV7d6xF/i-Phone-15-Pro-Black-Titanium-wallpaper.jpg",
    wallpaper: "",
    unread_message_service: 0,
    unread_message: 0,
    username: "",
    is_anonim: true,
    is_donot_disturb: true,
    frame: "1.svg",
  },
  contacts: [],
  contactsBk: [],
  chats: [],
  chatsBk: [],
  chatting: {},
  emails: [],
  emailsBk: [],
  email: [],
  ads: [],
  garages: [],
  garagesBk: [],
  photos: [],
  tweets: [],
  bank: null,
  houses: [],
  services: {
    list: [],
    reports: [],
  },
  callHistories: [],
  contactRequests: [],
  news: [],
  newsStreams: [],
  lovys: [],
  inetMax: {
    balance: 0,
    group_usage: [],
    topup_histories: [],
    usage_histories: [],
  },
});

export const MenuProvider = ({ children }) => {
  const date = new Date();
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: CFG_TIMEZONE,
  };
  const jakartaTime = date.toLocaleString("en-US", options);
  const [resolution, setResolution] = useState({
    frameWidth: 300,
    frameHeight: 620,
    layoutWidth: 280,
    layoutHeight: 600,
    radius: 40,
    margin: 20,
    scale: 1,
  });
  const [time, setTime] = useState(jakartaTime);
  const [menus, setMenus] = useState(null);
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
  const [notificationInternal, setNotificationInternal] = useState({
    type: null,
  });
  const [profile, setProfile] = useState({
    // name: "Alfaben Doe",
    // citizenid: "XXX123",
    // phone: "085123876",
    // avatar:
    //   "https://assetsio.gnwcdn.com/gta-online-rockstar-newswire-image-character-in-warehouse.jpg",
    // wallpaper: "https://i.ibb.co.com/pftZvpY/peakpx-1.jpg",
    // unread_message_service: 9,
    // unread_message: 10,
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
  const [services, setServices] = useState({
    list: [],
    reports: [],
  });
  const [callHistories, setCallHistories] = useState([]);
  const [contactRequests, setContactRequests] = useState([]);
  const [news, setNews] = useState([]);
  const [newsStreams, setNewsStreams] = useState([]);
  const [lovys, setLovys] = useState([]);
  const [inetMax, setInetMax] = useState({});

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: CFG_TIMEZONE,
      };

      const formattedTime = date.toLocaleString("en-US", options);
      setTime(formattedTime);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <MenuContext.Provider
      value={{
        time,
        menus,
        setMenus,
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
        lovys,
        setLovys,
        contactRequests,
        setContactRequests,
        resolution,
        setResolution,
        inetMax,
        setInetMax,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
