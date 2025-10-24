import { useContext } from "react";
import { TimeContext } from "../context/TimeContext";

const Target = () => {
  const { bestTimes, formatTime } = useContext(TimeContext);

  return (
    <div className="rate">
      <ul>
        {bestTimes.length
          ? bestTimes.map((time, i) => (
              <li key={i}>
                {" "}
                {i === 0
                  ? "🥇 First"
                  : i === 1
                  ? "🥈 Seconed"
                  : "🥉 Third"}{" "}
                Target : <span>{formatTime(time)}</span>{" "}
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};

export default Target;
