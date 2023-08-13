import { useSetRecoilState } from "recoil";
import FirstPageBody from "../Components/FirstPageBody";
import Header from "../Components/Header";
import { UserInfo, loggedInUserInfoState } from "../recoil/authState";
import { getSocketInstance } from "../recoil/socketState";
import { useEffect, useCallback } from "react";

interface backendData {
  email: string;
  room: string;
}

const Home = () => {
  const socket = getSocketInstance();
  const setLoggedInUserInfo = useSetRecoilState(loggedInUserInfoState);

  const handleJoinRoom = useCallback((data: backendData) => {
    const { email, room } = data;
    console.log(email, room);
  }, []);

  useEffect(() => {
    socket.on("socket-connect", (arg) => {
      console.log(arg);
    });
    socket.on("room-join", handleJoinRoom);
    return () => {
      socket.off("socket-connect");
      socket.off("room-join");
    };
  }, [socket, handleJoinRoom]);
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedUserInfo: UserInfo = JSON.parse(storedUserInfo);
      setLoggedInUserInfo(parsedUserInfo);
    }
  }, [setLoggedInUserInfo]);
  return (
    <>
      <Header />
      <FirstPageBody />
      {/* {console.log(userInfo)} */}
    </>
  );
};

export default Home;
