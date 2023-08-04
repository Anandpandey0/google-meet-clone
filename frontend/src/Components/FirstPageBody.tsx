import { BiVideoPlus } from "react-icons/bi";
import { MdKeyboard } from "react-icons/md";

const FirstPageBody: React.FC = () => {
  return (
    <main className=" h-[70vh] flex give-border p-20">
      <div className="left-body py-4   mt-4 w-1/2 px-4">
        <h1>Premium video meetings.</h1>
        <h1>Now free for everyone.</h1>
        <p className="w-1/2 mt-8 text-gray-600 font-medium">
          We re-engineered the service that we built for secure bisiness
          meetings, Google Meet, to make it free and available for all.
        </p>
        <div className="buttons-area flex  gap-2   w-fit py-4 mt-8  ">
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
          {/* <button>New Meeting </button> */}
        </div>
      </div>
      <div className="right-body give-border w-1/2"></div>
    </main>
  );
};

export default FirstPageBody;
