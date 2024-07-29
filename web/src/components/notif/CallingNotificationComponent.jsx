import React, { useContext } from "react";
import MenuContext from "../../context/MenuContext";
import { MdCall, MdCallEnd } from "react-icons/md";
import { MENU_DEFAULT, MENU_INCALL } from "../../constant/menu";

const CallingNotificationComponent = ({ isShow }) => {
  const { setMenu } = useContext(MenuContext);

  return (
    <div
      className="flex rounded-xl w-full bg-black opacity-95"
      style={{
        display: isShow ? "block" : "none",
      }}
    >
      <div className="flex px-3 py-4 space-x-2 w-full items-center">
        <div className="w-12 h-full">
          <img
            src="https://resized-image.uwufufu.com/selection/16733109502208426/720/Tommy%20T.jpg"
            className="object-cover rounded-full"
            alt=""
          />
        </div>
        <div className="flex justify-between w-full items-center space-x-2">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white line-clamp-1">
              John Doe John Doe John Doe John Doe John Doe John Doe
            </span>
            <span className="text-xs text-gray-300 line-clamp-1">Mobile</span>
          </div>
          <div className="flex space-x-2 pr-1">
            <button
              className="flex justify-center items-center bg-red-500 w-8 h-8 rounded-full text-white"
              onClick={() => setMenu(MENU_DEFAULT)}
            >
              <MdCallEnd className="text-xl" />
            </button>
            <button
              className="flex justify-center items-center bg-green-500 w-8 h-8 rounded-full text-white"
              onClick={() => setMenu(MENU_INCALL)}
            >
              <MdCall className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CallingNotificationComponent;
