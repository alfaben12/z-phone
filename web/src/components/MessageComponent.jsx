import React, { useContext } from "react";
import { MENU_DEFAULT, MENU_MESSAGE_CHATTING } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew, MdOutlineSearch } from "react-icons/md";
import { searchByKeyValueContains } from "../utils/common";

const MessageComponent = ({ isShow }) => {
  const { setMenu, chats, setChats, chatsBk } = useContext(MenuContext);

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
          Message
        </span>
        <div className="flex items-center px-2 text-blue-500">
          {/* <MdEdit className='text-lg' /> */}
        </div>
      </div>

      {chats == undefined ? (
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
                    chatsBk,
                    "name",
                    e.target.value
                  );
                  setChats(data);
                }}
              />
            </div>
            <div className="w-2"></div>
          </div>

          {chats.map((v, i) => {
            return (
              <div
                className="flex flex-col pl-1 pr-1"
                key={i}
                onClick={() => setMenu(MENU_MESSAGE_CHATTING)}
              >
                <div className="w-full cursor-pointer grid grid-cols-6">
                  <img
                    src="https://resized-image.uwufufu.com/selection/16733109502208426/720/Tommy%20T.jpg"
                    className="w-9 h-9 object-cover rounded-full"
                    alt=""
                    onError={(error) => {
                      error.target.src = "./images/noimage.jpg";
                    }}
                  />
                  <div className="leading-none col-span-4 text-sm border-b border-gray-900 pb-2 mb-2">
                    <div className="line-clamp-1">{v.name}</div>
                    <div
                      className={`text-xs line-clamp-1 ${
                        v.isRead ? "text-gray-500" : "text-white"
                      }`}
                    >
                      {v.message}
                    </div>
                  </div>
                  <div
                    className={`flex flex-col items-end justify-between ${
                      v.isRead ? "text-gray-400" : "text-white"
                    }`}
                  >
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
export default MessageComponent;
