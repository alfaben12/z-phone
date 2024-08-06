import React, { useContext } from "react";
import { BOTTOM_MENU_CONSTANT, MENU_CONSTANT } from "../constant/menu";
import MenuContext from "../context/MenuContext";

const HomeComponent = ({ isShow }) => {
  const { setMenu } = useContext(MenuContext);

  return (
    <div
      className="relative flex flex-col justify-between w-full h-full"
      style={{
        backgroundImage: `url(./files/images/bg.png)`,
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
        {MENU_CONSTANT.map((v, i) => {
          return (
            <div
              onClick={() => setMenu(v.label)}
              key={i}
              className="w-11 h-11 flex flex-col items-center mb-6 cursor-pointer"
            >
              <div>
                <img className="rounded-xl" src={v.icon} alt="" />
              </div>
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
          className="w-full bg-slate-700/50"
          style={{
            borderRadius: 25,
          }}
        >
          <div
            className="py-3 px-3 text-green-800 grid grid-cols-4 gap-2 justify-items-center"
            style={{
              borderRadius: 30,
            }}
          >
            {BOTTOM_MENU_CONSTANT.map((v, i) => {
              return (
                <div
                  onClick={() => setMenu(v.label)}
                  key={i}
                  className="relative w-11 h-11 flex flex-col items-center cursor-pointer"
                >
                  {v.label === "Message" ? (
                    <span className="absolute rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4 bg-red-500 text-white min-w-[24px] min-h-[24px]">
                      5
                    </span>
                  ) : null}
                  <img className="rounded-2xl" src={v.icon} alt="" />
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
