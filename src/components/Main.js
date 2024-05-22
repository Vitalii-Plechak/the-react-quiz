import Loader from "./Loader";
import Error from "./Error";
import StartQuiz from "./StartQuiz";
import Question from "./Question";
import Actions from "./Actions";
import ProgressBar from "./ProgressBar";
import FinishQuiz from "./FinishQuiz";
import Timer from "./Timer";
import { useQuiz } from "../contexts/QuizProvider";

function Main() {
  const { status } = useQuiz();

  return (
    <main className="main">
      {(status === "active" || status === "loading") && <Timer />}
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <StartQuiz />}
      {status === "active" && (
        <>
          <ProgressBar />
          <Question />
        </>
      )}
      {status === "finished" && <FinishQuiz />}
      {(status === "active" || status === "finished") && (
        <footer className="footer">
          <Actions />
        </footer>
      )}
    </main>
  );
}

export default Main;
