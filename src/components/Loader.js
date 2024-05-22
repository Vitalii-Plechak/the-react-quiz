import { useQuiz } from "../contexts/QuizProvider";

export default function Loader() {
  const { questions } = useQuiz();

  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Loading {questions?.length ? "answers" : "questions"}...</p>
    </div>
  );
}
