import React, { useContext } from "react";
import { MENU_DEFAULT, MENU_EMAIL_DETAIL } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew, MdOutlineSearch } from "react-icons/md";

const EmailComponent = ({ isShow }) => {
  const { setMenu } = useContext(MenuContext);

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
          Email
        </span>
        <div className="flex items-center px-2 text-blue-500">
          {/* <MdEdit className='text-lg' /> */}
        </div>
      </div>
      <div
        className="no-scrollbar flex flex-col w-full h-full text-white overflow-y-auto"
        style={{
          paddingTop: 65,
        }}
      >
        <div className="bg-black flex items-center w-full pb-1">
          <div className="w-2"></div>
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <MdOutlineSearch className="text-lg" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="text-sm w-full text-white flex-1 border border-[#3D3D3F] focus:outline-none rounded-full px-2 py-1 pl-8 bg-[#3B3B3B]"
            />
          </div>
          <div className="w-2"></div>
        </div>

        <div className="pl-1 py-2">
          <span className="text-xs font-medium text-gray-400">Inbox</span>
        </div>
        {[...Array(20)].map((_, i) => {
          return (
            <div
              className="flex flex-col pb-4 pl-1 cursor-pointer"
              key={i}
              onClick={() => setMenu(MENU_EMAIL_DETAIL)}
            >
              <div className="w-full grid grid-cols-6">
                <img
                  src="https://resized-image.uwufufu.com/selection/16733109502208426/720/Tommy%20T.jpg"
                  className="w-9 h-9 object-cover rounded-full"
                  alt=""
                />
                <div className="leading-none col-span-4 text-sm">
                  <div className="line-clamp-1">Brandon O'Connell</div>
                  <div className="line-clamp-1 text-xs">
                    Eligendi molestiae quamEligendi molestiae quamEligendi
                    molestiae quamEligendi molestiae quamEligendi molestiae
                    quamEligendi molestiae quam.
                  </div>
                  <div className="text-gray-400 text-xs line-clamp-1">
                    Rem cumque aut nemo quia libero laudantium. Dolorem quia
                    nihil tempora qui ex libero ut quis. Blanditiis consequatur
                    quibusdam id voluptatibus. Ea magni delectus fuga corrupti
                    molestiae non. Laborum ducimus deleniti aliquid quas earum
                    est. Provident vel dicta similique in repellat ad in. Et
                    praesentium consequatur est culpa placeat qui tempore.
                    Commodi illo possimus molestiae vel delectus. Et ea nesciunt
                    repudiandae voluptatum quam veritatis dolorem. Ut qui
                    aut.&lt;br&gt;&lt;br&gt;Eos voluptas pariatur numquam
                    voluptas beatae perspiciatis et. Eaque qui soluta
                    repudiandae facilis omnis dolorum. Consectetur ullam neque
                    ad magnam.&lt;br&gt;&lt;br&gt;Ratione nisi voluptas rerum
                    totam ducimus nam fugit a.
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between text-gray-400">
                  <div className="text-xs">9:6AM</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default EmailComponent;
