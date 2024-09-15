import React, { useContext, useEffect } from "react";
import MenuContext from "../../context/MenuContext";
import useSound from "use-sound";
import notificationMessageSound from "/sounds/message-sound.mp3";
import { MENU_NEW_MESSAGE_NOTIFICATION } from "../../constant/menu";

const NewMessageNotificationComponent = ({ isShow }) => {
  const { notificationMessage, setNotificationMessage } =
    useContext(MenuContext);
  const [play] = useSound(notificationMessageSound);

  useEffect(() => {
    if (isShow) {
      // play();
      setTimeout(() => {
        setNotificationMessage({ type: "" });
      }, 4000);
    }
  }, [isShow]);

  return (
    <div
      className={`flex w-full cursor-pointer px-2 pt-8 animate-slideDownThenUp`}
      style={{
        display: isShow ? "block" : "none",
      }}
    >
      <div
        className="flex px-3 py-2 space-x-2 w-full items-center rounded-xl border border-gray-900"
        style={{
          background: "rgba(0, 0, 0, 0.9)",
        }}
      >
        <div className="flex w-full items-center space-x-2 w-full">
          <img src=".//images/message.svg" className="w-8 h-8" alt="" />
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
