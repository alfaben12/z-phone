import React, { useContext, useEffect } from "react";
import MenuContext from "../../context/MenuContext";

const NewMessageNotificationComponent = ({ isShow }) => {
  const { notificationInternal, setNotificationInternal } =
    useContext(MenuContext);

  useEffect(() => {
    if (isShow) {
      setTimeout(() => {
        setNotificationInternal({ type: "" });
      }, 3000);
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
          <img
            className="w-8 h-8"
            src={`./images/${notificationInternal?.from?.toLowerCase()}.svg`}
            alt=""
            onError={(error) => {
              error.target.src = "./images/notif.svg";
            }}
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white line-clamp-1">
              {notificationInternal.from}
            </span>
            <span className="text-xs text-gray-300 line-clamp-1">
              {notificationInternal.message}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewMessageNotificationComponent;
