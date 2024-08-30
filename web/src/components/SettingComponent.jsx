import React, { useContext, useEffect, useState } from "react";
import { MENU_DEFAULT } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew } from "react-icons/md";
import { FaMoon, FaMask, FaRegImage, FaUser } from "react-icons/fa6";

const SettingComponent = ({ isShow }) => {
  const { profile, setMenu } = useContext(MenuContext);
  const [isOnDisturb, setIsOnDisturb] = useState(false);
  const [isAnnonim, setIsAnnonim] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [wallpaper, setWallpaper] = useState("");

  const handleToggleIsOnDisturb = () => setIsOnDisturb(!isOnDisturb);
  const handleToggleIsAnnonim = () => setIsAnnonim(!isAnnonim);

  useEffect(() => {
    if (isShow) {
      setAvatar(profile.avatar);
      setWallpaper(profile.wallpaper);
      setIsAnnonim(profile.is_anonim);
      setIsOnDisturb(profile.is_donot_disturb);
    }
  }, [isShow]);

  const savePhotoOrWallpaper = (type) => {
    if (type == "avatar") {
      console.log(avatar);
    } else if (type == "wallpaper") {
      console.log(wallpaper);
    }
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
            <span className="text-xs line-clamp-1">{profile.phone}</span>
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
                Anonym Number
              </span>
              <div className="flex items-center justify-center">
                <div className="relative inline-block align-middle select-none">
                  <input
                    type="checkbox"
                    id="isAnnonim"
                    checked={isAnnonim}
                    onChange={handleToggleIsAnnonim}
                    className="hidden"
                  />
                  <label
                    htmlFor="isAnnonim"
                    className={`flex items-center cursor-pointer ${
                      isAnnonim ? "bg-green-400" : "bg-gray-300"
                    } relative block w-[40px] h-[25px] rounded-full transition-colors duration-300`}
                  >
                    <span
                      className={`block w-[20px] h-[20px] bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        isAnnonim ? "translate-x-[18px]" : "translate-x-[2px]"
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
                  onClick={() => savePhotoOrWallpaper("avatar")}
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
                  onClick={() => savePhotoOrWallpaper("wallpaper")}
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
