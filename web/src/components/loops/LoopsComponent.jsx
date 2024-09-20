import { useContext, useEffect, useState } from "react";
import axios from "axios";
import MenuContext from "../../context/MenuContext";
import {
  LOOPS_DETAIL,
  LOOPS_PROFILE,
  LOOPS_SIGNIN,
  LOOPS_SIGNUP,
  LOOPS_TESTING,
  LOOPS_TWEETS,
  LOOPS_POST,
  LOOPS_LOCAL_STORAGE_LOOPS_DATA_PROFILE,
} from "./loops_constant";
import LoopsTweetsComponent from "./LoopsTweetsComponent";
import LoopsDetailComponent from "./LoopsDetailComponent";
import LoopsProfileComponent from "./LoopsProfileComponent";
import LoopsSigninComponent from "./LoopsSigninComponent";
import LoopsSignupComponent from "./LoopsSignupComponent";
import LoopPostComponent from "./LoopPostComponent";
import { getLoopsProfile } from "./../../utils/common";

const LoopsComponent = ({ isShow }) => {
  const { resolution, profile, tweets, setTweets, setMenu } =
    useContext(MenuContext);
  const [subMenu, setSubMenu] = useState(LOOPS_SIGNIN);
  const [selectedTweet, setSelectedTweet] = useState(null);
  const [profileID, setProfileID] = useState(0);

  const checkAuth = async () => {
    let isAuth = getLoopsProfile(profile.citizenid);
    if (!isAuth) {
      if (profile.active_loops_userid != 0) {
        let result = {};
        try {
          const response = await axios.post("/get-loops-profile", {
            id: profile.active_loops_userid,
          });
          result = response.data;
        } catch (error) {
          console.error("error /get-loops-profile", error);
        }

        const data = result?.profile;
        data.tweets = result?.tweets;
        data.replies = result?.replies;
        localStorage.setItem(
          LOOPS_LOCAL_STORAGE_LOOPS_DATA_PROFILE + "-" + profile.citizenid,
          JSON.stringify(data)
        );

        isAuth = result?.profile;
      } else {
        isAuth = null;
      }
    }

    return isAuth;
  };

  useEffect(() => {
    const isAuth = async () => {
      const auth = await checkAuth();
      if ([LOOPS_SIGNIN, LOOPS_SIGNUP].includes(subMenu)) {
        if (auth) {
          setSubMenu(LOOPS_TWEETS);
        }
      } else {
        if (!auth) {
          setSubMenu(LOOPS_SIGNIN);
        }
      }
    };

    if (profile.citizenid) {
      isAuth();
    }
  }, [subMenu]);

  useEffect(() => {
    const isAuth = async () => {
      const auth = await checkAuth();
      if ([LOOPS_SIGNIN, LOOPS_SIGNUP].includes(subMenu)) {
        if (auth) {
          setSubMenu(LOOPS_TWEETS);
        }
      } else {
        if (!auth) {
          setSubMenu(LOOPS_SIGNIN);
        }
      }
    };

    if (profile.citizenid) {
      isAuth();
    }
  }, []);

  useEffect(() => {
    const isAuth = async () => {
      const auth = await checkAuth();
      if ([LOOPS_SIGNIN, LOOPS_SIGNUP].includes(subMenu)) {
        if (auth) {
          setSubMenu(LOOPS_TWEETS);
        }
      } else {
        if (!auth) {
          setSubMenu(LOOPS_SIGNIN);
        }
      }
    };

    if (profile.citizenid) {
      isAuth();
    }
  }, [profile]);

  return (
    <div
      className="relative w-full h-full"
      style={{
        display: isShow ? "block" : "none",
      }}
    >
      <LoopPostComponent
        isShow={subMenu == LOOPS_POST}
        setSubMenu={setSubMenu}
        setProfileID={setProfileID}
      />
      <LoopsTweetsComponent
        isShow={subMenu == LOOPS_TWEETS}
        setSubMenu={setSubMenu}
        setSelectedTweet={setSelectedTweet}
        setProfileID={setProfileID}
      />
      <LoopsDetailComponent
        isShow={subMenu == LOOPS_DETAIL}
        setSubMenu={setSubMenu}
        selectedTweet={selectedTweet}
        setSelectedTweet={setSelectedTweet}
        setProfileID={setProfileID}
      />
      <LoopsProfileComponent
        isShow={subMenu == LOOPS_PROFILE}
        setSubMenu={setSubMenu}
        setSelectedTweet={setSelectedTweet}
        setProfileID={setProfileID}
        profileID={profileID}
      />
      <LoopsSigninComponent
        isShow={subMenu == LOOPS_SIGNIN}
        setSubMenu={setSubMenu}
      />
      <LoopsSignupComponent
        isShow={subMenu == LOOPS_SIGNUP}
        setSubMenu={setSubMenu}
      />
    </div>
  );
};
export default LoopsComponent;
