import React, { useContext, useState } from "react";
import { MENU_DEFAULT } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import {
  MdArrowBackIosNew,
  MdDialpad,
  MdOutlinePhoneCallback,
  MdFormatListBulleted,
  MdOutlinePhone,
  MdBackspace,
  MdOutlineSearch,
} from "react-icons/md";
import TextTruncate from "./TextTruncate";

const subMenuList = {
  call: "call",
  history: "history",
  keypad: "keypad",
};

const PhoneComponent = ({ isShow }) => {
  const { setMenu } = useContext(MenuContext);
  const [subMenu, setSubMenu] = useState(subMenuList["keypad"]);
  const [pin, setPin] = useState("");

  const handleKeyPress = (value) => {
    if (pin.length < 15) {
      setPin(pin + value);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <div
      className="relative flex flex-col w-full h-full"
      style={{
        display: isShow ? "block" : "none",
      }}
    >
      <div className="absolute top-0 flex w-full justify-between py-3 bg-black pt-8 z-10">
        <div
          className="flex items-center px-2 text-blue-500 cursor-pointer"
          onClick={() => setMenu(MENU_DEFAULT)}
        >
          <MdArrowBackIosNew className="text-lg" />
          <span className="text-xs">Back</span>
        </div>
        <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit"></span>
        <div className="flex items-center px-2 text-blue-500">
          {/* <MdEdit className='text-lg' /> */}
        </div>
      </div>
      <div
        className="no-scrollbar flex flex-col w-full h-full text-white overflow-y-auto"
        style={{
          paddingTop: 65,
        }}
      >
        {/* CALL */}
        <div
          class="pb-16"
          style={{
            ...(subMenu !== subMenuList["call"] ? { display: "none" } : {}),
          }}
        >
          <div className="bg-black flex items-center w-full pb-3">
            <div className="w-2"></div>
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <MdOutlineSearch className="text-lg" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="text-sm w-full text-white flex-1 border border-[#3D3D3F] focus:outline-none rounded-full px-2 py-1 pl-8 bg-[#3B3B3B]"
              />
            </div>
            <div className="w-2"></div>
          </div>
          {[...Array(50)].map((_, i) => {
            return (
              <div
                className="flex w-full justify-between border-b border-gray-900 pb-2 mb-2"
                key={i}
                // onClick={() => setMenu(MENU_MESSAGE_CHATTING)}
              >
                <div className="flex space-x-3 items-center w-full pl-1">
                  <img
                    src="https://resized-image.uwufufu.com/selection/16733109502208426/720/Tommy%20T.jpg"
                    className="w-9 h-9 object-cover rounded-full"
                    alt=""
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      <TextTruncate text={`Alfaben ${i}`} size={15} />
                    </span>
                    <span className="text-xs text-gray-400">2024-10-31</span>
                  </div>
                </div>
                <div className="flex space-x-2 pr-3 items-center">
                  <MdOutlinePhone className="cursor-pointer text-2xl" />
                </div>
              </div>
            );
          })}
        </div>
        {/* HISTORY */}
        <div
          className="flex justify-center items-center"
          style={{
            ...(subMenu !== subMenuList["history"] ? { display: "none" } : {}),
          }}
        >
          <span className="text-white text-sm">Sorry not ready for now.</span>
        </div>
        {/* KEYPAD */}
        <div
          className="flex flex-col items-center"
          style={{
            ...(subMenu !== subMenuList["keypad"] ? { display: "none" } : {}),
          }}
        >
          <div className="flex flex-col items-center pt-5 h-[50px]">
            <span className="text-2xl text-white" style={{}}>
              {pin}
            </span>
            <span
              className="text-xs text-blue-500 cursor-pointer"
              style={{
                display: pin.length > 0 ? "block" : "none",
              }}
            >
              Add Number
            </span>
          </div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-2 mt-10">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map(
              (v, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => handleKeyPress(v.toString())}
                    className="flex justify-center items-center bg-[#333333] w-12 h-12 rounded-full text-2xl cursor-pointer"
                  >
                    {v}
                  </div>
                );
              }
            )}
          </div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-2 pt-2">
            <div></div>
            <div className="flex justify-center items-center bg-[#29d258] w-12 h-12 rounded-full text-3xl cursor-pointer">
              <MdOutlinePhone className="text-2xl" />
            </div>
            <div
              className="flex justify-center items-center w-11 h-11 rounded-full text-3xl cursor-pointer"
              onClick={() => handleDelete()}
            >
              <MdBackspace className="text-2xl" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full pb-2 pt-2.5 bg-black">
          <div className="grid h-full w-full grid-cols-3 mx-auto font-medium">
            <button
              type="button"
              className={`inline-flex flex-col items-center justify-center px-5 group ${
                subMenu === subMenuList["call"] ? "text-white" : "text-gray-600"
              }`}
              onClick={() => setSubMenu(subMenuList["call"])}
            >
              <MdOutlinePhoneCallback className="text-xl" />
              <span className="text-xs">Calls</span>
            </button>
            <button
              type="button"
              className={`inline-flex flex-col items-center justify-center px-5 group ${
                subMenu === subMenuList["history"]
                  ? "text-white"
                  : "text-gray-600"
              }`}
              onClick={() => setSubMenu(subMenuList["history"])}
            >
              <MdFormatListBulleted className="text-xl" />
              <span className="text-xs">History</span>
            </button>
            <button
              type="button"
              className={`inline-flex flex-col items-center justify-center px-5 group ${
                subMenu === subMenuList["keypad"]
                  ? "text-white"
                  : "text-gray-600"
              }`}
              onClick={() => setSubMenu(subMenuList["keypad"])}
            >
              <MdDialpad className="text-xl" />
              <span className="text-xs">Keypad</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PhoneComponent;
