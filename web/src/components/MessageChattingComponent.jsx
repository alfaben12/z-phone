import React, { useContext, useRef, useEffect, useState } from "react";
import { MENU_DEFAULT, MENU_MESSAGE } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import {
  MdOutlinePhone,
  MdArrowBackIosNew,
  MdSend,
  MdOutlineCameraAlt,
} from "react-icons/md";
import axios from "axios";
import { useLongPress } from "@uidotdev/usehooks";

const MessageChattingComponent = ({ isShow }) => {
  const { setMenu, chatting, setChatting, profile, resolution } =
    useContext(MenuContext);
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState("");
  const [media, setMedia] = useState("");
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      // behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatting]);

  const handleMessage = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const sendMessage = async () => {
    // console.log("send " + message);
    setMessage("");

    const response = await axios.post("/send-chatting", {
      conversationid: chatting.conversationid,
      message: message,
      media: "",
      conversation_name: chatting.conversation_name,
      to_citizenid: chatting.citizenid,
      is_group: chatting.is_group,
    });

    if (response.data) {
      const newMessage = {
        time: "just now",
        message: message,
        sender_citizenid: profile.citizenid,
        id: response.data,
      };
      setChatting((prevChatting) => ({
        ...prevChatting,
        chats: [...prevChatting.chats, newMessage],
      }));
    }
  };

  function hide() {
    const container = document.getElementById("z-phone-root-frame");
    container.setAttribute("class", "z-phone-fadeout");
    setTimeout(function () {
      container.setAttribute("class", "z-phone-invisible");
    }, 300);
  }

  function show() {
    const container = document.getElementById("z-phone-root-frame");
    container.setAttribute("class", "z-phone-fadein");
    setTimeout(function () {
      container.setAttribute("class", "z-phone-visible");
    }, 300);
  }

  const sendMessageMedia = async () => {
    hide();
    await axios.post("/close");
    await axios
      .post("/TakePhoto")
      .then(async function (response) {
        const responseSend = await axios.post("/send-chatting", {
          conversationid: chatting.conversationid,
          message: "",
          media: response.data,
          conversation_name: chatting.conversation_name,
          to_citizenid: chatting.citizenid,
          is_group: chatting.is_group,
        });

        if (responseSend.data) {
          const newMessage = {
            time: "just now",
            message: "",
            media: response.data,
            sender_citizenid: profile.citizenid,
            id: responseSend.data,
          };
          setChatting((prevChatting) => ({
            ...prevChatting,
            chats: [...prevChatting.chats, newMessage],
          }));
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        show();
      });
  };

  const onPressChat = useLongPress(
    (event) => {
      const data = JSON.parse(event.target.dataset.info);
      if (data) {
        setDeleteMessage(data);
        setIsOpenDelete(true);
      }
    },
    {
      onStart: (event) => console.log("Press started"),
      onFinish: (event) => console.log("Press Finished"),
      onCancel: (event) => console.log("Press cancelled"),
      threshold: 500,
    }
  );

  return (
    <div
      className="relative flex flex-col w-full h-full"
      style={{
        display: isShow ? "block" : "none",
      }}
    >
      <div
        className={`absolute w-full z-20 ${
          isOpenDelete ? "visible" : "invisible"
        }`}
        style={{
          height: resolution.layoutHeight ? resolution.layoutHeight : 0,
          width: resolution.layoutWidth ? resolution.layoutWidth : 0,
          backgroundColor: "rgba(31, 41, 55, 0.8)",
        }}
      >
        <div className="flex flex-col justify-center h-full w-full px-5">
          <div className="flex flex-col space-y-2 bg-slate-600 w-full rounded p-3">
            <span className="text-white text-sm font-semibold">
              Delete message?
            </span>
            <span className="text-white text-sm">
              {deleteMessage?.msg?.message == ""
                ? "Media"
                : deleteMessage?.msg?.message}
            </span>
            <div className="flex justify-end space-x-4">
              <button
                className="rounded text-sm text-white"
                onClick={() => {
                  setDeleteMessage(null);
                  setIsOpenDelete(false);
                }}
              >
                Cancel
              </button>
              <button
                className="rounded text-sm text-red-500"
                onClick={async () => {
                  const response = await axios.post("/delete-message", {
                    id: deleteMessage?.msg?.id,
                  });

                  if (response.data) {
                    chatting.chats[deleteMessage?.index].is_deleted = true;
                    setChatting((prevChatting) => ({
                      ...prevChatting,
                      chats: chatting.chats,
                    }));
                  }

                  setDeleteMessage(null);
                  setIsOpenDelete(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {chatting == undefined ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="absolute top-0 flex w-full justify-between py-1.5 bg-black pt-8 z-10">
            <div className="flex items-center px-2 space-x-2 cursor-pointer">
              <div>
                <MdArrowBackIosNew
                  className="text-lg text-blue-500"
                  onClick={() => setMenu(MENU_MESSAGE)}
                />
              </div>

              <img
                src={chatting.avatar}
                className="w-8 h-8 object-cover rounded-full"
                alt=""
                onError={(error) => {
                  error.target.src = "./images/noimage.jpg";
                }}
              />
              <div className="flex flex-col">
                <div className="text-sm text-white line-clamp-1 font-medium">
                  {chatting.conversation_name}
                </div>
                <span className="text-xss font-light text-gray-400">
                  last seen {chatting.last_seen}
                </span>
              </div>
            </div>

            <div>
              {!chatting.is_group ? (
                <div
                  className="flex items-center px-2 text-white cursor-pointer hover:text-green-600"
                  onClick={async () => {
                    try {
                      const response = await axios.post("/start-call", {
                        from_avatar: profile.avatar,
                        from_phone_number: profile.phone_number,
                        to_phone_number: chatting.phone_number,
                      });
                      result = response.data;
                    } catch (error) {
                      console.error("error /start-call", error);
                    }
                  }}
                >
                  <MdOutlinePhone className="text-lg" />
                </div>
              ) : null}
            </div>
          </div>

          <div
            className="flex flex-col w-full h-full text-white overflow-y-auto"
            style={{
              paddingTop: 60,
            }}
          >
            <div className="flex-1 justify-between flex flex-col h-full">
              <div className="no-scrollbar flex flex-col space-y-4 p-3 overflow-y-auto pb-12">
                {chatting.chats &&
                  chatting.chats.map((v, i) => {
                    return !(v.sender_citizenid == profile.citizenid) ? (
                      <div className="flex items-end" key={i}>
                        <div
                          className="relative flex flex-col text-xs items-start"
                          style={{
                            maxWidth: `${resolution.layoutWidth - 50}px`,
                          }}
                        >
                          <span
                            className="pb-4 px-2 py-1.5 rounded-lg inline-block rounded-bl-none bg-[#242527] text-white text-left"
                            style={{
                              minWidth: `100px`,
                            }}
                          >
                            {v.is_deleted ? (
                              <span className="text-gray-200 italic">
                                This message was deleted
                              </span>
                            ) : (
                              <>
                                {v.message == "" ? (
                                  <img
                                    className="rounded pb-1"
                                    src={v.media}
                                    alt=""
                                    data-info={JSON.stringify({
                                      msg: v,
                                      index: i,
                                    })}
                                  />
                                ) : (
                                  <span
                                    data-info={JSON.stringify({
                                      msg: v,
                                      index: i,
                                    })}
                                  >
                                    {v.message}
                                  </span>
                                )}
                              </>
                            )}
                          </span>
                          <span
                            className="absolute bottom-0 right-1 text-gray-100"
                            style={{
                              fontSize: 10,
                            }}
                          >
                            {v.time}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="flex items-end justify-end"
                        key={i}
                        {...(v.is_deleted || v.minute_diff > 30
                          ? null
                          : onPressChat)}
                      >
                        <div
                          className="relative flex flex-col text-xs items-end"
                          style={{
                            maxWidth: `${resolution.layoutWidth - 50}px`,
                          }}
                        >
                          <div
                            className="pb-4 px-2 py-1.5 rounded-lg inline-block rounded-br-none bg-[#134D37] text-white text-left"
                            style={{
                              minWidth: `100px`,
                            }}
                          >
                            {v.is_deleted ? (
                              <span className="text-gray-200 italic">
                                This message was deleted
                              </span>
                            ) : (
                              <>
                                {v.message == "" ? (
                                  <img
                                    className="rounded pb-1"
                                    src={v.media}
                                    alt=""
                                    data-info={JSON.stringify({
                                      msg: v,
                                      index: i,
                                    })}
                                  />
                                ) : (
                                  <span
                                    data-info={JSON.stringify({
                                      msg: v,
                                      index: i,
                                    })}
                                  >
                                    {v.message}
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                          <span
                            className="absolute bottom-0.5 right-1 text-gray-100"
                            style={{
                              fontSize: 10,
                            }}
                          >
                            {v.time}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                <div ref={messagesEndRef}></div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 bg-black flex items-center w-full pb-5 pt-2">
            <div
              className="flex flex-wrap items-center text-white ml-2 mr-2 cursor-pointer"
              onClick={sendMessageMedia}
            >
              <MdOutlineCameraAlt className="text-xl" />
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full text-xs text-white flex-1 border border-gray-700 focus:outline-none rounded-full px-2 py-1 bg-[#3B3B3B]"
                value={message}
                autoComplete="off"
                onChange={handleMessage}
              />
            </div>
            <div
              onClick={sendMessage}
              className="flex items-center bg-[#33C056] text-black rounded-full p-1.5 ml-2 mr-2 hover:bg-[#134d37] cursor-pointer text-white"
            >
              <MdSend className="text-sm" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default MessageChattingComponent;
