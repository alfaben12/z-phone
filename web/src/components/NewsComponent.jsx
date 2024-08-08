import React, { useContext, useState } from "react";
import { MENU_DEFAULT, MENU_MESSAGE_CHATTING } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew, MdWhatsapp } from "react-icons/md";
import LoadingComponent from "./LoadingComponent";
import { IoCamera } from "react-icons/io5";

const NewsComponent = ({ isShow }) => {
  const { setMenu, news } = useContext(MenuContext);
  const [subMenu, setSubMenu] = useState("list");

  return (
    <div
      className="relative flex flex-col w-full h-full"
      style={{
        display: isShow ? "block" : "none",
      }}
    >
      <div className="absolute top-0 flex w-full justify-between py-2 bg-black pt-8 z-10">
        <div
          className="flex items-center px-2 text-blue-500 cursor-pointer"
          onClick={() => setMenu(MENU_DEFAULT)}
        >
          <MdArrowBackIosNew className="text-lg" />
          <span className="text-xs">Back</span>
        </div>
        <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit">
          Mews
        </span>
        <div className="flex items-center px-2 text-blue-500">
          {/* <MdEdit className='text-lg' /> */}
        </div>
      </div>
      {news == undefined ? (
        <LoadingComponent />
      ) : (
        <div
          className="no-scrollbar flex flex-col w-full h-full overflow-y-auto px-4 space-y-4 pb-5"
          style={{
            paddingTop: 60,
          }}
        >
          {news.map((v, i) => {
            return (
              <div
                className="flex flex-col rounded-lg bg-gray-700 domine-font-medium"
                key={i}
              >
                <img
                  className="rounded-t-lg"
                  src={v.image}
                  alt=""
                  onError={(error) => {
                    error.target.src = "./files/images/noimage.jpg";
                  }}
                />
                <div className="px-3 py-1">
                  <span className="text-gray-100 text-xs">{v.reporter}</span>
                  <span className="text-white text-sm line-clamp-2">
                    {v.title}
                  </span>
                </div>
                <div className="flex justify-between px-3 pb-1">
                  <span></span>
                  <span className="text-gray-100 text-xss">{v.created_at}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default NewsComponent;
