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
  MENU_CAMERA,
  CLOSE_CALL,
  MENU_START_CALL_NOTIFICATION,
  MENU_INCALL,
  MENU_INTERNET_DATA,
} from "./constant/menu";
import DynamicComponent from "./components/DynamicComponent";
import { faker } from "@faker-js/faker";
import axios from "axios";
import { FaBell } from "react-icons/fa6";
import { MdCall } from "react-icons/md";

function App() {
  const {
    notificationMessage,
    menu,
    time,
    profile,
    chatting,
    resolution,
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
    setProfile,
    setContactRequests,
    setResolution,
    setInetMax,
  } = useContext(MenuContext);
  const [isOpen, setIsOpen] = useState(false);
  const [outsideMessageNotif, setOutsideMessageNotif] = useState({
    from: null,
    message: null,
  });
  const [outsideCallNotif, setOutsideCallNotif] = useState({
    from: null,
    message: null,
  });

  function generateDimensions(height) {
    const initWidthAndHeight = {
      initWidth: resolution.frameWidth,
      initHeight: resolution.frameHeight,
    };

    const aspectRatio =
      initWidthAndHeight.initHeight / initWidthAndHeight.initWidth;
    const newWidth = height / aspectRatio;
    const newRadius = height * 0.066;
    const newMargin = height * 0.033;
    let newScale = (height / initWidthAndHeight.initHeight) * resolution.scale;

    return {
      frameWidth: newWidth,
      frameHeight: height,
      layoutWidth: newWidth - newMargin,
      layoutHeight: height - newMargin,
      radius: newRadius,
      scale: newScale,
    };
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/get-profile");
        setProfile(response.data);
        setResolution(generateDimensions(response.data.phone_height));
      } catch (err) {
        setProfile({});
      }
    };

    if (isOpen) {
      fetchData();

      if (outsideCallNotif.message != null) {
        outsideCallNotif.type = MENU_INCOMING_CALL_NOTIFICATION;
        setNotificationCall(outsideCallNotif);
      }

      setOutsideMessageNotif({
        from: null,
        avatar: null,
        message: null,
      });
      setOutsideCallNotif({
        from: null,
        avatar: null,
        message: null,
      });
    }
  }, [isOpen]);

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
        getContactRequest();
        break;
      case MENU_NEWS:
        getNews();
        break;
      case MENU_LOVY:
        getLovys();
        break;
      case MENU_CAMERA:
        takePhoto();
        break;
      case MENU_INTERNET_DATA:
        getInternetData();
        break;
      default:
        return;
    }
  }, [menu]);

  const getContacts = async () => {
    // const data = Array.from({ length: 50 }, (v, i) => ({
    //   name: faker.person.fullName(),
    //   phone: faker.phone.number(),
    //   add_at: faker.date.past().toDateString(),
    //   avatar: faker.image.urlLoremFlickr({ height: 250, width: 250 }),
    // }));

    // console.log(JSON.stringify(data));
    // sendEventData({ contacts: data });

    let result = [];
    try {
      const response = await axios.post("/get-contacts");
      result = response.data;
    } catch (error) {
      console.error("error /get-contacts", error);
    }

    setContacts(result ? result : []);
    setContactsBk(result ? result : []);
  };

  const getChats = async () => {
    // const chats = Array.from({ length: 3 }, (v, i) => ({
    //   time: `${String(faker.date.past().getHours()).padStart(2, "0")}:${String(
    //     faker.date.past().getMinutes()
    //   ).padStart(2, "0")}`,
    //   message: faker.lorem.sentence(),
    //   isMe: Math.random() < 0.5 ? true : false,
    // }));

    // const data = Array.from({ length: 25 }, (v, i) => ({
    //   avatar: faker.image.avatar(),
    //   conversation_name: faker.person.fullName(),
    //   last_message_time: `${String(faker.date.past().getHours()).padStart(
    //     2,
    //     "0"
    //   )}:${String(faker.date.past().getMinutes()).padStart(2, "0")}`,
    //   last_message: faker.lorem.paragraphs(),
    //   last_seen: "18:00",
    //   isRead: Math.random() < 0.5,
    // }));

    // console.log(JSON.stringify(data));

    // data[1].phone = "085123123";
    // sendEventData({ chats: userChats });
    let result = [];
    try {
      const response = await axios.post("/get-chats");
      result = response.data;
    } catch (error) {
      console.error("error /get-chats", error);
    }

    setChats(result ? result : []);
    setChatsBk(result ? result : []);
  };

  const getChatting = async () => {
    // const chats = Array.from({ length: 3 }, (v, i) => ({
    //   time: `${String(faker.date.past().getHours()).padStart(2, "0")}:${String(
    //     faker.date.past().getMinutes()
    //   ).padStart(2, "0")}`,
    //   message: faker.lorem.sentence(),
    //   sender_citizenid: Math.random() < 0.5 ? "XXX123" : "333123",
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

    try {
      const response = await axios.post("/get-chatting", {
        conversationid: chatting.conversationid,
      });

      setChatting((prev) => ({
        ...prev,
        chats: response.data,
      }));
    } catch (err) {
      setChatting((prev) => ({
        ...prev,
        chats: [],
      }));
    }
  };

  const getEmails = async () => {
    // const data = Array.from({ length: 25 }, (v, i) => ({
    //   avatar: faker.image.avatar(),
    //   name: faker.person.fullName(),
    //   created_at: `${String(faker.date.past().getHours()).padStart(2, "0")}:${String(
    //     faker.date.past().getMinutes()
    //   ).padStart(2, "0")}`,
    //   subject: faker.lorem.sentence(),
    //   content: faker.lorem.paragraphs(),
    //   isRead: Math.random() < 0.5,
    // }));

    // console.log(JSON.stringify(data));
    // sendEventData({ emails: data });

    let result = [];
    try {
      const response = await axios.post("/get-emails");
      result = response.data;
    } catch (error) {
      console.error("error /get-emails", error);
    }

    setEmails(result ? result : []);
    setEmailsBk(result ? result : []);
  };

  const getAds = async () => {
    // const data = Array.from({ length: 25 }, (v, i) => ({
    //   avatar: faker.image.avatar(),
    //   name: faker.person.fullName(),
    //   phone_number: faker.person.fullName(),
    //   time: `${String(faker.date.past().getHours()).padStart(2, "0")}:${String(
    //     faker.date.past().getMinutes()
    //   ).padStart(2, "0")}`,
    //   media:
    //     Math.random() < 0.4
    //       ? faker.image.urlLoremFlickr({ height: 250, width: 444 })
    //       : "",
    //   content: faker.lorem.paragraphs(),
    // }));

    let result = [];
    try {
      const response = await axios.post("/get-ads");
      result = response.data;
    } catch (error) {
      console.error("error /get-ads", error);
    }

    setAds(result);
    // sendEventData({ ads: data });
  };

  const getGarages = async () => {
    // const data = Array.from({ length: 25 }, (v, i) => ({
    //   name: faker.person.fullName(),
    //   image: faker.image.urlLoremFlickr({ height: 250, width: 444 }),
    //   model: faker.vehicle.manufacturer(),
    //   brand: faker.vehicle.type(),
    //   type: faker.vehicle.type(),
    //   category: faker.vehicle.type(),
    //   plate: faker.string.alphanumeric(8).toUpperCase(),
    //   garage: faker.location.city(),
    //   status: faker.number.int(3),
    //   fuel: faker.number.int(100),
    //   engine: faker.number.int(100),
    //   body: faker.number.int(100),
    //   created_at: faker.date.past({ years: 2 }).toDateString(),
    // }));

    // console.log(JSON.stringify(data));
    // sendEventData({ garages: data });

    let result = [];
    try {
      const response = await axios.post("/get-garages");
      result = response.data;
    } catch (error) {
      console.error("error /get-garages", error);
    }

    setGaragesBk(result);
    setGarages(result);
  };

  const getGallery = async () => {
    // const data = Array.from({ length: 25 }, (v, i) => ({
    //   photo: faker.image.avatar(),
    //   created_at: faker.date.past({ years: 2 }).toDateString(),
    // }));

    // sendEventData({ photos: data });
    let result = [];
    try {
      const response = await axios.post("/get-photos");
      result = response.data;
    } catch (error) {
      console.error("error /get-photos", error);
    }

    setPhotos(result);
  };

  const getTweets = async () => {
    // const comments = Array.from({ length: 25 }, (v, i) => ({
    //   comment:
    //     Math.random() < 0.5 ? faker.lorem.paragraphs() : faker.lorem.word(),
    //   name: faker.person.fullName(),
    //   photo: faker.image.urlLoremFlickr({ height: 250, width: 250 }),
    //   username: `@${faker.person.fullName().split(" ")[0].toLowerCase()}`,
    //   created_at: faker.date.past({ years: 2 }).toDateString(),
    // }));

    // const data = Array.from({ length: 25 }, (v, i) => ({
    //   tweet:
    //     Math.random() < 0.5 ? faker.lorem.paragraphs() : faker.lorem.word(),
    //   avatar:
    //     Math.random() < 0.5
    //       ? faker.image.urlLoremFlickr({ height: 250, width: 250 })
    //       : "",
    //   media:
    //     Math.random() < 0.5
    //       ? faker.image.urlLoremFlickr({ height: 250, width: 444 })
    //       : "",
    //   name: faker.person.fullName(),
    //   username: `@${faker.person.fullName().split(" ")[0].toLowerCase()}`,
    //   created_at: faker.date.past({ years: 2 }).toDateString(),
    //   repost: 10,
    //   comment: 10,
    // }));

    // console.log(JSON.stringify(data));
    // console.log(JSON.stringify(comments));
    // sendEventData({ tweets: data });

    let result = [];
    try {
      const response = await axios.post("/get-tweets");
      result = response.data;
    } catch (error) {
      console.error("error /get-tweets", error);
    }

    setTweets(result);
  };

  const getCallHistories = async () => {
    // const data = Array.from({ length: 25 }, (v, i) => ({
    //   from: faker.phone.number(),
    //   avatar: faker.image.avatar(),
    //   created_at: faker.date.past({ years: 2 }).toDateString(),
    // }));

    // sendEventData({ callHistories: data });

    let result = [];
    try {
      const response = await axios.post("/get-call-histories");
      result = response.data;
    } catch (error) {
      console.error("error /get-call-histories", error);
    }

    setCallHistories(result);
  };

  const getContactRequest = async () => {
    // const data = Array.from({ length: 50 }, (v, i) => ({
    //   name: faker.person.fullName(),
    //   phone: faker.phone.number(),
    //   request_at: faker.date.past().toDateString(),
    //   avatar: faker.image.urlLoremFlickr({ height: 250, width: 250 }),
    // }));
    // sendEventData({ contactRequest: data });

    let result = [];
    try {
      const response = await axios.post("/get-contact-requests");
      result = response.data;
    } catch (error) {
      console.error("error /get-contact-requests", error);
    }

    setContactRequests(result);
  };

  const getNews = async () => {
    // const data = Array.from({ length: 25 }, (v, i) => ({
    //   reporter: faker.person.fullName(),
    //   company: faker.company.name(),
    //   image: faker.image.urlLoremFlickr({ height: 250, width: 444 }),
    //   title: faker.lorem.paragraph(),
    //   body: faker.lorem.paragraphs(),
    //   created_at: faker.date.past({ years: 2 }).toDateString(),
    // }));

    // const streams = Array.from({ length: 25 }, (v, i) => ({
    //   reporter: faker.person.fullName(),
    //   company: faker.company.name(),
    //   image: faker.image.urlLoremFlickr({ height: 250, width: 444 }),
    //   // url: "https://www.youtube.com/watch?v=tMy6_XFpjeQ",
    //   stream: "https://www.youtube.com/watch?v=XNfvHbUs66c",
    //   title: faker.lorem.paragraph(),
    //   created_at: faker.date.past({ years: 2 }).toDateString(),
    // }));

    // sendEventData({ news: data, newsStreams: streams });

    let result = [];
    try {
      const response = await axios.post("/get-news");
      result = response.data;
    } catch (error) {
      console.error("error /get-news", error);
    }

    setNews(result.news ? result.news : []);
    setNewsStreams(result.streams ? result.streams : []);
  };

  const getBank = async () => {
    // const histories = Array.from({ length: 25 }, (v, i) => ({
    //   type: Math.random() < 0.5 ? "Debit" : "Credit",
    //   label: faker.lorem.sentence(),
    //   total: faker.string.numeric(5),
    //   created_at: faker.date.past({ years: 2 }).toDateString(),
    // }));

    // const bills = Array.from({ length: 25 }, (v, i) => ({
    //   type: Math.random() < 0.5 ? "Ambulance" : "Police",
    //   label: faker.lorem.sentence(),
    //   total: faker.string.numeric(5),
    //   created_at: faker.date.past({ years: 2 }).toDateString(),
    // }));

    // const balance = faker.string.numeric(6);

    // console.log(
    //   JSON.stringify({
    //     histories,
    //     bills,
    //     balance,
    //   })
    // );

    // sendEventData({
    //   bank: {
    //     histories,
    //     bills,
    //     balance,
    //   },
    // });
    let result = [];
    try {
      const response = await axios.post("/get-bank");
      result = response.data;
    } catch (error) {
      console.error("error /get-bank", error);
    }

    setBank(result);
  };

  const getHouses = async () => {
    // const data = Array.from({ length: 25 }, (v, i) => ({
    //   name: faker.address.streetName(),
    //   tier: `Tier ${faker.string.numeric(1)}`,
    //   image: faker.image.urlLoremFlickr({ height: 250, width: 444 }),
    //   keyholders: [
    //     faker.string.alphanumeric(8).toLocaleUpperCase(),
    //     faker.string.alphanumeric(8).toLocaleUpperCase(),
    //     faker.string.alphanumeric(8).toLocaleUpperCase(),
    //     faker.string.alphanumeric(8).toLocaleUpperCase(),
    //     faker.string.alphanumeric(8).toLocaleUpperCase(),
    //   ],
    //   is_has_garage: Math.random() > 0.5 ? true : false,
    //   is_house_locked: Math.random() > 0.5 ? true : false,
    //   is_garage_locked: Math.random() > 0.5 ? true : false,
    //   is_stash_locked: Math.random() > 0.5 ? true : false,
    // }));
    // console.log(JSON.stringify(data));
    // sendEventData({ houses: data });

    let result = [];
    try {
      const response = await axios.post("/get-houses");
      result = response.data;
    } catch (error) {
      console.error("error /get-houses", error);
    }

    setHouses(result);
  };

  const getServices = async () => {
    // const data = Array.from({ length: 25 }, (v, i) => ({
    //   logo: faker.image.avatar(),
    //   service: faker.company.name(),
    //   onduty: faker.string.numeric(2),
    // }));
    // console.log(JSON.stringify(data));
    // sendEventData({ services: data });

    let result = [];
    try {
      const response = await axios.post("/get-services");
      result = response.data;
    } catch (error) {
      console.error("error /get-services", error);
    }

    setServices(result);
  };

  const getInternetData = async () => {
    let result = [];
    try {
      const response = await axios.post("/get-internet-data");
      result = response.data;
    } catch (error) {
      console.error("error /get-internet-data", error);
    }

    setInetMax(result);
  };

  const takePhoto = async () => {
    // console.log("take photo");
    // setMenu(menu_);
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

  const sendCallClose = () => {
    sendEventData({
      closeCall: {
        type: CLOSE_CALL,
      },
    });
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

  const sendStartCallNotification = () => {
    sendEventData({
      notification: {
        type: MENU_START_CALL_NOTIFICATION,
        to: faker.phone.number(),
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

  const sendOutsideNewMessage = () => {
    sendEventData({
      outsideMessageNotif: {
        from: "Alfaben",
        message: "New Message!",
      },
    });
  };

  const sendOutsideIncomingCall = () => {
    sendEventData({
      outsideCallNotif: {
        from: "Alfaben",
        message: "Incoming call",
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
    // setMenu(MENU_INTERNET_DATA);
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

    if (data.closeCall) {
      setOutsideCallNotif({
        from: null,
        avatar: null,
        message: null,
      });
      setNotificationCall({ type: "" });
    } else {
      if (data.notification) {
        if (data.notification.type == MENU_NEW_MESSAGE_NOTIFICATION) {
          setNotificationMessage(data.notification);
        }

        if (data.notification.type == MENU_INCOMING_CALL_NOTIFICATION) {
          setNotificationCall(data.notification);
        }

        if (data.notification.type == MENU_INCALL) {
          setNotificationCall(data.notification);
        }

        if (data.notification.type == MENU_START_CALL_NOTIFICATION) {
          setNotificationCall(data.notification);
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
      } else if (data.outsideMessageNotif) {
        setOutsideMessageNotif(data.outsideMessageNotif);
      } else if (data.outsideCallNotif) {
        setOutsideCallNotif(data.outsideCallNotif);
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
        setContactRequests(data.contactRequests ? data.contactRequests : []);
        setNews(data.news ? data.news : []);
        setNewsStreams(data.newsStreams ? data.newsStreams : []);
        setLovys(data.lovys ? data.lovys : []);
        setInetMax(
          data.inetMax
            ? data.inetMax
            : {
                balance: 0,
                group_usage: [],
                topup_histories: [],
                usage_histories: [],
              }
        );
      }
    }
  };

  const handleEsc = async (event) => {
    if (event.key === "Escape") {
      hide();
      await axios.post("/close");
    }
  };

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

    // openPhone(true);
    getConfigFromDefaultConfig();
    setNotificationInternal({ type: "" });
    setNotificationMessage({ type: "" });
    setNotificationCall({ type: "" });
    setNotificationNews({ type: "" });

    window.addEventListener("message", handleEventPhone);
    window.addEventListener("message", handleOpenPhone);
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("message", handleEventPhone);
      window.removeEventListener("message", handleOpenPhone);
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // LISTEN NEW MESSAGE
  useEffect(() => {
    if (
      notificationMessage?.type == MENU_NEW_MESSAGE_NOTIFICATION &&
      chatting?.conversation_name == notificationMessage.from
    ) {
      const newMessage = {
        time: "just now",
        message: notificationMessage.message,
        media: notificationMessage.media,
        sender_citizenid: notificationMessage.from_citizenid,
      };

      setChatting((prevChatting) => ({
        ...prevChatting,
        chats: [...prevChatting.chats, newMessage],
      }));
    }
  }, [notificationMessage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOutsideMessageNotif({
        from: null,
        message: null,
      });
    }, 5000);

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, [outsideMessageNotif]);

  function generateDimensions(height) {
    const initWidthAndHeight = {
      initWidth: resolution.frameWidth,
      initHeight: resolution.frameHeight,
    };

    const aspectRatio =
      initWidthAndHeight.initHeight / initWidthAndHeight.initWidth;
    const newWidth = height / aspectRatio;
    const newRadius = height * 0.066;
    const newMargin = height * 0.033;
    let newScale = (height / initWidthAndHeight.initHeight) * resolution.scale;

    return {
      frameWidth: newWidth,
      frameHeight: height,
      layoutWidth: newWidth - newMargin,
      layoutHeight: height - newMargin,
      radius: newRadius,
      scale: newScale,
    };
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className="font-normal">
      {/* <div className="flex-col space-y-2">
        <button
          className="bg-blue-500"
          onClick={() => {
            const height = generateDimensions(getRandomNumber(500, 720));
            setResolution(height);
          }}
        >
          Change Ratio
        </button>
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
            onClick={() => sendStartCallNotification()}
          >
            Start Call
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
        <div>
          <button
            className={`${
              isOpen ? "bg-blue-500" : "bg-red-500"
            } px-5 py-2 rounded text-white`}
            onClick={() => sendOutsideNewMessage()}
          >
            Notification Message (X)
          </button>
        </div>
        <div>
          <button
            className={`${
              isOpen ? "bg-blue-500" : "bg-red-500"
            } px-5 py-2 rounded text-white`}
            onClick={() => sendOutsideIncomingCall()}
          >
            Notification CALL (X)
          </button>
        </div>
        <div>
          <button
            className={`${
              isOpen ? "bg-blue-500" : "bg-red-500"
            } px-5 py-2 rounded text-white`}
            onClick={() => sendCallClose()}
          >
            Close CALL (X)
          </button>
        </div>
      </div> */}
      {outsideMessageNotif.message != null && !isOpen ? (
        <>
          <div className="animate-fadeIn absolute bottom-10 right-5">
            <div className="bg-green-600 rounded-lg px-3 py-2">
              <div className="flex space-x-2 items-center">
                <div className="text-lg text-white">
                  <FaBell />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-white">
                    {outsideMessageNotif.message}
                  </span>
                  <div className="flex space-x-1 text-white">
                    <span className="text-sm">From</span>
                    <span className="text-sm font-semibold">
                      {outsideMessageNotif.from}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {outsideCallNotif.message != null && !isOpen ? (
        <>
          <div className=" absolute bottom-10 right-5">
            <div className="bg-green-600 rounded-lg px-3 py-2">
              <div className="flex space-x-2 items-center">
                <div className="text-lg text-white">
                  <MdCall />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-white">
                    {outsideCallNotif.message}
                  </span>
                  <div className="flex space-x-1 text-white">
                    <span className="text-sm">From</span>
                    <span className="text-sm font-semibold">
                      {outsideCallNotif.from}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <div id="z-phone-root-frame" className="z-phone-invisible">
        {profile ? (
          <div
            className="absolute bottom-10 right-10"
            style={{
              height: `${resolution.frameHeight}px`,
              width: `${resolution.frameWidth}px`,
              // padding: 5,
            }}
          >
            <img
              src={`./frames/${profile ? profile.frame : "1.svg"}`}
              onError={(error) => {
                error.target.src = "./frames/1.svg";
              }}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div
                className={`relative overflow-hidden bg-black `}
                style={{
                  height: `${resolution.layoutHeight}px`,
                  width: `${resolution.layoutWidth}px`,
                  borderRadius: `${resolution.radius}px`,
                }}
              >
                <div
                  className={`absolute flex justify-between px-6 py-2 z-50`}
                  style={{
                    width: `${resolution.layoutWidth}px`,
                  }}
                >
                  <div className="absolute top-0 right-0 w-full flex justify-center">
                    <img
                      src={`./images/iphone-top.svg`}
                      className="pt-2 w-[70px] object cover"
                    />
                  </div>
                  <div className="flex items-center">
                    <div className="text-xs font-medium text-white">{time}</div>
                  </div>
                  <div className="flex items-center">
                    <div>
                      <img
                        src={`./images/signal/${Math.ceil(
                          profile.signal * 4
                        )}.svg`}
                        onError={(error) => {
                          error.target.src = "./images/signal/0.svg";
                        }}
                      />
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
        ) : null}
      </div>
    </div>
  );
}

export default App;
