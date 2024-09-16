import React, { useContext, useState, useEffect } from "react";
import MenuContext from "../../context/MenuContext";
import { MdCall, MdCallEnd } from "react-icons/md";
import {
  MENU_INCALL,
  MENU_INCOMING_CALL_NOTIFICATION,
} from "../../constant/menu";
import { MdOutlinePhone } from "react-icons/md";
import useSound from "use-sound";
import notificationMessageSound from "/sounds/call-sound.mp3";
import axios from "axios";

const IncomingCallNotificationComponent = ({ isShow }) => {
  const { resolution, notificationCall, setNotificationCall } =
    useContext(MenuContext);
  const [isClose, setIsClose] = useState(false);
  const [play, { stop }] = useSound(notificationMessageSound);

  useEffect(() => {
    if (isShow) {
      setIsClose(false);
      // play();
    }
  }, [isShow]);

  return (
    <div
      className={`flex w-full px-2 pt-8 ${
        isClose ? "animate-slideUp" : "animate-slideDown"
      }`}
      style={{
        display: isShow ? "block" : "none",
        background: "rgb(0, 0, 0, 0.9)",
        height: resolution.layoutHeight,
        width: resolution.layoutWidth,
      }}
    >
      <div className="flex px-3 py-4 space-x-2 w-full h-full items-center">
        <div className="flex flex-col justify-between w-full h-full items-center pt-5 pb-10">
          <div className="flex flex-col space-y-3 w-full">
            <span className="flex space-x-2 text-lg text-gray-100 font-semibold line-clamp-1 items-center">
              <span>{MENU_INCOMING_CALL_NOTIFICATION}...</span>
              <div>
                <span className="relative flex h-3 w-3 items-center">
                  <MdOutlinePhone className="text-xl animate-ping absolute" />
                  <MdOutlinePhone className="text-xl absolute" />
                </span>
              </div>
            </span>
            <div className="flex w-full items-center space-x-2">
              <img
                src={notificationCall.photo}
                className="w-12 h-12 rounded-full object-cover"
                alt=""
                onError={(error) => {
                  error.target.src = "./images/noimage.jpg";
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
                onClick={async () => {
                  setIsClose(true);
                  stop();
                  // setTimeout(() => {
                  //   setNotificationCall({ type: "" });
                  // }, 1000);

                  let result = null;
                  try {
                    const response = await axios.post("/decline-call", {
                      to_source: notificationCall.to_source,
                    });
                    result = response.data;
                  } catch (error) {
                    console.error("error /decline-call", error);
                  }
                }}
              >
                <MdCallEnd className="text-3xl" />
              </button>
              <span className="text-white text-xs">Decline</span>
            </div>
            <div className="flex flex-col space-y-2 items-center">
              <button
                className="flex justify-center items-center bg-green-500 w-12 h-12 rounded-full text-white"
                onClick={async () => {
                  setIsClose(true);
                  stop();

                  let result = null;
                  try {
                    const response = await axios.post("/accept-call", {
                      from: notificationCall.from,
                      photo: notificationCall.photo,
                      to_source: notificationCall.to_source,
                      to_person_for_caller:
                        notificationCall.to_person_for_caller,
                      to_photo_for_caller: notificationCall.to_photo_for_caller,
                      call_id: notificationCall.call_id,
                    });
                    result = response.data;
                  } catch (error) {
                    console.error("error /accept-call", error);
                  }

                  // setNotificationCall({
                  //   type: MENU_INCALL,
                  //   from: notificationCall.from,
                  //   photo: notificationCall.photo,
                  // });
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
