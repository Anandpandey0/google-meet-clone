import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSocketInstance } from "../recoil/socketState";
import { userPeerInfoState } from "../recoil/peerState";
import { useRecoilValue } from "recoil";

// interface UserJoinedData {
//   email: string;
//   id: string; // or number, depending on the actual type
// }

const Room: React.FC = () => {
  const { id } = useParams();
  const socket = getSocketInstance();
  const userPeerInfo = useRecoilValue(userPeerInfoState);
  useEffect(() => {
    console.log("UserPeerInfo", userPeerInfo);
    socket.emit("join-room", { room: id });
  }, [id, socket, userPeerInfo]);

  return (
    <>
      <p>Room</p>
      <p>Room id: {id}</p>
    </>
  );
};

export default Room;
