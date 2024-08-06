import React, { useContext, useState, useEffect } from "react";
import MenuContext from "../../context/MenuContext";
import { MdCall, MdCallEnd } from "react-icons/md";
import { MENU_INCALL, PHONE_HEIGHT, PHONE_WIDTH } from "../../constant/menu";
import { FaBell, FaFonticonsFi } from "react-icons/fa6";

const IncomingCallNotificationComponent = ({ isShow }) => {
  const { notificationCall, setNotificationCall } = useContext(MenuContext);
  const [isClose, setIsClose] = useState(false);

  useEffect(() => {
    setIsClose(false);
  }, [isShow]);

  return (
    <div
      className={`flex w-full px-2 pt-8 ${
        isClose ? "animate-slideUp" : "animate-slideDown"
      }`}
      style={{
        display: isShow ? "block" : "none",
        background: "rgb(0, 0, 0, 0.9)",
        height: PHONE_HEIGHT,
        width: PHONE_WIDTH,
      }}
    >
      <div className="flex px-3 py-4 space-x-2 w-full h-full items-center">
        <div className="flex flex-col justify-between w-full h-full items-center py-10">
          <div className="flex flex-col space-y-3 w-full">
            <span className="flex space-x-2 text-lg text-gray-300 font-semibold line-clamp-1 items-center">
              <span>INCOMING CALL...</span>
              <div>
                <span className="relative flex h-3 w-3 items-center">
                  <FaBell className="animate-ping absolute" />
                  <FaBell />
                </span>
              </div>
            </span>
            <div className="flex w-full items-center space-x-2">
              <img
                src={notificationCall.photo}
                className="w-12 h-12 rounded-full"
                alt=""
                onError={(error) => {
                  error.target.src = "./assets/images/noimage.jpg";
                }}
              />
              <div className="flex flex-col">
                <span
                  className="font-semibold text-white line-clamp-1"
                  style={{
                    fontSize: "1rem",
                  }}
                >
                  {notificationCall.from}
                </span>
                <span className="text-xs text-gray-300 line-clamp-1">
                  mobile
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full px-5 pb-10">
            <div className="flex flex-col space-y-2 items-center">
              <button
                className="flex justify-center items-center bg-red-500 w-12 h-12 rounded-full text-white"
                onClick={() => {
                  setIsClose(true);
                  setTimeout(() => {
                    setNotificationCall({ type: "" });
                  }, 1000);
                }}
              >
                <MdCallEnd className="text-3xl" />
              </button>
              <span className="text-white text-xs">Decline</span>
            </div>
            <div className="flex flex-col space-y-2 items-center">
              <button
                className="flex justify-center items-center bg-green-500 w-12 h-12 rounded-full text-white"
                onClick={() => {
                  setIsClose(true);
                  setNotificationCall({
                    type: MENU_INCALL,
                    from: notificationCall.from,
                    photo: notificationCall.photo,
                  });
                }}
              >
                <MdCall className="text-3xl" />
              </button>
              <span className="text-white text-xs">Accept</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IncomingCallNotificationComponent;
