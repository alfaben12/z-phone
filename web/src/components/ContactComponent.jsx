import React, { useContext, useEffect, useState } from "react";
import { MENU_DEFAULT } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import {
  MdArrowBackIosNew,
  MdEdit,
  MdWhatsapp,
  MdOutlinePhone,
  MdOutlineSearch,
  MdDelete,
} from "react-icons/md";
import LoadingComponent from "./LoadingComponent";
import { searchByKeyValueContains } from "../utils/common";

const ContactComponent = ({ isShow }) => {
  const { contacts, contactsBk, setMenu, setContacts } =
    useContext(MenuContext);
  const [selected, setSelected] = useState(null);

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
          Contact
        </span>
        <div className="flex items-center px-2 text-blue-500">
          {/* <MdEdit className='text-lg' /> */}
        </div>
      </div>
      {contacts == undefined ? (
        <LoadingComponent />
      ) : (
        <div
          className="no-scrollbar flex flex-col w-full h-full text-white overflow-y-auto"
          style={{
            paddingTop: 65,
          }}
        >
          <div className="bg-black flex items-center w-full pb-3">
            <div className="w-2"></div>
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <MdOutlineSearch className="text-lg" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="text-sm w-full text-white flex-1 border border-[#3D3D3F] focus:outline-none rounded-full px-2 py-1 pl-8 bg-[#3B3B3B]"
                onKeyUp={(e) => {
                  const data = searchByKeyValueContains(
                    contactsBk,
                    "name",
                    e.target.value
                  );
                  setContacts(data);
                }}
              />
            </div>
            <div className="w-2"></div>
          </div>
          {contacts.map((v, i) => {
            return (
              <div
                className="flex flex-col w-full justify-between border-b border-gray-900 pb-2 mb-2"
                key={i}
              >
                <div
                  className="flex space-x-3 items-center w-full pl-1 cursor-pointer"
                  onClick={() => setSelected(selected == i ? null : i)}
                >
                  <img
                    src="https://resized-image.uwufufu.com/selection/16733109502208426/720/Tommy%20T.jpg"
                    className="w-9 h-9 object-cover rounded-full"
                    alt=""
                    onError={(error) => {
                      error.target.src = "./files/images/noimage.jpg";
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium line-clamp-1">
                      {v.name}
                    </span>
                    <span className="text-xs text-gray-600">{v.add_at}</span>
                  </div>
                </div>
                <div
                  className="pt-2 pb-1"
                  style={{
                    display: selected == i ? "flex" : "none",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="border border-gray-800 hover:bg-gray-800 rounded-lg mr-4">
                    <MdEdit className="cursor-pointer text-2xl m-1" />
                  </div>
                  <div className="border border-gray-800 hover:bg-gray-800 rounded-lg mr-4">
                    <MdWhatsapp className="cursor-pointer text-2xl text-[#33C056] m-1" />
                  </div>
                  <div className="border border-gray-800 hover:bg-gray-800 rounded-lg mr-4">
                    <MdOutlinePhone className="cursor-pointer text-2xl text-yellow-600 m-1" />
                  </div>
                  <div className="border border-gray-800 hover:bg-gray-800 rounded-lg">
                    <MdDelete className="cursor-pointer text-2xl text-red-600 m-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default ContactComponent;
