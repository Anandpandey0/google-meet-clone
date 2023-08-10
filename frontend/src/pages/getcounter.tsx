import { useRecoilValue } from "recoil";
import { loggedInUserInfoState } from "../recoil/authState";

const Getcounter = () => {
  const userInfo = useRecoilValue(loggedInUserInfoState);
  const clickHandler = () => {
    console.log(userInfo);
  };
  return (
    <button
      className="border-2 border-solid border-black p-2"
      onClick={clickHandler}
    >
      getcounter
    </button>
  );
};

export default Getcounter;
