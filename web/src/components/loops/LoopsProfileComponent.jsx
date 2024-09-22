import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import MenuContext from "../../context/MenuContext";
import {
  LOOPS_DETAIL,
  LOOPS_TAB_POST,
  LOOPS_TAB_REPLIES,
  LOOPS_TAB_SETTING,
  LOOPS_TWEETS,
  LOOPS_LOCAL_STORAGE_LOOPS_DATA_PROFILE,
  LOOPS_SIGNIN,
} from "./loops_constant";
import { MENU_MESSAGE_CHATTING } from "../../constant/menu";
import {
  MdArrowBackIosNew,
  MdMail,
  MdMailOutline,
  MdVerified,
  MdCall,
} from "react-icons/md";
import {
  FaA,
  FaAt,
  FaBarsStaggered,
  FaLock,
  FaRegCalendar,
  FaRegComment,
  FaUser,
  FaRegImage,
} from "react-icons/fa6";
import { LuRepeat2 } from "react-icons/lu";
import { getLoopsProfile } from "./../../utils/common";
import { isNumeric, isNonAlphaNumeric } from "./../../utils/common";

const LoopsProfileComponent = ({
  isShow,
  setSubMenu,
  setSelectedTweet,
  setProfileID,
  profileID,
}) => {
  const {
    resolution,
    tweets,
    setTweets,
    setMenu,
    profile,
    setProfile,
    setChatting,
  } = useContext(MenuContext);
  const [loopsProfile, setLoopsProfile] = useState(null);
  const [activeTab, setActiveTab] = useState(LOOPS_TAB_POST);
  const [isMe, setIsMe] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    fullname: "",
    username: "",
    bio: "",
    avatar: "",
    cover: "",
    phone_number: "",
    is_allow_message: false,
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const getProfile = async () => {
    setActiveTab(LOOPS_TAB_POST);

    let id = profileID;
    if (profileID == 0) {
      id = getLoopsProfile(profile.citizenid).id;
    }

    let result = {};
    try {
      const response = await axios.post("/get-loops-profile", {
        id: id,
      });
      result = response.data;
    } catch (error) {
      console.error("error /get-loops-profile", error);
    }

    const data = result?.profile;
    data.tweets = result?.tweets;
    data.replies = result?.replies;
    setLoopsProfile(data);
    setIsMe(result.is_me);
    if (result.is_me) {
      setFormData({
        id: data.id,
        fullname: data.fullname,
        username: data.username,
        bio: data.bio,
        avatar: data.avatar,
        cover: data.cover,
        is_allow_message: data.is_allow_message,
        phone_number: data.phone_number,
      });
    }
  };

  const [opacity, setOpacity] = useState(1);
  const scrollDivRef = useRef(null);

  useEffect(() => {
    if (isShow) {
      scrollDivRef.current.scrollTop = 0;
      getProfile();
    }
  }, [isShow]);

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
    if (name == "is_allow_message") {
      setFormData({
        ...formData,
        [name]: !formData.is_allow_message,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmitSetting = async (e) => {
    e.preventDefault();
    if (isNonAlphaNumeric(formData.username)) {
      setErrorMessage("Username not valid");
      return;
    }

    if (isNumeric(formData.phone_number)) {
      setErrorMessage("Phone number not valid");
      return;
    }

    let result = null;
    try {
      const response = await axios.post("/update-loops-profile", formData);
      result = response.data;
    } catch (error) {
      console.error("error /update-loops-profile", error);
    }

    if (result == null) {
      setErrorMessage("Please try again later!");
      return;
    }

    if (!result.is_valid) {
      setErrorMessage(result.message);
      return;
    }

    localStorage.setItem(
      LOOPS_LOCAL_STORAGE_LOOPS_DATA_PROFILE + "-" + profile.citizenid,
      JSON.stringify(result.profile)
    );
    setLoopsProfile(result.profile);
    setErrorMessage(null);
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
              src={loopsProfile?.cover}
              className="h-24 w-full object-cover"
              onError={(error) => {
                error.target.src = "./images/loops_default_cover.jpg";
              }}
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
            className="no-scrollbar flex flex-col w-full h-full overflow-y-auto z-30 pb-5"
            ref={scrollDivRef}
          >
            {Array.isArray(getLoopsProfile(profile.citizenid)) ? (
              <div className="flex items-center justify-center w-full py-5">
                <button
                  type="button"
                  className="text-center text-gray-100 underline text-sm font-semibold"
                  onClick={async () => {
                    try {
                      await axios.post("/loops-logout");
                      setProfile((prev) => ({
                        ...prev,
                        active_loops_userid: 0,
                      }));
                    } catch (error) {
                      console.error("error /loops-logout", error);
                    }
                    localStorage.removeItem(
                      LOOPS_LOCAL_STORAGE_LOOPS_DATA_PROFILE +
                        "-" +
                        profile.citizenid
                    );
                    setSubMenu(LOOPS_SIGNIN);
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
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
                        <span className="text-xs text-white">
                          Send message{" "}
                        </span>
                        <button
                          className="w-8 h-8 border border-gray-600 rounded-full items-center flex justify-center hover:bg-gray-700"
                          onClick={async () => {
                            await axios
                              .post("/new-or-continue-chat", {
                                to_citizenid: loopsProfile.citizenid,
                                phone_number: loopsProfile.phone_number,
                              })
                              .then(function (response) {
                                if (response.data) {
                                  setChatting(response.data);
                                  setMenu(MENU_MESSAGE_CHATTING);
                                }
                              })
                              .catch(function (error) {
                                console.log(error);
                              })
                              .finally(function () {});
                          }}
                        >
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
                    {loopsProfile?.is_verified ? (
                      <MdVerified className="text-[#1d9cf0]" />
                    ) : null}
                  </span>
                  <span className="text-gray-300 text-xs pb-2">
                    @{loopsProfile?.username}
                  </span>
                  <span className="text-gray-300 text-sm pb-2">
                    {loopsProfile?.bio}
                  </span>
                  <span className="flex space-x-2 text-gray-300 text-xs items-center">
                    <FaRegCalendar className="text-gray-200" />
                    <span>Join at {loopsProfile?.join_at}</span>
                  </span>
                </div>
                <div className="flex space-x-2 pt-2">
                  <div
                    className="flex flex-col w-full items-center space-y-1 cursor-pointer"
                    onClick={() => setActiveTab(LOOPS_TAB_POST)}
                  >
                    <span className="text-sm text-center text-white">
                      Posts
                    </span>
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
                  {isMe ? (
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
                  ) : null}
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
                            <p className="text-white block text-xs">
                              {v.tweet}
                            </p>
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
                                <span className="text-gray-500 text-xs">
                                  {v.created_at}d
                                </span>
                              </div>
                            </div>
                            <p className="text-white block text-xs">
                              {v.tweet}
                            </p>
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
                  {errorMessage != null ? (
                    <span className="text-red-500 text-xs">{errorMessage}</span>
                  ) : null}
                  <div className="flex space-x-3 pt-3">
                    <div>
                      <div className="p-1 rounded-lg border border-gray-500">
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
                            id="is_allow_message"
                            className="hidden"
                            name="is_allow_message"
                            checked={formData.is_allow_message}
                            onChange={handleChangeSetting}
                          />
                          <label
                            htmlFor="is_allow_message"
                            className={`flex items-center cursor-pointer ${
                              formData.is_allow_message
                                ? "bg-green-400"
                                : "bg-gray-300"
                            } relative block w-[40px] h-[25px] rounded-full transition-colors duration-300`}
                          >
                            <span
                              className={`block w-[20px] h-[20px] bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                                formData.is_allow_message
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
                      <div className="p-1 rounded-lg border border-gray-500">
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
                      <div className="p-1 rounded-lg border border-gray-500">
                        <FaRegImage className="text-white" />
                      </div>
                    </div>
                    <div className="flex w-full justify-between items-center space-x-2 pb-1.5 mb-1.5">
                      <input
                        type="text"
                        placeholder="URL Cover"
                        className="w-full text-xs text-white flex-1 border border-gray-700 focus:outline-none rounded-md px-2 py-1 bg-[#3B3B3B]"
                        autoComplete="off"
                        name="cover"
                        value={formData.cover}
                        onChange={handleChangeSetting}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <div>
                      <div className="p-1 rounded-lg border border-gray-500">
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
                        required
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <div>
                      <div className="p-1 rounded-lg border border-gray-500">
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
                        required
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <div>
                      <div className="p-1 rounded-lg border border-gray-500">
                        <MdCall className="text-white" />
                      </div>
                    </div>
                    <div className="flex w-full justify-between items-center space-x-2 pb-1.5 mb-1.5">
                      <input
                        type="text"
                        placeholder="Phone number"
                        className="w-full text-xs text-white flex-1 border border-gray-700 focus:outline-none rounded-md px-2 py-1 bg-[#3B3B3B]"
                        autoComplete="off"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChangeSetting}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <div>
                      <div className="p-1 rounded-lg border border-gray-500">
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
                        rows={3}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <button className="text-center bg-[#1d9cf0] px-3 py-1 text-white rounded-md text-sm">
                      SAVE
                    </button>
                  </div>

                  <div className="flex items-center justify-center w-full py-5">
                    <button
                      type="button"
                      className="text-center text-gray-100 underline text-sm font-semibold"
                      onClick={async () => {
                        try {
                          await axios.post("/loops-logout");
                          setProfile((prev) => ({
                            ...prev,
                            active_loops_userid: 0,
                          }));
                        } catch (error) {
                          console.error("error /loops-logout", error);
                        }
                        localStorage.removeItem(
                          LOOPS_LOCAL_STORAGE_LOOPS_DATA_PROFILE +
                            "-" +
                            profile.citizenid
                        );
                        setSubMenu(LOOPS_SIGNIN);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                  <div className="pb-2 text-xs text-gray-200 flex justify-center">
                    <span>&copy; 2025 Loops Corp.</span>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoopsProfileComponent;
