import { v4 as uuidV4 } from "uuid";
import Peer from "peerjs";
import { useState, useEffect } from "react";
const Peergenerator = () => {
  const [me, setMe] = useState<Peer>();

  const buttonClickHandler = () => {
    const userId = uuidV4();
    const peer = new Peer(userId);
    setMe(peer);
  };
  useEffect(() => {
    if (me) {
      console.log(me);
    }
  }, [me]);

  return (
    <>
      <h1>Peer Generator</h1>
      <button onClick={buttonClickHandler}>Create Peer</button>
    </>
  );
};

export default Peergenerator;
