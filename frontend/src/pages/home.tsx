import FirstPageBody from "../Components/FirstPageBody";
import Header from "../Components/Header";
import { io } from "socket.io-client";

const Home = () => {
  const socket = io("ws://localhost:8000");
  socket.on("hello", (arg) => {
    console.log(arg);
  });
  socket.emit("howdy", "Hello from frontend!");
  return (
    <>
      <Header />
      <FirstPageBody />
    </>
  );
};

export default Home;
