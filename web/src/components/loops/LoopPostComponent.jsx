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
import { IoCamera } from "react-icons/io5";

const LoopPostComponent = ({ isShow, setSubMenu, setProfileID }) => {
  const { resolution, profile, tweets, setTweets, setMenu } =
    useContext(MenuContext);

  const [formData, setFormData] = useState({
    tweet: "",
  });
  const [media, setMedia] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.tweet) {
      return;
    }

    try {
      const response = await axios.post("/send-tweet", {
        tweet: formData.tweet,
        media: media,
      });

      if (response.data) {
        setTweets(response.data);
        setMedia("");
        setFormData({
          tweet: "",
        });
        setSubMenu(LOOPS_TWEETS);
      }
    } catch (error) {
      console.error("error /new-tweet", error);
    }
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
            <form onSubmit={handleSubmit} className="flex w-full p-2 space-x-2">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src="./images/loops-tweet.svg"
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
                    value={formData.tweet}
                    name="tweet"
                    onChange={handleChange}
                    placeholder="What's happening?"
                    rows={4}
                    className="focus:outline-none text-white w-full text-xs resize-none no-scrollbar bg-gray-900 rounded-lg"
                    required
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
        </div>
      </div>
    </div>
  );
};
export default LoopPostComponent;
