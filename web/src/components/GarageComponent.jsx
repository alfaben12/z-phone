import React, { useContext, useState } from "react";
import { MENU_DEFAULT, PHONE_HEIGHT, PHONE_WIDTH } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew, MdCancel, MdOutlineSearch } from "react-icons/md";
import { GiHomeGarage, GiPoliceBadge, GiMechanicGarage } from "react-icons/gi";
import { FaRoad } from "react-icons/fa";

const GarageComponent = ({ isShow }) => {
  const { setMenu } = useContext(MenuContext);
  const [isShowModal, setIsShowModal] = useState(false);

  const getStatus = (typ) => {
    switch (typ) {
      case 1:
        return (
          <div className="absolute -top-2.5 right-2 z-10">
            <div className="flex space-x-1 bg-green-600 py-0.5 px-2 text-xs text-white rounded items-center">
              <span>Garage</span>
              <GiHomeGarage />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="absolute -top-2.5 right-2 z-10">
            <div className="flex space-x-1 bg-red-600 py-0.5 px-2 text-xs text-white rounded items-center">
              <span>Tersita</span>
              <GiPoliceBadge />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="absolute -top-2.5 right-2 z-10">
            <div className="flex space-x-1 bg-yellow-600 py-0.5 px-2 text-xs text-white rounded items-center">
              <span>Diluar</span>
              <FaRoad />
            </div>
          </div>
        );
      default:
        return (
          <div className="absolute -top-2.5 right-2 z-10">
            <div className="flex space-x-1 bg-yellow-600 py-0.5 px-2 text-xs text-white rounded items-center">
              <span>Diluar</span>
              <GiPoliceBadge />
            </div>
          </div>
        );
    }
  };
  return (
    <div
      className="relative flex flex-col w-full h-full"
      style={{
        display: isShow ? "block" : "none",
      }}
    >
      <div
        className={`absolute w-full z-20 ${
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
            <div className="flex justify-between items-center pb-5">
              <span className="truncate font-semibold">Supra GR 2020</span>
              <div>
                <MdCancel
                  className="text-2xl text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => setIsShowModal(false)}
                />
              </div>
            </div>
            <div className="w-full">
              <img
                src="https://raw.githubusercontent.com/MericcaN41/gta5carimages/main/images/lynx.png"
                alt=""
                className="mx-auto w-28"
                onError={(error) => {
                  error.target.src = "./images/noimage.jpg";
                }}
              />
              <div className="flex flex-col justify-center items-center gap-2">
                {/* <h4 className="font-semibold">Business Name</h4> */}
              </div>
              <div className="flex flex-col gap-3 border-b py-2 text-xs">
                <span className="flex justify-between">
                  <span className="text-gray-400">Plate:</span>
                  <span className="font-bold">M 123 BF</span>
                </span>
                <span className="flex justify-between">
                  <span className="text-gray-400">Brand:</span>
                  <span>Honda</span>
                </span>
                <span className="flex justify-between">
                  <span className="text-gray-400">Model:</span>
                  <span>Sport</span>
                </span>
                <span className="flex justify-between">
                  <span className="text-gray-400">Garage:</span>
                  <span>Garasi Kota</span>
                </span>
                <span className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span>Impound</span>
                </span>
              </div>
              <div className="flex flex-col gap-3 pb-2 pt-2 text-xs">
                <span className="flex justify-between">
                  <span className="text-gray-400">Pembelian:</span>
                  <span>2024-07-09</span>
                </span>
                <div className=" border-b border border-dashed"></div>
                <span className="flex justify-center space-x-2 items-center">
                  <div>
                    <GiMechanicGarage className="text-sm" />
                  </div>
                  <span>Powered by Mechanic</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 flex w-full justify-between py-3 bg-black pt-8 z-20">
        <div
          className="flex items-center px-2 text-blue-500 cursor-pointer"
          onClick={() => setMenu(MENU_DEFAULT)}
        >
          <MdArrowBackIosNew className="text-lg" />
          <span className="text-xs">Back</span>
        </div>
        <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit">
          Garages
        </span>
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

        {[...Array(10)].map((_, i) => {
          return (
            <div
              key={i}
              className="flex-shrink-0 mx-3 my-3 relative bg-gray-800 rounded-lg max-w-xs shadow-lg cursor-pointer"
              onClick={() => setIsShowModal(true)}
            >
              {getStatus(Math.floor(Math.random() * 3) + 1)}
              <div
                className="absolute bottom-5 right-14 w-20 h-20 bg-white opacity-5 rounded-xl"
                style={{
                  transform: "rotate(40deg)",
                }}
              ></div>
              <div
                className="absolute top-5 left-14 w-20 h-20 bg-white opacity-5 rounded-xl"
                style={{
                  transform: "rotate(40deg)",
                }}
              ></div>
              <div className="relative pt-3 px-10 flex items-center justify-center">
                <div
                  className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                  style={{
                    background: "radial-gradient(black, transparent 60%)",
                    transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                    opacity: 0.2,
                  }}
                ></div>
                <img
                  className="relative object-cover h-20"
                  src="https://raw.githubusercontent.com/MericcaN41/gta5carimages/main/images/lynx.png"
                  alt=""
                  onError={(error) => {
                    error.target.src = "./images/noimage.jpg";
                  }}
                />
              </div>
              <div className="relative text-white px-2 pb-2">
                <span className="block opacity-75 -mb-1 truncate text-sm font-semibold">
                  M 873 CD
                </span>
                <div className="flex justify-between items-center">
                  <span className="block font-semibold text-lg truncate">
                    Supra GR 2020
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default GarageComponent;
