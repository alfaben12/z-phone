import React, { useContext, useState } from "react";
import {
  MENU_DEFAULT,
  MENU_MESSAGE_CHATTING,
  MENU_ADS,
} from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew, MdWhatsapp } from "react-icons/md";
import LoadingComponent from "./LoadingComponent";
import { IoCamera } from "react-icons/io5";
import Markdown from "react-markdown";
import axios from "axios";

const AdsComponent = ({ isShow }) => {
  const { profile, setMenu, ads, setAds, setChatting } =
    useContext(MenuContext);
  const [subMenu, setSubMenu] = useState("list");
  const [media, setMedia] = useState("");
  const [content, setContent] = useState("");

  const handleAdsFormChange = (e) => {
    const { value } = e.target;
    setContent(value);
  };

  const handleAdsFormSubmit = async (e) => {
    e.preventDefault();
    if (content == "") {
      return;
    }

    const response = await axios.post("/send-ads", {
      content: content,
      media: media,
    });

    setMedia("");
    setContent("");
    if (response.data) {
      setAds(response.data);
    }
    setSubMenu("list");
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

  const takePhoto = async () => {
    hide();
    await axios.post("/close");
    await axios
      .post("/TakePhoto")
      .then(function (response) {
        setMedia(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        show();
      });
  };

  const handleChat = async (v) => {
    await axios
      .post("/new-or-continue-chat", {
        to_citizenid: v.citizenid,
      })
      .then(function (response) {
        if (response.data) {
          setChatting(response.data);
          setSubMenu("list");
          setMenu(MENU_MESSAGE_CHATTING);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
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
          onClick={() => {
            if (subMenu == "create") {
              setMedia("");
              setContent("");
              setSubMenu("list");
            } else {
              setMenu(MENU_DEFAULT);
            }
          }}
        >
          <MdArrowBackIosNew className="text-lg" />
          <span className="text-xs">Back</span>
        </div>
        <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit">
          Ads
        </span>
        <div className="flex items-center px-2 text-green-500 cursor-pointer">
          {subMenu == "list" ? (
            <span
              className="text-xs font-medium"
              onClick={() => setSubMenu("create")}
            >
              +New
            </span>
          ) : null}
        </div>
      </div>
      {ads == undefined ? (
        <LoadingComponent />
      ) : (
        <div
          className="no-scrollbar flex flex-col w-full h-full text-white overflow-y-auto"
          style={{
            paddingTop: 60,
          }}
        >
          <div
            style={{
              ...(subMenu !== "list" ? { display: "none" } : {}),
            }}
          >
            {ads.map((v, i) => {
              return (
                <div className="bg-black px-4 py-2 rounded-xl w-full" key={i}>
                  <div className="flex justify-between w-full">
                    <div className="w-full grid grid-cols-6">
                      <img
                        src={v.avatar}
                        className="w-9 h-9 object-cover rounded-full"
                        alt=""
                        onError={(error) => {
                          error.target.src = "./images/noimage.jpg";
                        }}
                      />
                      <div className="leading-none col-span-4 space-y-1">
                        <div className="flex justify-between w-full">
                          <div className="ml-1.5 leading-tight">
                            <div className="line-clamp-1 text-white text-sm font-medium">
                              {v.name}
                            </div>
                            <div className="line-clamp-1 text-xs text-gray-400 font-normal">
                              {v.time}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between text-gray-400">
                        {profile.citizenid == v.citizenid ? null : (
                          <MdWhatsapp
                            className="cursor-pointer text-2xl text-[#33C056]"
                            onClick={() => {
                              handleChat(v);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-white block text-xs leading-snug mt-2">
                    <Markdown>{v.content}</Markdown>
                  </div>
                  {v.media != "" ? (
                    <img
                      className="mt-2 rounded-xl border border-gray-800"
                      src={v.media}
                      alt=""
                      onError={(error) => {
                        error.target.src = "./images/noimage.jpg";
                      }}
                    />
                  ) : null}
                  <div className="flex justify-center w-full">
                    <div className="border-b border-gray-900 w-1/2 pt-2"></div>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              ...(subMenu !== "create" ? { display: "none" } : {}),
            }}
          >
            <form
              onSubmit={handleAdsFormSubmit}
              className="flex flex-col space-y-2 w-full p-2 space-x-2"
            >
              <div className="flex-col space-y-1 w-full bg-gray-900 px-2 pt-2 rounded-lg">
                {media != "" ? (
                  <img src={media} className="rounded-lg" alt="" />
                ) : null}

                <textarea
                  value={content}
                  name="content"
                  onChange={handleAdsFormChange}
                  placeholder="WTB bahan pertanian..."
                  rows={4}
                  className="focus:outline-none text-white w-full text-xs resize-none no-scrollbar bg-gray-900 rounded-lg"
                ></textarea>
              </div>
              <div className="flex justify-between items-center">
                <IoCamera
                  className="text-white text-xl cursor-pointer hover:text-green-500"
                  onClick={takePhoto}
                />
                <button
                  type="submit"
                  className="rounded-full bg-green-500 px-4 py-1 font-semibold text-white text-sm hover:bg-green-600"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdsComponent;
