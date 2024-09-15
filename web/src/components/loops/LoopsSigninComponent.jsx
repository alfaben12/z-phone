import { useContext, useState, useEffect } from "react";
import axios from "axios";
import MenuContext from "../../context/MenuContext";
import {
  LOOPS_DETAIL,
  LOOPS_SIGNUP,
  LOOPS_TWEETS,
  LOOPS_LOCAL_STORAGE_LOOPS_DATA_PROFILE,
} from "./loops_constant";
import { MdArrowBackIosNew } from "react-icons/md";
import { MENU_DEFAULT } from "../../constant/menu";

const LoopsSigninComponent = ({ isShow, setSubMenu }) => {
  const { resolution, profile, tweets, setTweets, setMenu } =
    useContext(MenuContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

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
    // Process the form data (e.g., send to API)
    if (formData.password.length < 4) {
      return;
    }

    let result = null;
    try {
      const response = await axios.post("/loops-login", formData);
      result = response.data;
    } catch (error) {
      console.error("error /loops-login", error);
    }

    if (result == null) {
      setErrorMessage("Try again later!");
      return;
    }

    if (!result.is_valid) {
      setErrorMessage(result.message);
      return;
    }

    setFormData({
      username: "",
      password: "",
    });
    setErrorMessage(null);
    setSubMenu(LOOPS_TWEETS);
    localStorage.setItem(
      LOOPS_LOCAL_STORAGE_LOOPS_DATA_PROFILE + "-" + profile.citizenid,
      JSON.stringify(result.profile)
    );
  };

  return (
    <div
      className={`${
        isShow ? "visible" : "invisible"
      } w-full h-full absolute top-0 left-0`}
      style={{
        background: "url(./images/loops-signin-bg.svg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="relative flex flex-col rounded-xl h-full w-full px-2">
        <div
          className="rounded-lg flex flex-col w-full pt-8"
          style={{
            height: resolution.layoutHeight,
          }}
        >
          <div className="flex w-full justify-between z-10 pb-2.5">
            <div
              className="flex items-center text-blue-500 cursor-pointer"
              onClick={() => {
                setMenu(MENU_DEFAULT);
              }}
            >
              <MdArrowBackIosNew className="text-lg" />
              <span className="text-xs">Back</span>
            </div>
            <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit"></span>
            <div className="flex items-center px-2 space-x-2 text-white"></div>
          </div>
          <div className="no-scrollbar flex flex-col w-full h-full overflow-y-auto">
            <div className="flex flex-col px-2 justify-between h-full">
              <div className="flex flex-col">
                <img
                  src="./images/loops-white.svg"
                  className="p-0.5 object-cover w-10"
                  alt=""
                />
                <span className="text-white font-semibold text-2xl">
                  Let's sign you in
                </span>
                <div className="flex flex-col -space-y-2">
                  <span className="text-gray-200 text-lg">Welcome back.</span>
                  <span className="text-gray-200 text-lg">
                    You've been missed.
                  </span>
                </div>
              </div>
              <form
                className="flex flex-col space-y-2 text-white pb-5"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full text-sm text-white flex-1 border border-gray-600 bg-black focus:outline-none rounded-xl pl-4 pr-1 py-2"
                  autoComplete="off"
                  required
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full text-sm text-white flex-1 border border-gray-600 bg-black focus:outline-none rounded-xl pl-4 pr-1 py-2"
                  autoComplete="off"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errorMessage != null ? (
                  <span className="text-red-500 text-xs">{errorMessage}</span>
                ) : null}
                <button type="submit" className="h-10 bg-[#1d9cf0] rounded-xl">
                  Login
                </button>
                <button
                  type="button"
                  className="h-10 bg-white text-black text-xs rounded-xl flex space-x-1 items-center justify-center"
                >
                  <div>
                    <img
                      src="./images/loops-tweet.svg"
                      className="object-cover w-7"
                      alt=""
                    />
                  </div>
                  <span>Signin with default account</span>
                </button>
                <div className="text-sm text-gray-200 flex justify-center space-x-1 py-2">
                  <span>Don't have an account?</span>
                  <span
                    className="cursor-pointer text-[#1d9cf0] font-semibold"
                    onClick={() => setSubMenu(LOOPS_SIGNUP)}
                  >
                    Sign up
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoopsSigninComponent;
