import { useQuiz } from "../contexts/QuizProvider";

function Actions() {
  const { index, status, answers, questions, dispatch } = useQuiz();
  const hasAnswer = answers[index] !== undefined;
  const isFinished = status === "finished";
  const isLastQuestion = questions?.length
    ? questions.length - 1 === index
    : false;

  return (
    <div className="actions">
      {hasAnswer && !isLastQuestion && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextStep" })}
        >
          Next
        </button>
      )}
      {isLastQuestion && !isFinished && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      )}

      {isFinished && (
        <button
          className="btn btn-ui restart"
          onClick={() => dispatch({ type: "reset" })}
        >
          Restart
        </button>
      )}
    </div>
  );
}

export default Actions;
