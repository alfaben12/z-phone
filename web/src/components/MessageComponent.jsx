import React, { useContext } from "react";
import { MENU_DEFAULT, MENU_MESSAGE_CHATTING } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew } from "react-icons/md";

const MessageComponent = ({ isShow }) => {
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
          Message
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
        {[...Array(50)].map((_, i) => {
          return (
            <div
              className="flex flex-col pl-1 pr-1"
              key={i}
              onClick={() => setMenu(MENU_MESSAGE_CHATTING)}
            >
              <div className="w-full cursor-pointer grid grid-cols-6">
                <img
                  src="https://resized-image.uwufufu.com/selection/16733109502208426/720/Tommy%20T.jpg"
                  className="w-9 h-9 object-cover rounded-full"
                  alt=""
                />
                <div className="leading-none col-span-4 text-sm border-b border-gray-900 pb-2 mb-2">
                  <div className="line-clamp-1">
                    Brandon O'Connell Brandon O'Connell Brandon O'Connell
                    Brandon O'Connell
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
export default MessageComponent;
