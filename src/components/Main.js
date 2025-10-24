import { useContext } from "react";
import { TimeContext } from "../context/TimeContext";

const Main = () => {
  const { count } = useContext(TimeContext);
  return (
    <div className="main">
      <h2>{count > 20 ? 0 : count} Steps</h2>
      <div>
        <h3>Tenzies</h3>
        <p>
          Roll untill all dice are the same. Click eaxh die to freeze it at its
          current value between rolls.
        </p>
      </div>
    </div>
  );
}; 

export default Main;
