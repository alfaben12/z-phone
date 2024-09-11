import { useContext } from "react";
import GeneralContext from "./context/GeneralContext";

export default function App() {
  const { time, resolution, setResolution } = useContext(GeneralContext);
  const [isOpen, setIsOpen] = useState(false);

  function hide() {
    setIsOpen(false);
    const container = document.getElementById("z-phone-root-frame");
    container.setAttribute("class", "z-phone-fadeout");
    setTimeout(function () {
      container.setAttribute("class", "z-phone-invisible");
    }, 300);
  }

  function show() {
    const container = document.getElementById("z-phone-root-frame");
    container.setAttribute("class", "z-phone-fadein");
    setTimeout(function () {
      container.setAttribute("class", "z-phone-visible");
    }, 300);
  }

  const handleOpenPhone = (event) => {
    let data = event.data;
    if (data.event !== "z-phone") {
      return;
    }

    if (data.isOpen === undefined) {
      return;
    }

    setMenu(MENU_LOCKSCREEN);
    setIsOpen(data.isOpen);
    switch (data.event) {
      case "z-phone":
        if (data.isOpen) {
          show();
        } else {
          hide();
        }
        break;
      default:
        hide();
    }
  };

  function generateDimensions(height) {
    const initWidthAndHeight = {
      initWidth: resolution.frameWidth,
      initHeight: resolution.frameHeight,
    };

    const aspectRatio =
      initWidthAndHeight.initHeight / initWidthAndHeight.initWidth;
    const newWidth = height / aspectRatio;
    const newRadius = height * 0.066;
    const newMargin = height * 0.033;

    return {
      frameWidth: newWidth,
      frameHeight: height,
      layoutWidth: newWidth - newMargin,
      layoutHeight: height - newMargin,
      radius: newRadius,
    };
  }

  return (
    <>
      <div className="absolute top-10 left-5">
        <button
          className="bg-blue-500"
          onClick={() => {
            console.log("OK");
            setResolution(
              generateDimensions(Math.floor(Math.random() * 700) + 200)
            );
          }}
        >
          Change Ratio
        </button>
      </div>
      <div
        className="absolute bottom-10 right-10"
        style={{
          height: `${resolution.frameHeight}px`,
          width: `${resolution.frameWidth}px`,
        }}
      >
        <img
          src={`./frames/1.svg}`}
          onError={(error) => {
            error.target.src = "./frames/1.svg";
          }}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div
            className="bg-red-500"
            style={{
              height: `${resolution.layoutHeight}px`,
              width: `${resolution.layoutWidth}px`,
              borderRadius: resolution.radius,
            }}
          >
            asdasd
          </div>
        </div>
      </div>
    </>
  );
}
