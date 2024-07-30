import React from "react";
import { useContext, useEffect, useState } from "react";
import MenuContext from "./context/MenuContext";
import {
  MENU_CONTACT,
  MENU_DEFAULT,
  MENU_LOCKSCREEN,
  MENU_MESSAGE,
  MENU_MESSAGE_CHATTING,
  PHONE_FRAME_HEIGHT,
  PHONE_FRAME_WIDTH,
  PHONE_HEIGHT,
  PHONE_ROUNDED,
  PHONE_WIDTH,
} from "./constant/menu";
import DynamicComponent from "./components/DynamicComponent";
import { faker } from "@faker-js/faker";

function App() {
  const {
    menu,
    time,
    setMenu,
    setContacts,
    setContactsBk,
    setChats,
    setChatsBk,
    setChattings,
  } = useContext(MenuContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    switch (menu) {
      case MENU_CONTACT:
        getContacts();
        break;
      case MENU_MESSAGE:
        getChats();
        break;
      case MENU_MESSAGE_CHATTING:
        getChattings();
        break;
      default:
        return;
    }
  }, [menu]);

  const getContacts = () => {
    const data = Array.from({ length: 50 }, (v, i) => ({
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      add_at: faker.date.past().toDateString(),
    }));
    sendEventData({ contacts: data });
  };

  const getChats = () => {
    const data = Array.from({ length: 25 }, (v, i) => ({
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      time: `${String(faker.date.past().getHours()).padStart(2, "0")}:${String(
        faker.date.past().getMinutes()
      ).padStart(2, "0")}`,
      message: faker.lorem.paragraphs(),
      isRead: Math.random() < 0.5,
    }));
    sendEventData({ chats: data });
  };

  const getChattings = () => {
    const data = Array.from({ length: 300 }, (v, i) => ({
      time: `${String(faker.date.past().getHours()).padStart(2, "0")}:${String(
        faker.date.past().getMinutes()
      ).padStart(2, "0")}`,
      message: faker.lorem.sentence(),
      isMe: Math.random() < 0.5 ? true : false,
    }));
    sendEventData({ chattings: data });
  };

  const sendEventData = (data) => {
    const targetWindow = window;
    const targetOrigin = "*";

    const message = {
      event: "z-phone",
      ...data,
    };

    targetWindow.postMessage(message, targetOrigin);
  };

  const openPhone = (isOpen) => {
    const targetWindow = window;
    const targetOrigin = "*";

    const message = {
      event: "z-phone",
      isOpen: isOpen,
    };

    targetWindow.postMessage(message, targetOrigin);
  };

  function hide() {
    const container = document.getElementById("z-phone-root-frame");
    container.setAttribute("class", "z-phone-fadeout");
    setTimeout(function () {
      container.setAttribute("class", "z-phone-invisible");
    }, 300);
  }

  function show() {
    const container = document.getElementById("z-phone-root-frame");
    container.setAttribute("class", "z-phone-fadein");
    setTimeout(function () {
      container.setAttribute("class", "z-phone-visible");
    }, 300);
  }

  const handleOpenPhone = (event) => {
    let data = event.data;
    if (data.event !== "z-phone") {
      return;
    }

    if (data.isOpen === undefined) {
      return;
    }

    setMenu(MENU_LOCKSCREEN);
    setIsOpen(data.isOpen);
    switch (data.event) {
      case "z-phone":
        if (data.isOpen) {
          show();
        } else {
          hide();
        }
        break;
      default:
        hide();
    }
  };

  const handleEventPhone = (event) => {
    let data = event.data;
    if (data.event !== "z-phone") {
      return;
    }

    setContacts(data.contacts ? data.contacts : []);
    setContactsBk(data.contacts ? data.contacts : []);
    setChats(data.chats ? data.chats : []);
    setChatsBk(data.chats ? data.chats : []);
    setChattings(data.chattings ? data.chattings : []);
  };

  useEffect(() => {
    window.addEventListener("message", handleEventPhone);
    window.addEventListener("message", handleOpenPhone);
    return () => {
      window.removeEventListener("message", handleEventPhone);
      window.removeEventListener("message", handleOpenPhone);
    };
  }, []);

  return (
    <div>
      <div className="flex-col space-y-2">
        <button
          className={`${
            isOpen ? "bg-blue-500" : "bg-red-500"
          } px-5 py-2 rounded text-white`}
          onClick={() => openPhone(!isOpen)}
        >
          INIT DATA
        </button>
      </div>
      {/* <div id="z-phone-root-frame" className="z-phone-invisible"> */}
      <div id="z-phone-root-frame">
        <div
          className="absolute bottom-10 right-10"
          style={{
            height: `${PHONE_FRAME_HEIGHT}px`,
            width: `${PHONE_FRAME_WIDTH}px`,
            padding: 5,
          }}
        >
          <img
            src={`./images/iphone-15pro.png`}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div
              className={`relative overflow-hidden bg-black `}
              style={{
                height: `${PHONE_HEIGHT}px`,
                width: `${PHONE_WIDTH}px`,
                borderRadius: `${PHONE_ROUNDED}px`,
              }}
            >
              <div
                className={`absolute flex justify-between px-5 py-2 z-50`}
                style={{
                  width: `${PHONE_WIDTH}px`,
                }}
              >
                <div className="flex items-center">
                  <div className="text-xs font-semibold text-white">{time}</div>
                </div>
                <div className="flex items-center space-x-1">
                  <svg
                    width="16"
                    height="9"
                    viewBox="0 0 23 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M21.6245 0.59993H20.2828C19.5418 0.59993 18.9412 1.17916 18.9412 1.89368V13.1062C18.9412 13.8207 19.5418 14.3999 20.2828 14.3999H21.6245C22.3655 14.3999 22.9662 13.8207 22.9662 13.1062V1.89368C22.9662 1.17916 22.3655 0.59993 21.6245 0.59993ZM13.9691 3.61884H15.3108C16.0517 3.61884 16.6524 4.19807 16.6524 4.91258V13.1063C16.6524 13.8208 16.0517 14.4001 15.3108 14.4001H13.9691C13.2281 14.4001 12.6274 13.8208 12.6274 13.1063V4.91258C12.6274 4.19807 13.2281 3.61884 13.9691 3.61884ZM8.99703 6.63734H7.65536C6.91438 6.63734 6.31369 7.21657 6.31369 7.93109V13.1061C6.31369 13.8206 6.91438 14.3998 7.65536 14.3998H8.99703C9.73801 14.3998 10.3387 13.8206 10.3387 13.1061V7.93109C10.3387 7.21657 9.73801 6.63734 8.99703 6.63734ZM2.68333 9.2248H1.34167C0.600684 9.2248 0 9.80403 0 10.5185V13.106C0 13.8206 0.600684 14.3998 1.34167 14.3998H2.68333C3.42431 14.3998 4.025 13.8206 4.025 13.106V10.5185C4.025 9.80403 3.42431 9.2248 2.68333 9.2248Z"
                      fill="white"
                    />
                  </svg>
                  <span className="text-xs font-medium text-white">5G</span>
                  <svg
                    width="30"
                    height="12"
                    viewBox="0 0 33 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      opacity="0.4"
                      x="1.54116"
                      y="0.600009"
                      width="27.6"
                      height="13.8"
                      rx="4.025"
                      stroke="white"
                      strokeWidth="1.15"
                    />
                    <path
                      opacity="0.5"
                      d="M30.8661 5.20001V9.80001C31.7929 9.41042 32.3956 8.50411 32.3956 7.50001C32.3956 6.49591 31.7929 5.5896 30.8661 5.20001"
                      fill="white"
                    />
                    <rect
                      x="3.26614"
                      y="2.32501"
                      width="19.55"
                      height="10.35"
                      rx="2.3"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <DynamicComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
