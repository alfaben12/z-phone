import React, { useContext, useEffect } from "react";
import MenuContext from "../../context/MenuContext";
import useSound from "use-sound";
import notificationNewsSound from "/sounds/message-sound.mp3";
import { MENU_NEW_NEWS_NOTIFICATION } from "../../constant/menu";

const NewNewsNotificationComponent = ({ isShow }) => {
  const { notificationNews, setNotificationNews } = useContext(MenuContext);
  const [play] = useSound(notificationNewsSound);

  useEffect(() => {
    if (isShow) {
      play();
      setTimeout(() => {
        setNotificationNews({ type: "" });
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
          <img src="./images/news.svg" className="w-8 h-8" alt="" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white line-clamp-1">
              {notificationNews.from}
            </span>
            <span className="text-xs text-gray-300 line-clamp-1">
              {MENU_NEW_NEWS_NOTIFICATION}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewNewsNotificationComponent;
