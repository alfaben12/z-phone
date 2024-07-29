import React, { useContext } from "react";
import { MENU_DEFAULT, MENU_MESSAGE_CHATTING } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew, MdWhatsapp } from "react-icons/md";

const AdsComponent = ({ isShow }) => {
  const { setMenu } = useContext(MenuContext);

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
        <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit">
          Ads
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
        {[...Array(20)].map((_, i) => {
          return (
            <div className="bg-black px-4 py-2 rounded-xl w-full" key={i}>
              <div className="flex justify-between w-full">
                <div className="w-full grid grid-cols-6">
                  <img
                    src="https://resized-image.uwufufu.com/selection/16733109502208426/720/Tommy%20T.jpg"
                    className="w-9 h-9 object-cover rounded-full"
                    alt=""
                  />
                  <div className="leading-none col-span-4 space-y-1">
                    <div className="flex justify-between w-full">
                      <div className="ml-1.5 leading-tight">
                        <div className="line-clamp-1 text-white text-sm">
                          Luka Aleksy
                        </div>
                        <div className="line-clamp-1 text-xs text-gray-400 font-normal">
                          9:6AM
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between text-gray-400">
                    <MdWhatsapp
                      className="cursor-pointer text-2xl text-[#33C056]"
                      onClick={() => setMenu(MENU_MESSAGE_CHATTING)}
                    />
                  </div>
                </div>
              </div>
              <p className="text-white block text-xs leading-snug mt-2">
                DIJUAL SUPRA GR 2020 FULL COSME, MINAT HUB 6283748390
              </p>
              {Math.random() < 0.4 ? (
                <img
                  className="mt-2 rounded-2xl border border-gray-800"
                  src="https://img.gta5-mods.com/q95/images/2019-toyota-supra-gr-add-on-jp-spec/e272f6-70586135_2352786718319603_8588253215382831104_o.jpg"
                  alt=""
                />
              ) : null}
              <div className="flex justify-center w-full">
                <div className="border-b border-gray-900 w-1/2 pt-4"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AdsComponent;
