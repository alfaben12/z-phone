import React, { useContext, useState } from "react";
import { MENU_DEFAULT, MENU_MESSAGE_CHATTING } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew, MdOutlineSearch } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { searchByKeyValueContains } from "../utils/common";
import Select from "react-select";
import axios from "axios";

const MessageComponent = ({ isShow }) => {
  const { setMenu, chats, resolution, setChats, chatsBk, setChatting } =
    useContext(MenuContext);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [errorCreateGroup, setErrorCreateGroup] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [contactGroup, setContactGroup] = useState([]);
  const [selectedGroupContact, setSelectedGroupContact] = useState([]);

  const handleChangeGroupName = (e) => {
    const { value } = e.target;
    setGroupName(value);
    if (value != "") {
      setErrorCreateGroup(null);
    }
  };

  const handleChangeSelectedGroupContact = (selectedOptions) => {
    setSelectedGroupContact(selectedOptions);
    if (selectedOptions.length >= 3) {
      setErrorCreateGroup(null);
    }
  };

  const handleCreateGroup = async () => {
    if (selectedGroupContact.length < 3) {
      setErrorCreateGroup(
        "Please add at least three contacts to create a group."
      );
      return;
    }

    if (groupName == "") {
      setErrorCreateGroup("Please fill group name.");
      return;
    }

    try {
      const response = await axios.post("/create-group", {
        name: groupName,
        phone_numbers: selectedGroupContact.map((item) => item.value),
      });
    } catch (error) {
      console.error("error /get-contacts", error);
    }

    setIsOpenCreate(false);
    setSelectedGroupContact([]);
    setGroupName("");
  };
  return (
    <div
      className="relative flex flex-col w-full h-full"
      style={{
        display: isShow ? "block" : "none",
      }}
    >
      <div
        className="absolute bottom-10 right-5 h-10 w-10 rounded-full bg-gray-800 cursor-pointer z-50 flex items-center justify-center text-white"
        onClick={async () => {
          try {
            const response = await axios.post("/get-contacts");
            setContactGroup(
              response.data.map((item) => ({
                value: item.phone_number,
                label: item.name,
              }))
            );
            setIsOpenCreate(true);
          } catch (error) {
            console.error("error /get-contacts", error);
          }
        }}
      >
        <FaUserGroup className="text-lg" />
      </div>
      <div
        style={{
          display: isOpenCreate ? "block" : "none",
        }}
      >
        <div
          className="absolute bottom-0 left-0 z-30"
          style={{
            height: resolution.layoutHeight ? resolution.layoutHeight : 0,
            width: resolution.layoutWidth ? resolution.layoutWidth : 0,
            backgroundColor: "rgba(31, 41, 55, 0.8)",
          }}
          onClick={() => {
            setIsOpenCreate(false);
            setSelectedGroupContact([]);
            setGroupName("");
          }}
        ></div>
        <div className="absolute bottom-0 left-0 w-full bg-slate-800 rounded-t-lg pb-8 z-50">
          <div className="flex flex-col space-y-1 px-4">
            <div
              className="flex justify-center cursor-pointer py-3"
              onClick={() => {
                setIsOpenCreate(false);
                setSelectedGroupContact([]);
                setGroupName("");
              }}
            >
              <div className="w-1/3 h-1 bg-white rounded-full"></div>
            </div>
            <div className="text-white flex items-center space-x-2 pb-2">
              <Select
                value={selectedGroupContact}
                isMulti
                name="contact"
                options={contactGroup}
                className="text-black text-sm bg-black w-full"
                classNamePrefix="select"
                placeholder="Choose contact"
                onChange={handleChangeSelectedGroupContact}
                styles={{
                  menu: (provided) => ({
                    ...provided,
                    maxHeight: 200, // Set max height
                    overflowY: "auto", // Enable scrolling
                    padding: 0, // Remove padding
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    padding: 4, // Adjust padding for options
                  }),
                }}
              />
            </div>
            <input
              type="text"
              placeholder="Group Name"
              className="w-full text-sm text-white flex-1 border border-slate-600 bg-slate-800 focus:outline-none rounded pl-2 pr-1 py-2.5"
              autoComplete="off"
              name="name"
              required
              value={groupName}
              onChange={handleChangeGroupName}
            />
            <span className="text-white text-xs pb-1 pt-1">
              <strong>Note</strong>: Only saved contacts can be added. The group
              creator serves as the admin, so please set conditions for the
              group.
              {/* Only saved contacts can be added, but other
              members can also add contacts from their saved list. The group
              creator serves as the admin, so please set conditions for the
              group. */}
            </span>
            {errorCreateGroup != null ? (
              <span className="text-red-500 text-xs">{errorCreateGroup}</span>
            ) : null}
            <button
              className="px-2 py-1 bg-blue-500 rounded font-semibold text-sm text-white"
              onClick={handleCreateGroup}
            >
              Create Group
            </button>
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
            paddingTop: 60,
          }}
        >
          <div className="bg-black flex items-center w-full pb-3 pt-1">
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
                    chatsBk,
                    "conversation_name",
                    e.target.value
                  );
                  setChats(data);
                }}
              />
            </div>
            <div className="w-2"></div>
          </div>

          {chats.map((v, i) => {
            if (v.last_message != null) {
              return (
                <div
                  className="flex flex-col pl-1 pr-1"
                  key={i}
                  onClick={() => {
                    setMenu(MENU_MESSAGE_CHATTING);
                    setChatting(v);
                  }}
                >
                  <div
                    className={`w-full cursor-pointer flex space-x-2
                  ${v.is_read ? "text-gray-400" : "text-white"}`}
                  >
                    <img
                      src={v.avatar}
                      className="w-9 h-9 object-cover rounded-full"
                      alt=""
                      onError={(error) => {
                        error.target.src = "./images/noimage.jpg";
                      }}
                    />
                    <div className="flex justify-between border-b border-gray-900 pb-2 mb-2 w-full">
                      <div className="leading-1 col-span-4 text-sm">
                        <div className="line-clamp-1">
                          {v.conversation_name}
                        </div>
                        <div className="text-xs line-clamp-1">
                          {v.last_message}
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-xs">{v.last_message_time}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};
export default MessageComponent;
