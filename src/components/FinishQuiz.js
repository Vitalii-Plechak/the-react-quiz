import { useQuiz } from "../contexts/QuizProvider";

function FinishQuiz() {
  const { points, questions } = useQuiz();
  const totalPoints = questions?.length
    ? questions.reduce((total, question) => total + question.points, 0)
    : 0;
  const percentage = Math.ceil((points / totalPoints) * 100);

  return (
    <p className="result">
      You scored <strong>{points}</strong> out of {totalPoints} ({percentage}%)
    </p>
  );
}

export default FinishQuiz;
