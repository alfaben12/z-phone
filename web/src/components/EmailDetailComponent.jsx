import React, { useContext } from "react";
import { MENU_EMAIL } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import LoadingComponent from "./LoadingComponent";
import Markdown from "react-markdown";

const EmailDetailComponent = ({ isShow }) => {
  const { setMenu, email, profile } = useContext(MenuContext);

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
          onClick={() => setMenu(MENU_EMAIL)}
        >
          <MdArrowBackIosNew className="text-lg" />
          <span className="text-xs">Back</span>
        </div>
        <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit"></span>
        <div className="flex items-center px-2 text-red-700">
          {/* <FaRegTrashAlt className="text-lg" /> */}
        </div>
      </div>
      {email == null ? (
        <LoadingComponent />
      ) : (
        <div
          className="no-scrollbar flex flex-col w-full h-full text-white overflow-y-auto"
          style={{
            paddingTop: 60,
          }}
        >
          <div className="w-full flex flex-col px-4 py-2">
            <div className="flex items-center text-base pb-5">
              <div>{email.subject}</div>
            </div>
            <div className="flex w-full cursor-pointer space-x-2">
              <img
                src={email.avatar}
                className="w-9 h-9 object-cover rounded-full"
                alt=""
                onError={(error) => {
                  error.target.src = "./images/noimage.jpg";
                }}
              />
              <div className="flex w-full justify-between">
                <div className="text-sm pb-2 mb-2">
                  <span className="text-xs line-clamp-1 font-medium">
                    {email.name}
                  </span>
                  <div className="flex items-center text-gray-400 text-xs">
                    <span className="text-xs"> to me </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="text-gray-400">
                  <div className="text-xss">{email.created_at}</div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col justify-between flex-1 mt-2 overflow-auto text-xs">
              <div>
                <p>Hello, {profile.name}.</p>
                <p className="mt-3">
                  <Markdown>{email.content}</Markdown>
                </p>
                <p className="mt-4">Best,</p>
                <p>{email.name}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default EmailDetailComponent;
