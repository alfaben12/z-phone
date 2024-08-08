import config from "../../files/static/config.json";

export const MENU_LOCKSCREEN = config.apps.MENU_LOCKSCREEN;
export const MENU_GARAGE = config.apps.MENU_GARAGE;
export const MENU_EMAIL = config.apps.MENU_EMAIL;
export const MENU_ADS = config.apps.MENU_ADS;
export const MENU_BANK = config.apps.MENU_BANK;
export const MENU_HOUSE = config.apps.MENU_HOUSE;
export const MENU_SERVICE = config.apps.MENU_SERVICE;
export const MENU_CAMERA = config.apps.MENU_CAMERA;
export const MENU_GALLERY = config.apps.MENU_GALLERY;
export const MENU_RACE = config.apps.MENU_RACE;
export const MENU_PHONE = config.apps.MENU_PHONE;
export const MENU_MESSAGE = config.apps.MENU_MESSAGE;
export const MENU_X = config.apps.MENU_X;
export const MENU_SETTING = config.apps.MENU_SETTING;
export const MENU_CONTACT = config.apps.MENU_CONTACT;
export const MENU_DEFAULT = config.apps.MENU_DEFAULT;
export const MENU_MESSAGE_CHATTING = config.apps.MENU_MESSAGE_CHATTING;
export const MENU_EMAIL_DETAIL = config.apps.MENU_EMAIL_DETAIL;
export const MENU_NEWS = config.apps.MENU_NEWS;
export const MENU_INCOMING_CALL_NOTIFICATION =
  config.apps.MENU_INCOMING_CALL_NOTIFICATION;
export const MENU_NEW_MESSAGE_NOTIFICATION =
  config.apps.MENU_NEW_MESSAGE_NOTIFICATION;
export const MENU_INCALL = config.apps.MENU_INCALL;

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
    icon: "./files/images/x.svg",
    path: "/x",
    label: MENU_X,
  },
  {
    icon: "./files/images/gallery.svg",
    path: "/gallery",
    label: MENU_GALLERY,
  },
  {
    icon: "./files/images/news.svg",
    path: "/news",
    label: MENU_NEWS,
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
export const PHONE_HEIGHT = 600 - 30;
export const PHONE_WIDTH = 300 - 36;
export const PHONE_ROUNDED = 33;
