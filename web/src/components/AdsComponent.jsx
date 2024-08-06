import React, { useContext, useState } from "react";
import { MENU_DEFAULT, MENU_MESSAGE_CHATTING } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew, MdWhatsapp } from "react-icons/md";
import LoadingComponent from "./LoadingComponent";
import { IoCamera } from "react-icons/io5";

const AdsComponent = ({ isShow }) => {
  const { setMenu, ads } = useContext(MenuContext);
  const [subMenu, setSubMenu] = useState("list");

  const [formDataAds, setFormDataAds] = useState({
    body: "",
  });

  const handleAdsFormChange = (e) => {
    const { name, value } = e.target;
    setFormDataAds({
      ...formDataAds,
      [name]: value,
    });
  };

  const handleAdsFormSubmit = (e) => {
    e.preventDefault();
    if (!formDataAds.body) {
      return;
    }

    console.log("Form Data:", formDataAds);
    // Here you can add your code to send formData to an API
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
                        src={v.photo}
                        className="w-9 h-9 object-cover rounded-full"
                        alt=""
                        onError={(error) => {
                          error.target.src = "./files/images/noimage.jpg";
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
                        <MdWhatsapp
                          className="cursor-pointer text-2xl text-[#33C056]"
                          onClick={() => setMenu(MENU_MESSAGE_CHATTING)}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-white block text-xs leading-snug mt-2">
                    {v.body}
                  </p>
                  {v.bodyImg != "" ? (
                    <img
                      className="mt-2 rounded-xl border border-gray-800"
                      src="https://img.gta5-mods.com/q95/images/2019-toyota-supra-gr-add-on-jp-spec/e272f6-70586135_2352786718319603_8588253215382831104_o.jpg"
                      alt=""
                      onError={(error) => {
                        error.target.src = "./files/images/noimage.jpg";
                      }}
                    />
                  ) : null}
                  <div className="flex justify-center w-full">
                    <div className="border-b border-gray-900 w-1/2 pt-4"></div>
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
              className="flex w-full p-2 space-x-2"
            >
              <div className="flex-col space-y-2 w-full">
                <textarea
                  defaultValue={formDataAds.body}
                  name="body"
                  onChange={handleAdsFormChange}
                  placeholder="WTB bahan pertanian..."
                  rows={4}
                  className="bg-black focus:outline-none text-white w-full text-xs resize-none no-scrollbar bg-gray-900 p-3 rounded-lg"
                ></textarea>
                <div className="flex justify-between items-center">
                  <IoCamera className="text-white text-xl cursor-pointer hover:text-green-500" />
                  <button className="rounded-full bg-green-500 px-4 py-1 font-semibold text-white text-sm hover:bg-green-600">
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdsComponent;
