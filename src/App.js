import Header from "./components/Header";
import Main from "./components/Main";
import { QuizProvider } from "./contexts/QuizProvider";

function App() {
  return (
    <div className="app">
      <Header />
      <QuizProvider>
        <Main />
      </QuizProvider>
    </div>
  );
}

export default App;
