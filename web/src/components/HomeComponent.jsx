import React, { useContext, useEffect } from "react";
import { MENU_MESSAGE, MENU_SERVICE } from "../constant/menu";
import MenuContext from "../context/MenuContext";

const HomeComponent = ({ isShow }) => {
  const { resolution, menus, profile, setMenu } = useContext(MenuContext);

  return (
    <div
      className="relative flex flex-col justify-between w-full h-full"
      style={{
        backgroundImage: `url(${profile.wallpaper})`,
        backgroundSize: "cover",
        display: isShow ? "block" : "none",
      }}
    >
      <div
        className="py-2 px-6 text-green-800 grid grid-cols-4 gap-2 justify-items-center"
        style={{
          paddingTop: 50,
        }}
      >
        {menus.MENUS.map((v, i) => {
          return (
            <div
              onClick={() => setMenu(v.label)}
              key={i}
              className="relative w-11 h-11 flex flex-col items-center mb-6 cursor-pointer"
            >
              {/* {v.label === MENU_SERVICE ? (
                <span className="absolute rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center -top-2 -right-1.5 bg-red-500 text-white min-w-[20px] min-h-[20px]">
                  {profile.unread_message_service}
                </span>
              ) : null} */}
              <img className="rounded-xl" src={v.icon} alt="" />
              <div>
                <p className="text-xs text-white font-normal">{v.label}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex w-full absolute bottom-5">
        <div className="w-3"></div>
        <div
          className="w-full"
          style={{
            borderRadius: 25,
            backgroundColor: "rgb(255 255 255 / 0.3)",
          }}
        >
          <div
            className="py-3 px-3 text-green-800 grid grid-cols-4 gap-2 justify-items-center"
            style={{
              borderRadius: 30,
            }}
          >
            {menus.BOTTOM_MENUS.map((v, i) => {
              return (
                <div
                  onClick={() => setMenu(v.label)}
                  key={i}
                  className="relative w-11 h-11 flex flex-col items-center cursor-pointer"
                >
                  {/* {v.label === MENU_MESSAGE ? (
                    <span className="absolute rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center -top-2 -right-1.5 bg-red-500 text-white min-w-[20px] min-h-[20px]">
                      {profile.unread_message}
                    </span>
                  ) : null} */}
                  <img className="rounded-xl" src={v.icon} alt="" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-3"></div>
      </div>
    </div>
  );
};
export default HomeComponent;
