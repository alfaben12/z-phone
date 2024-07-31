import React, { useContext, useEffect, useState } from "react";
import MenuContext from "../../context/MenuContext";

const NewMessageNotificationComponent = ({ isShow }) => {
  const { notification, setNotification } = useContext(MenuContext);
  const [isClose, setIsClose] = useState(false);

  useEffect(() => {
    setIsClose(false);
  }, [isShow]);
  return (
    <div
      className={`flex rounded-xl w-full bg-black cursor-pointer ${
        isClose ? "animate-slideUp" : "animate-slideDown"
      }`}
      style={{
        display: isShow ? "block" : "none",
        background: "rgba(0, 0, 0, 0.9)",
      }}
      onClick={() => {
        setIsClose(true);
        setTimeout(() => {
          setNotification({ type: "" });
        }, 1000);
      }}
    >
      <div className="flex px-3 py-2 space-x-2 w-full items-center">
        <div className="flex w-full items-center space-x-2">
          <img src="./images/message.svg" className="w-8 h-8" alt="" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white line-clamp-1">
              {notification.from}
            </span>
            <span className="text-xs text-gray-300 line-clamp-1">
              {notification.message}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewMessageNotificationComponent;
