import { useEffect, useRef, useContext } from "react";
import { TimeContext } from "../context/TimeContext";

export default function Header({ loseCount }) {
  const { winCount, timer, setTimer, formatTime } = useContext(TimeContext);
  const intervalRef = useRef(null);

  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTimer(0);
  }, [winCount]);

  function Timer() {
    if (intervalRef.current) return;
    intervalRef.current =
      timer === 0 && setInterval(() => setTimer((time) => ++time), 1000);
  }

  return (
    <div className="header">
      <h2>To Play Run Time First</h2>
      <div className="timeNav">
        <span>{winCount} Wins</span>
        <div>
          <span>{formatTime(timer)}</span>
          <span onClick={Timer}>click start time</span>
        </div>
        <span>{loseCount} Loses</span>
      </div>
    </div>
  );
}
