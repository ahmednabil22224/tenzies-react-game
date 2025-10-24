import { useState, useEffect, createContext } from "react";

export const TimeContext = createContext();

const TimeProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [winCount, setWinCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [bestTimes, setBestTimes] = useState(
    JSON.parse(localStorage.getItem("optimium time")) || [] 
  );

  function padNumber(number) {
    return number < 10 ? "0" + number : number;
  }

  function formatTime(seconds) {
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = [
      padNumber(minutes),
      padNumber(remainingSeconds),
    ].join(":");

    return formattedTime;
  }

  useEffect(() => {
    const sortedList = [...bestTimes, timer].sort((a, b) => a - b);
    timer && setBestTimes(sortedList.slice(0, 3));

    timer &&
      localStorage.setItem(
        "optimium time",
        JSON.stringify(sortedList.slice(0, 3))
      );
  }, [winCount]);

  return (
    <TimeContext.Provider
      value={{
        count,
        setCount,
        winCount,
        setWinCount,
        timer,
        setTimer,
        formatTime,
        bestTimes,
      }}>
      {children}
    </TimeContext.Provider>
  );
};

export default TimeProvider;
