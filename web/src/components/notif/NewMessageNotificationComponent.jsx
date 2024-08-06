import React, { useContext, useEffect, useState } from "react";
import MenuContext from "../../context/MenuContext";
import useSound from "use-sound";
import notificationMessageSound from "../../../files/sounds/message-sound.mp3";
import { MENU_NEW_MESSAGE_NOTIFICATION } from "../../constant/menu";

const NewMessageNotificationComponent = ({ isShow }) => {
  const { notificationMessage, setNotificationMessage } =
    useContext(MenuContext);
  const [isClose, setIsClose] = useState(false);
  const [play] = useSound(notificationMessageSound);

  useEffect(() => {
    setIsClose(false);
    if (isShow) {
      play();
    }
  }, [isShow]);

  useEffect(() => {
    if (!isClose) {
      setTimeout(() => {
        setIsClose(true);
        stop();
        setTimeout(() => {
          setNotificationMessage({ type: "" });
        }, 1000);
      }, 5000);
    }
  }, [isClose]);

  return (
    <div
      className={`flex w-full cursor-pointer px-2 pt-8 ${
        isClose ? "animate-slideUp" : "animate-slideDown"
      }`}
      style={{
        display: isShow ? "block" : "none",
      }}
    >
      <div
        className="flex px-3 py-2 space-x-2 w-full items-center rounded-xl border border-gray-900"
        style={{
          background: "rgba(0, 0, 0, 0.9)",
        }}
        onClick={() => {
          setIsClose(true);
          setTimeout(() => {
            setNotificationMessage({ type: "" });
            stop();
          }, 1000);
        }}
      >
        <div className="flex w-full items-center space-x-2 w-full">
          <img src="./files/images/message.svg" className="w-8 h-8" alt="" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white line-clamp-1">
              {notificationMessage.from}
            </span>
            <span className="text-xs text-gray-300 line-clamp-1">
              {MENU_NEW_MESSAGE_NOTIFICATION}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewMessageNotificationComponent;
