import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BiVideoPlus } from "react-icons/bi";
import { MdKeyboard } from "react-icons/md";

const FirstPageBody: React.FC = () => {
  const contentArray = [
    {
      imgUrl:
        "https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg",
      heading: "Get a link that you can share ",
      para: "Click New meeting to get a link that you can send to people that you want to meet with",
    },
    {
      imgUrl:
        "https://www.gstatic.com/meet/user_edu_scheduling_light_b352efa017e4f8f1ffda43e847820322.svg",
      heading: "Plan ahead ",
      para: "Click New meeting to schedule meetings in Google Calender and send invitations to participants",
    },
    {
      imgUrl:
        "https://www.gstatic.com/meet/user_edu_safety_light_e04a2bbb449524ef7e49ea36d5f25b65.svg",
      heading: "Your meeting is safe",
      para: "No one can join a meeting unless invited or admitted by the host",
    },
  ];
  const [imgSrc, setImgSrc] = useState(contentArray[0].imgUrl);
  const [heading, setHeading] = useState(contentArray[0].heading);
  const [para, setPara] = useState(contentArray[0].para);

  const leftImageHandler = () => {
    const currentIndex = contentArray.findIndex(
      (item) => item.imgUrl === imgSrc
    );
    const prevIndex =
      (currentIndex - 1 + contentArray.length) % contentArray.length;
    setImgSrc(contentArray[prevIndex].imgUrl);
    setHeading(contentArray[prevIndex].heading);
    setPara(contentArray[prevIndex].para);
  };

  const rightImageHandler = () => {
    const currentIndex = contentArray.findIndex(
      (item) => item.imgUrl === imgSrc
    );
    const nextIndex = (currentIndex + 1) % contentArray.length;
    setImgSrc(contentArray[nextIndex].imgUrl);
    setHeading(contentArray[nextIndex].heading);
    setPara(contentArray[nextIndex].para);
  };

  return (
    <main className=" lg:h-[70vh] flex flex-col   lg:p-20 select-none flex-wrap">
      <div className="left-body py-4 mx-auto w-2/3    mt-4 lg:w-1/2 px-4">
        <h1>Premium video meetings.</h1>
        <h1>Now free for everyone.</h1>
        <p className="lg:w-1/2 mx-auto   mt-8 text-gray-600 font-medium">
          We re-engineered the service that we built for secure bisiness
          meetings, Google Meet, to make it free and available for all.
        </p>
        <div className="buttons-area flex  gap-2 flex-wrap  w-fit py-4 mt-8  ">
          <button className="rounded-md w-38 h-12 px-2 bg-blue-500 text-white font-medium flex items-center gap-2 ">
            <BiVideoPlus size={25} />
            New Meeting{" "}
          </button>
          <div
            className="border-2 rounded-md border-solid border-gray-500 w-64 px-2 flex items-center h-12 gap-2
           active:border-blue-500 placeholder:text-gray-800 placeholder:font-semibold"
          >
            <MdKeyboard size={25} />
            <input
              type="text"
              className="outline-none"
              placeholder="Enter a code or link"
            />
          </div>
        </div>
      </div>
      <div className="right-body w-2/3 mx-auto lg:w-1/2 ">
        <div className="flex items-center justify-center gap-4">
          <button
            className="hover:bg-gray-400 p-2 rounded-full"
            onClick={leftImageHandler}
          >
            <AiOutlineLeft />
          </button>
          <img src={imgSrc} alt="img-1" />
          <button
            className="hover:bg-gray-400  p-2 rounded-full"
            onClick={rightImageHandler}
          >
            <AiOutlineRight />
          </button>
        </div>
        <p className="text-center text-xl font-medium mt-4">{heading}</p>
        <p className="text-center w-1/2 mx-auto mt-2">{para}</p>
      </div>
    </main>
  );
};

export default FirstPageBody;
