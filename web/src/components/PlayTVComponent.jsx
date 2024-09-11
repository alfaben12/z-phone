import React, { useState, useRef, useEffect, useContext } from "react";
import { MENU_DEFAULT } from "../constant/menu";
import { MdArrowBackIosNew } from "react-icons/md";
import ReactPlayer from "react-player/lazy";
import MenuContext from "../context/MenuContext";

const PlayTVComponent = ({ isShow }) => {
  const { resolution, setMenu } = useContext(MenuContext);
  const [stream, setStream] = useState({
    url: "",
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
      <div
        className={`no-scrollbar absolute w-full z-30 overflow-auto text-white bg-black ${
          stream != null ? "visible" : "invisible"
        }`}
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
                  setMenu(MENU_DEFAULT);
                  setPlaying(false);
                  setPlayed(0);
                  playerRef.current.seekTo(0);
                  setStream({ url: "" });
                }}
              >
                <MdArrowBackIosNew className="text-lg" />
                <span className="text-xs">Back</span>
              </div>
              <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit"></span>
              <div className="flex items-center px-2 space-x-2 text-white"></div>
            </div>
            <div
              className={`flex-1 overflow-y-auto bg-black pb-2 flex no-scrollbar ${
                stream.url != "" ? "visible" : "invisible"
              }`}
            >
              <div className="relative flex flex-col px-1 w-full">
                <div className="absolute w-full h-[165px] bg-transparent"></div>
                <ReactPlayer
                  ref={playerRef}
                  url={stream.url}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlayTVComponent;
