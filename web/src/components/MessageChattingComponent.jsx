import React, { useContext, useRef, useEffect } from "react";
import { MENU_DEFAULT, PHONE_WIDTH, MENU_MESSAGE } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import {
  MdOutlinePhone,
  MdArrowBackIosNew,
  MdSend,
  MdOutlineCameraAlt,
} from "react-icons/md";
import TextTruncate from "./TextTruncate";

const MessageChattingComponent = ({ isShow }) => {
  const { setMenu } = useContext(MenuContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [isShow]);

  return (
    <div
      className="relative flex flex-col w-full h-full"
      style={{
        display: isShow ? "block" : "none",
      }}
    >
      <div className="absolute top-0 flex w-full justify-between py-3 bg-black pt-8 z-10">
        <div className="flex items-center px-2 space-x-2 cursor-pointer">
          <MdArrowBackIosNew
            className="text-lg text-blue-500"
            onClick={() => setMenu(MENU_MESSAGE)}
          />

          <img
            src="https://resized-image.uwufufu.com/selection/16733109502208426/720/Tommy%20T.jpg"
            className="w-8 h-8 object-cover rounded-full"
            alt=""
          />
          <span className="text-sm text-white">
            <TextTruncate
              text={`Luka Rossi Luka Rossi Luka Rossi Luka Rossi`}
              size={20}
            />
          </span>
        </div>

        <div className="flex items-center px-2 text-white cursor-pointer">
          <MdOutlinePhone className="text-lg" />
        </div>
      </div>
      <div
        className="flex flex-col w-full h-full text-white overflow-y-auto"
        style={{
          paddingTop: 65,
        }}
      >
        <div className="flex-1 justify-between flex flex-col h-full">
          <div
            ref={messagesEndRef}
            id="messages"
            className="no-scrollbar flex flex-col space-y-4 p-3 overflow-y-auto pb-16"
          >
            {[...Array(50)].map((_, i) => {
              return i % 2 === 0 ? (
                <div className="flex items-end" key={i}>
                  <div
                    className="relative flex flex-col text-xs items-start"
                    style={{ maxWidth: `${PHONE_WIDTH - 50}px` }}
                  >
                    <span className="pb-5 px-4 py-2 rounded-lg inline-block rounded-bl-none bg-[#242527] text-white">
                      Can be verified on any platform using docker
                    </span>
                    <span
                      className="absolute bottom-1 right-1 text-gray-300"
                      style={{
                        fontSize: 10,
                      }}
                    >
                      20:59
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-end justify-end" key={i}>
                  <div
                    className="relative flex flex-col text-xs items-end"
                    style={{ maxWidth: `${PHONE_WIDTH - 50}px` }}
                  >
                    <span className="pb-5 px-4 py-2 rounded-lg inline-block rounded-br-none bg-[#134D37] text-white">
                      Your error message says permission denied, npm global
                      installs must be given root privileges privileges sada.
                    </span>
                    <span
                      className="absolute bottom-1 right-1 text-gray-300"
                      style={{
                        fontSize: 10,
                      }}
                    >
                      20:05
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 bg-black flex items-center w-full pb-5 pt-3">
        <div className="flex items-center text-white ml-2 mr-2 cursor-pointer">
          <MdOutlineCameraAlt className="text-xl" />
        </div>
        <input
          type="text"
          placeholder="Type your message..."
          className="text-xs text-white flex-1 border border-[#3D3D3F] focus:outline-none rounded-full px-2 py-1 bg-[#3B3B3B]"
        />
        <div className="flex items-center bg-[#33C056] text-black rounded-full p-1.5 ml-2 mr-2 hover:bg-[#134d37] cursor-pointer">
          <MdSend className="text-sm" />
        </div>
      </div>
    </div>
  );
};
export default MessageChattingComponent;
