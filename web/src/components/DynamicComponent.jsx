import React, { useContext, useEffect } from "react";
import LayoutComponent from "./LayoutComponent";
import MenuContext from "../context/MenuContext";
import HomeComponent from "./HomeComponent";
import {
  MENU_ADS,
  MENU_BANK,
  MENU_CONTACT,
  MENU_CAMERA,
  MENU_DEFAULT,
  MENU_EMAIL,
  MENU_EMAIL_DETAIL,
  MENU_GALLERY,
  MENU_GARAGE,
  MENU_HOUSE,
  MENU_INCOMING_CALL_NOTIFICATION,
  MENU_LOCKSCREEN,
  MENU_MESSAGE,
  MENU_MESSAGE_CHATTING,
  MENU_NEW_MESSAGE_NOTIFICATION,
  MENU_PHONE,
  MENU_SERVICE,
  MENU_SETTING,
  MENU_LOOPS,
  MENU_INCALL,
  MENU_NEWS,
  MENU_NEW_NEWS_NOTIFICATION,
  MENU_INTERNAL_NOTIFICATION,
  MENU_START_CALL_NOTIFICATION,
} from "../constant/menu";
import MessageComponent from "./MessageComponent";
import MessageChattingComponent from "./MessageChattingComponent";
import ContactComponent from "./ContactComponent";
import PhoneComponent from "./PhoneComponent";
import EmailComponent from "./EmailComponent";
import EmailDetailComponent from "./EmailDetailComponent";
import AdsComponent from "./AdsComponent";
import ServicesComponent from "./ServicesComponent";
import BankComponent from "./BankComponent";
import GarageComponent from "./GarageComponent";
import GalleryComponent from "./GalleryComponent";
import LockScreenComponent from "./LockScreenComponent";
import SettingComponent from "./SettingComponent";
import HouseComponent from "./HouseComponent";
import IncomingCallNotificationComponent from "./notif/IncomingCallNotificationComponent";
import NewMessageNotificationComponent from "./notif/NewMessageNotificationComponent";
import InCallComponent from "./notif/InCallComponent";
import NewsComponent from "./NewsComponent";
import NewNewsNotificationComponent from "./notif/NewNewsNotificationComponent";
import InternalNotificationComponent from "./notif/InternalNotificationComponent";
import LoadingComponent from "./LoadingComponent";
import LovyComponent from "./LovyComponent";
import PlayTVComponent from "./PlayTVComponent";
import CameraComponent from "./CameraComponent";
import LoopsComponent from "./loops/LoopsComponent";
import StartCallNotificationComponent from "./notif/StartCallNotificationComponent";
import InetMaxComponent from "./inetmax/InetMaxComponent";

const DynamicComponent = () => {
  const {
    menus,
    menu,
    notificationInternal,
    notificationMessage,
    notificationCall,
    notificationNews,
  } = useContext(MenuContext);

  function isNullOrUndefined(value) {
    return value === menus.APPS.null || value === menus.APPS.undefined;
  }
  return (
    <LayoutComponent>
      {menus == null ? (
        <LoadingComponent />
      ) : (
        <div className="relative w-full h-full">
          <LockScreenComponent isShow={menu === menus.APPS.MENU_LOCKSCREEN} />
          <HomeComponent isShow={menu === menus.APPS.MENU_DEFAULT} />
          <MessageComponent isShow={menu === menus.APPS.MENU_MESSAGE} />
          <MessageChattingComponent
            isShow={menu === menus.APPS.MENU_MESSAGE_CHATTING}
          />
          <ContactComponent isShow={menu === menus.APPS.MENU_CONTACT} />
          <PhoneComponent isShow={menu === menus.APPS.MENU_PHONE} />
          <EmailComponent isShow={menu === menus.APPS.MENU_EMAIL} />
          <EmailDetailComponent
            isShow={menu === menus.APPS.MENU_EMAIL_DETAIL}
          />
          <AdsComponent isShow={menu === menus.APPS.MENU_ADS} />
          <ServicesComponent isShow={menu === menus.APPS.MENU_SERVICE} />
          <LoopsComponent isShow={menu === menus.APPS.MENU_LOOPS} />
          <BankComponent isShow={menu === menus.APPS.MENU_BANK} />
          <GarageComponent isShow={menu === menus.APPS.MENU_GARAGE} />
          <GalleryComponent isShow={menu === menus.APPS.MENU_GALLERY} />
          <SettingComponent isShow={menu === menus.APPS.MENU_SETTING} />
          <HouseComponent isShow={menu === menus.APPS.MENU_HOUSE} />
          <SettingComponent isShow={menu === menus.APPS.MENU_SETTING} />
          <NewsComponent isShow={menu === menus.APPS.MENU_NEWS} />
          <LovyComponent isShow={menu === menus.APPS.MENU_LOVY} />
          <PlayTVComponent isShow={menu === menus.APPS.MENU_PLAYTV} />
          <CameraComponent isShow={menu === menus.APPS.MENU_CAMERA} />
          <InetMaxComponent isShow={menu === menus.APPS.MENU_INTERNET_DATA} />
          <div
            className="absolute top-0 left-0 z-50 w-full"
            style={{
              display: !isNullOrUndefined(notificationCall) ? "block" : "none",
            }}
          >
            <InCallComponent
              isShow={notificationCall.type === menus.APPS.MENU_INCALL}
            />
          </div>

          <div
            className="absolute top-0 left-0 z-50 w-full"
            style={{
              display: !isNullOrUndefined(notificationCall) ? "block" : "none",
            }}
          >
            <IncomingCallNotificationComponent
              isShow={notificationCall.type == MENU_INCOMING_CALL_NOTIFICATION}
            />
          </div>
          <div
            className="absolute top-0 left-0 z-50 w-full"
            style={{
              display: !isNullOrUndefined(notificationCall) ? "block" : "none",
            }}
          >
            <StartCallNotificationComponent
              isShow={notificationCall.type == MENU_START_CALL_NOTIFICATION}
            />
          </div>
          <div
            className="absolute top-0 left-0 z-50 w-full"
            style={{
              display: !isNullOrUndefined(notificationInternal)
                ? "block"
                : "none",
            }}
          >
            <InternalNotificationComponent
              isShow={notificationInternal.type == MENU_INTERNAL_NOTIFICATION}
            />
          </div>
          <div
            className="absolute top-0 left-0 z-50 w-full"
            style={{
              display: !isNullOrUndefined(notificationNews) ? "block" : "none",
            }}
          >
            <NewNewsNotificationComponent
              isShow={notificationNews.type == MENU_NEW_NEWS_NOTIFICATION}
            />
          </div>
          <div
            className="absolute top-0 left-0 z-50 w-full"
            style={{
              display: !isNullOrUndefined(notificationMessage)
                ? "block"
                : "none",
            }}
          >
            <NewMessageNotificationComponent
              isShow={notificationMessage.type == MENU_NEW_MESSAGE_NOTIFICATION}
            />
          </div>
        </div>
      )}
    </LayoutComponent>
  );
};
export default DynamicComponent;
