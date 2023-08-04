import Clock from "./miscellaneous/Clock";
import { AiOutlineQuestionCircle, AiOutlineSetting } from "react-icons/ai";
import { PiSealWarningBold } from "react-icons/pi";
import { IoMdApps } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";

const Header: React.FC = () => {
  return (
    <nav className=" p-2 h-20 flex justify-between items-center ">
      <div className="image-container  sm:flex items-center align-middle hidden px-4 z-0 ">
        <img
          src="https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_1x_icon_124_40_2373e79660dabbf194273d27aa7ee1f5.png"
          alt=""
          className=" object-contain w-full"
        />
        <span className="mt-[-5px] ml-1 text-2xl font-semibold text-gray-600">
          Meet
        </span>
      </div>
      <div className="right-side  w-full justify-evenly sm:justify-end  flex-auto sm:w-fit  flex items-center  bg-white z-10">
        <Clock />
        <div className="rounded-full w-fit h-full p-2 hover:bg-gray-300 ml-5 cursor-pointer">
          <AiOutlineQuestionCircle size={25} />
        </div>
        <div className="rounded-full w-fit h-full p-2 hover:bg-gray-300 cursor-pointer">
          <PiSealWarningBold size={25} />
        </div>
        <div className="rounded-full w-fit h-full p-2 hover:bg-gray-300 cursor-pointer">
          <AiOutlineSetting size={25} />
        </div>
        <div className="rounded-full lg:ml-8 w-fit h-full p-2 hover:bg-gray-300 cursor-pointer">
          <IoMdApps size={25} />
        </div>
        <div className="rounded-full w-fit h-full p-2 hover:bg-gray-300 cursor-pointer">
          <RxAvatar size={25} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
