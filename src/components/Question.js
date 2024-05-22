import { useQuiz } from "../contexts/QuizProvider";
import Option from "./Option";

function Question() {
  const { index, questions } = useQuiz();
  const question = questions[index];

  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, idx) => (
          <Option option={option} idx={idx} key={option} />
        ))}
      </div>
    </div>
  );
}

export default Question;
