import FirstPageBody from "../Components/FirstPageBody";
import Header from "../Components/Header";
import { getSocketInstance } from "../recoil/socketState";
import { useEffect, useCallback } from "react";

interface backendData {
  email: string;
  room: string;
}

const Home = () => {
  const socket = getSocketInstance();
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
  useEffect;

  // socket.emit("howdy", "Hello from frontend!");
  return (
    <>
      <Header />
      <FirstPageBody />
    </>
  );
};

export default Home;
