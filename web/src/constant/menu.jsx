import config from "../../files/static/config.json";

export const MENU_LOCKSCREEN = config.APPS.MENU_LOCKSCREEN;
export const MENU_GARAGE = config.APPS.MENU_GARAGE;
export const MENU_EMAIL = config.APPS.MENU_EMAIL;
export const MENU_ADS = config.APPS.MENU_ADS;
export const MENU_BANK = config.APPS.MENU_BANK;
export const MENU_HOUSE = config.APPS.MENU_HOUSE;
export const MENU_SERVICE = config.APPS.MENU_SERVICE;
export const MENU_CAMERA = config.APPS.MENU_CAMERA;
export const MENU_GALLERY = config.APPS.MENU_GALLERY;
export const MENU_PHONE = config.APPS.MENU_PHONE;
export const MENU_MESSAGE = config.APPS.MENU_MESSAGE;
export const MENU_LOOPS = config.APPS.MENU_LOOPS;
export const MENU_SETTING = config.APPS.MENU_SETTING;
export const MENU_CONTACT = config.APPS.MENU_CONTACT;
export const MENU_DEFAULT = config.APPS.MENU_DEFAULT;
export const MENU_MESSAGE_CHATTING = config.APPS.MENU_MESSAGE_CHATTING;
export const MENU_EMAIL_DETAIL = config.APPS.MENU_EMAIL_DETAIL;
export const MENU_NEWS = config.APPS.MENU_NEWS;
export const MENU_INCOMING_CALL_NOTIFICATION =
  config.APPS.MENU_INCOMING_CALL_NOTIFICATION;
export const MENU_NEW_MESSAGE_NOTIFICATION =
  config.APPS.MENU_NEW_MESSAGE_NOTIFICATION;
export const MENU_INCALL = config.APPS.MENU_INCALL;
export const MENU_NEW_NEWS_NOTIFICATION =
  config.APPS.MENU_NEW_NEWS_NOTIFICATION;
export const MENU_INTERNAL_NOTIFICATION =
  config.APPS.MENU_INTERNAL_NOTIFICATION;
export const NAME = config.name;
export const LOGO = config.logo;

export const MENU_CONSTANT = [
  {
    icon: "./files/images/contact.svg",
    path: "/contact",
    label: MENU_CONTACT,
  },
  {
    icon: "./files/images/mail.svg",
    path: "/mail",
    label: MENU_EMAIL,
  },
  {
    icon: "./files/images/ads.svg",
    path: "/ads",
    label: MENU_ADS,
  },
  {
    icon: "./files/images/service.svg",
    path: "/service",
    label: MENU_SERVICE,
  },
  {
    icon: "./files/images/garage.svg",
    path: "/garage",
    label: MENU_GARAGE,
  },
  {
    icon: "./files/images/house.svg",
    path: "/house",
    label: MENU_HOUSE,
  },
  {
    icon: "./files/images/wallet.svg",
    path: "/wallet",
    label: MENU_BANK,
  },
  {
    icon: "./files/images/twitter.svg",
    path: "/twitter",
    label: MENU_LOOPS,
  },
  {
    icon: "./files/images/news.svg",
    path: "/news",
    label: MENU_NEWS,
  },
  {
    icon: "./files/images/gallery.svg",
    path: "/gallery",
    label: MENU_GALLERY,
  },
];

export const BOTTOM_MENU_CONSTANT = [
  {
    icon: "./files/images/phone.svg",
    path: "/phone",
    label: MENU_PHONE,
  },
  {
    icon: "./files/images/message.svg",
    path: "/message",
    label: MENU_MESSAGE,
  },
  {
    icon: "./files/images/camera.svg",
    path: "/camera",
    label: MENU_CAMERA,
  },
  {
    icon: "./files/images/setting.svg",
    path: "/setting",
    label: MENU_SETTING,
  },
];

export const PHONE_FRAME_HEIGHT = 600;
export const PHONE_FRAME_WIDTH = 300;
export const PHONE_HEIGHT = 600 - 28;
export const PHONE_WIDTH = 300 - 36;
export const PHONE_ROUNDED = 33;
