import React, { useContext } from "react";
import { MENU_DEFAULT } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew } from "react-icons/md";

const ServicesComponent = ({ isShow }) => {
  const { setMenu, services } = useContext(MenuContext);

  return (
    <div
      className="relative flex flex-col w-full h-full"
      style={{
        display: isShow ? "block" : "none",
      }}
    >
      <div className="absolute top-0 flex w-full justify-between py-3 bg-black pt-8 z-10">
        <div
          className="flex items-center px-2 text-blue-500 cursor-pointer"
          onClick={() => setMenu(MENU_DEFAULT)}
        >
          <MdArrowBackIosNew className="text-lg" />
          <span className="text-xs">Back</span>
        </div>
        <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit">
          {/* Services */}
        </span>
        <div className="flex items-center px-2 text-blue-500">
          {/* <MdEdit className='text-lg' /> */}
        </div>
      </div>
      <div
        className="no-scrollbar flex flex-col w-full h-full overflow-y-auto"
        style={{
          paddingTop: 65,
        }}
      >
        <div className="flex flex-col -mt-1 pb-2 px-2 absolute bg-black z-10">
          <div className="text-lg font-semibold text-white">
            Kota Manis Services
          </div>
          <div className="text-xs text-gray-300">
            You can access Kota Manis City's Services anytime and anywhere.
          </div>
        </div>
        {services == undefined ? (
          <LoadingComponent />
        ) : (
          <div
            className="grid grid-cols-2 gap-4 px-2 pb-3"
            style={{
              marginTop: 75,
            }}
          >
            {services.map((v, i) => {
              return (
                <div
                  className="relative flex flex-col bg-white rounded-xl items-center p-2"
                  key={i}
                >
                  <img
                    src={v.logo}
                    className="w-14 h-14 object-cover rounded-full mb-1"
                    alt=""
                    onError={(error) => {
                      error.target.src = "./files/images/noimage.jpg";
                    }}
                  />
                  <div
                    className="flex flex-col items-center"
                    style={{
                      minHeight: 80,
                    }}
                  >
                    <span className="text-center text-xs line-clamp-2">
                      {v.service}
                    </span>
                    <span className="text-xs text-gray-400 font-medium pb-2">
                      Total: {v.onduty}
                    </span>
                  </div>
                  <div className="absolute bottom-0 flex justify-center border-t w-full border-gray-200 py-1 cursor-pointer">
                    <span className="text-sm font-semibold">Message</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default ServicesComponent;
