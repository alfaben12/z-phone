import React, { useContext, useState } from "react";
import { MENU_DEFAULT, MENU_NEWS, NAME, PHONE_HEIGHT } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew, MdLiveTv } from "react-icons/md";
import LoadingComponent from "./LoadingComponent";
import { FaArrowRight, FaRegNewspaper } from "react-icons/fa6";
import Markdown from "react-markdown";

const subMenuList = {
  stream: "stream",
  feed: "feed",
};

const NewsComponent = ({ isShow }) => {
  const { setMenu, news } = useContext(MenuContext);
  const [detail, setDetail] = useState(null);
  const [subMenu, setSubMenu] = useState("feed");

  return (
    <div
      className="relative flex flex-col w-full h-full"
      style={{
        display: isShow ? "block" : "none",
      }}
    >
      <div
        className={`no-scrollbar absolute w-full z-30 overflow-auto text-white bg-black ${
          detail != null ? "visible" : "invisible"
        }`}
      >
        {detail == null ? (
          <LoadingComponent />
        ) : (
          <div className="relative flex flex-col rounded-xl h-full w-full px-2">
            <div
              className="rounded-lg flex flex-col w-full pt-8"
              style={{
                height: PHONE_HEIGHT,
              }}
            >
              <div className="flex w-full justify-between bg-black z-10 pb-2.5">
                <div
                  className="flex items-center text-blue-500 cursor-pointer"
                  onClick={() => {
                    setDetail(null);
                  }}
                >
                  <MdArrowBackIosNew className="text-lg" />
                  <span className="text-xs">Back</span>
                </div>
                <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit"></span>
                <div className="flex items-center px-2 space-x-2 text-white"></div>
              </div>
              <div className="flex-1 overflow-y-auto bg-black pb-2 flex no-scrollbar">
                <div className="flex flex-col px-1">
                  <img
                    className="rounded-t-lg"
                    src={detail.image}
                    alt=""
                    onError={(error) => {
                      error.target.src = "./files/images/noimage.jpg";
                    }}
                  />
                  <div className="py-1">
                    <div className="text-gray-100 text-xss flex justify-between">
                      <span>{detail.created_at}</span>
                      <span>
                        {NAME} {MENU_NEWS}
                      </span>
                    </div>
                    <span className="text-gray-100 text-xs line-clamp-1">
                      Reporter - {detail.reporter}
                    </span>
                    <span className="text-white text-sm line-clamp-2">
                      {detail.title}
                    </span>
                  </div>
                  <div className="pt-2 text-xs pb-5">
                    <Markdown>{detail.body}</Markdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="absolute top-0 flex w-full justify-between py-2 bg-black pt-8 z-10">
        <div
          className="flex items-center px-2 text-blue-500 cursor-pointer"
          onClick={() => setMenu(MENU_DEFAULT)}
        >
          <MdArrowBackIosNew className="text-lg" />
          <span className="text-xs">Back</span>
        </div>
        <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit">
          News
        </span>
        <div className="flex items-center px-2 text-blue-500">
          {/* <MdEdit className='text-lg' /> */}
        </div>
      </div>
      <div
        className="no-scrollbar flex flex-col w-full h-full overflow-y-auto px-3 space-y-4 pb-5"
        style={{
          paddingTop: 60,
        }}
      >
        <div
          style={{
            ...(subMenu !== subMenuList["feed"] ? { display: "none" } : {}),
          }}
        >
          {news == undefined ? (
            <LoadingComponent />
          ) : (
            <div className="flex flex-col space-y-3">
              {news.map((v, i) => {
                return (
                  <div
                    className="flex flex-col rounded-lg bg-gray-700 domine-font-medium cursor-pointer"
                    key={i}
                    onClick={() => setDetail(v)}
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
                      <span className="text-gray-100 text-xs line-clamp-1">
                        {NAME} Reporter - {v.reporter.split(" ")[0]}
                      </span>
                      <span className="text-white text-sm line-clamp-2">
                        {v.title}
                      </span>
                    </div>
                    <div className="flex justify-between px-3 pb-1">
                      <span className="text-gray-100 text-xss">
                        {v.created_at}
                      </span>
                      <span className="text-gray-100 text-xss flex space-x-0.5 items-center">
                        <span>Read</span> <FaArrowRight />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 w-full pb-2 pt-2.5 bg-black">
        <div className="grid h-full w-full grid-cols-2 mx-auto font-medium">
          <button
            type="button"
            className={`inline-flex flex-col items-center justify-center px-5 group ${
              subMenu === subMenuList["feed"] ? "text-white" : "text-gray-600"
            }`}
            onClick={() => setSubMenu(subMenuList["feed"])}
          >
            <FaRegNewspaper className="text-xl" />
            <span className="text-xs">Feed</span>
          </button>
          <button
            type="button"
            className={`inline-flex flex-col items-center justify-center px-5 group ${
              subMenu === subMenuList["stream"] ? "text-white" : "text-gray-600"
            }`}
            onClick={() => setSubMenu(subMenuList["stream"])}
          >
            <MdLiveTv className="text-xl" />
            <span className="text-xs">Live</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default NewsComponent;
