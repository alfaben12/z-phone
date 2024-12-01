import React, { useContext, useState } from "react";
import { MENU_DEFAULT } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew, MdClose, MdOutlineSearch } from "react-icons/md";
import { GiHomeGarage, GiPoliceBadge, GiMechanicGarage } from "react-icons/gi";
import { FaRoad } from "react-icons/fa";
import { searchByKeyValueContains } from "../utils/common";
import LoadingComponent from "./LoadingComponent";

const GarageComponent = ({ isShow }) => {
  const { resolution, setMenu, garages, setGarages, garagesBk } =
    useContext(MenuContext);
  const [isShowModal, setIsShowModal] = useState(false);
  const [dataModal, setDataModal] = useState(null);

  const getState = (typ) => {
    switch (typ) {
      case 1:
        return (
          <div className="flex space-x-1 bg-green-600 py-0.5 px-2 text-xs text-white rounded items-center">
            <span>Garaged</span>
            <GiHomeGarage />
          </div>
        );
      case 2:
        return (
          <div className="flex space-x-1 bg-red-600 py-0.5 px-2 text-xs text-white rounded items-center">
            <span>Impound</span>
            <GiPoliceBadge />
          </div>
        );
      case 3:
        return (
          <div className="flex space-x-1 bg-yellow-600 py-0.5 px-2 text-xs text-white rounded items-center">
            <span>Outside</span>
            <FaRoad />
          </div>
        );
      default:
        return (
          <div className="flex space-x-1 bg-yellow-600 py-0.5 px-2 text-xs text-white rounded items-center">
            <span>Outside</span>
            <GiPoliceBadge />
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
        className={`no-scrollbar absolute w-full z-30 overflow-auto py-10 ${
          isShowModal ? "visible" : "invisible"
        }`}
        style={{
          height: resolution.layoutHeight,
          width: resolution.layoutWidth,
          backgroundColor: "rgba(31, 41, 55, 0.8)",
        }}
      >
        <div className="flex flex-col justify-center rounded-xl h-full w-full px-3">
          <div className="bg-white rounded-lg py-2 flex flex-col w-full p-3">
            <div className="flex justify-between items-center pb-2">
              <span className="truncate font-semibold">
                {dataModal != null ? dataModal.name : ""}
              </span>
              <div>
                <MdClose
                  className="text-2xl cursor-pointer text-black hover:text-red-500"
                  onClick={() => setIsShowModal(false)}
                />
              </div>
            </div>
            {dataModal == null ? (
              <LoadingComponent />
            ) : (
              <div className="w-full">
                <img
                  src={dataModal.image}
                  alt=""
                  className="mx-auto w-28 pb-2 object-cover"
                  onError={(error) => {
                    error.target.src = "./images/noimage.jpg";
                  }}
                />
                <div className="flex flex-col justify-center items-center gap-2">
                  {/* <h4 className="font-semibold">Business Name</h4> */}
                </div>
                <div className="flex flex-col gap-1 border-b py-2 text-xs">
                  <span className="flex justify-between">
                    <span className="text-gray-400">Plate:</span>
                    <span className="font-bold">{dataModal.plate}</span>
                  </span>
                  <span className="flex justify-between">
                    <span className="text-gray-400">Model:</span>
                    <span>{dataModal.name}</span>
                  </span>
                  <span className="flex justify-between">
                    <span className="text-gray-400">Brand:</span>
                    <span>{dataModal.brand}</span>
                  </span>
                  <span className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span>{dataModal.category}</span>
                  </span>
                  <span className="flex justify-between">
                    <span className="text-gray-400">Garage:</span>
                    <span>{dataModal.garage}</span>
                  </span>
                  <span className="flex justify-between">
                    <span className="text-gray-400">State:</span>
                    <span>{getState(dataModal.state)}</span>
                  </span>
                </div>
                <div className="flex flex-col gap-3 pb-2 pt-2 text-xs">
                  <span className="flex justify-between">
                    <span className="text-gray-400">Purchase:</span>
                    <span>{dataModal.created_at}</span>
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
            )}
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
      {garages == undefined ? (
        <LoadingComponent />
      ) : (
        <div
          className="no-scrollbar flex flex-col w-full h-full text-white overflow-y-auto"
          style={{
            paddingTop: 60,
          }}
        >
          <div className="bg-black flex items-center w-full pb-3 pt-1">
            <div className="w-2"></div>
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <MdOutlineSearch className="text-lg" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="text-sm w-full text-white flex-1 border border-gray-700 focus:outline-none rounded-full px-2 py-1 pl-8 bg-[#3B3B3B]"
                autoComplete="off"
                onKeyUp={(e) => {
                  const data = searchByKeyValueContains(
                    garagesBk,
                    "name",
                    e.target.value
                  );
                  setGarages(data);
                }}
              />
            </div>
            <div className="w-2"></div>
          </div>

          {garages.map((v, i) => {
            return (
              <div
                key={i}
                className="flex-shrink-0 mx-3 my-3 relative bg-gray-800 rounded-lg max-w-xs shadow-lg cursor-pointer"
                onClick={() => {
                  setIsShowModal(true);
                  setDataModal(v);
                }}
              >
                <div className="absolute -top-2.5 right-2 z-10">
                  {getState(v.state)}
                </div>
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
                <div className="relative pt-4 px-10 flex items-center justify-center">
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
                    src={v.image}
                    alt=""
                    onError={(error) => {
                      error.target.src = "./images/noimage.jpg";
                    }}
                  />
                </div>
                <div className="relative text-white px-2 pb-2">
                  <span className="block opacity-75 -mb-1 truncate text-sm font-semibold">
                    {v.plate}
                  </span>
                  <div className="flex justify-between items-center">
                    <span className="block font-semibold text-lg truncate">
                      {v.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default GarageComponent;
