import React, { useContext, useEffect, useState } from "react";
import { MENU_DEFAULT } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { FaAngleUp } from "react-icons/fa6";

const dateNow = new Date();
const dateNumber = dateNow.getDate();
const hour = dateNow.getHours();
const minute = dateNow.getMinutes();
let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
][new Date().getDay()];

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
][new Date().getMonth()];

const LockScreenComponent = ({ isShow }) => {
  const { setMenu } = useContext(MenuContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setMenu(MENU_DEFAULT);
      }, 1000);
    }
  }, [isOpen]);
  return (
    <div
      className="relative flex flex-col justify-between w-full h-full"
      style={{
        backgroundImage: `url(./files/images/bg.png)`,
        backgroundSize: "cover",
        display: isShow ? "block" : "none",
      }}
    >
      <div className={`relative ${isOpen ? "animate-slideUp" : ""}`}>
        <div className="flex flex-col pt-10 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
          </svg>
          <p className="text-white text-6xl font-extralight">
            {hour}:{minute}
          </p>
          <p className="text-white text-lg font-light">
            {day}, {month} {dateNumber}
          </p>
        </div>
        <div className="relative mt-4 mx-2.5">
          <div className="absolute -bottom-4 scale-[0.85] origin-bottom inset-x-0 h-full w-full bg-white/10 backdrop-blur-md rounded-2xl"></div>
          <div className="absolute -bottom-2 scale-95 origin-bottom inset-x-0 h-full w-full bg-white/30 backdrop-blur-md rounded-3xl shadow-sm"></div>
          <div className="px-3 py-4 bg-white/40 backdrop-blur-md rounded-3xl shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold">Kota Manis Reporter</p>
                <h2 className="text-lg font-bold">Latest News</h2>
              </div>
            </div>
            <div className="mt-2 flex flex-col">
              <div className="flex space-x-3">
                <div className="w-1/2">
                  <img
                    className="rounded-lg h-24 w-full object-cover"
                    src="https://images.unsplash.com/photo-1588974269162-4c0d5ccc6094?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3302&q=80"
                    alt=""
                    onError={(error) => {
                      error.target.src = "./files/images/noimage.jpg";
                    }}
                  />
                </div>
                <div className="w-1/2">
                  <h3 className="mt-2 text-sm font-bold leading-tight">
                    Disnaker Kota
                  </h3>
                  <p className="mt-1 text-xs">
                    Harga barang hasil kerja Disnaker naik 3x lipat...
                  </p>
                </div>
              </div>
            </div>
            <hr className="mt-4 border-black/20" />
            <div className="mt-3 grid grid-cols-3 items-end">
              <div className="col-span-2">
                <h3 className="text-xs font-bold">More Updates</h3>
                <p className="mt-0.5 text-xs">
                  Badside tersebar diseluruh kota, silahkan mendaftar!
                </p>
              </div>
              <div className="flex justify-end">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src="https://seeklogo.com/images/K/keystonejs-logo-C77FDB0662-seeklogo.com.png"
                  alt=""
                  onError={(error) => {
                    error.target.src = "./files/images/noimage.jpg";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex justify-center pt-5 cursor-pointer my-5"
          onClick={() => setIsOpen(true)}
        >
          <FaAngleUp className="text-4xl text-white animate-bounce" />
        </div>
      </div>
    </div>
  );
};
export default LockScreenComponent;
