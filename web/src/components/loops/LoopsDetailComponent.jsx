import { useContext, useState } from "react";
import axios from "axios";
import MenuContext from "../../context/MenuContext";
import { LOOPS_DETAIL, LOOPS_PROFILE, LOOPS_TWEETS } from "./loops_constant";
import { MdArrowBackIosNew } from "react-icons/md";
import { MENU_DEFAULT } from "../../constant/menu";
import { useEffect } from "react";
import Markdown from "react-markdown";
import { FaRegComment, FaRegUser } from "react-icons/fa6";
import { LuRepeat2 } from "react-icons/lu";
import { getLoopsProfile } from "./../../utils/common";

const LoopsDetailComponent = ({
  isShow,
  setSubMenu,
  selectedTweet,
  setSelectedTweet,
  setProfileID,
}) => {
  const { resolution, tweets, setTweets, setMenu, profile } =
    useContext(MenuContext);
  const [comments, setComments] = useState([]);
  const [profileLoops, setProfileLoops] = useState(null);

  const getComments = async (tweet) => {
    let result = [];
    try {
      const response = await axios.post("/get-tweet-comments", {
        tweetid: selectedTweet.id,
      });
      result = response.data;
    } catch (error) {
      console.error("error /get-tweet-comments", error);
    }

    setComments(result);
  };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.comment) {
      return;
    }

    setComments((prev) => [
      {
        comment: formData.comment,
        name: profileLoops.fullname,
        avatar: profileLoops.avatar,
        username: profileLoops.username,
        created_at: "now",
      },
      ...prev,
    ]);

    axios.post("/send-tweet-comments", {
      tweetid: selectedTweet.id,
      loops_userid: selectedTweet.loops_userid,
      comment: formData.comment,
      comment_username: profileLoops.username,
    });

    setFormData({
      comment: "",
    });
  };

  useEffect(() => {
    if (isShow && selectedTweet != null) {
      getComments();
      setProfileLoops(getLoopsProfile(profile.citizenid));
    }
  }, [isShow]);

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
          <div className="flex w-full justify-between bg-black z-10 pb-2.5">
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
          <div className="no-scrollbar w-full h-full overflow-y-auto">
            <div className="flex-1 overflow-y-auto bg-black pb-2 flex no-scrollbar">
              <div className="rounded-xl border border-black w-full">
                <div
                  className="flex justify-between items-center pt-1 cursor-pointer"
                  onClick={() => {
                    setProfileID(selectedTweet?.loops_userid);
                    setSubMenu(LOOPS_PROFILE);
                  }}
                >
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={selectedTweet?.avatar}
                      alt=""
                      onError={(error) => {
                        error.target.src = "./images/noimage.jpg";
                      }}
                    />
                    <div className="flex justify-between w-full">
                      <div className="ml-1.5 leading-tight">
                        <div className="line-clamp-1 text-white text-sm">
                          {selectedTweet?.name}{" "}
                        </div>
                        <div className="line-clamp-1 text-xs text-gray-400 font-normal">
                          {selectedTweet?.username}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-white block text-xs mt-2">
                  <Markdown>{selectedTweet?.tweet}</Markdown>
                </div>
                {selectedTweet?.media != "" ? (
                  <img
                    className="mt-2 rounded-lg border border-gray-800"
                    src={selectedTweet?.media}
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
                        {selectedTweet?.comment}
                      </span>
                    </div>
                    <div
                      className="flex space-x-1 items-center cursor-pointer"
                      onClick={() => {}}
                    >
                      <span className="text-lg text-gray-200">
                        <LuRepeat2 />
                      </span>
                      <span className="text-sm text-gray-200">
                        {selectedTweet?.repost}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs">
                    {selectedTweet?.created_at}d
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="flex border border-gray-700 rounded-full px-2 py-0.5 mt-2"
                >
                  <input
                    type="text"
                    className="bg-black text-xs font-medium w-full focus:outline-none text-white ml-2"
                    placeholder="Comment"
                    autoComplete="off"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
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
                  {comments.map((v, i) => {
                    return (
                      <div key={i}>
                        <div className="flex space-x-2">
                          <img
                            className="h-8 w-8 rounded-full object-cover mt-1 cursor-pointer"
                            src={v.avatar}
                            alt=""
                            onError={(error) => {
                              error.target.src = "./images/noimage.jpg";
                            }}
                            onClick={() => {
                              setProfileID(v.loops_userid);
                              setSubMenu(LOOPS_PROFILE);
                            }}
                          />
                          <div className="flex flex-col w-full">
                            <div className="flex justify-between">
                              <div
                                className="line-clamp-1 text-white cursor-pointer"
                                onClick={() => {
                                  setProfileID(v.loops_userid);
                                  setSubMenu(LOOPS_PROFILE);
                                }}
                              >
                                <span className="font-semibold text-sm">
                                  {v.name}{" "}
                                </span>
                                <span className="text-gray-500 text-xs">
                                  {v.username}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-500 text-xs">
                                  {v.created_at}
                                  {v.created_at == "now" ? "" : "d"}
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
      </div>
    </div>
  );
};
export default LoopsDetailComponent;
