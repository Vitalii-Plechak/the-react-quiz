import { useEffect, useState } from "react";
import { useQuiz } from "../contexts/QuizProvider";
import { SECONDS_PER_QUESION } from "../conf";

function Timer() {
  const { status, questions, dispatch } = useQuiz();
  const [time, setTime] = useState(
    questions?.length ? questions.length * SECONDS_PER_QUESION : null
  );
  const mins = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((time) => (time > 0 && status !== "loading" ? time - 1 : time));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [status]);

  useEffect(() => {
    if (time === 0) dispatch({ type: "finish" });
  }, [time, dispatch]);

  return (
    <div
      className="timer"
      style={{ visibility: status === "loading" ? "hidden" : "visible" }}
    >
      <span>
        {mins < 10 ? `0${mins}` : mins}:{seconds < 10 ? `0${seconds}` : seconds}
      </span>
    </div>
  );
}

export default Timer;
