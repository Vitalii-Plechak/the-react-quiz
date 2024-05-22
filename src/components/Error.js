import { useQuiz } from "../contexts/QuizProvider";

function Error() {
  const { errorMessage } = useQuiz();

  return (
    <p className="error">
      <span>💥</span> {errorMessage || "Something went wrong. Try again later."}
    </p>
  );
}

export default Error;
