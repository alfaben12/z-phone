import React, { createContext, useEffect, useState } from "react";

const GeneralContext = createContext({
  time: "",
  resolution: {
    frameWidth: 300,
    frameHeight: 620,
    layoutWidth: 280,
    layoutHeight: 600,
    radius: 40,
    margin: 20,
  },
});

export const GeneralProvider = ({ children }) => {
  const date = new Date();
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  };
  const jakartaTime = date.toLocaleString("en-US", options);

  const [time, setTime] = useState(jakartaTime);
  const [resolution, setResolution] = useState({
    frameWidth: 300,
    frameHeight: 620,
    layoutWidth: 280,
    layoutHeight: 600,
    radius: 40,
    margin: 20,
  });

  // useEffect(() => {
  //   console.log("ok");
  // }, []);

  return (
    <GeneralContext.Provider
      value={{
        time,
        resolution,
        setResolution,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
