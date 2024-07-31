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
  const [notification, setNotification] = useState({
    type: null,
  });
  const [profile, setProfile] = useState({
    name: "Alfaben",
    phone: "085123876",
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

  return (
    <MenuContext.Provider
      value={{
        time,
        menu,
        setMenu,
        notification,
        setNotification,
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
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
