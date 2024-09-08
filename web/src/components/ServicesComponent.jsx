import React, { useContext, useState } from "react";
import {
  MENU_DEFAULT,
  NAME,
  PHONE_HEIGHT,
  PHONE_WIDTH,
} from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew, MdCancel } from "react-icons/md";
import LoadingComponent from "./LoadingComponent";
import { FaBell } from "react-icons/fa6";

const ServicesComponent = ({ isShow }) => {
  const { setMenu, services, setInternalNotif } = useContext(MenuContext);
  const [isShowModal, setIsShowModal] = useState(false);
  const [service, setService] = useState(null);

  const [formDataMessage, setFormDataMessage] = useState({
    message: "",
  });

  const handleMessageFormChange = (e) => {
    const { name, value } = e.target;
    setFormDataMessage({
      ...formDataMessage,
      [name]: value,
    });
  };

  const handleMessageFormSubmit = (e) => {
    e.preventDefault();
    if (!formDataMessage.message) {
      return;
    }

    console.log("Form Data:", formDataMessage);
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
          isShowModal ? "visible" : "invisible"
        }`}
        style={{
          height: PHONE_HEIGHT,
          width: PHONE_WIDTH,
          backgroundColor: "rgba(31, 41, 55, 0.8)",
        }}
      >
        {service == null ? (
          <LoadingComponent />
        ) : (
          <div className="flex flex-col justify-center rounded-xl h-full w-full px-3">
            <div className="bg-slate-700 rounded-lg py-2 flex flex-col w-full p-3">
              <div className="flex justify-between items-center pb-1">
                <span className="truncate font-semibold">
                  {service.service}
                </span>
                <div>
                  <MdCancel
                    className="text-2xl text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => {
                      setFormDataMessage({
                        message: "",
                      });
                      setIsShowModal(false);
                      setService(null);
                    }}
                  />
                </div>
              </div>
              <form onSubmit={handleMessageFormSubmit} className="w-full">
                <div className="flex flex-col gap-1 py-2 text-xs">
                  <span className="flex justify-between items-center">
                    <textarea
                      value={formDataMessage.message}
                      name="message"
                      onChange={handleMessageFormChange}
                      placeholder="Message for a service"
                      rows={4}
                      className="bg-black focus:outline-none text-white w-full text-xs resize-none no-scrollbar bg-slate-800 p-3 rounded-lg"
                    ></textarea>
                  </span>
                  <div className="flex justify-end pt-2">
                    <button
                      className="flex font-medium rounded-full text-white bg-blue-500 px-3 py-1 text-sm items-center justify-center"
                      type="submit"
                    >
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
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
          {/* Services */}
        </span>
        <div className="flex items-center px-2 text-white">
          <FaBell className="text-lg" />
        </div>
      </div>
      <div
        className="no-scrollbar flex flex-col w-full h-full overflow-y-auto"
        style={{
          paddingTop: 60,
        }}
      >
        <div className="flex flex-col -mt-1 pb-2 px-2 absolute bg-black z-10">
          <div className="text-lg font-semibold text-white">
            {NAME} Services
          </div>
          <div className="text-xs text-gray-200">
            You can access {NAME} City's Services anytime and anywhere.
          </div>
        </div>
        {services == undefined ? (
          <LoadingComponent />
        ) : (
          <div
            className="grid grid-cols-2 gap-4 px-2 pb-3"
            style={{
              marginTop: 75,
            }}
          >
            {services.map((v, i) => {
              return (
                <div
                  className="relative flex flex-col bg-gray-800 rounded-xl items-center p-2"
                  key={i}
                >
                  <img
                    src={v.logo}
                    className="w-14 h-14 object-cover rounded-full mb-1"
                    alt=""
                    onError={(error) => {
                      error.target.src = "./images/noimage.jpg";
                    }}
                  />
                  <div
                    className="flex flex-col items-center"
                    style={{
                      minHeight: 80,
                    }}
                  >
                    <span className="text-white text-center text-xs line-clamp-2">
                      {v.service}
                    </span>
                    <span className="text-xs text-gray-200 font-medium pb-2">
                      Type: {v.type.toUpperCase()}
                    </span>
                  </div>
                  <div
                    className="absolute bottom-0 flex justify-center border-t w-full border-gray-600 py-1 cursor-pointer"
                    onClick={() => {
                      setIsShowModal(true);
                      setService(v);
                    }}
                  >
                    <span className="text-sm font-medium text-white">
                      Message
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default ServicesComponent;
