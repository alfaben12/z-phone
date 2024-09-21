import React, { useContext, useEffect, useState } from "react";
import { MENU_DEFAULT } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew } from "react-icons/md";
import { FaMoon, FaMask, FaRegImage, FaUser } from "react-icons/fa6";
import axios from "axios";
import { IoPhonePortraitOutline, IoResizeSharp } from "react-icons/io5";

const SettingComponent = ({ isShow }) => {
  const { resolution, profile, setMenu, setProfile, setResolution } =
    useContext(MenuContext);
  const [isOnDisturb, setIsOnDisturb] = useState(false);
  const [isAnonim, setIsAnonim] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [wallpaper, setWallpaper] = useState("");
  const [frame, setFrame] = useState("");
  const [sizeRatio, setSizeRatio] = useState(0);

  function generateDimensions(height) {
    const initWidthAndHeight = {
      initWidth: resolution.frameWidth,
      initHeight: resolution.frameHeight,
    };

    const aspectRatio =
      initWidthAndHeight.initHeight / initWidthAndHeight.initWidth;
    const newWidth = height / aspectRatio;
    const newRadius = height * 0.066;
    const newMargin = height * 0.033;
    let newScale = (height / initWidthAndHeight.initHeight) * resolution.scale;

    return {
      frameWidth: newWidth,
      frameHeight: height,
      layoutWidth: newWidth - newMargin,
      layoutHeight: height - newMargin,
      radius: newRadius,
      scale: newScale,
    };
  }

  const handleSizeRatioChange = (event) => {
    const ratio = generateDimensions(event.target.value);
    setSizeRatio(ratio.frameHeight);
    setResolution(ratio);
  };

  const handleToggleIsOnDisturb = () => {
    axios.post("/update-profile", {
      type: "is_donot_disturb",
      value: !isOnDisturb ? 1 : 0,
    });
    setIsOnDisturb(!isOnDisturb);
  };
  const handleToggleIsAnonim = () => {
    axios.post("/update-profile", {
      type: "is_anonim",
      value: !isAnonim ? 1 : 0,
    });
    setIsAnonim(!isAnonim);
  };

  useEffect(() => {
    if (isShow) {
      setFrame(profile.frame);
      setAvatar(profile.avatar);
      setWallpaper(profile.wallpaper);
      setIsAnonim(profile.is_anonim);
      setIsOnDisturb(profile.is_donot_disturb);
      setSizeRatio(resolution.frameHeight);
    }
  }, [isShow]);

  const saveSetting = async (type) => {
    let result;
    if (type == "avatar") {
      if (!avatar) {
        return;
      }
      result = await axios.post("/update-profile", {
        type: type,
        value: avatar,
      });
    } else if (type == "wallpaper") {
      if (!wallpaper) {
        return;
      }
      result = await axios.post("/update-profile", {
        type: type,
        value: wallpaper,
      });
    } else if (type == "frame") {
      if (!frame) {
        return;
      }
      result = await axios.post("/update-profile", {
        type: type,
        value: frame,
      });
    } else if (type == "phone_height") {
      if (!sizeRatio) {
        return;
      }
      result = await axios.post("/update-profile", {
        type: type,
        value: sizeRatio,
      });
    }

    setProfile(result.data);
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
          onClick={() => setMenu(MENU_DEFAULT)}
        >
          <MdArrowBackIosNew className="text-lg" />
          <span className="text-xs">Back</span>
        </div>
        <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit">
          Setting
        </span>
        <div className="flex items-center px-2 text-blue-500">
          {/* <MdEdit className='text-lg' /> */}
        </div>
      </div>
      <div
        className="no-scrollbar flex flex-col w-full h-full text-white overflow-y-auto px-2 space-y-3"
        style={{
          paddingTop: 60,
        }}
      >
        <div className="flex bg-gray-900 space-x-3 py-1 px-2 rounded-lg items-center">
          <img
            src={profile.avatar}
            className="w-12 h-12 rounded-full object-cover"
            alt=""
            onError={(error) => {
              error.target.src = "./images/noimage.jpg";
            }}
          />
          <div className="flex flex-col">
            <span className="text-sm line-clamp-1">{profile.name}</span>
            <span className="text-xs line-clamp-1">{profile.phone_number}</span>
          </div>
        </div>

        <div className="flex flex-col py-2 bg-gray-900 rounded-lg">
          <div className="flex space-x-3 px-2">
            <div>
              <div className="p-1 bg-fuchsia-800 rounded-lg">
                <FaMask />
              </div>
            </div>
            <div className="flex w-full justify-between items-center space-x-3 border-b border-gray-800 pb-1.5 mb-1.5">
              <span className="text-sm font-light line-clamp-1">
                Anonim Number
              </span>
              <div className="flex items-center justify-center">
                <div className="relative inline-block align-middle select-none">
                  <input
                    type="checkbox"
                    id="isAnonim"
                    checked={isAnonim}
                    onChange={handleToggleIsAnonim}
                    className="hidden"
                  />
                  <label
                    htmlFor="isAnonim"
                    className={`flex items-center cursor-pointer ${
                      isAnonim ? "bg-green-400" : "bg-gray-300"
                    } relative block w-[40px] h-[25px] rounded-full transition-colors duration-300`}
                  >
                    <span
                      className={`block w-[20px] h-[20px] bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        isAnonim ? "translate-x-[18px]" : "translate-x-[2px]"
                      }`}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-3 px-2">
            <div>
              <div className="p-1 bg-blue-800 rounded-lg">
                <FaMoon />
              </div>
            </div>
            <div className="flex w-full justify-between items-center space-x-3 border-b border-gray-800 pb-1.5 mb-1.5">
              <span className="text-sm font-light line-clamp-1">
                Do Not Disturb
              </span>
              <div className="flex items-center justify-center">
                <div className="relative inline-block align-middle select-none">
                  <input
                    type="checkbox"
                    id="isOnDisturb"
                    checked={isOnDisturb}
                    onChange={handleToggleIsOnDisturb}
                    className="hidden"
                  />
                  <label
                    htmlFor="isOnDisturb"
                    className={`flex items-center cursor-pointer ${
                      isOnDisturb ? "bg-green-400" : "bg-gray-300"
                    } relative block w-[40px] h-[25px] rounded-full transition-colors duration-300`}
                  >
                    <span
                      className={`block w-[20px] h-[20px] bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        isOnDisturb ? "translate-x-[18px]" : "translate-x-[2px]"
                      }`}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-3 px-2">
            <div>
              <div className="p-1 bg-pink-800 rounded-lg">
                <FaUser />
              </div>
            </div>
            <div className="flex w-full justify-between items-center space-x-2 border-b border-gray-800 pb-1.5 mb-1.5">
              <input
                type="text"
                placeholder="URL avatar"
                className="w-full text-xs text-white flex-1 border border-gray-700 focus:outline-none rounded-md px-2 py-1 bg-[#3B3B3B]"
                autoComplete="off"
                value={avatar}
                onChange={(e) => {
                  const { value } = e.target;
                  setAvatar(value);
                }}
              />
              <div className="flex items-center justify-center">
                <button
                  className="flex font-medium rounded-full text-white bg-blue-500 px-2 text-sm items-center justify-center"
                  type="button"
                  onClick={() => saveSetting("avatar")}
                >
                  <span>SAVE</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex space-x-3 px-2">
            <div>
              <div className="p-1 bg-sky-800 rounded-lg">
                <FaRegImage />
              </div>
            </div>
            <div className="flex w-full justify-between items-center space-x-2 border-b border-gray-800 pb-1.5 mb-1.5">
              <input
                type="text"
                placeholder="URL wallpaper"
                className="w-full text-xs text-white flex-1 border border-gray-700 focus:outline-none rounded-md px-2 py-1 bg-[#3B3B3B]"
                autoComplete="off"
                value={wallpaper}
                onChange={(e) => {
                  const { value } = e.target;
                  setWallpaper(value);
                }}
              />
              <div className="flex items-center justify-center">
                <button
                  className="flex font-medium rounded-full text-white bg-blue-500 px-2 text-sm items-center justify-center"
                  type="button"
                  onClick={() => saveSetting("wallpaper")}
                >
                  <span>SAVE</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex space-x-3 px-2">
            <div>
              <div className="p-1 bg-amber-800 rounded-lg">
                <IoPhonePortraitOutline />
              </div>
            </div>
            <div className="flex w-full justify-between items-center space-x-2 border-b border-gray-800 pb-1.5 mb-1.5">
              <select
                placeholder="Choose frame"
                className="w-full text-xs text-white flex-1 border border-gray-700 focus:outline-none rounded-md px-2 py-1 bg-[#3B3B3B]"
                onChange={(e) => {
                  const { value } = e.target;
                  setFrame(value);
                  setProfile((prevState) => ({
                    ...prevState,
                    frame: value,
                  }));
                }}
              >
                {["1.svg", "2.svg", "3.svg", "4.svg"].map((v, i) => {
                  if (v == frame) {
                    return (
                      <option key={i} value={v} selected>
                        Frame {v}
                      </option>
                    );
                  } else {
                    return (
                      <option key={i} value={v}>
                        Frame {v}
                      </option>
                    );
                  }
                })}
              </select>
              <div className="flex items-center justify-center">
                <button
                  className="flex font-medium rounded-full text-white bg-blue-500 px-2 text-sm items-center justify-center"
                  type="button"
                  onClick={() => saveSetting("frame")}
                >
                  <span>SAVE</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex space-x-3 px-2">
            <div>
              <div className="p-1 bg-sky-800 rounded-lg">
                <IoResizeSharp />
              </div>
            </div>
            <div className="flex w-full justify-between items-center space-x-2 border-b border-gray-800 pb-1.5 mb-1.5">
              <input
                type="range"
                min={500}
                max={720}
                step="0.01"
                value={sizeRatio}
                style={{ width: "100%" }}
                onChange={handleSizeRatioChange}
              />

              <div className="flex items-center justify-center">
                <button
                  className="flex font-medium rounded-full text-white bg-blue-500 px-2 text-sm items-center justify-center"
                  type="button"
                  onClick={() => saveSetting("phone_height")}
                >
                  <span>SAVE</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingComponent;
