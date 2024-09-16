import React, { useContext, useEffect, useState } from "react";
import { MENU_DEFAULT, MENU_MESSAGE_CHATTING } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import {
  MdArrowBackIosNew,
  MdEdit,
  MdWhatsapp,
  MdOutlinePhone,
  MdOutlineSearch,
  MdDelete,
  MdClose,
} from "react-icons/md";
import { FaShare } from "react-icons/fa6";
import LoadingComponent from "./LoadingComponent";
import { searchByKeyValueContains } from "../utils/common";
import axios from "axios";
import { MENU_START_CALL_NOTIFICATION } from "./../constant/menu";

const ContactComponent = ({ isShow }) => {
  const {
    resolution,
    contacts,
    contactsBk,
    setMenu,
    setContacts,
    setContactsBk,
    setChatting,
    profile,
  } = useContext(MenuContext);
  const [selected, setSelected] = useState(null);
  const [formEdit, setFormEdit] = useState(null);

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setFormEdit({
      ...formEdit,
      [name]: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!formEdit) {
      return;
    }
    if (!formEdit.name) {
      return;
    }

    await axios
      .post("/update-contact", {
        name: formEdit.name,
        contact_citizenid: formEdit.contact_citizenid,
      })
      .then(function (response) {
        if (response.data) {
          const newContacts = contacts.map((obj) => {
            return {
              ...obj,
              name: formEdit.name,
            };
          });
          setContacts(newContacts);
          setContactsBk(newContacts);
          setFormEdit(null);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
    // Here you can add your code to send formData to an API
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
          formEdit ? "visible" : "invisible"
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
              <span className="truncate font-semibold">Update Contact</span>
              <div>
                <MdClose
                  className="text-2xl cursor-pointer text-white hover:text-red-500"
                  onClick={() => setFormEdit(null)}
                />
              </div>
            </div>
            <form onSubmit={handleEditSubmit} className="w-full">
              <div className="flex flex-col gap-1 py-2 text-xs">
                <span className="flex justify-between items-center text-sm">
                  <span>Name:</span>
                  <span>
                    <input
                      name="name"
                      value={formEdit?.name}
                      className="border-b w-full font-medium focus:outline-none bg-slate-700"
                      placeholder="John"
                      onChange={handleEdit}
                      autoComplete="off"
                      required
                    />
                  </span>
                </span>
                <span className="flex justify-between items-center text-sm">
                  <span>Phone:</span>
                  <span>{formEdit?.phone_number}</span>
                </span>
                <span className="flex justify-between items-center text-sm">
                  <span>Add at:</span>
                  <span>{formEdit?.add_at}</span>
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
          onClick={() => {
            setMenu(MENU_DEFAULT);
            setSelected(null);
            setFormEdit(null);
            setFormEdit(null);
          }}
        >
          <MdArrowBackIosNew className="text-lg" />
          <span className="text-xs">Back</span>
        </div>
        <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit">
          Contact
        </span>
        <div
          className="flex items-center space-x-1 px-2 group text-white hover:text-green-300"
          onClick={async () => {
            let result = null;
            try {
              const response = await axios.post("/share-contact", {});
              result = response.data;
            } catch (error) {
              console.error("error /share-contact", error);
            }
          }}
        >
          <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Share
          </span>
          <FaShare className="text-lg" />
        </div>
      </div>
      {contacts == undefined ? (
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
                    <span className="text-xs text-gray-600">
                      {v.phone_number}
                    </span>
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
                  <div
                    className="border border-gray-800 hover:bg-gray-800 rounded-lg mr-4"
                    onClick={() => setFormEdit(v)}
                  >
                    <MdEdit className="cursor-pointer text-2xl m-1" />
                  </div>
                  <div
                    className="border border-gray-800 hover:bg-gray-800 rounded-lg mr-4"
                    onClick={async () => {
                      await axios
                        .post("/new-or-continue-chat", {
                          to_citizenid: v.contact_citizenid,
                        })
                        .then(function (response) {
                          if (response.data) {
                            setChatting(response.data);
                            setMenu(MENU_MESSAGE_CHATTING);
                            setSelected(null);
                          }
                        })
                        .catch(function (error) {
                          console.log(error);
                        })
                        .finally(function () {});
                    }}
                  >
                    <MdWhatsapp className="cursor-pointer text-2xl text-[#33C056] m-1" />
                  </div>
                  <div
                    className="border border-gray-800 hover:bg-gray-800 rounded-lg mr-4"
                    onClick={async () => {
                      let result = null;
                      try {
                        const response = await axios.post("/start-call", {
                          from_avatar: profile.avatar,
                          from_phone_number: profile.phone_number,
                          to_phone_number: v.phone_number,
                        });
                        result = response.data;
                      } catch (error) {
                        console.error("error /start-call", error);
                      }
                    }}
                  >
                    <MdOutlinePhone className="cursor-pointer text-2xl text-yellow-600 m-1" />
                  </div>
                  <div
                    className="border border-gray-800 hover:bg-gray-800 rounded-lg"
                    onClick={async () => {
                      await axios
                        .post("/delete-contact", {
                          contact_citizenid: v.contact_citizenid,
                        })
                        .then(function (response) {
                          if (response.data) {
                            const newContacts = contacts.filter(
                              (item) =>
                                item.contact_citizenid !== v.contact_citizenid
                            );
                            setContacts(newContacts);
                            setContactsBk(newContacts);
                            setSelected(null);
                          }
                        })
                        .catch(function (error) {
                          console.log(error);
                        })
                        .finally(function () {});
                    }}
                  >
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
