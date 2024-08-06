import React, { useContext } from "react";
import { MENU_DEFAULT, MENU_EMAIL_DETAIL } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew, MdOutlineSearch } from "react-icons/md";
import LoadingComponent from "./LoadingComponent";
import { searchByKeyValueContains } from "../utils/common";

const EmailComponent = ({ isShow }) => {
  const { setMenu, emails, setEmails, emailsBk, setEmail } =
    useContext(MenuContext);

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
          Email
        </span>
        <div className="flex items-center px-2 text-blue-500">
          {/* <MdEdit className='text-lg' /> */}
        </div>
      </div>
      {emails == undefined ? (
        <LoadingComponent />
      ) : (
        <div
          className="no-scrollbar flex flex-col w-full h-full text-white overflow-y-auto"
          style={{
            paddingTop: 65,
          }}
        >
          <div className="bg-black flex items-center w-full pb-1">
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
                    emailsBk,
                    "title",
                    e.target.value
                  );
                  setEmails(data);
                }}
              />
            </div>
            <div className="w-2"></div>
          </div>

          <div className="pl-1 py-2">
            <span className="text-xs font-medium text-gray-400">Inbox</span>
          </div>
          {emails.map((v, i) => {
            return (
              <div
                className="flex flex-col pb-4 pl-1 cursor-pointer"
                key={i}
                onClick={() => {
                  setEmail(v);
                  setMenu(MENU_EMAIL_DETAIL);
                }}
              >
                <div
                  className={`w-full grid grid-cols-6 ${
                    v.isRead ? "text-gray-400" : "text-white"
                  }`}
                >
                  <img
                    src={v.photo}
                    className="w-9 h-9 object-cover rounded-full"
                    alt=""
                    onError={(error) => {
                      error.target.src = "./assets/images/noimage.jpg";
                    }}
                  />
                  <div className="leading-1 col-span-4 text-sm">
                    <div className="line-clamp-1">{v.name}</div>
                    <div className="line-clamp-1 text-xs">{v.title}</div>
                    <div className="text-xs line-clamp-1">{v.body}</div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <div className="text-xs">{v.time}</div>
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
export default EmailComponent;
