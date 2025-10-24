import { useContext } from "react";
import NumBox from "./NumBox";
import { TimeContext } from "../context/TimeContext";

const FullNums = ({ dice, setDice, rollDice }) => {
  const { count, timer } = useContext(TimeContext);

  function handleChange(id) {
    if(timer === 0) return; 

    if (count > 20) {
      rollDice();
      return;
    }

    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die, i) => (
    <NumBox
      key={i}
      num={die.value}
      isHeld={die.isHeld}
      id={die.id}
      handleChange={() => handleChange(die.id)}
    />
  ));

  return <div className="nums">{diceElements}</div>;
};

export default FullNums;
