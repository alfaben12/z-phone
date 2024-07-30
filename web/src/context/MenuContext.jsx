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
  const [contacts, setContacts] = useState([]);
  const [contactsBk, setContactsBk] = useState([]);
  const [chats, setChats] = useState([]);
  const [chatsBk, setChatsBk] = useState([]);
  const [chattings, setChattings] = useState([]);

  return (
    <MenuContext.Provider
      value={{
        time,
        menu,
        setMenu,
        contacts,
        setContacts,
        contactsBk,
        setContactsBk,
        chats,
        setChats,
        chatsBk,
        setChatsBk,
        chattings,
        setChattings,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
