import React, { useContext } from "react";
import MenuContext from "../context/MenuContext";

const LayoutComponent = ({ children }) => {
  const { resolution } = useContext(MenuContext);
  return (
    <div
      className="no-scrollbar"
      style={{
        maxWidth: `${resolution.layoutWidth}px`,
        width: `${resolution.layoutWidth}px`,
        maxHeight: `${resolution.layoutHeight}px`,
        height: `${resolution.layoutHeight}px`,
      }}
    >
      {children}
    </div>
  );
};
export default LayoutComponent;
