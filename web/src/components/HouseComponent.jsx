import React, { useContext, useState } from "react";
import {
  MENU_DEFAULT,
  MENU_MESSAGE_CHATTING,
  PHONE_HEIGHT,
  PHONE_WIDTH,
} from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew, MdCancel, MdWhatsapp } from "react-icons/md";
import { FaLocationDot, FaKey, FaHouse } from "react-icons/fa6";

const HouseComponent = ({ isShow }) => {
  const { setMenu } = useContext(MenuContext);
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <div
      className="relative flex flex-col w-full h-full"
      style={{
        display: isShow ? "block" : "none",
      }}
    >
      <div
        className={`no-scrollbar absolute w-full z-30 overflow-auto py-10 ${
          isShowModal ? "visible" : "invisible"
        }`}
        style={{
          height: PHONE_HEIGHT,
          width: PHONE_WIDTH,
          backgroundColor: "rgba(31, 41, 55, 0.8)",
        }}
      >
        <div className="flex flex-col justify-center rounded-xl h-full w-full px-3 px-3">
          <div className="bg-white rounded-lg py-2 flex flex-col w-full p-3">
            <div className="flex justify-between items-center pb-3">
              <span className="truncate font-semibold">Rumah 123</span>
              <div>
                <MdCancel
                  className="text-2xl text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => setIsShowModal(false)}
                />
              </div>
            </div>
            <div className="w-full">
              <img
                src="https://gunungrizki.com/wp-content/uploads/2017/01/House-PNG-Clipart.png"
                alt="chippz"
                className="mx-auto w-28"
              />
              <div className="flex flex-col justify-center items-center gap-2">
                {/* <h4 className="font-semibold">Business Name</h4> */}
              </div>
              <div className="flex flex-col gap-1 border-b py-2 text-xs">
                <span className="flex justify-between">
                  <span className="text-gray-800 text-sm">Keyholders:</span>
                  <div className="flex flex-col space-y-1 font-semibold">
                    <span>AB8HJELR</span>
                    <span>HKEINMCH</span>
                    <span>PWORLFNM</span>
                    <span>UEMCLDUE</span>
                    <span>OWXLWUER</span>
                  </div>
                </span>
              </div>
              <div className="flex flex-col gap-3 pb-2 pt-2 text-xs">
                <span className="flex justify-between items-center">
                  <span className="text-gray-800">Share Key:</span>
                  <span>
                    <input
                      className="border-b w-24 text-base font-medium focus:outline-none"
                      placeholder="CITIZENID"
                    />
                  </span>
                  <div>
                    <button
                      className="flex rounded-lg text-white bg-blue-500 px-2 py-1 text-xs items-center justify-center"
                      type="button"
                    >
                      <span>Give</span>
                    </button>
                  </div>
                </span>
                <span className="flex justify-center space-x-2 items-center pt-2">
                  <div>
                    <FaHouse className="text-sm" />
                  </div>
                  <span>Merpati E-Property</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 flex w-full justify-between py-3 bg-black pt-8 z-10">
        <div
          className="flex items-center px-2 text-blue-500 cursor-pointer"
          onClick={() => setMenu(MENU_DEFAULT)}
        >
          <MdArrowBackIosNew className="text-lg" />
          <span className="text-xs">Back</span>
        </div>
        <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit">
          Houses
        </span>
        <div className="flex items-center px-2 text-blue-500">
          {/* <MdEdit className='text-lg' /> */}
        </div>
      </div>
      <div
        className="no-scrollbar flex flex-col w-full h-full text-white overflow-y-auto px-4 space-y-4 pb-5"
        style={{
          paddingTop: 65,
        }}
      >
        {[...Array(10)].map((_, i) => {
          return (
            <div
              key={i}
              className="flex w-full flex-col border-gray-500"
              style={{
                borderRadius: "15px",
                borderWidth: "1px",
              }}
            >
              <div
                className="bg-gray-500 text-gray-700"
                style={{
                  borderTopLeftRadius: "13px",
                  borderTopRightRadius: "13px",
                }}
              >
                <img
                  src="https://gunungrizki.com/wp-content/uploads/2017/01/House-PNG-Clipart.png"
                  className="h-auto w-full object-cover"
                  alt=""
                />
              </div>
              <div className="px-6 pt-4 pb-2">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-base font-medium truncate">House</p>
                  <p className="text-base font-medium truncate">Tier 1</p>
                </div>
                <div className="flex flex-col gap-2 py-2 text-xs">
                  <span className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span>Rumah 123</span>
                  </span>
                  <span className="flex justify-between">
                    <span className="text-gray-400">Keyholders:</span>
                    <span className="truncate">4 Keys</span>
                  </span>
                  <span className="flex justify-between">
                    <span className="text-gray-400">Garage:</span>
                    <span>Yes</span>
                  </span>
                </div>
              </div>
              <div className="border-b border border-dashed border-gray-500"></div>
              <div className="px-6 pt-4 pb-2">
                <div className="flex flex-col gap-2 py-2 text-xs">
                  <span className="flex justify-between">
                    <span className="text-gray-400">House Locked:</span>
                    <span>Yes</span>
                  </span>
                  <span className="flex justify-between">
                    <span className="text-gray-400">Garage Locked:</span>
                    <span>Yes</span>
                  </span>
                  <span className="flex justify-between">
                    <span className="text-gray-400">Stash Locked:</span>
                    <span>No</span>
                  </span>
                </div>
              </div>
              <div className="flex space-x-2 px-6 pb-6 pt-2">
                <button
                  className="flex w-full rounded-lg bg-gray-700 py-2 text-sm items-center justify-center space-x-1"
                  type="button"
                  onClick={() => setIsShowModal(true)}
                >
                  <span>Keys</span>
                  <div>
                    <FaKey />
                  </div>
                </button>
                <button
                  className="flex w-full rounded-lg bg-gray-700 py-2 text-sm items-center justify-center space-x-1"
                  type="button"
                >
                  <span>Location</span>
                  <div>
                    <FaLocationDot />
                  </div>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default HouseComponent;
