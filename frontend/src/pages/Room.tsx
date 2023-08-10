import { useParams } from "react-router-dom";
import { getSocketInstance } from "../recoil/socketState";
import { useCallback } from "react";

interface UserJoinedData {
  email: string;
  id: string; // or number, depending on the actual type
}

const Room: React.FC = () => {
  const { id } = useParams();
  const socket = getSocketInstance();
  const handleUserJoined = useCallback(
    ({ email, id }: UserJoinedData): void => {
      console.log(`Email ${email} joined room`);
      console.log(`Id ${id} joined room`);
    },
    []
  );

  return (
    <>
      <p>Room</p>
      <p>Room id: {id}</p>
      {/* You can remove the button element */}
    </>
  );
};

export default Room;
