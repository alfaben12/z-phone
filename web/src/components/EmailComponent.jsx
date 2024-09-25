import React, { useContext } from "react";
import { MENU_DEFAULT, MENU_EMAIL_DETAIL } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew, MdOutlineSearch } from "react-icons/md";
import LoadingComponent from "./LoadingComponent";
import { searchByKeyValueContains } from "../utils/common";

const EmailComponent = ({ isShow }) => {
  const { setMenu, emails, setEmails, emailsBk, setEmail } =
    useContext(MenuContext);

  const handleDetail = async (v) => {
    setEmail(v);
    setMenu(MENU_EMAIL_DETAIL);
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
            paddingTop: 60,
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
                className="text-sm w-full text-white flex-1 border border-gray-700 focus:outline-none rounded-full px-2 py-1 pl-8 bg-[#3B3B3B]"
                autoComplete="off"
                onKeyUp={(e) => {
                  const data = searchByKeyValueContains(
                    emailsBk,
                    "subject",
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
                onClick={() => handleDetail(v)}
              >
                <div
                  className={`w-full flex space-x-2 ${
                    v.is_read ? "text-gray-400" : "text-white"
                  }`}
                >
                  <img
                    src={v.avatar}
                    className="w-9 h-9 object-cover rounded-full"
                    alt=""
                    onError={(error) => {
                      error.target.src = "./images/noimage.jpg";
                    }}
                  />
                  <div className="leading-1 col-span-4 text-sm">
                    <div className="line-clamp-1">{v.name}</div>
                    <div className="line-clamp-1 text-xs">{v.subject}</div>
                    <div className="text-xs line-clamp-1 text-gray-400">
                      {v.content}
                    </div>
                  </div>
                  {/* <div className="flex flex-col items-end justify-between text-gray-400">
                    <div className="text-xss">{v.created_at}</div>
                  </div> */}
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
