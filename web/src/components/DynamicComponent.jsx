import React, { useContext, useEffect } from "react";
import LayoutComponent from "./LayoutComponent";
import MenuContext from "../context/MenuContext";
import HomeComponent from "./HomeComponent";
import {
  MENU_ADS,
  MENU_BANK,
  MENU_CONTACT,
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
  MENU_X,
  MENU_INCALL,
} from "../constant/menu";
import MessageComponent from "./MessageComponent";
import MessageChattingComponent from "./MessageChattingComponent";
import ContactComponent from "./ContactComponent";
import PhoneComponent from "./PhoneComponent";
import EmailComponent from "./EmailComponent";
import EmailDetailComponent from "./EmailDetailComponent";
import AdsComponent from "./AdsComponent";
import ServicesComponent from "./ServicesComponent";
import XComponent from "./XComponent";
import BankComponent from "./BankComponent";
import GarageComponent from "./GarageComponent";
import GalleryComponent from "./GalleryComponent";
import LockScreenComponent from "./LockScreenComponent";
import SettingComponent from "./SettingComponent";
import HouseComponent from "./HouseComponent";
import IncomingCallNotificationComponent from "./notif/IncomingCallNotificationComponent";
import NewMessageNotificationComponent from "./notif/NewMessageNotificationComponent";
import InCallComponent from "./notif/InCallComponent";

const DynamicComponent = () => {
  const { menu, notificationMessage, notificationCall } =
    useContext(MenuContext);

  useEffect(() => {
    console.log("change state " + menu);
  }, [menu]);

  function isNullOrUndefined(value) {
    return value === null || value === undefined;
  }
  return (
    <LayoutComponent>
      <div className="relative w-full h-full">
        <LockScreenComponent isShow={menu === MENU_LOCKSCREEN} />
        <HomeComponent isShow={menu === MENU_DEFAULT} />
        <MessageComponent isShow={menu === MENU_MESSAGE} />
        <MessageChattingComponent isShow={menu === MENU_MESSAGE_CHATTING} />
        <ContactComponent isShow={menu === MENU_CONTACT} />
        <PhoneComponent isShow={menu === MENU_PHONE} />
        <EmailComponent isShow={menu === MENU_EMAIL} />
        <EmailDetailComponent isShow={menu === MENU_EMAIL_DETAIL} />
        <AdsComponent isShow={menu === MENU_ADS} />
        <ServicesComponent isShow={menu === MENU_SERVICE} />
        <XComponent isShow={menu === MENU_X} />
        <BankComponent isShow={menu === MENU_BANK} />
        <GarageComponent isShow={menu === MENU_GARAGE} />
        <GalleryComponent isShow={menu === MENU_GALLERY} />
        <SettingComponent isShow={menu === MENU_SETTING} />
        <HouseComponent isShow={menu === MENU_HOUSE} />
        <SettingComponent isShow={menu === MENU_SETTING} />
        <div
          className="absolute top-0 left-0 z-50 w-full"
          style={{
            display: !isNullOrUndefined(notificationCall) ? "block" : "none",
          }}
        >
          <InCallComponent isShow={notificationCall.type === MENU_INCALL} />
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
            display: !isNullOrUndefined(notificationMessage) ? "block" : "none",
          }}
        >
          <NewMessageNotificationComponent
            isShow={notificationMessage.type == MENU_NEW_MESSAGE_NOTIFICATION}
          />
        </div>
      </div>
    </LayoutComponent>
  );
};
export default DynamicComponent;
