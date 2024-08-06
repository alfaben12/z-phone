import React, { useContext, useState } from "react";
import { MENU_DEFAULT, PHONE_HEIGHT, PHONE_WIDTH } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import {
  MdArrowBackIosNew,
  MdDialpad,
  MdOutlinePhoneCallback,
  MdFormatListBulleted,
  MdOutlinePhone,
  MdBackspace,
  MdCancel,
} from "react-icons/md";
import LoadingComponent from "./LoadingComponent";

const subMenuList = {
  call: "call",
  history: "history",
  keypad: "keypad",
};

const PhoneComponent = ({ isShow }) => {
  const { callHistories, setMenu } = useContext(MenuContext);
  const [subMenu, setSubMenu] = useState(subMenuList["keypad"]);
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

  const handlePhoneFormSubmit = (e) => {
    e.preventDefault();
    if (!formDataNew.name) {
      return;
    }

    if (!newPhone) {
      return;
    }

    const data = {
      name: formDataNew.name,
      phone: newPhone,
    };
    console.log("Form Data:", data);
    // Here you can add your code to send formData to an API
  };

  const handleKeyPress = (value) => {
    if (newPhone.length < 12) {
      setNewPhone(newPhone + value);
    }
  };

  const handleDelete = () => {
    setNewPhone(newPhone.slice(0, -1));
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
          height: PHONE_HEIGHT,
          width: PHONE_WIDTH,
          backgroundColor: "rgba(31, 41, 55, 0.8)",
        }}
      >
        <div className="flex flex-col justify-center rounded-xl h-full w-full px-3">
          <div className="bg-slate-700 rounded-lg py-2 flex flex-col w-full p-3">
            <div className="flex justify-between items-center pb-2">
              <span className="truncate font-semibold">New Contact</span>
              <div>
                <MdCancel
                  className="text-2xl text-red-500 cursor-pointer hover:text-red-700"
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
          paddingTop: 65,
        }}
      >
        {/* CALL */}
        <div
          className="pb-16"
          style={{
            ...(subMenu !== subMenuList["call"] ? { display: "none" } : {}),
          }}
        >
          {/* <div className="bg-black flex items-center w-full pb-3">
            <div className="w-2"></div>
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <MdOutlineSearch className="text-lg" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                autoComplete="off"
                className="text-sm w-full text-white flex-1 border border-[#3D3D3F] focus:outline-none rounded-full px-2 py-1 pl-8 bg-[#3B3B3B]"
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
                    <div className="flex space-x-3 items-center w-full pl-1">
                      <img
                        src={v.photo}
                        className="w-9 h-9 object-cover rounded-full"
                        alt=""
                        onError={(error) => {
                          error.target.src = "./files/images/noimage.jpg";
                        }}
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium line-clamp-1">
                          {v.from}
                        </span>
                        <span className="text-xs text-gray-400">
                          {v.created_at}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 pr-3 items-center cursor-pointer hover:text-green-500">
                      <MdOutlinePhone className="text-2xl" />
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        {/* HISTORY */}
        <div
          className="flex justify-center items-center"
          style={{
            ...(subMenu !== subMenuList["history"] ? { display: "none" } : {}),
          }}
        >
          <span className="text-white text-sm">Sorry not ready for now.</span>
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
            <div className="flex justify-center items-center bg-[#29d258] w-12 h-12 rounded-full text-3xl cursor-pointer">
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
                subMenu === subMenuList["history"]
                  ? "text-white"
                  : "text-gray-600"
              }`}
              onClick={() => setSubMenu(subMenuList["history"])}
            >
              <MdFormatListBulleted className="text-xl" />
              <span className="text-xs">History</span>
            </button>
            <button
              type="button"
              className={`inline-flex flex-col items-center justify-center px-5 group ${
                subMenu === subMenuList["keypad"]
                  ? "text-white"
                  : "text-gray-600"
              }`}
              onClick={() => setSubMenu(subMenuList["keypad"])}
            >
              <MdDialpad className="text-xl" />
              <span className="text-xs">Keypad</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PhoneComponent;
