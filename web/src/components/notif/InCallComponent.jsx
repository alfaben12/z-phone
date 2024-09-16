import React, { useContext, useState, useEffect } from "react";
import { MENU_DEFAULT, MENU_INCALL } from "../../constant/menu";
import MenuContext from "../../context/MenuContext";
import { MdCallEnd } from "react-icons/md";
import Marquee from "react-fast-marquee";
import axios from "axios";

const InCallComponent = ({ isShow }) => {
  const { resolution, notificationCall, setNotificationCall, setMenu } =
    useContext(MenuContext);
  const [isClose, setIsClose] = useState(false);
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setIsClose(false);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
  }, [isShow]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        let { hours, minutes, seconds } = prevTime;
        seconds += 1;
        if (seconds === 60) {
          seconds = 0;
          minutes += 1;
        }
        if (minutes === 60) {
          minutes = 0;
          hours += 1;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (num) => (num < 10 ? `0${num}` : num);

  return (
    <div
      className={`flex flex-col w-full px-2 pt-8 ${
        isClose ? "animate-slideUp" : "animate-slideDown"
      }`}
      style={{
        display: isShow ? "block" : "none",
        background: "rgb(0, 0, 0, 0.9)",
        height: resolution.layoutHeight,
        width: resolution.layoutWidth,
      }}
    >
      <div className="flex flex-col">
        <span className="pt-8 pb-16 text-gray-400 pr-5 text-right text-sm font-semibold">
          {MENU_INCALL}
        </span>
        <div className="flex flex-col items-center w-full">
          <img
            src={notificationCall.photo}
            className="w-24 h-24 object-cover rounded-full"
            alt=""
            onError={(error) => {
              error.target.src = "./images/noimage.jpg";
            }}
          />
        </div>
        <span className="text-white text-2xl text-bold truncate px-5">
          <Marquee speed={50} pauseOnHover={true}>
            {notificationCall.from}
          </Marquee>
        </span>
        <span className="text-gray-300 text-lg text-bold truncate text-center">
          {`${formatTime(time.hours)}:${formatTime(time.minutes)}:${formatTime(
            time.seconds
          )}`}
        </span>
      </div>
      <div className="flex flex-col items-center pt-28">
        <button
          className="flex justify-center items-center bg-red-600 w-12 h-12 rounded-full text-white"
          onClick={async () => {
            setIsClose(true);
            let result = null;
            try {
              const response = await axios.post("/end-call", {
                to_source: notificationCall.to_source,
              });
              result = response.data;
            } catch (error) {
              console.error("error /end-call", error);
            }
          }}
        >
          <MdCallEnd className="text-2xl" />
        </button>
      </div>
    </div>
  );
};
export default InCallComponent;
