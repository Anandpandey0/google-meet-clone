import { useParams } from "react-router-dom";
import { getSocketInstance } from "../recoil/socketState";
import { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface UserJoinedData {
  email: string;
  id: string; // or number, depending on the actual type
}

const Room: React.FC = () => {
  const { id } = useParams();
  const socket = getSocketInstance();
  const [remoteSockeyId, setRemoteSocketId] = useState<string>("");
  const [myStream, setMySteam] = useState<MediaStream | null>();
  const handleUserJoined = useCallback(({ email, id }: UserJoinedData) => {
    console.log(email, "joined the room,with id");
    setRemoteSocketId(id);
  }, []);
  useEffect(() => {
    socket.on("user-joined", ({ email, id }: UserJoinedData) => {
      console.log(email, "joined the room,with id");
      setRemoteSocketId(id);
    });

    return () => {
      socket.off("user-joined", handleUserJoined);
    };
  }, [socket, handleUserJoined]);
  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    // const offer = getPeerConnection(socket);
    // socket.emit("call-user", { to: remoteSockeyId, offer });
    setMySteam(stream);
    // console.log(stream);
  }, []);

  return (
    <>
      <p>Room</p>
      <p>Room id: {id}</p>
      <p>{remoteSockeyId ? "Connected" : "No one is in the room"}</p>
      {remoteSockeyId && (
        <button
          className="border-2 border-solid border-black p-2 "
          onClick={handleCallUser}
        >
          Call me{" "}
        </button>
      )}
      {myStream && (
        <ReactPlayer
          url={myStream}
          height="50vh"
          width="50vw"
          playing
          muted={true}
        />
      )}
      {myStream && <button onClick={() => setMySteam(null)}>End call</button>}
    </>
  );
};

export default Room;
