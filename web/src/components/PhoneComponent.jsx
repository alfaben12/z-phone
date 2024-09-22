import React, { useContext, useState } from "react";
import { MENU_DEFAULT } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import {
  MdArrowBackIosNew,
  MdDialpad,
  MdOutlinePhoneCallback,
  MdFormatListBulleted,
  MdOutlinePhone,
  MdBackspace,
  MdClose,
  MdOutlineCallMade,
  MdOutlineCallReceived,
  MdDelete,
} from "react-icons/md";
import LoadingComponent from "./LoadingComponent";
import { FaCheck } from "react-icons/fa6";
import axios from "axios";

const subMenuList = {
  call: "call",
  request: "request",
  keypad: "keypad",
};

const PhoneComponent = ({ isShow }) => {
  const {
    resolution,
    callHistories,
    contactRequests,
    profile,
    setMenu,
    setContactRequests,
  } = useContext(MenuContext);
  const [subMenu, setSubMenu] = useState(subMenuList["keypad"]);
  const [requestID, setRequestID] = useState(0);
  const [newPhone, setNewPhone] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [formDataNew, setFormDataNew] = useState({
    name: "",
  });

  const handlePhoneFormChange = (e) => {
    const { name, value } = e.target;
    setFormDataNew({
      ...formDataNew,
      [name]: value,
    });
  };

  const handlePhoneFormSubmit = async (e) => {
    e.preventDefault();
    if (!formDataNew.name) {
      return;
    }

    if (!newPhone) {
      return;
    }

    const data = {
      name: formDataNew.name,
      phone_number: newPhone,
      request_id: requestID,
    };

    try {
      const result = await axios.post("/save-contact", data);
      if (result.data) {
        setNewPhone("");

        if (requestID != 0) {
          setContactRequests(deleteContactRequest(contactRequests, requestID));
          setRequestID(0);
        }
      }
    } catch (error) {
      console.error("error /save-contact", error);
    }

    setFormDataNew({
      name: "",
    });
    setIsShowModal(false);
  };

  const handleKeyPress = (value) => {
    if (newPhone.length < 12) {
      setNewPhone(newPhone + value);
    }
  };

  const handleDelete = () => {
    setNewPhone(newPhone.slice(0, -1));
  };

  const deleteContactRequest = (array, idToDelete) => {
    return array.filter((item) => item.id !== idToDelete);
  };

  return (
    <div
      className="relative flex flex-col w-full h-full"
      style={{
        display: isShow ? "block" : "none",
      }}
    >
      <div
        className={`no-scrollbar absolute w-full z-30 overflow-auto py-10 text-white ${
          isShowModal ? "visible" : "invisible"
        }`}
        style={{
          height: resolution.layoutHeight,
          width: resolution.layoutWidth,
          backgroundColor: "rgba(31, 41, 55, 0.8)",
        }}
      >
        <div className="flex flex-col justify-center rounded-xl h-full w-full px-3">
          <div className="bg-slate-700 rounded-lg py-2 flex flex-col w-full p-3">
            <div className="flex justify-between items-center pb-2">
              <span className="truncate font-semibold">New Contact</span>
              <div>
                <MdClose
                  className="text-2xl cursor-pointer text-white hover:text-red-500"
                  onClick={() => setIsShowModal(false)}
                />
              </div>
            </div>
            <form onSubmit={handlePhoneFormSubmit} className="w-full">
              <div className="flex flex-col gap-1 py-2 text-xs">
                <span className="flex justify-between items-center">
                  <span>Name:</span>
                  <span>
                    <input
                      name="name"
                      className="border-b w-36 text-base font-medium focus:outline-none bg-slate-700"
                      placeholder="John"
                      onChange={handlePhoneFormChange}
                      autoComplete="off"
                      value={formDataNew.name}
                      required
                    />
                  </span>
                </span>
                <span className="flex justify-between items-center">
                  <span>Number:</span>
                  <span>
                    <input
                      name="phone"
                      className="border-b w-36 text-base font-medium focus:outline-none bg-slate-700"
                      placeholder="086263887"
                      readOnly={true}
                      value={newPhone}
                      autoComplete="off"
                      required
                    />
                  </span>
                </span>
                <div className="flex justify-end pt-2">
                  <button
                    className="flex font-medium rounded-full text-white bg-blue-500 px-3 py-1 text-sm items-center justify-center"
                    type="submit"
                  >
                    <span>SAVE</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="absolute top-0 flex w-full justify-between py-2 bg-black pt-8 z-10">
        <div
          className="flex items-center px-2 text-blue-500 cursor-pointer"
          onClick={() => setMenu(MENU_DEFAULT)}
        >
          <MdArrowBackIosNew className="text-lg" />
          <span className="text-xs">Back</span>
        </div>
        <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit"></span>
        <div className="flex items-center px-2 text-blue-500">
          {/* <MdEdit className='text-lg' /> */}
        </div>
      </div>
      <div
        className="no-scrollbar flex flex-col w-full h-full text-white overflow-y-auto"
        style={{
          paddingTop: 60,
        }}
      >
        {/* CALL */}
        <div
          className="pb-16"
          style={{
            ...(subMenu !== subMenuList["call"] ? { display: "none" } : {}),
          }}
        >
          {/* <div className="bg-black flex items-center w-full pb-3 pt-1">
            <div className="w-2"></div>
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <MdOutlineSearch className="text-lg" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                autoComplete="off"
                className="text-sm w-full text-white flex-1 border border-gray-700 focus:outline-none rounded-full px-2 py-1 pl-8 bg-[#3B3B3B]"
              />
            </div>
            <div className="w-2"></div>
          </div> */}
          {callHistories == undefined ? (
            <LoadingComponent />
          ) : (
            <>
              {callHistories.map((v, i) => {
                return (
                  <div
                    className="flex w-full justify-between border-b border-gray-900 pb-2 mb-2"
                    key={i}
                    // onClick={() => setMenu(MENU_MESSAGE_CHATTING)}
                  >
                    <div className="flex space-x-2 items-center w-full pl-1">
                      <img
                        src={!v.is_anonim ? v.avatar : "./images/anonim.jpg"}
                        className="w-9 h-9 object-cover rounded-full"
                        alt=""
                        onError={(error) => {
                          error.target.src = "./images/noimage.jpg";
                        }}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium line-clamp-1">
                          {!v.is_anonim
                            ? v.to_person
                            : v.flag == "OUT"
                            ? "(as anonim) " + v.to_person
                            : "Anonim"}
                        </span>
                        <span className="text-xs text-gray-400">
                          {v.created_at}
                        </span>
                      </div>
                    </div>
                    {v.flag == "OUT" ? (
                      <div className="flex space-x-2 pr-3 items-center cursor-pointer text-red-500 hover:text-red-600">
                        <MdOutlineCallMade className="text-2xl" />
                      </div>
                    ) : (
                      <div className="flex space-x-2 pr-3 items-center cursor-pointer text-green-500 hover:text-green-600">
                        <MdOutlineCallReceived className="text-2xl" />
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
        {/* REQUEST CONTACT */}
        <div
          className="pb-16"
          style={{
            ...(subMenu !== subMenuList["request"] ? { display: "none" } : {}),
          }}
        >
          {/* <div className="bg-black flex items-center w-full pb-3 pt-1">
            <div className="w-2"></div>
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <MdOutlineSearch className="text-lg" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                autoComplete="off"
                className="text-sm w-full text-white flex-1 border border-gray-700 focus:outline-none rounded-full px-2 py-1 pl-8 bg-[#3B3B3B]"
              />
            </div>
            <div className="w-2"></div>
          </div> */}
          {contactRequests == undefined ? (
            <LoadingComponent />
          ) : (
            <>
              {contactRequests.map((v, i) => {
                return (
                  <div
                    className="flex w-full justify-between border-b border-gray-900 pb-2 mb-2 items-center"
                    key={i}
                    // onClick={() => setMenu(MENU_MESSAGE_CHATTING)}
                  >
                    <div className="flex space-x-2 items-center w-full pl-1">
                      <img
                        src={v.avatar}
                        className="w-9 h-9 object-cover rounded-full"
                        alt=""
                        onError={(error) => {
                          error.target.src = "./images/noimage.jpg";
                        }}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium line-clamp-1">
                          {v.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {v.request_at}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-1 px-1">
                      <button
                        className="flex space-x-1 bg-gray-700 items-center px-2 cursor-pointer hover:bg-green-600 rounded-lg"
                        onClick={() => {
                          setRequestID(v.id);
                          setIsShowModal(true);
                          setNewPhone(v.name);
                        }}
                      >
                        <FaCheck className="text-sm" />
                        <span className="text-sm font-semibold py-0.5">
                          Save
                        </span>
                      </button>

                      <button
                        className="px-1 cursor-pointer hover:bg-red-500 rounded-lg"
                        onClick={async () => {
                          setRequestID(0);
                          setContactRequests(
                            deleteContactRequest(contactRequests, v.id)
                          );

                          let result = null;
                          try {
                            const response = await axios.post(
                              "/delete-contact-requests",
                              {
                                id: v.id,
                              }
                            );
                            result = response.data;
                          } catch (error) {
                            console.error(
                              "error /delete-contact-requests",
                              error
                            );
                          }
                        }}
                      >
                        <MdDelete className="text-lg" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        {/* KEYPAD */}
        <div
          className="flex flex-col items-center"
          style={{
            ...(subMenu !== subMenuList["keypad"] ? { display: "none" } : {}),
          }}
        >
          <div className="flex flex-col items-center pt-5 h-[50px]">
            <span className="text-2xl text-white" style={{}}>
              {newPhone}
            </span>
            <span
              className="text-xs text-blue-500 cursor-pointer"
              style={{
                display: newPhone.length > 0 ? "block" : "none",
              }}
              onClick={() => {
                setRequestID(0);
                setIsShowModal(true);
              }}
            >
              Add Number
            </span>
          </div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-2 mt-10">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map(
              (v, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => handleKeyPress(v.toString())}
                    className="flex justify-center items-center bg-[#333333] w-12 h-12 rounded-full text-2xl cursor-pointer"
                  >
                    {v}
                  </div>
                );
              }
            )}
          </div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-2 pt-2">
            <div></div>
            <div
              className="flex justify-center items-center bg-[#29d258] w-12 h-12 rounded-full text-3xl cursor-pointer"
              onClick={async () => {
                try {
                  const response = await axios.post("/start-call", {
                    from_avatar: profile.avatar,
                    from_phone_number: profile.phone_number,
                    to_phone_number: newPhone,
                  });
                  result = response.data;
                } catch (error) {
                  console.error("error /start-call", error);
                }
              }}
            >
              <MdOutlinePhone className="text-2xl" />
            </div>
            <div
              className="flex justify-center items-center w-11 h-11 rounded-full text-3xl cursor-pointer"
              onClick={() => handleDelete()}
            >
              <MdBackspace className="text-2xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full pb-2 pt-2.5 bg-black">
        <div className="grid h-full w-full grid-cols-3 mx-auto font-medium">
          <button
            type="button"
            className={`inline-flex flex-col items-center justify-center px-5 group ${
              subMenu === subMenuList["call"] ? "text-white" : "text-gray-600"
            }`}
            onClick={() => setSubMenu(subMenuList["call"])}
          >
            <MdOutlinePhoneCallback className="text-xl" />
            <span className="text-xs">Calls</span>
          </button>
          <button
            type="button"
            className={`inline-flex flex-col items-center justify-center px-5 group ${
              subMenu === subMenuList["request"]
                ? "text-white"
                : "text-gray-600"
            }`}
            onClick={() => setSubMenu(subMenuList["request"])}
          >
            <MdFormatListBulleted className="text-xl" />
            <span className="text-xs">Requests</span>
          </button>
          <button
            type="button"
            className={`inline-flex flex-col items-center justify-center px-5 group ${
              subMenu === subMenuList["keypad"] ? "text-white" : "text-gray-600"
            }`}
            onClick={() => setSubMenu(subMenuList["keypad"])}
          >
            <MdDialpad className="text-xl" />
            <span className="text-xs">Keypad</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default PhoneComponent;
