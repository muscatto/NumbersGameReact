import "./App.css";
import Board from "./components/Board";
import Table from "./components/Table";
import Confetti from "./components/Confetti";
import Modal from "./components/Modal";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./lib/firebase";

let startTime;
let timeoutId;

function App() {
  const [timerText, setTimerText] = useState(0);
  const [currentNum, setCurrentNum] = useState();
  const [displayModal, setDisplayModal] = useState(false);
  const [rePlaying, setRePlaying] = useState(0);

  const handleStartClick = () => {
    if (typeof timeoutId !== "undefined") {
      clearTimeout(timeoutId);
    }
    setCurrentNum(1);
    startTime = Date.now();
    runTimer();
    setRePlaying((prevState) => { return prevState + 1; });
  };

  const runTimer = () => {
    setTimerText(((Date.now() - startTime) / 1000).toFixed(2));
    timeoutId = setTimeout(() => {
      runTimer();
    }, 10);
  };

  const addCurrentNum = () => {
    setCurrentNum((prevState) => { return prevState + 1; });
    Check();
  };

  async function addData(name, time) {
    try {
      const docRef = await addDoc(collection(db, "rank"), {
        name: name,
        time: time,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      alert("Error adding document: ", e);
    }
  }

  const Check = () => {
    if (currentNum === 25) {
      clearTimeout(timeoutId);
      setDisplayModal((prevState) => { return !prevState });
      const submitName = prompt("名前を入力してください");
      if (typeof submitName !== "string" || submitName === '') {
        return;
      }
      addData(submitName, Number(timerText));
    }
  };

  const handleModalCloseClick = () => {
    setDisplayModal((prevState) => { return !prevState });
  };

  return (
    <>
      {displayModal && (
        <>
          <Confetti />
          <Modal time={timerText} onModalClick={handleModalCloseClick} />
        </>
      )}
      <div id="container">
        <div id="timer"><span className="game-title">NumbersGame</span>{timerText}</div>
        <Board addCurrentNum={addCurrentNum} currentNum={currentNum} playCount={rePlaying} />
        <div id="btn" onClick={handleStartClick}>
          START
        </div>
        <Table modalStatus={displayModal} />
      </div>
    </>
  );
}

export default App;
