import "./App.css";
import { useState, useEffect, useContext } from "react";
import Header from "./components/Header";
import Target from "./components/Targets";
import Main from "./components/Main";
import FullNums from "./components/FullNums";
import { TimeContext } from "./context/TimeContext";
import confetti from "canvas-confetti";

function App() {
  const [dice, setDice] = useState(gameRandNums());
  const [tenzies, setTenzies] = useState("Roll");

  const [loseCount, setLosecount] = useState(0);
  const [allSameValue, setAllSameValue] = useState(false);

  const { count, setCount, setWinCount, timer } = useContext(TimeContext);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const sameValue = dice.every((die) => die.value === firstValue);
    setAllSameValue(sameValue);
    if (allHeld && sameValue) {
      setWinCount((win) => win + 1);
      setTenzies("New Game");
      setCount(() => 0);
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  }, [dice]);

  function generateRandNum(id) {
    return { value: Math.ceil(Math.random() * 6), isHeld: false, id };
  }

  function gameRandNums() {
    const arrnum = [];
    for (let i = 0; i < 10; i++) arrnum.push(generateRandNum(i));
    return arrnum;
  }

  function rollDice() {
    if (timer === 0 && tenzies === "Roll") return;

    if (count >= 20) setTenzies("New Game");

    setCount((prev) => (prev > 20 ? 0 : prev + 1));

    if (tenzies === "New Game" && !allSameValue) {
      setLosecount((lose) => lose + 1);
    }

    setDice((oldDice) =>
      oldDice.map((die, i) => {
        return die.isHeld ? { ...die, value: die.value } : generateRandNum(i);
      })
    );

    if (tenzies === "New Game") {
      setDice(gameRandNums());
      setTenzies("Roll");
      setCount((counter) => (counter = 0));
    }
  }

  return (
    <div className="game">
      <Header loseCount={loseCount} />
      <Target />
      <Main />
      <FullNums dice={dice} setDice={setDice} rollDice={rollDice} />
      <button onClick={rollDice}>{tenzies}</button>
    </div>
  );
}

export default App;
