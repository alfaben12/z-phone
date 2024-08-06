import React, { useContext, useState } from "react";
import { MENU_DEFAULT, PHONE_HEIGHT, PHONE_WIDTH } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew, MdCancel, MdReply } from "react-icons/md";
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
  const [tweetDetail, setTweetDetail] = useState(null);

  const [formDataTweet, setFormDataTweet] = useState({
    tweet: "",
  });

  const [formDataComment, setFormDataComment] = useState({
    comment: "",
  });

  const handleTweetFormChange = (e) => {
    const { name, value } = e.target;
    setFormDataTweet({
      ...formDataTweet,
      [name]: value,
    });
  };

  const handleCommentFormChange = (e) => {
    const { name, value } = e.target;
    setFormDataComment({
      ...formDataComment,
      [name]: value,
    });
  };

  const handleTweetFormSubmit = (e) => {
    e.preventDefault();
    if (!formDataTweet.tweet) {
      return;
    }

    console.log("Form Data formDataTweet:", formDataTweet);
    // Here you can add your code to send formData to an API
  };

  const handleCommentFormSubmit = (e) => {
    e.preventDefault();
    if (!formDataComment.comment) {
      return;
    }

    console.log("Form Data formDataComment:", formDataComment);
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
        className={`no-scrollbar absolute w-full z-30 overflow-auto text-white bg-black ${
          tweetDetail != null ? "visible" : "invisible"
        }`}
      >
        {tweetDetail == null ? (
          <LoadingComponent />
        ) : (
          <div className="relative flex flex-col rounded-xl h-full w-full px-3">
            <div
              className="rounded-lg flex flex-col w-full pt-8"
              style={{
                height: PHONE_HEIGHT,
              }}
            >
              <div className="flex w-full justify-between bg-black z-10 pb-2">
                <div
                  className="flex items-center text-blue-500 cursor-pointer"
                  onClick={() => {
                    setTweetDetail(null);
                  }}
                >
                  <MdArrowBackIosNew className="text-lg" />
                  <span className="text-xs">Back</span>
                </div>
                <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit"></span>
                <div className="flex items-center px-2 space-x-2 text-white"></div>
              </div>
              <div className="flex-1 overflow-y-auto bg-black pb-2 flex no-scrollbar">
                <div className="px-2 rounded-xl border border-black w-full">
                  <div className="flex justify-between items-center pt-1">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={tweetDetail.photo}
                        alt=""
                        onError={(error) => {
                          error.target.src = "./files/images/noimage.jpg";
                        }}
                      />
                      <div className="flex justify-between w-full">
                        <div className="ml-1.5 leading-tight">
                          <div className="line-clamp-1 text-white text-sm">
                            {tweetDetail.name}
                          </div>
                          <div className="line-clamp-1 text-xs text-gray-400 font-normal">
                            {tweetDetail.username}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-white block text-xs mt-2">
                    {tweetDetail.tweet}
                  </p>
                  {tweetDetail.image != "" ? (
                    <img
                      className="mt-2 rounded-lg border border-gray-800"
                      src={tweetDetail.image}
                      alt=""
                      onError={(error) => {
                        error.target.src = "./files/images/noimage.jpg";
                      }}
                    />
                  ) : null}

                  <div className="flex justify-between items-center pt-1">
                    <p className="text-gray-400 text-xs">
                      {tweetDetail.created_at}
                    </p>
                  </div>

                  <form
                    onSubmit={handleCommentFormSubmit}
                    className="flex border border-gray-700 rounded-full px-2 py-0.5 mt-3"
                  >
                    <input
                      type="text"
                      className="bg-black text-xs font-medium w-full focus:outline-none"
                      placeholder="Comment"
                      name="comment"
                      onChange={handleCommentFormChange}
                      autoComplete="off"
                      required
                    />
                    <button className="rounded-full" type="submit">
                      <img
                        src="./files/images/twitter-post.svg"
                        className="p-0.5 object-cover h-7 w-7"
                        alt=""
                      />
                    </button>
                  </form>

                  <div className="flex flex-col space-y-2 mt-3 pb-5">
                    {tweetDetail.comments.map((v, i) => {
                      return (
                        <div
                          key={i}
                          onClick={() => {
                            setTweetDetail(v);
                          }}
                        >
                          <div className="flex space-x-2">
                            <img
                              className="h-8 w-8 rounded-full object-cover mt-1"
                              src={v.photo}
                              alt=""
                              onError={(error) => {
                                error.target.src = "./files/images/noimage.jpg";
                              }}
                            />
                            <div className="flex flex-col w-full">
                              <div className="flex justify-between">
                                <div className="line-clamp-1 text-white">
                                  <span className="font-semibold text-sm">
                                    {v.name}{" "}
                                  </span>
                                  <span className="text-gray-500 text-xs">
                                    {v.username}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-500 text-xs">
                                    90d
                                  </span>
                                </div>
                              </div>
                              <p className="text-white block text-xs">
                                {v.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className="no-scrollbar flex flex-col w-full h-full overflow-y-auto"
        style={{
          paddingTop: 60,
        }}
      >
        <div
          className="flex flex-col space-y-5 px-2"
          style={{
            ...(subMenu !== subMenuList.tweet ? { display: "none" } : {}),
          }}
        >
          {tweets == undefined ? (
            <LoadingComponent />
          ) : (
            <>
              {tweets.map((v, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setTweetDetail(v);
                    }}
                  >
                    <div className="flex space-x-2">
                      <img
                        className="h-9 w-9 rounded-full object-cover mt-1"
                        src={v.photo}
                        alt=""
                        onError={(error) => {
                          error.target.src = "./files/images/noimage.jpg";
                        }}
                      />
                      <div className="flex flex-col w-full">
                        <div className="flex justify-between">
                          <div className="line-clamp-1 text-white">
                            <span className="font-semibold text-sm">
                              {v.name}{" "}
                            </span>{" "}
                            <span className="text-gray-500 text-xs">
                              {v.username}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500 text-xs">90d</span>
                          </div>
                        </div>
                        <p className="text-white block text-xs">{v.tweet}</p>
                        {v.image != "" ? (
                          <img
                            className="mt-1 rounded-lg border border-gray-800"
                            src={v.image}
                            alt=""
                            onError={(error) => {
                              error.target.src = "./files/images/noimage.jpg";
                            }}
                          />
                        ) : null}
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
            src="./files/images/twitter-post.svg"
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
                error.target.src = "./files/images/noimage.jpg";
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
