import { useContext, useState } from "react";
import axios from "axios";
import MenuContext from "../../context/MenuContext";
import {
  LOOPS_DETAIL,
  LOOPS_POST,
  LOOPS_PROFILE,
  LOOPS_TWEETS,
} from "./loops_constant";
import { MdArrowBackIosNew } from "react-icons/md";
import { FaRegComment, FaRegUser } from "react-icons/fa6";
import { LuRepeat2 } from "react-icons/lu";
import { MENU_DEFAULT } from "./../../constant/menu";

const LoopsTweetsComponent = ({
  isShow,
  setSubMenu,
  setSelectedTweet,
  setProfileID,
}) => {
  const { resolution, profile, tweets, setTweets, setMenu } =
    useContext(MenuContext);

  return (
    <div
      className={`${
        isShow ? "visible" : "invisible"
      } w-full h-full absolute top-0 left-0`}
    >
      <div
        className="absolute bottom-10 right-5 h-10 w-10 rounded-full bg-gray-800 cursor-pointer z-50"
        onClick={() => setSubMenu(LOOPS_POST)}
      >
        <img
          src="./images/loops-tweet.svg"
          className="p-2 object-cover text-[#000000]"
          alt=""
        />
      </div>
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
                setMenu(MENU_DEFAULT);
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
            <div className="flex items-center px-2 space-x-2 text-white">
              <FaRegUser
                className="text-lg hover:text-[#1d9cf0] cursor-pointer"
                onClick={() => {
                  setProfileID(0);
                  setSubMenu(LOOPS_PROFILE);
                }}
              />
            </div>
          </div>
          <div className="no-scrollbar flex flex-col w-full h-full overflow-y-auto">
            {tweets == undefined ? (
              <LoadingComponent />
            ) : (
              <>
                {tweets.map((v, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        v.comments = [];
                        setSubMenu(LOOPS_DETAIL);
                        setSelectedTweet(v);
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
                            <div className="line-clamp-1 text-white truncate">
                              <span className="font-semibold text-sm">
                                {v.name}{" "}
                              </span>
                              <span className="text-gray-500 text-xs">
                                {v.username}
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
        </div>
      </div>
    </div>
  );
};
export default LoopsTweetsComponent;
