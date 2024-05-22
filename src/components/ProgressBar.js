import { useQuiz } from "../contexts/QuizProvider";

function ProgressBar() {
  const { index, points, answers, questions } = useQuiz();
  const questionsNumber = questions?.length || 0;
  const totalPoints = questions.length
    ? questions.reduce((total, question) => total + question.points, 0)
    : 0;

  return (
    <header className="progress">
      <progress
        max={questionsNumber}
        value={index + Number(answers[index] !== undefined)}
      ></progress>

      <p>
        Question <strong>{index + 1}</strong> / {questionsNumber}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
    </header>
  );
}

export default ProgressBar;
