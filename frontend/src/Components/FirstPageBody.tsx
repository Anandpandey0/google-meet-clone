import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BiVideoPlus } from "react-icons/bi";
import { MdKeyboard } from "react-icons/md";
import { generateRandom } from "./miscellaneous/generateRoomId";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedInUserInfoState } from "../recoil/authState";
import { getSocketInstance } from "../recoil/socketState";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";
import { contentArray } from "./miscellaneous/contentArray";
import {
  leftImageHandler,
  rightImageHandler,
} from "./miscellaneous/functions/imageHandlers";
const FirstPageBody: React.FC = () => {
  const [imgSrc, setImgSrc] = useState(contentArray[0].imgUrl);
  const [heading, setHeading] = useState(contentArray[0].heading);
  const [para, setPara] = useState(contentArray[0].para);
  const navigate = useNavigate();
  const userInfo = useRecoilValue(loggedInUserInfoState);
  const [room, setRoom] = useState<string>("");
  const [userPeerInfo, setUserPeerInfo] = useState<Peer | null>(null);
  const socket = getSocketInstance();

  useEffect(() => {
    if (userInfo) {
      socket.on("room-created", (arg) => {
        console.log("Room is created");
        console.log("Data from Backend", arg);
      });
    }
    return () => {
      socket.off("room-created");
    };
  }, [room, socket, userInfo]);

  const createRoomHandler = () => {
    if (userInfo) {
      const room = generateRandom();
      const userId = uuidV4();
      const peer = new Peer(userId);
      setUserPeerInfo(peer);
      socket.emit("create-room", {
        email: userInfo.email,
        room,
      });
      navigate(`/room/${room}`);
    } else {
      navigate("/login");
    }
  };

  const handleLeftClick = () => {
    const currentIndex = contentArray.findIndex(
      (item) => item.imgUrl === imgSrc
    );
    const {
      imgSrc: newImgSrc,
      heading: newHeading,
      para: newPara,
    } = leftImageHandler(currentIndex, contentArray);
    setImgSrc(newImgSrc);
    setHeading(newHeading);
    setPara(newPara);
  };

  const handleRightClick = () => {
    const currentIndex = contentArray.findIndex(
      (item) => item.imgUrl === imgSrc
    );
    const {
      imgSrc: newImgSrc,
      heading: newHeading,
      para: newPara,
    } = rightImageHandler(currentIndex, contentArray);
    setImgSrc(newImgSrc);
    setHeading(newHeading);
    setPara(newPara);
  };
  const handleRoomInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value.replace(/-/g, ""); // Remove existing hyphens
    const formattedInput = input.replace(/(.{3})/g, "$1-"); // Add hyphens every 3 characters
    // console.log(formattedInput);
    setRoom(formattedInput.slice(0, 11));
  };
  const handleRoomInput = () => {
    if (!userInfo) {
      navigate("/login");
    } else {
      const userId = uuidV4();
      const peer = new Peer(userId);
      setUserPeerInfo(peer);
      socket.emit("create-room", {
        room,
        email: userInfo.email,
      });
      navigate(`/room/${room}`);
    }
  };

  useEffect(() => {
    const handleGetPeer = () => {
      if (userPeerInfo) {
        socket.emit("get-peer", {
          userPeerInfo,
        });
      } else {
        console.log("userPeerInfo is not available");
      }
    };
    if (userPeerInfo) {
      handleGetPeer();
    }
  }, [userPeerInfo, socket]);

  return (
    <main className=" lg:h-[70vh] flex flex-col   lg:p-20 select-none flex-wrap">
      <div className="left-body py-4 mx-auto w-2/3    mt-4 lg:w-1/2 px-4">
        <h1>Premium video meetings.</h1>
        <h1>Now free for everyone.</h1>
        <p className="lg:w-1/2 mx-auto lg:mx-0  mt-8 text-gray-600 font-medium">
          We re-engineered the service that we built for secure bisiness
          meetings, Google Meet, to make it free and available for all.
        </p>
        <div className="buttons-area flex  gap-2 flex-wrap  w-fit py-4 mt-8  ">
          <button
            className="rounded-md w-38 h-12 px-2 bg-blue-500 text-white font-medium flex items-center gap-2 "
            onClick={createRoomHandler}
          >
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
              value={room}
              onChange={(e) => handleRoomInputChange(e)}
            />
          </div>
          {room.length != 0 && (
            <button
              className="flex items-center ml-4  text-blue-600"
              onClick={handleRoomInput}
            >
              Join
            </button>
          )}
        </div>
      </div>
      <div className="right-body w-2/3 mx-auto lg:w-1/2 ">
        <div className="flex items-center justify-center gap-4">
          <button
            className="hover:bg-gray-400 p-2 rounded-full"
            onClick={handleLeftClick}
          >
            <AiOutlineLeft />
          </button>
          <img src={imgSrc} alt="img-1" />
          <button
            className="hover:bg-gray-400  p-2 rounded-full"
            onClick={handleRightClick}
          >
            <AiOutlineRight />
          </button>
        </div>
        <p className="text-center text-xl font-medium mt-4">{heading}</p>
        <p className="text-center w-1/2 mx-auto mt-2">{para} </p>
      </div>
    </main>
  );
};

export default FirstPageBody;
