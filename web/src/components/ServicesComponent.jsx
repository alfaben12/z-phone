import React, { useContext, useState } from "react";
import {
  MENU_DEFAULT,
  NAME,
  MENU_MESSAGE_CHATTING,
  CFG_SERVICES,
} from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew, MdClose } from "react-icons/md";
import LoadingComponent from "./LoadingComponent";
import { FaBell } from "react-icons/fa6";
import axios from "axios";

const ServicesComponent = ({ isShow }) => {
  const { resolution, profile, setMenu, services, setChatting, setServices } =
    useContext(MenuContext);
  const [isShowModal, setIsShowModal] = useState(false);
  const [ackReport, setAckReport] = useState(null);
  const [service, setService] = useState(null);
  const [subMenu, setSubMenu] = useState("list");
  const [solvedReason, setSolvedReason] = useState("");
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

  const handleMessageFormSubmit = async (e) => {
    e.preventDefault();
    if (!formDataMessage.message) {
      return;
    }

    formDataMessage.job = service.job;
    let result = null;
    try {
      const response = await axios.post(
        "/send-message-service",
        formDataMessage
      );
      result = response.data;
      setFormDataMessage({
        message: "",
      });
      setIsShowModal(false);
      setService(null);
    } catch (error) {
      console.error("error /send-message-service", error);
    }
  };

  const deleteMessages = (array, idToDelete) => {
    return array.filter((item) => item.id !== idToDelete);
  };

  return (
    <div
      className="relative flex flex-col w-full h-full"
      style={{
        display: isShow ? "block" : "none",
      }}
    >
      {subMenu == "list" ? (
        <>
          <div
            className={`no-scrollbar absolute w-full h-full z-30 overflow-auto py-10 text-white ${
              isShowModal ? "visible" : "invisible"
            }`}
            style={{
              height: resolution.layoutHeight,
              width: resolution.layoutWidth,
              backgroundColor: "rgba(31, 41, 55, 0.8)",
            }}
          >
            {service != null ? (
              <div className="flex flex-col justify-center rounded-xl h-full w-full px-3">
                <div className="bg-slate-700 rounded-lg py-2 flex flex-col w-full p-3">
                  <div className="flex justify-between items-center pb-1">
                    <span className="truncate font-semibold">
                      {service.service}
                    </span>
                    <div>
                      <MdClose
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
            ) : null}
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
            <div className="flex items-center px-2 text-white cursor-pointer hover:text-blue-400">
              {CFG_SERVICES.ALLOWED_JOBS.includes(profile?.job?.name) ? (
                <FaBell
                  className="text-lg"
                  onClick={() => setSubMenu("report")}
                />
              ) : null}
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
                {services?.list?.map((v, i) => {
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
                          {v.type.toUpperCase()}
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
        </>
      ) : null}

      {subMenu == "report" ? (
        <>
          <div
            className={`no-scrollbar absolute w-full z-30 overflow-auto py-10 text-white ${
              ackReport != null ? "visible" : "invisible"
            }`}
            style={{
              height: resolution.layoutHeight,
              width: resolution.layoutWidth,
              backgroundColor: "rgba(31, 41, 55, 0.8)",
            }}
          >
            {ackReport == null ? (
              <LoadingComponent />
            ) : (
              <div className="flex flex-col justify-center rounded-xl h-full w-full px-3">
                <div className="bg-slate-700 rounded-lg py-2 flex flex-col w-full p-3">
                  <div className="flex justify-between items-center pb-1">
                    <span className="truncate font-semibold">
                      {ackReport.phone_number}
                    </span>
                    <div>
                      <MdClose
                        className="text-2xl cursor-pointer text-white hover:text-red-500"
                        onClick={() => {
                          setAckReport(null);
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-col gap-1 py-2 text-xs">
                      <span className="flex justify-between items-center">
                        <textarea
                          value={ackReport.message}
                          name="message"
                          placeholder="Message for a service"
                          rows={5}
                          className="bg-black focus:outline-none text-white w-full text-xs resize-none no-scrollbar bg-slate-800 px-3 py-2 rounded-lg"
                          readOnly
                        ></textarea>
                      </span>
                    </div>
                    <input
                      placeholder="(REQUIRED) reason why it's solved"
                      className="bg-black focus:outline-none text-white w-full text-xs resize-none no-scrollbar bg-slate-800 px-3 py-2 rounded-lg"
                      onChange={(e) => {
                        const { value } = e.target;
                        setSolvedReason(value);
                      }}
                    />
                    <div className="flex justify-center space-x-2 py-2">
                      <button
                        className="px-2 py-1 text-white text-xs bg-green-500 hover:bg-green-600 text-center rounded"
                        onClick={async () => {
                          if (solvedReason == "") {
                            return;
                          }

                          await axios
                            .post("/solved-message-service", {
                              id: ackReport.id,
                              reason: solvedReason,
                            })
                            .then(function (response) {
                              if (response.data) {
                                setAckReport(null);
                                setServices((prevChatting) => ({
                                  ...prevChatting,
                                  reports: deleteMessages(
                                    services.reports,
                                    ackReport.id
                                  ),
                                }));
                              }
                            })
                            .catch(function (error) {
                              console.log(error);
                            })
                            .finally(function () {});
                        }}
                      >
                        Solved
                      </button>
                      <button
                        className="px-2 py-1 text-white text-xs bg-yellow-500 hover:bg-yellow-600 text-center rounded"
                        onClick={async () => {
                          await axios
                            .post("/new-or-continue-chat", {
                              to_citizenid: ackReport.citizenid,
                            })
                            .then(function (response) {
                              if (response.data) {
                                setChatting(response.data);
                                setMenu(MENU_MESSAGE_CHATTING);
                                setAckReport(null);
                              }
                            })
                            .catch(function (error) {
                              console.log(error);
                            })
                            .finally(function () {});
                        }}
                      >
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="absolute top-0 flex w-full justify-between py-2 bg-black pt-8 z-10">
            <div
              className="flex items-center px-2 text-blue-500 cursor-pointer"
              onClick={() => setSubMenu("list")}
            >
              <MdArrowBackIosNew className="text-lg" />
              <span className="text-xs">Back</span>
            </div>
            <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit">
              {/* Services */}
            </span>
            <div className="flex items-center px-2 text-white cursor-pointer hover:text-blue-400"></div>
          </div>
          <div
            className="no-scrollbar flex flex-col w-full h-full overflow-y-auto"
            style={{
              paddingTop: 60,
            }}
          >
            {services == undefined ? (
              <LoadingComponent />
            ) : (
              <>
                {services?.reports?.map((v, i) => {
                  return (
                    <div
                      className="flex flex-col pl-1 pr-1"
                      key={i}
                      onClick={() => {
                        setAckReport(v);
                      }}
                    >
                      <div
                        className={`w-full flex flex-col cursor-pointer text-white border-b border-gray-900 pb-1 mb-1 px-2 hover:text-green-400`}
                      >
                        <div className="flex text-xs justify-between w-full">
                          <span className="line-clamp-1">{v.phone_number}</span>
                          <span className="text-gray-300">{v.created_at}</span>
                        </div>
                        <span className="text-xs line-clamp-1">
                          {v.message}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};
export default ServicesComponent;
