import React from "react";
import { useContext, useEffect, useState } from "react";
import MenuContext from "./context/MenuContext";
import {
  MENU_ADS,
  MENU_BANK,
  MENU_CONTACT,
  MENU_EMAIL,
  MENU_GALLERY,
  MENU_GARAGE,
  MENU_HOUSE,
  MENU_INCOMING_CALL_NOTIFICATION,
  MENU_INTERNAL_NOTIFICATION,
  MENU_LOCKSCREEN,
  MENU_MESSAGE,
  MENU_MESSAGE_CHATTING,
  MENU_NEWS,
  MENU_NEW_MESSAGE_NOTIFICATION,
  MENU_NEW_NEWS_NOTIFICATION,
  MENU_PHONE,
  MENU_SERVICE,
  MENU_LOOPS,
  MENU_LOVY,
  PHONE_FRAME_HEIGHT,
  PHONE_FRAME_WIDTH,
  PHONE_HEIGHT,
  PHONE_ROUNDED,
  PHONE_WIDTH,
} from "./constant/menu";
import DynamicComponent from "./components/DynamicComponent";
import { faker } from "@faker-js/faker";
import axios from "axios";

function App() {
  const {
    notificationMessage,
    menu,
    time,
    chatting,
    setMenu,
    setContacts,
    setContactsBk,
    setChats,
    setChatsBk,
    setChatting,
    setEmails,
    setEmailsBk,
    setEmail,
    setAds,
    setGarages,
    setGaragesBk,
    setPhotos,
    setTweets,
    setBank,
    setHouses,
    setServices,
    setNotificationMessage,
    setNotificationCall,
    setNotificationNews,
    setCallHistories,
    setNews,
    setNewsStreams,
    setNotificationInternal,
    setMenus,
    setLovys,
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
        getChatting();
        break;
      case MENU_EMAIL:
        getEmails();
        break;
      case MENU_ADS:
        getAds();
        break;
      case MENU_GARAGE:
        getGarages();
        break;
      case MENU_GALLERY:
        getGallery();
        break;
      case MENU_LOOPS:
        getTweets();
        break;
      case MENU_BANK:
        getBank();
        break;
      case MENU_HOUSE:
        getHouses();
        break;
      case MENU_SERVICE:
        getServices();
        break;
      case MENU_PHONE:
        getCallHistories();
        break;
      case MENU_NEWS:
        getNews();
        break;
      case MENU_LOVY:
        getLovys();
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
      photo: faker.image.urlLoremFlickr({ height: 250, width: 250 }),
    }));
    sendEventData({ contacts: data });
  };

  const getChats = () => {
    const chats = Array.from({ length: 3 }, (v, i) => ({
      time: `${String(faker.date.past().getHours()).padStart(2, "0")}:${String(
        faker.date.past().getMinutes()
      ).padStart(2, "0")}`,
      message: faker.lorem.sentence(),
      isMe: Math.random() < 0.5 ? true : false,
    }));

    const data = Array.from({ length: 25 }, (v, i) => ({
      photo: faker.image.avatar(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      last_message_time: `${String(faker.date.past().getHours()).padStart(
        2,
        "0"
      )}:${String(faker.date.past().getMinutes()).padStart(2, "0")}`,
      last_message: faker.lorem.paragraphs(),
      last_seen: "18:00",
      isRead: Math.random() < 0.5,
      chats: chats,
    }));

    data[1].phone = "085123123";
    sendEventData({ chats: data });
  };

  const getChatting = () => {
    // const chats = Array.from({ length: 3 }, (v, i) => ({
    //   time: `${String(faker.date.past().getHours()).padStart(2, "0")}:${String(
    //     faker.date.past().getMinutes()
    //   ).padStart(2, "0")}`,
    //   message: faker.lorem.sentence(),
    //   isMe: Math.random() < 0.5 ? true : false,
    // }));

    // sendEventData({
    //   chatting: {
    //     phone: faker.phone.number(),
    //     photo: faker.image.avatar(),
    //     name: faker.person.fullName(),
    //     last_seen: "18:00",
    //     chats: chats,
    //   },
    // });
    console.log("app");
  };

  const getEmails = () => {
    const data = Array.from({ length: 25 }, (v, i) => ({
      photo: faker.image.avatar(),
      name: faker.person.fullName(),
      time: `${String(faker.date.past().getHours()).padStart(2, "0")}:${String(
        faker.date.past().getMinutes()
      ).padStart(2, "0")}`,
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(),
      isRead: Math.random() < 0.5,
    }));
    sendEventData({ emails: data });
  };

  const getAds = () => {
    const data = Array.from({ length: 25 }, (v, i) => ({
      photo: faker.image.avatar(),
      name: faker.person.fullName(),
      phone: faker.person.fullName(),
      time: `${String(faker.date.past().getHours()).padStart(2, "0")}:${String(
        faker.date.past().getMinutes()
      ).padStart(2, "0")}`,
      image:
        Math.random() < 0.4
          ? faker.image.urlLoremFlickr({ height: 250, width: 444 })
          : "",
      body: faker.lorem.paragraphs(),
    }));
    sendEventData({ ads: data });
  };

  const getGarages = () => {
    const data = Array.from({ length: 25 }, (v, i) => ({
      name: faker.person.fullName(),
      image: faker.image.urlLoremFlickr({ height: 250, width: 444 }),
      model: faker.vehicle.manufacturer(),
      brand: faker.vehicle.type(),
      type: faker.vehicle.type(),
      category: faker.vehicle.type(),
      plate: faker.string.alphanumeric(8).toUpperCase(),
      garage: faker.location.city(),
      status: faker.number.int(3),
      fuel: faker.number.int(100),
      engine: faker.number.int(100),
      body: faker.number.int(100),
      created_at: faker.date.past({ years: 2 }).toDateString(),
    }));
    sendEventData({ garages: data });
  };

  const getGallery = () => {
    const data = Array.from({ length: 25 }, (v, i) => ({
      photo: faker.image.avatar(),
      created_at: faker.date.past({ years: 2 }).toDateString(),
    }));
    sendEventData({ photos: data });
  };

  const getTweets = () => {
    const comments = Array.from({ length: 25 }, (v, i) => ({
      comment:
        Math.random() < 0.5 ? faker.lorem.paragraphs() : faker.lorem.word(),
      name: faker.person.fullName(),
      photo: faker.image.urlLoremFlickr({ height: 250, width: 250 }),
      username: `@${faker.person.fullName().split(" ")[0].toLowerCase()}`,
      created_at: faker.date.past({ years: 2 }).toDateString(),
    }));

    const data = Array.from({ length: 25 }, (v, i) => ({
      tweet:
        Math.random() < 0.5 ? faker.lorem.paragraphs() : faker.lorem.word(),
      photo:
        Math.random() < 0.5
          ? faker.image.urlLoremFlickr({ height: 250, width: 250 })
          : "",
      image:
        Math.random() < 0.5
          ? faker.image.urlLoremFlickr({ height: 250, width: 444 })
          : "",
      name: faker.person.fullName(),
      username: `@${faker.person.fullName().split(" ")[0].toLowerCase()}`,
      created_at: faker.date.past({ years: 2 }).toDateString(),
      repost: 10,
      comments: comments,
    }));

    sendEventData({ tweets: data });
  };

  const getCallHistories = () => {
    const data = Array.from({ length: 25 }, (v, i) => ({
      from: faker.phone.number(),
      photo: faker.image.avatar(),
      created_at: faker.date.past({ years: 2 }).toDateString(),
    }));
    sendEventData({ callHistories: data });
  };

  const getNews = () => {
    const data = Array.from({ length: 25 }, (v, i) => ({
      reporter: faker.person.fullName(),
      company: faker.company.name(),
      image: faker.image.urlLoremFlickr({ height: 250, width: 444 }),
      title: faker.lorem.paragraph(),
      body: faker.lorem.paragraphs(),
      created_at: faker.date.past({ years: 2 }).toDateString(),
    }));

    const streams = Array.from({ length: 25 }, (v, i) => ({
      reporter: faker.person.fullName(),
      company: faker.company.name(),
      image: faker.image.urlLoremFlickr({ height: 250, width: 444 }),
      // url: "https://www.youtube.com/watch?v=tMy6_XFpjeQ",
      url: "https://www.youtube.com/watch?v=XNfvHbUs66c",
      title: faker.lorem.paragraph(),
      created_at: faker.date.past({ years: 2 }).toDateString(),
    }));

    sendEventData({ news: data, newsStreams: streams });
  };

  const getBank = () => {
    const histories = Array.from({ length: 25 }, (v, i) => ({
      type: Math.random() < 0.5 ? "Debit" : "Credit",
      label: faker.lorem.sentence(),
      total: faker.string.numeric(5),
      created_at: faker.date.past({ years: 2 }).toDateString(),
    }));

    const bills = Array.from({ length: 25 }, (v, i) => ({
      type: Math.random() < 0.5 ? "Ambulance" : "Police",
      label: faker.lorem.sentence(),
      total: faker.string.numeric(5),
      created_at: faker.date.past({ years: 2 }).toDateString(),
    }));

    const balance = faker.string.numeric(6);
    sendEventData({
      bank: {
        histories,
        bills,
        balance,
      },
    });
  };

  const getHouses = () => {
    const data = Array.from({ length: 25 }, (v, i) => ({
      name: faker.address.streetName(),
      tier: `Tier ${faker.string.numeric(1)}`,
      image: faker.image.urlLoremFlickr({ height: 250, width: 444 }),
      keyholders: [
        faker.string.alphanumeric(8).toLocaleUpperCase(),
        faker.string.alphanumeric(8).toLocaleUpperCase(),
        faker.string.alphanumeric(8).toLocaleUpperCase(),
        faker.string.alphanumeric(8).toLocaleUpperCase(),
        faker.string.alphanumeric(8).toLocaleUpperCase(),
      ],
      is_has_garage: Math.random() > 0.5 ? true : false,
      is_house_locked: Math.random() > 0.5 ? true : false,
      is_garage_locked: Math.random() > 0.5 ? true : false,
      is_stash_locked: Math.random() > 0.5 ? true : false,
    }));
    sendEventData({ houses: data });
  };

  const getServices = () => {
    const data = Array.from({ length: 25 }, (v, i) => ({
      logo: faker.image.avatar(),
      service: faker.company.name(),
      onduty: faker.string.numeric(2),
    }));
    sendEventData({ services: data });
  };

  const getLovys = () => {
    const data = Array.from({ length: 25 }, (v, i) => ({
      photo: faker.image.urlLoremFlickr({ height: 1080, width: 1920 }),
      name: faker.company.name(),
      age: faker.string.numeric(2),
      bio: faker.lorem.paragraph(),
      gender: Math.random() < 0.5 ? 1 : 0,
    }));
    sendEventData({ lovys: data });
  };

  const sendMessageNotification = () => {
    sendEventData({
      notification: {
        type: MENU_NEW_MESSAGE_NOTIFICATION,
        from: "085123123",
        message: faker.lorem.paragraph(),
      },
    });
  };

  const sendIncomingCallNotification = () => {
    sendEventData({
      notification: {
        type: MENU_INCOMING_CALL_NOTIFICATION,
        from: faker.phone.number(),
        photo: faker.image.avatar(),
      },
    });
  };

  const sendNewsNotification = () => {
    sendEventData({
      notification: {
        type: MENU_NEW_NEWS_NOTIFICATION,
        from: faker.company.name(),
      },
    });
  };

  const sendInternalNotification = () => {
    sendEventData({
      notification: {
        type: MENU_INTERNAL_NOTIFICATION,
        from: "Twitter",
      },
    });
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
    setIsOpen(false);
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

    if (data.notification) {
      if (data.notification.type == MENU_NEW_MESSAGE_NOTIFICATION) {
        setNotificationMessage(data.notification);
      }

      if (data.notification.type == MENU_INCOMING_CALL_NOTIFICATION) {
        setNotificationCall(data.notification);
      }

      if (data.notification.type == MENU_NEW_NEWS_NOTIFICATION) {
        setNotificationNews(data.notification);
      }

      if (data.notification.type == MENU_INTERNAL_NOTIFICATION) {
        setNotificationInternal(data.notification);
      }
    } else {
      setContacts(data.contacts ? data.contacts : []);
      setContactsBk(data.contacts ? data.contacts : []);
      setChats(data.chats ? data.chats : []);
      setChatsBk(data.chats ? data.chats : []);
      setChatting(data.chatting ? data.chatting : {});
      setEmails(data.emails ? data.emails : []);
      setEmailsBk(data.emails ? data.emails : []);
      setEmail({});
      setAds(data.ads ? data.ads : []);
      setGarages(data.garages ? data.garages : []);
      setGaragesBk(data.garages ? data.garages : []);
      setPhotos(data.photos ? data.photos : []);
      setTweets(data.tweets ? data.tweets : []);
      setBank(
        data.bank
          ? data.bank
          : {
              balance: 0,
              histories: [],
              bills: [],
            }
      );
      setHouses(data.houses ? data.houses : []);
      setServices(data.services ? data.services : []);
      setCallHistories(data.callHistories ? data.callHistories : []);
      setNews(data.news ? data.news : []);
      setNewsStreams(data.newsStreams ? data.newsStreams : []);
      setLovys(data.lovys ? data.lovys : []);
    }
  };

  const handleEsc = async (event) => {
    if (event.key === "Escape") {
      hide();
      await axios.post("/close");
    }
  };

  useEffect(() => {
    // hide();

    window.addEventListener("message", handleEventPhone);
    window.addEventListener("message", handleOpenPhone);
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("message", handleEventPhone);
      window.removeEventListener("message", handleOpenPhone);
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const localStorageKey = "zphone";
  const getConfigFromDefaultConfig = () => {
    fetch("static/config.json") // Adjust the path accordingly
      .then((response) => response.json())
      .then((data) => {
        setMenus(data);
        localStorage.setItem(localStorageKey, JSON.stringify(data));
      })
      .catch((error) => console.error("Error loading constants:", error));
  };

  useEffect(() => {
    // const storedConfig = localStorage.getItem(localStorageKey);
    // if (storedConfig) {
    //   try {
    //     const parsedConfig = JSON.parse(storedConfig);
    //     setMenus(parsedConfig);
    //     console.log("==" + JSON.stringify(parsedConfig));
    //   } catch (error) {
    //     getConfigFromDefaultConfig();
    //   }
    // } else {
    //   getConfigFromDefaultConfig();
    // }
    getConfigFromDefaultConfig();
    setNotificationInternal({ type: "" });
    setNotificationMessage({ type: "" });
    setNotificationCall({ type: "" });
    setNotificationNews({ type: "" });
  }, []);

  // LISTEN NEW MESSAGE
  useEffect(() => {
    console.log(chatting.phone);
    console.log(notificationMessage.from);
    if (
      notificationMessage?.type == MENU_NEW_MESSAGE_NOTIFICATION &&
      chatting?.phone == notificationMessage.from
    ) {
      const newMessage = {
        time: "08:15",
        message: faker.lorem.sentence(),
        isMe: false, // or false, depending on who sent the message
      };

      setChatting((prevChatting) => ({
        ...prevChatting,
        chats: [...prevChatting.chats, newMessage],
      }));
    }
  }, [notificationMessage]);

  return (
    <div className="font-normal">
      <div className="flex-col space-y-2">
        <div>
          <button
            className={`${
              isOpen ? "bg-blue-500" : "bg-red-500"
            } px-5 py-2 rounded text-white`}
            onClick={() => openPhone(!isOpen)}
          >
            INIT DATA
          </button>
        </div>
        <div>
          <button
            className={`${
              isOpen ? "bg-blue-500" : "bg-red-500"
            } px-5 py-2 rounded text-white`}
            onClick={() => sendMessageNotification()}
          >
            New Message
          </button>
        </div>
        <div>
          <button
            className={`${
              isOpen ? "bg-blue-500" : "bg-red-500"
            } px-5 py-2 rounded text-white`}
            onClick={() => sendIncomingCallNotification()}
          >
            New Incoming Call
          </button>
        </div>
        <div>
          <button
            className={`${
              isOpen ? "bg-blue-500" : "bg-red-500"
            } px-5 py-2 rounded text-white`}
            onClick={() => sendNewsNotification()}
          >
            New Reporter News
          </button>
        </div>
        <div>
          <button
            className={`${
              isOpen ? "bg-blue-500" : "bg-red-500"
            } px-5 py-2 rounded text-white`}
            onClick={() => sendInternalNotification()}
          >
            New Internal
          </button>
        </div>
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
                className={`absolute flex justify-between px-4 py-2 z-50`}
                style={{
                  width: `${PHONE_WIDTH}px`,
                }}
              >
                <div className="flex items-center">
                  <div className="text-xs font-medium text-white">{time}</div>
                </div>
                <div className="flex items-center">
                  <div>
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
                  </div>
                  <span className="text-xs font-medium text-white pl-1">
                    5G
                  </span>
                  <div>
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
