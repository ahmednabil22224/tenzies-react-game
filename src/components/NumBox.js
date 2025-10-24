import { useContext } from "react";
import { TimeContext } from "../context/TimeContext";

export default function NumBox({ handleChange, isHeld, num }) {
  const { count } = useContext(TimeContext);

  const style = {
    backgroundColor: isHeld ? "green" : count > 20 ? "red" : "#fff",
    color: isHeld || count > 20 ? "#fff" : "",
  };

  return (
    <div className="num" style={style} onClick={handleChange}>
      <h2>{num}</h2>
    </div>
  );
}
