import React, { useContext } from "react";
import { MENU_DEFAULT } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdCallEnd } from "react-icons/md";
import Marquee from "react-fast-marquee";

const InCallComponent = ({ isShow }) => {
  const { setMenu } = useContext(MenuContext);

  return (
    <div
      className="relative flex flex-col justify-between w-full h-full"
      style={{
        backgroundImage: `url(/bg.png)`,
        backgroundSize: "cover",
        display: isShow ? "block" : "none",
      }}
    >
      <div
        className="flex flex-col w-full h-full bg-black"
        style={{
          backgroundColor: "rgba(10, 10, 10, 0.9)",
        }}
      >
        <div className="flex flex-col">
          <span className="pt-12 pb-16 text-white pr-5 text-right text-xs">
            In Call
          </span>
          <div className="flex flex-col items-center w-full">
            <img
              src="https://resized-image.uwufufu.com/selection/16733109502208426/720/Tommy%20T.jpg"
              className="w-24 h-24 object-cover rounded-full"
              alt=""
            />
          </div>
          <span className="text-white text-2xl text-bold truncate px-14">
            <Marquee speed={50} pauseOnHover={true}>
              Thariq Alfa Benriska
            </Marquee>
          </span>
          <span className="text-gray-400 text-sm text-bold truncate text-center">
            10:09
          </span>
        </div>
        <div className="flex flex-col items-center pt-44">
          <button
            className="flex justify-center items-center bg-red-600 w-12 h-12 rounded-full text-white"
            onClick={() => setMenu(MENU_DEFAULT)}
          >
            <MdCallEnd className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default InCallComponent;
