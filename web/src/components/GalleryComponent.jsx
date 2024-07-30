import React, { useContext, useState } from "react";
import { MENU_DEFAULT, PHONE_HEIGHT, PHONE_WIDTH } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew, MdCancel } from "react-icons/md";

const GalleryComponent = ({ isShow }) => {
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
          <div className="rounded-lg py-2 flex flex-col w-full p-3">
            <div className="w-full pb-2">
              <img
                src="https://api.duniagames.co.id/api/content/upload/file/5235668621655981951.jpg"
                alt=""
                className="mx-auto w-full rounded"
                onError={(error) => {
                  error.target.src = "./images/noimage.jpg";
                }}
              />
            </div>
            <div className="flex justify-center items-center">
              <div>
                <MdCancel
                  className="text-3xl text-white cursor-pointer"
                  onClick={() => setIsShowModal(false)}
                />
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
          Photos
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
        <div className="grid grid-cols-2 gap-3 px-1 pb-5">
          {[...Array(50)].map((_, i) => {
            return (
              <div
                className="relative cursor-pointer"
                key={i}
                onClick={() => setIsShowModal(true)}
              >
                <div className="absolute left-0 bottom-0 bg-gray-800 opacity-60 text-xs font-normal px-1 py-0.5 rounded-tr-lg">
                  2020-08-21
                </div>
                <img
                  className="w-full rounded object-cover"
                  style={{
                    height: 80,
                  }}
                  src="https://api.duniagames.co.id/api/content/upload/file/5235668621655981951.jpg"
                  alt=""
                  onError={(error) => {
                    error.target.src = "./images/noimage.jpg";
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default GalleryComponent;
