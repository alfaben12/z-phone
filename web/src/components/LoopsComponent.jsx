import React, { useContext, useState } from "react";
import { MENU_DEFAULT } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew } from "react-icons/md";
import { FaHashtag, FaRegComment, FaRegUser } from "react-icons/fa6";
import { GoMention } from "react-icons/go";
import { IoCamera } from "react-icons/io5";
import LoadingComponent from "./LoadingComponent";
import Markdown from "react-markdown";
import { LuRepeat2 } from "react-icons/lu";
import { faker } from "@faker-js/faker";
import axios from "axios";

const subMenuList = {
  create: "create",
  tweet: "tweet",
  profile: "profile",
  signup: "signup",
  signin: "signin",
};

const LoopsComponent = ({ isShow }) => {
  const { resolution, profile, tweets, setTweets, setMenu } =
    useContext(MenuContext);
  const [subMenu, setSubMenu] = useState(subMenuList.signin);
  const [tweetDetail, setTweetDetail] = useState(null);
  const [media, setMedia] = useState("");
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

  const handleTweetFormSubmit = async (e) => {
    e.preventDefault();
    if (!formDataTweet.tweet) {
      return;
    }

    console.log("Form Data formDataTweet:", formDataTweet);
    try {
      const response = await axios.post("/send-tweet", {
        tweet: formDataTweet.tweet,
        media: media,
      });

      if (response.data != null) {
        setTweets(response.data);
        setMedia("");
        setFormDataTweet({
          tweet: "",
        });
        setSubMenu(subMenuList.tweet);
      }
    } catch (error) {
      console.error("error /new-tweet", error);
    }
    // Here you can add your code to send formData to an API
  };

  const handleCommentFormSubmit = (e) => {
    e.preventDefault();
    if (!formDataComment.comment) {
      return;
    }

    setTweetDetail((prev) => ({
      ...prev,
      comments: [
        {
          comment: formDataComment.comment,
          name: profile.name,
          avatar: profile.avatar,
          username: profile.username,
          created_at: "now",
        },
        ...prev.comments,
      ],
    }));

    axios.post("/send-tweet-comments", {
      tweetid: tweetDetail.id,
      tweet_citizenid: tweetDetail.citizenid,
      comment: formDataComment.comment,
    });

    setFormDataComment({
      comment: "",
    });
  };

  const getComments = async (tweet) => {
    tweet.comments = [];
    setTweetDetail(tweet);

    let result = [];
    try {
      const response = await axios.post("/get-tweet-comments", {
        tweetid: tweet.id,
        tweet_citizenid: tweet.citizenid,
      });
      result = response.data;
    } catch (error) {
      console.error("error /get-tweet-comments", error);
    }

    setTweetDetail((prev) => ({
      ...prev,
      comments: result,
    }));
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
          <img
            src="./images/loops-white.svg"
            className="p-0.5 object-cover w-7"
            alt=""
          />
        </span>
        {subMenuList.profile == subMenu ? null : (
          <div
            className="flex items-center px-2 space-x-2 text-white cursor-pointer"
            onClick={() => setSubMenu(subMenuList.profile)}
          >
            <FaRegUser className="text-lg hover:text-[#1d9cf0]" />
          </div>
        )}
      </div>
      <div
        className={`no-scrollbar absolute w-full z-30 overflow-auto text-white bg-black ${
          tweetDetail != null ? "visible" : "invisible"
        }`}
      >
        {tweetDetail == null ? (
          <LoadingComponent />
        ) : (
          <div className="relative flex flex-col rounded-xl h-full w-full px-2">
            <div
              className="rounded-lg flex flex-col w-full pt-8"
              style={{
                height: resolution.layoutHeight,
              }}
            >
              <div className="flex w-full justify-between bg-black z-10 pb-2.5">
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
                <div className="rounded-xl border border-black w-full">
                  <div className="flex justify-between items-center pt-1">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={tweetDetail.avatar}
                        alt=""
                        onError={(error) => {
                          error.target.src = "./images/noimage.jpg";
                        }}
                      />
                      <div className="flex justify-between w-full">
                        <div className="ml-1.5 leading-tight">
                          <div className="line-clamp-1 text-white text-sm">
                            {tweetDetail.name}
                          </div>
                          <div className="line-clamp-1 text-xs text-gray-400 font-normal">
                            @{tweetDetail.username}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-white block text-xs mt-2">
                    <Markdown>{tweetDetail.tweet}</Markdown>
                  </div>
                  {tweetDetail.media != "" ? (
                    <img
                      className="mt-2 rounded-lg border border-gray-800"
                      src={tweetDetail.media}
                      alt=""
                      onError={(error) => {
                        error.target.src = "./images/noimage.jpg";
                      }}
                    />
                  ) : null}

                  <div className="flex justify-between items-center pt-1">
                    <div className="flex space-x-3 items-center ml-1">
                      <div className="flex space-x-1 items-center">
                        <span className="text-sm text-gray-200">
                          <FaRegComment />
                        </span>
                        <span className="text-sm text-gray-200">
                          {tweetDetail.comment}
                        </span>
                      </div>
                      <div
                        className="flex space-x-1 items-center cursor-pointer"
                        onClick={() => {
                          setTweetDetail(null);
                          setSubMenu(subMenuList.create);
                        }}
                      >
                        <span className="text-lg text-gray-200">
                          <LuRepeat2 />
                        </span>
                        <span className="text-sm text-gray-200">
                          {tweetDetail.repost}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs">
                      {tweetDetail.created_at}d
                    </p>
                  </div>

                  <form
                    onSubmit={handleCommentFormSubmit}
                    className="flex border border-gray-700 rounded-full px-2 py-0.5 mt-2"
                  >
                    <input
                      type="text"
                      className="bg-black text-xs font-medium w-full focus:outline-none"
                      placeholder="Comment"
                      name="comment"
                      value={formDataComment.comment}
                      autoComplete="off"
                      onChange={handleCommentFormChange}
                      required
                    />
                    <button className="rounded-full" type="submit">
                      <img
                        src="./images/loops-tweet.svg"
                        className="p-0.5 object-cover h-7 w-7"
                        alt=""
                      />
                    </button>
                  </form>

                  <div className="flex flex-col space-y-2 mt-3 pb-5">
                    {tweetDetail.comments.map((v, i) => {
                      return (
                        <div key={i}>
                          <div className="flex space-x-2">
                            <img
                              className="h-8 w-8 rounded-full object-cover mt-1"
                              src={v.avatar}
                              alt=""
                              onError={(error) => {
                                error.target.src = "./images/noimage.jpg";
                              }}
                            />
                            <div className="flex flex-col w-full">
                              <div className="flex justify-between">
                                <div className="line-clamp-1 text-white">
                                  <span className="font-semibold text-sm">
                                    {v.name}{" "}
                                  </span>
                                  <span className="text-gray-500 text-xs">
                                    @{v.username}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-500 text-xs">
                                    {v.created_at}d
                                  </span>
                                </div>
                              </div>
                              <div className="text-white block text-xs">
                                <Markdown>{v.comment}</Markdown>
                              </div>
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
        className={`no-scrollbar absolute w-full z-40 overflow-auto text-white bg-black ${
          subMenu == subMenuList.signin ? "visible" : "invisible"
        }`}
      >
        <div className="relative flex flex-col rounded-xl h-full w-full px-2">
          <div
            className="rounded-lg flex flex-col w-full pt-8 bg-red-500"
            style={{
              height: resolution.layoutHeight,
            }}
          >
            <div className="flex w-full justify-between bg-black z-10 pb-2.5">
              <div
                className="flex items-center text-blue-500 cursor-pointer"
                onClick={() => {
                  setSubMenu(subMenuList.tweet);
                }}
              >
                <MdArrowBackIosNew className="text-lg" />
                <span className="text-xs">Back</span>
              </div>
              <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit"></span>
              <div className="flex items-center px-2 space-x-2 text-white"></div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="no-scrollbar flex flex-col w-full h-full overflow-y-auto"
        style={{
          paddingTop: 60,
        }}
      >
        <div
          className="flex flex-col space-y-3 px-2"
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
                      getComments(v);
                    }}
                    className="cursor-pointer border-b border-gray-900"
                  >
                    <div className="flex space-x-2">
                      <img
                        className="h-9 w-9 rounded-full object-cover mt-1"
                        src={v.avatar}
                        alt=""
                        onError={(error) => {
                          error.target.src = "./images/noimage.jpg";
                        }}
                      />
                      <div className="flex flex-col w-full">
                        <div className="flex justify-between">
                          <div className="line-clamp-1 text-white">
                            <span className="font-semibold text-sm">
                              {v.name}{" "}
                            </span>{" "}
                            <span className="text-gray-500 text-xs">
                              @{v.username}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500 text-xs">
                              {v.created_at}d
                            </span>
                          </div>
                        </div>
                        <p className="text-white block text-xs">{v.tweet}</p>
                        {v.media != "" ? (
                          <img
                            className="mt-1 rounded-lg"
                            src={v.media}
                            alt=""
                            onError={(error) => {
                              error.target.src = "./images/noimage.jpg";
                            }}
                          />
                        ) : null}
                        <div className="flex space-x-3 items-center ml-1 py-1">
                          <div className="flex space-x-1 items-center">
                            <span className="text-sm text-gray-200">
                              <FaRegComment />
                            </span>
                            <span className="text-sm text-gray-200">
                              {v.comment}
                            </span>
                          </div>
                          <div className="flex space-x-1 items-center">
                            <span className="text-lg text-gray-200">
                              <LuRepeat2 />
                            </span>
                            <span className="text-sm text-gray-200">
                              {v.repost}
                            </span>
                          </div>
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
            src="./images/loops-tweet.svg"
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
              className="w-9 h-9 rounded-full object-cover"
              src={profile.avatar}
              alt=""
              onError={(error) => {
                error.target.src = "./images/noimage.jpg";
              }}
            />

            <div className="flex-col space-y-2 w-full">
              <div className="flex-col space-y-1 w-full bg-gray-900 px-2 pt-2 rounded-lg">
                {media != "" ? (
                  <img src={media} className="rounded-lg" alt="" />
                ) : null}

                <textarea
                  value={formDataTweet.tweet}
                  name="tweet"
                  onChange={handleTweetFormChange}
                  placeholder="What's happening?"
                  rows={4}
                  className="focus:outline-none text-white w-full text-xs resize-none no-scrollbar bg-gray-900 rounded-lg"
                ></textarea>
              </div>
              <div className="flex justify-between items-center">
                <IoCamera
                  className="text-white text-xl cursor-pointer hover:text-[#1d9cf0]"
                  onClick={takePhoto}
                />
                <button
                  type="submit"
                  className="rounded-full bg-[#1d9cf0] px-4 py-1 font-semibold text-white text-sm hover:bg-[#0975bd]"
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>

        <div
          style={{
            ...(subMenu !== subMenuList.profile ? { display: "none" } : {}),
          }}
        >
          <div className="w-full flex flex-col"></div>
        </div>
      </div>
    </div>
  );
};
export default LoopsComponent;
