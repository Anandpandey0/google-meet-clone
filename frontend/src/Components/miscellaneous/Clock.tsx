// Clock.tsx
import React, { useState, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
const getIndianDateTime = () => {
  const indianTimeZone = "Asia/Kolkata";
  const date = new Date();
  const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone: indianTimeZone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    timeZone: indianTimeZone,
    weekday: "short",
    day: "numeric",
    month: "short",
  };

  const time = date.toLocaleString("en-US", timeOptions);
  const dateStr = date.toLocaleString("en-US", dateOptions);

  return (
    <div className="flex  items-center w-36  justify-between text-gray-900">
      {time} <GoDotFill size={10} /> {dateStr}
    </div>
  );
};

const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(getIndianDateTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getIndianDateTime());
    }, 1000); // Update every second

    return () => {
      clearInterval(intervalId); // Clean up the interval on component unmount
    };
  }, []);

  return <div className=" block h-auto w-auto select-none">{currentTime}</div>;
};

export default Clock;
