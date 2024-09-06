import React, { useContext, useState, useEffect } from "react";
import { MENU_DEFAULT, MENU_GALLERY } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew } from "react-icons/md";
import axios from "axios";

const CameraComponent = ({ isShow }) => {
  const { setMenu } = useContext(MenuContext);

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
      .then(async function (response) {
        if (response.data != "" && response.data != null) {
          savePhoto(response.data);
        } else {
          setMenu(MENU_DEFAULT);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        show();
      });
  };

  const savePhoto = async (url) => {
    await axios
      .post("/save-photos", { url: url })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        show();
        setMenu(MENU_GALLERY);
      });
  };

  useEffect(() => {
    if (isShow) {
      takePhoto();
    }
  }, [isShow]);

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
            setMenu(MENU_DEFAULT);
          }}
        >
          <MdArrowBackIosNew className="text-lg" />
          <span className="text-xs">Back</span>
        </div>
        <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit">
          Camera
        </span>
        <div className="flex items-center px-2 text-white cursor-pointer"></div>
      </div>
      <div
        className="no-scrollbar flex flex-col w-full h-full text-white overflow-y-auto"
        style={{
          paddingTop: 60,
        }}
      >
        <div className="pt-5 flex justify-center text-sm">
          Photos can check on gallery!
        </div>
      </div>
    </div>
  );
};
export default CameraComponent;
