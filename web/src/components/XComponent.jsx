import React, { useContext, useState } from "react";
import { MENU_DEFAULT } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew, MdReply } from "react-icons/md";
import { FaXTwitter, FaHashtag } from "react-icons/fa6";
import { GoMention } from "react-icons/go";
import { IoCamera } from "react-icons/io5";
import LoadingComponent from "./LoadingComponent";

const subMenuList = {
  create: "create",
  tweet: "tweet",
  mention: "mention",
  hashtag: "hashtags",
};

const XComponent = ({ isShow }) => {
  const { setMenu, tweets } = useContext(MenuContext);
  const [subMenu, setSubMenu] = useState(subMenuList.tweet);

  const [formDataTweet, setFormDataTweet] = useState({
    tweet: "",
  });

  const handleTweetFormChange = (e) => {
    const { name, value } = e.target;
    setFormDataTweet({
      ...formDataTweet,
      [name]: value,
    });
  };

  const handleTweetFormSubmit = (e) => {
    e.preventDefault();
    if (!formDataTweet.tweet) {
      return;
    }

    console.log("Form Data:", formDataTweet);
    // Here you can add your code to send formData to an API
  };
  return (
    <div
      className="relative flex flex-col w-full h-full"
      style={{
        display: isShow ? "block" : "none",
      }}
    >
      <div className="absolute top-0 flex w-full justify-between py-3 bg-black pt-8 z-10">
        <div
          className="flex items-center px-2 text-blue-500 cursor-pointer"
          onClick={() => {
            if (subMenuList.create === subMenu) {
              setSubMenu(subMenuList.tweet);
            } else {
              setMenu(MENU_DEFAULT);
            }
          }}
        >
          <MdArrowBackIosNew className="text-lg" />
          <span className="text-xs">Back</span>
        </div>
        <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit">
          <FaXTwitter className="text-white text-xl" />
        </span>
        <div className="flex items-center px-2 space-x-2 text-white">
          <FaHashtag className="text-lg hover:text-[#1d9cf0] cursor-pointer" />
          <GoMention className="text-lg hover:text-[#1d9cf0] cursor-pointer" />
        </div>
      </div>
      <div
        className="no-scrollbar flex flex-col w-full h-full overflow-y-auto"
        style={{
          paddingTop: 65,
        }}
      >
        <div
          style={{
            ...(subMenu !== subMenuList.tweet ? { display: "none" } : {}),
          }}
        >
          {tweets == null ? (
            <LoadingComponent />
          ) : (
            <>
              {tweets.map((v, i) => {
                return (
                  <div
                    className="bg-black px-2 pb-2 flex items-center justify-center"
                    key={i}
                  >
                    <div className="border-gray-800 px-4 py-3 rounded-xl border w-full">
                      <div className="flex justify-between items-center pt-1">
                        <div className="flex items-center">
                          <img
                            className="h-11 w-11 rounded-full object-cover"
                            src={v.photo}
                            alt=""
                            onError={(error) => {
                              error.target.src = "./images/noimage.jpg";
                            }}
                          />
                          <div className="flex justify-between w-full">
                            <div className="ml-1.5 leading-tight">
                              <div className="line-clamp-1 text-white text-sm">
                                {v.name}
                              </div>
                              <div className="line-clamp-1 text-xs text-gray-400 font-normal">
                                {v.username}
                              </div>
                            </div>
                          </div>
                        </div>
                        <FaXTwitter className="text-lg text-white" />
                      </div>

                      <p className="text-white block text-xs mt-2">{v.tweet}</p>
                      {v.photo != "" ? (
                        <img
                          className="mt-2 rounded-lg border border-gray-800"
                          src={v.photo}
                          alt=""
                          onError={(error) => {
                            error.target.src = "./images/noimage.jpg";
                          }}
                        />
                      ) : null}

                      <div className="flex justify-between items-center pt-1">
                        <p className="text-gray-400 text-xs">{v.created_at}</p>
                        <div className="cursor-pointer">
                          <MdReply className="text-2xl text-white hover:text-[#1d9cf0]" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        <div
          style={{
            ...(subMenu !== subMenuList.tweet ? { display: "none" } : {}),
          }}
          className="absolute bottom-10 right-5 h-10 w-10 rounded-full bg-gray-700  cursor-pointer"
          onClick={() => setSubMenu(subMenuList.create)}
        >
          <img
            src="./images/twitter-post.svg"
            className="p-2 object-cover text-[#000000]"
            alt=""
          />
        </div>

        <div
          style={{
            ...(subMenu !== subMenuList.create ? { display: "none" } : {}),
          }}
        >
          <form
            onSubmit={handleTweetFormSubmit}
            className="flex w-full p-2 space-x-2"
          >
            <img
              className="w-9 h-9 rounded-full"
              src="https://live.staticflickr.com/4323/35987264406_c0b2af1dcc_b.jpg"
              alt=""
              onError={(error) => {
                error.target.src = "./images/noimage.jpg";
              }}
            />

            <div className="flex-col space-y-2 w-full">
              <textarea
                defaultValue={formDataTweet.tweet}
                name="tweet"
                onChange={handleTweetFormChange}
                placeholder="What's happening?"
                rows={4}
                className="bg-black focus:outline-none text-white w-full text-xs resize-none no-scrollbar bg-gray-900 p-3 rounded-lg"
              ></textarea>
              <div className="flex justify-between items-center">
                <IoCamera className="text-white text-xl cursor-pointer hover:text-[#1d9cf0]" />
                <button className="rounded-full bg-[#1d9cf0] px-4 py-1 font-semibold text-white text-sm hover:bg-[#0975bd]">
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default XComponent;
