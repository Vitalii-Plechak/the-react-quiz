import { checkAnswer } from "../api/quiz";
import { useQuiz } from "../contexts/QuizProvider";

function Option({ option, idx }) {
  const { index, answers, correctAnswers, questions, dispatch } = useQuiz();
  const correctAnswer = correctAnswers[index];
  const answer = answers[index];
  const hasAnswered = answer !== undefined && correctAnswer !== undefined;

  async function onAnswer(triggeredAnswer) {
    try {
      dispatch({ type: "loading" });
      const correctAnswer = await checkAnswer(triggeredAnswer.id);
      dispatch({ type: "start" });
      dispatch({ type: "answer", payload: triggeredAnswer });
      dispatch({ type: "checkAnswer", payload: correctAnswer });
    } catch (err) {
      dispatch({ type: "error", payload: err?.message || "" });
      console.error(err);
    }
  }

  return (
    <button
      className={`btn btn-option ${answer?.answer === idx ? "answer" : ""} ${
        hasAnswered ? (idx === correctAnswer.answer ? "correct" : "wrong") : ""
      }`}
      disabled={hasAnswered}
      onClick={() => onAnswer({ id: questions[index].id, answer: idx })}
    >
      {option}
    </button>
  );
}

export default Option;
