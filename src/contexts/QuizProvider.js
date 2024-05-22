import { createContext, useContext, useEffect, useReducer } from "react";
import { getQuestions } from "../api/quiz";

export const QuizContext = createContext();

const initialState = {
  questions: [],
  status: "ready", // 'loading', 'error', 'ready', 'active', 'finished'
  index: 0,
  answers: [],
  correctAnswers: [],
  points: 0,
  errorMessage: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, status: "loading" };
    case "recieved":
      return { ...state, status: "ready", questions: action.payload };
    case "error":
      return { ...state, status: "error", errorMessage: action.payload };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "answer":
      return {
        ...state,
        answers: [...state.answers, action.payload],
      };
    case "checkAnswer":
      const question = state.questions.at(state.index);
      const answer = state.answers.at(state.index);

      return {
        ...state,
        correctAnswers: [...state.correctAnswers, action.payload],
        points:
          answer.answer === action.payload.answer
            ? state.points + question.points
            : state.points,
      };
    case "nextStep":
      return {
        ...state,
        index:
          state.index < state.questions.length - 1
            ? state.index + 1
            : state.index,
      };
    case "reset":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "finish":
      return { ...state, status: "finished" };
    default:
      throw new Error("Unkown action");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answers, correctAnswers, points, errorMessage },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    (async function fetchQuestions() {
      dispatch({ type: "loading" });

      try {
        const questionsData = await getQuestions();

        if (questionsData)
          dispatch({ type: "recieved", payload: questionsData });
      } catch (err) {
        dispatch({ type: "error", payload: err.message || "" });
        console.error(err);
      }
    })();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answers,
        correctAnswers,
        points,
        errorMessage,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const value = useContext(QuizContext);
  if (value === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return value;
}

export { QuizProvider, useQuiz };
