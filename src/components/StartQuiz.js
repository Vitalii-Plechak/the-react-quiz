import { useQuiz } from "../contexts/QuizProvider";

function StartQuiz() {
  const { questions, dispatch } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questions?.length} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        type="button"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartQuiz;
