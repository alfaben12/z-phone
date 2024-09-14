import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import MenuContext from "../../context/MenuContext";
import {
  LOOPS_DETAIL,
  LOOPS_TAB_POST,
  LOOPS_TAB_REPLIES,
  LOOPS_TAB_SETTING,
  LOOPS_TWEETS,
} from "./loops_constant";
import {
  MdArrowBackIosNew,
  MdMail,
  MdMailOutline,
  MdVerified,
} from "react-icons/md";
import {
  FaA,
  FaAt,
  FaBarsStaggered,
  FaLock,
  FaRegCalendar,
  FaRegComment,
  FaUser,
} from "react-icons/fa6";
import { LuRepeat2 } from "react-icons/lu";

const LoopsProfileComponent = ({ isShow, setSubMenu, setSelectedTweet }) => {
  const { resolution, profile, tweets, setTweets, setMenu } =
    useContext(MenuContext);
  const [loopsProfile, setLoopsProfile] = useState(null);
  const [activeTab, setActiveTab] = useState(LOOPS_TAB_POST);
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    bio: "",
    avatar: "",
    isAllowMessage: false,
  });

  const getLoopsProfile = async (tweet) => {
    let result = [];
    try {
      const response = await axios.post("/get-loops-profile");
      result = response.data;
    } catch (error) {
      console.error("error /get-loops-profile", error);
    }

    setFormData({
      fullname: result.fullname,
      username: result.username,
      bio: result.bio,
      avatar: result.avatar,
      isAllowMessage: result.is_allow_message,
    });
    setLoopsProfile(result);
  };

  useEffect(() => {
    if (isShow) {
      getLoopsProfile();
    }
  }, [isShow]);

  const [opacity, setOpacity] = useState(1);
  const scrollDivRef = useRef(null);

  const handleScroll = () => {
    if (scrollDivRef.current) {
      const scrollY = scrollDivRef.current.scrollTop;
      const newOpacity = Math.max(1 - scrollY / 200, 0); // Adjust 150 to control the fade speed
      setOpacity(newOpacity);
    }
  };

  useEffect(() => {
    const scrollDiv = scrollDivRef.current;
    if (scrollDiv) {
      scrollDiv.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollDiv) {
        scrollDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleChangeSetting = (e) => {
    const { name, value } = e.target;
    if (name == "isAllowMessage") {
      setFormData({
        ...formData,
        [name]: !formData.isAllowMessage,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmitSetting = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div
      className={`${
        isShow ? "visible" : "invisible"
      } w-full h-full absolute top-0 left-0`}
    >
      <div className="relative flex flex-col rounded-xl h-full w-full px-2">
        <div
          className="rounded-lg flex flex-col w-full pt-8"
          style={{
            height: resolution.layoutHeight,
          }}
        >
          <div className="absolute top-0 left-0 w-full" style={{ opacity }}>
            <img
              src="https://d25yuvogekh0nj.cloudfront.net/2019/08/Twitter-Banner-Size-Guide-blog-banner-1250x500.png"
              className="h-24 w-full object-cover"
            />
          </div>
          <div className="flex w-full justify-between z-10 pb-2.5">
            <div
              className="flex items-center text-blue-500 cursor-pointer"
              onClick={() => {
                setSubMenu(LOOPS_TWEETS);
              }}
            >
              <MdArrowBackIosNew className="text-lg" />
              <span className="text-xs">Back</span>
            </div>
            <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit"></span>
            <div
              className="flex items-center px-2 space-x-2 text-white"
              style={{ opacity: opacity < 0.2 ? 1 : 0 }}
            >
              <span className="text-xs">{loopsProfile?.fullname}</span>
              <img
                src={loopsProfile?.avatar}
                className="w-4 h-4 rounded-full object-cover"
                alt=""
                onError={(error) => {
                  error.target.src = "./images/noimage.jpg";
                }}
              />
            </div>
          </div>
          <div
            className="no-scrollbar flex flex-col w-full h-full overflow-y-auto z-30"
            ref={scrollDivRef}
          >
            <div className="flex flex-col space-y-1 px-2">
              <div className="flex justify-between items-end pt-4">
                <img
                  src={loopsProfile?.avatar}
                  className="w-14 h-14 rounded-full object-cover border-2 border-black"
                  alt=""
                  onError={(error) => {
                    error.target.src = "./images/noimage.jpg";
                  }}
                />
                {loopsProfile?.is_allow_message ? (
                  <>
                    <div className="flex space-x-2 items-center">
                      <span className="text-xs text-white">Send message </span>
                      <button className="w-8 h-8 border border-gray-600 rounded-full items-center flex justify-center hover:bg-gray-700">
                        <MdMailOutline className="text-xl text-white" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center">
                      <span className="text-xs text-white">Private</span>
                      <div className="w-8 h-8 rounded-full items-center flex justify-center">
                        <FaLock className="text-white" />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-col" style={{ opacity }}>
                <span className="flex space-x-2 text-white text-lg font-semibold items-center">
                  <span>{loopsProfile?.fullname}</span>
                  <MdVerified className="text-[#1d9cf0]" />
                </span>
                <span className="text-gray-300 text-xs pb-2">
                  {loopsProfile?.username}
                </span>
                <span className="text-gray-300 text-sm pb-2">
                  {loopsProfile?.bio}
                </span>
                <span className="flex space-x-2 text-gray-300 text-xs items-center">
                  <FaRegCalendar className="text-gray-400" />
                  <span>Join at {loopsProfile?.join_at}</span>
                </span>
              </div>
              <div className="flex space-x-2 pt-2">
                <div
                  className="flex flex-col w-full items-center space-y-1 cursor-pointer"
                  onClick={() => setActiveTab(LOOPS_TAB_POST)}
                >
                  <span className="text-sm text-center text-white">Posts</span>
                  <span
                    className={`h-0.5 w-10 rounded ${
                      activeTab == LOOPS_TAB_POST
                        ? "bg-[#1d9cf0]"
                        : "bg-transparent"
                    }`}
                  ></span>
                </div>
                <div
                  className="flex flex-col w-full items-center space-y-1 cursor-pointer"
                  onClick={() => setActiveTab(LOOPS_TAB_REPLIES)}
                >
                  <span className="text-sm text-center text-white">
                    Replies
                  </span>
                  <span
                    className={`h-0.5 w-10 rounded ${
                      activeTab == LOOPS_TAB_REPLIES
                        ? "bg-[#1d9cf0]"
                        : "bg-transparent"
                    }`}
                  ></span>
                </div>
                <div
                  className="flex flex-col w-full items-center space-y-1 cursor-pointer"
                  onClick={() => setActiveTab(LOOPS_TAB_SETTING)}
                >
                  <span className="text-sm text-center text-white">
                    Setting
                  </span>
                  <span
                    className={`h-0.5 w-10 rounded ${
                      activeTab == LOOPS_TAB_SETTING
                        ? "bg-[#1d9cf0]"
                        : "bg-transparent"
                    }`}
                  ></span>
                </div>
              </div>
              <div
                style={{
                  display: activeTab == LOOPS_TAB_POST ? "block" : "none",
                }}
              >
                {loopsProfile?.tweets?.map((v, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {
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
                            <div className="line-clamp-1 text-white">
                              <span className="font-semibold text-sm">
                                {v.name}{" "}
                              </span>
                              10d
                              <span className="text-gray-500 text-xs">
                                {v.username}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500 text-xs">10d</span>
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
              </div>
              <div
                style={{
                  display: activeTab == LOOPS_TAB_REPLIES ? "block" : "none",
                }}
              >
                {loopsProfile?.replies?.map((v, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {
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
                            <div className="line-clamp-1 text-white">
                              <span className="font-semibold text-sm">
                                {v.name}{" "}
                              </span>
                              <span className="text-gray-500 text-xs">
                                {v.username}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500 text-xs">10d</span>
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
              </div>
              <form
                style={{
                  display: activeTab == LOOPS_TAB_SETTING ? "block" : "none",
                }}
                onSubmit={handleSubmitSetting}
              >
                <div className="flex space-x-3 pt-3">
                  <div>
                    <div className="p-1 rounded-lg border">
                      <MdMail className="text-white" />
                    </div>
                  </div>
                  <div className="flex w-full justify-between items-center space-x-3 pb-1.5 mb-1.5">
                    <span className="text-sm font-light text-white line-clamp-1">
                      Allow Message
                    </span>
                    <div className="flex items-center justify-center">
                      <div className="relative inline-block align-middle select-none">
                        <input
                          type="checkbox"
                          id="isAllowMessage"
                          className="hidden"
                          name="isAllowMessage"
                          checked={formData.isAllowMessage}
                          onChange={handleChangeSetting}
                        />
                        <label
                          htmlFor="isAllowMessage"
                          className={`flex items-center cursor-pointer ${
                            formData.isAllowMessage
                              ? "bg-green-400"
                              : "bg-gray-300"
                          } relative block w-[40px] h-[25px] rounded-full transition-colors duration-300`}
                        >
                          <span
                            className={`block w-[20px] h-[20px] bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                              formData.isAllowMessage
                                ? "translate-x-[18px]"
                                : "translate-x-[2px]"
                            }`}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div>
                    <div className="p-1 rounded-lg border">
                      <FaUser className="text-white" />
                    </div>
                  </div>
                  <div className="flex w-full justify-between items-center space-x-2 pb-1.5 mb-1.5">
                    <input
                      type="text"
                      placeholder="URL avatar"
                      className="w-full text-xs text-white flex-1 border border-gray-700 focus:outline-none rounded-md px-2 py-1 bg-[#3B3B3B]"
                      autoComplete="off"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleChangeSetting}
                    />
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div>
                    <div className="p-1 rounded-lg border">
                      <FaAt className="text-white" />
                    </div>
                  </div>
                  <div className="flex w-full justify-between items-center space-x-2 pb-1.5 mb-1.5">
                    <input
                      type="text"
                      placeholder="Username (without @)"
                      className="w-full text-xs text-white flex-1 border border-gray-700 focus:outline-none rounded-md px-2 py-1 bg-[#3B3B3B]"
                      autoComplete="off"
                      name="username"
                      value={formData.username}
                      onChange={handleChangeSetting}
                    />
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div>
                    <div className="p-1 rounded-lg border">
                      <FaA className="text-white" />
                    </div>
                  </div>
                  <div className="flex w-full justify-between items-center space-x-2 pb-1.5 mb-1.5">
                    <input
                      type="text"
                      placeholder="Fullname"
                      className="w-full text-xs text-white flex-1 border border-gray-700 focus:outline-none rounded-md px-2 py-1 bg-[#3B3B3B]"
                      autoComplete="off"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChangeSetting}
                    />
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div>
                    <div className="p-1 rounded-lg border">
                      <FaBarsStaggered className="text-white" />
                    </div>
                  </div>
                  <div className="flex w-full justify-between items-center space-x-2 pb-1.5 mb-1.5">
                    <textarea
                      placeholder="Bio"
                      className="w-full text-xs text-white flex-1 border border-gray-700 focus:outline-none resize-none no-scrollbar rounded-md px-2 py-1 bg-[#3B3B3B]"
                      autoComplete="off"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChangeSetting}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <button className="text-center bg-[#1d9cf0] px-3 py-1 text-white rounded-md text-sm">
                    SAVE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoopsProfileComponent;
