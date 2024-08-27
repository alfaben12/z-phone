import React, { useContext, useState } from "react";
import { MENU_DEFAULT } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew } from "react-icons/md";
import LoadingComponent from "./LoadingComponent";
import { FaBell } from "react-icons/fa6";
import { useSwipeable } from "react-swipeable";
import { IoMdHeart, IoMdClose } from "react-icons/io";

const LovyComponent = ({ isShow }) => {
  const { setMenu, lovys } = useContext(MenuContext);
  const [subMenu, setSubMenu] = useState("list");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    delta: 10,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    setTimeout(() => {
      handleNext();
      setSwipeDirection(null);
    }, 300);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % lovys.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + lovys.length) % lovys.length
    );
  };

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
          onClick={() => {
            if (subMenu == "match") {
              setSubMenu("list");
            } else {
              setMenu(MENU_DEFAULT);
            }
          }}
        >
          <MdArrowBackIosNew className="text-lg" />
          <span className="text-xs">Back</span>
        </div>
        <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit">
          Lovy
        </span>
        <div className="flex items-center px-2 text-white cursor-pointer">
          {subMenu == "list" ? (
            <span
              className="text-xs font-medium"
              onClick={() => setSubMenu("match")}
            >
              <FaBell className="text-lg" />
            </span>
          ) : null}
        </div>
      </div>
      {lovys == undefined ? (
        <LoadingComponent />
      ) : (
        <div
          className="no-scrollbar flex flex-col w-full h-full text-white overflow-y-auto"
          style={{
            paddingTop: 60,
          }}
        >
          <div
            style={{
              ...(subMenu !== "list" ? { display: "none" } : {}),
            }}
          >
            {/* <div className="flex space-x-3 pb-2 items-center">
              <span className="text-sm">Filter:</span>
              <div className="flex space-x-1">
                <button className="text-center text-sm border border-gray-200 px-1 rounded-lg">
                  male
                </button>
                <button className="text-center text-sm border border-gray-200 px-1 rounded-lg">
                  female
                </button>
              </div>
            </div> */}
            <div
              {...handlers}
              className="relative w-full h-[350px] flex justify-center items-center overflow-hidden"
            >
              {lovys.map((v, index) => (
                <div
                  key={index}
                  className={`absolute transition-transform duration-500 ease-out ${
                    index === currentIndex ? "z-10" : "z-0"
                  } ${
                    index === (currentIndex + 1) % lovys.length
                      ? "scale-90"
                      : ""
                  }`}
                  style={{
                    transform: `
              translateX(${
                index === currentIndex
                  ? "0"
                  : index < currentIndex
                  ? "-100%"
                  : "100%"
              })
              ${
                index === currentIndex
                  ? `rotate(${
                      swipeDirection === "left"
                        ? "-15deg"
                        : swipeDirection === "right"
                        ? "15deg"
                        : "0"
                    })`
                  : ""
              }
            `,
                  }}
                >
                  <img
                    src={v.photo}
                    className="w-full h-[350px] object-cover rounded-lg"
                    alt=""
                    onError={(error) => {
                      error.target.src = "./images/noimage.jpg";
                    }}
                  />
                  <div className="absolute bottom-2 left-2">
                    <div className="flex flex-col">
                      <span className="line-clamp-1 text-xl font-semibold">
                        {v.name}
                      </span>
                      <span className="line-clamp-1 text-lg font-semibold">
                        {v.age} y.o
                      </span>
                      <span className="line-clamp-3 text-sm">{v.bio}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full z-20 flex justify-center space-x-3 pt-5">
              <button
                className="rounded-full border-4 border-red-100 active:bg-red-100"
                onClick={handlePrev}
              >
                <IoMdClose className="text-3xl m-1 text-red-400" />
              </button>

              <button
                className="rounded-full border-4 border-teal-100 active:bg-teal-100"
                onClick={handleNext}
              >
                <IoMdHeart className="text-3xl m-1 text-teal-400" />
              </button>
            </div>
          </div>
          <div
            style={{
              ...(subMenu !== "match" ? { display: "none" } : {}),
            }}
          ></div>
        </div>
      )}
    </div>
  );
};
export default LovyComponent;
