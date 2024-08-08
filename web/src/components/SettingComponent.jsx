import React, { useContext } from "react";
import { MENU_DEFAULT } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew } from "react-icons/md";

const SettingComponent = ({ isShow }) => {
  const { profile, setMenu } = useContext(MenuContext);

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
        className="no-scrollbar flex flex-col w-full h-full text-white overflow-y-auto px-2"
        style={{
          paddingTop: 60,
        }}
      >
        <div className="flex bg-gray-700 space-x-3 py-1 px-1 rounded-lg items-center">
          <div>
            <img
              src={profile.photo}
              className="w-12 h-12 rounded-full object-cover"
              alt=""
              onError={(error) => {
                error.target.src = "./files/images/noimage.jpg";
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm">{profile.name}</span>
            <span className="text-xs">{profile.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingComponent;
