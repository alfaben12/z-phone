import React from "react";
import { PHONE_HEIGHT, PHONE_WIDTH } from "../constant/menu";

const LayoutComponent = ({ children }) => {
  return (
    <div
      className="no-scrollbar"
      style={{
        maxWidth: `${PHONE_WIDTH}px`,
        width: `${PHONE_WIDTH}px`,
        maxHeight: `${PHONE_HEIGHT}px`,
        height: `${PHONE_HEIGHT}px`,
      }}
    >
      {children}
    </div>
  );
};
export default LayoutComponent;
