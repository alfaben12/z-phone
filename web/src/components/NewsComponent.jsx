import React, { useContext, useState, useRef, useEffect } from "react";
import { CFG_NEWS, MENU_DEFAULT } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew, MdLiveTv } from "react-icons/md";
import LoadingComponent from "./LoadingComponent";
import { FaArrowRight, FaPencil, FaRegNewspaper } from "react-icons/fa6";
import Markdown from "react-markdown";
import ReactPlayer from "react-player/lazy";
import axios from "axios";

const subMenuList = {
  stream: "stream",
  feed: "feed",
  create: "create",
};

const NewsComponent = ({ isShow }) => {
  const { resolution, profile, setMenu, news, newsStreams } =
    useContext(MenuContext);
  const [detail, setDetail] = useState(null);
  const [stream, setStream] = useState(null);
  const [subMenu, setSubMenu] = useState(subMenuList.feed);
  const [formData, setFormData] = useState({
    title: "",
    cover_url: "",
    stream_url: "",
    content: "",
  });

  const [volume, setVolume] = useState(0.5); // Default volume set to 50%
  const [played, setPlayed] = useState(0); // State to track the played fraction
  const [playing, setPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null); // Reference to the ReactPlayer

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  const handleSeekChange = (event) => {
    const seekTo = parseFloat(event.target.value);
    setPlayed(seekTo);
    playerRef.current.seekTo(seekTo); // Seek to the desired point in the video
  };

  const handleProgress = (state) => {
    setPlayed(state.played);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleChangeFormPost = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitFormPost = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/create-news", formData);

      if (response.data) {
        setFormData({
          title: "",
          cover_url: "",
          stream_url: "",
          content: "",
        });
        setSubMenu(subMenuList.feed);
      }
    } catch (error) {
      console.error("error /create-news", error);
    }
  };

  useEffect(() => {
    if (stream != null) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [stream]);

  const currentTime = played * duration;

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
            if (subMenu == subMenuList.create) {
              setSubMenu(subMenuList.feed);
            } else {
              setMenu(MENU_DEFAULT);
            }
          }}
        >
          <MdArrowBackIosNew className="text-lg" />
          <span className="text-xs">Back</span>
        </div>
        <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit">
          News
        </span>
        <div className="flex items-center px-2 text-white">
          {subMenu == subMenuList.create ? null : (
            <>
              {CFG_NEWS.ALLOWED_JOBS.includes(profile?.job?.name) ? (
                <FaPencil
                  className="text-lg cursor-pointer"
                  onClick={() => {
                    setSubMenu(subMenuList.create);
                  }}
                />
              ) : null}
            </>
          )}
        </div>
      </div>
      <div
        className={`no-scrollbar absolute w-full z-30 overflow-auto text-white bg-black ${
          detail != null ? "visible" : "invisible"
        }`}
      >
        {detail == null ? (
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
                    setDetail(null);
                  }}
                >
                  <MdArrowBackIosNew className="text-lg" />
                  <span className="text-xs">Back</span>
                </div>
                <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit"></span>
                <div className="flex items-center px-2 space-x-2 text-white"></div>
              </div>
              <div className="flex-1 overflow-y-auto bg-black pb-2 flex no-scrollbar">
                <div className="flex flex-col px-1">
                  <img
                    className="rounded-t-lg"
                    src={detail.image}
                    alt=""
                    onError={(error) => {
                      error.target.src = "./images/noimage.jpg";
                    }}
                  />
                  <div className="py-1">
                    <div className="text-gray-100 text-xss flex justify-between">
                      <span>{detail.created_at}</span>
                      <span>{detail.company}</span>
                    </div>
                    <span className="text-gray-100 text-xs line-clamp-1">
                      Reporter - {detail.reporter}
                    </span>
                    <span className="text-white text-sm">{detail.title}</span>
                  </div>
                  <div className="pt-2 text-xs pb-5">
                    <Markdown>{detail.body}</Markdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className={`no-scrollbar absolute w-full z-30 overflow-auto text-white bg-black ${
          stream != null ? "visible" : "invisible"
        }`}
      >
        {stream == null ? (
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
                    setPlaying(false);
                    setPlayed(0);
                    playerRef.current.seekTo(0);
                    setStream(null);
                  }}
                >
                  <MdArrowBackIosNew className="text-lg" />
                  <span className="text-xs">Back</span>
                </div>
                <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit"></span>
                <div className="flex items-center px-2 space-x-2 text-white"></div>
              </div>
              <div className="flex-1 overflow-y-auto bg-black pb-2 flex no-scrollbar">
                <div className="relative flex flex-col px-1 w-full">
                  <div className="absolute w-full h-[165px] bg-transparent"></div>
                  <ReactPlayer
                    ref={playerRef}
                    url={stream.stream}
                    onProgress={handleProgress}
                    onDuration={handleDuration}
                    volume={volume}
                    playing={playing}
                    controls
                    width="100%"
                    height="auto"
                  />
                  <table className="text-xss text-gray-100 mt-5 mb-2">
                    <tbody>
                      <tr>
                        <td>Volume</td>
                        <td>:</td>
                        <td>
                          <input
                            type="range"
                            min={0}
                            max={1}
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            style={{ width: "100%" }}
                            className="h-1"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Time</td>
                        <td>:</td>
                        <td>
                          <input
                            type="range"
                            min={0}
                            max={1}
                            step="0.01"
                            value={played}
                            onChange={handleSeekChange}
                            style={{ width: "100%" }}
                            className="h-1"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td className="text-right text-gray-100">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="py-1">
                    <div className="text-gray-100 text-xss flex justify-between">
                      <span>{stream.created_at}</span>
                      <span>{stream.company}</span>
                    </div>
                    <span className="text-gray-100 text-xs line-clamp-1">
                      Reporter - {stream.reporter}
                    </span>
                    <span className="text-white text-sm">{stream.title}</span>
                    <div className="pt-2 text-xs pb-5">
                      <Markdown>{stream.body}</Markdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className="no-scrollbar flex flex-col w-full h-full overflow-y-auto px-3 pb-5"
        style={{
          paddingTop: 60,
        }}
      >
        <div
          style={{
            ...(subMenu !== subMenuList["feed"] ? { display: "none" } : {}),
          }}
        >
          {news == undefined ? (
            <LoadingComponent />
          ) : (
            <div className="flex flex-col space-y-2 mb-14">
              {news.map((v, i) => {
                return (
                  <div
                    className="flex flex-col rounded-lg bg-gray-700 domine-font-medium cursor-pointer"
                    key={i}
                    onClick={() => setDetail(v)}
                  >
                    <img
                      className="rounded-t-lg object-cover h-[150px]"
                      src={v.image}
                      alt=""
                      onError={(error) => {
                        error.target.src = "./images/noimage.jpg";
                      }}
                    />
                    <div className="px-3 py-1">
                      <span className="text-gray-100 text-xs line-clamp-1">
                        {v.company} - {v.reporter.split(" ")[0]}
                      </span>
                      <span className="text-white text-sm line-clamp-2">
                        {v.title}
                      </span>
                    </div>
                    <div className="flex justify-between px-3 pb-1">
                      <span className="text-gray-100 text-xss">
                        {v.created_at}
                      </span>
                      <span className="text-gray-100 text-xss flex space-x-0.5 items-center">
                        <span>Read</span> <FaArrowRight />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div
          style={{
            ...(subMenu !== subMenuList["stream"] ? { display: "none" } : {}),
          }}
        >
          {newsStreams == undefined ? (
            <LoadingComponent />
          ) : (
            <div className="flex flex-col space-y-2 mb-14">
              {newsStreams.map((v, i) => {
                return (
                  <div
                    className="flex space-x-2 w-full cursor-pointer"
                    key={i}
                    onClick={() => setStream(v)}
                  >
                    <div className="w-1/3">
                      <img
                        className="object-cover"
                        src={v.image}
                        alt=""
                        onError={(error) => {
                          error.target.src = "./images/noimage.jpg";
                        }}
                      />
                    </div>
                    <div className="w-2/3 flex flex-col space-y-1">
                      <span
                        className="text-sm text-white line-clamp-2"
                        style={{
                          lineHeight: 1.3,
                        }}
                      >
                        {v.title}
                      </span>
                      <span className="text-xss text-gray-200">
                        {v.created_at}
                      </span>

                      <span className="text-xss text-gray-200 line-clamp-2">
                        {v.body}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div
          style={{
            ...(subMenu !== subMenuList.create ? { display: "none" } : {}),
          }}
        >
          <form
            className="flex flex-col space-y-2 mb-14"
            onSubmit={handleSubmitFormPost}
          >
            <span className="text-lg text-white">Create News</span>
            <input
              type="text"
              placeholder="Title"
              className="w-full text-sm text-white flex-1 bg-gray-900 focus:outline-none rounded-lg pl-2 pr-1 py-1"
              autoComplete="off"
              name="title"
              value={formData.title}
              onChange={handleChangeFormPost}
              required
            />
            <input
              type="text"
              placeholder="Cover URL"
              className="w-full text-sm text-white flex-1 bg-gray-900 focus:outline-none rounded-lg pl-2 pr-1 py-1"
              autoComplete="off"
              name="cover_url"
              value={formData.cover_url}
              onChange={handleChangeFormPost}
              required
            />
            <input
              type="text"
              placeholder="Stream URL"
              className="w-full text-sm text-white flex-1 bg-gray-900 focus:outline-none rounded-lg pl-2 pr-1 py-1"
              autoComplete="off"
              onChange={handleChangeFormPost}
              name="stream_url"
              value={formData.stream_url}
            />
            <span className="text-xs text-gray-400">
              If stream url is filled, it will mark as Live (Youtube URL).
            </span>
            <textarea
              onChange={handleChangeFormPost}
              name="content"
              value={formData.content}
              placeholder="News content"
              rows={4}
              className="focus:outline-none text-white w-full text-xs resize-none no-scrollbar bg-gray-900 rounded-lg pl-2 pr-1 py-1"
            ></textarea>
            <span className="text-xs text-gray-400">
              <span className="text-red-500 pr-1">*</span>Please note that the
              news will include the name of your company as the reporter!
            </span>
            <button className="rounded-md bg-amber-500 px-4 py-1 font-semibold text-white text-sm hover:bg-amber-600">
              Create News
            </button>
          </form>
        </div>
      </div>
      <div className="absolute bottom-0 w-full pb-2 pt-2.5 bg-black">
        <div className="grid h-full w-full grid-cols-2 mx-auto font-medium">
          <button
            type="button"
            className={`inline-flex flex-col items-center justify-center px-5 group ${
              subMenu === subMenuList["feed"] ? "text-white" : "text-gray-600"
            }`}
            onClick={() => setSubMenu(subMenuList["feed"])}
          >
            <FaRegNewspaper className="text-xl" />
            <span className="text-xs">Feed</span>
          </button>
          <button
            type="button"
            className={`inline-flex flex-col items-center justify-center px-5 group ${
              subMenu === subMenuList["stream"] ? "text-white" : "text-gray-600"
            }`}
            onClick={() => setSubMenu(subMenuList["stream"])}
          >
            <MdLiveTv className="text-xl" />
            <span className="text-xs">Live</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default NewsComponent;
