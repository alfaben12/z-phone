import React, { useContext, useState } from "react";
import { MENU_DEFAULT, PHONE_HEIGHT, PHONE_WIDTH } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew, MdCancel } from "react-icons/md";
import LoadingComponent from "./LoadingComponent";

const GalleryComponent = ({ isShow }) => {
  const { setMenu, photos } = useContext(MenuContext);
  const [isShowModal, setIsShowModal] = useState(false);
  const [dataModal, setDataModal] = useState(null);

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
            {dataModal == null ? (
              <LoadingComponent />
            ) : (
              <div className="w-full pb-2 relative">
                <img
                  src={dataModal.photo}
                  alt=""
                  className="mx-auto w-full rounded"
                  onError={(error) => {
                    error.target.src = "./assets/images/noimage.jpg";
                  }}
                />
                <div className="absolute left-0 bottom-2 bg-gray-800 opacity-60 text-xs font-normal px-1 py-0.5 rounded-tr-sm text-white">
                  {dataModal.created_at}
                </div>
              </div>
            )}
            <div className="flex justify-center items-center space-x-2">
              <div>
                <button className="rounded-full bg-red-500 text-white text-xs px-2 py-1">
                  Delete
                </button>
              </div>
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
      {photos == undefined ? (
        <LoadingComponent />
      ) : (
        <div
          className="no-scrollbar flex flex-col w-full h-full text-white overflow-y-auto"
          style={{
            paddingTop: 65,
          }}
        >
          <div className="grid grid-cols-2 gap-3 px-1 pb-5">
            {photos.map((v, i) => {
              return (
                <div
                  className="relative cursor-pointer"
                  key={i}
                  onClick={() => {
                    setIsShowModal(true);
                    setDataModal(v);
                  }}
                >
                  <div className="absolute left-0 bottom-0 bg-gray-800 opacity-60 text-xs font-normal px-1 py-0.5 rounded-tr-lg">
                    {v.created_at}
                  </div>
                  <img
                    className="w-full rounded object-cover"
                    style={{
                      height: 75,
                    }}
                    src={v.photo}
                    alt=""
                    onError={(error) => {
                      error.target.src = "./assets/images/noimage.jpg";
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default GalleryComponent;
