import { useState, useCallback } from "react";
import QUESTIONS from "./questions";
import quizIsCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuesitonTimer";

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);

  const activeQuesitionIndex = userAnswer.length;

  const quizIsComplete = activeQuesitionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswer((prevUserAnswer) => {
      return [...prevUserAnswer, selectedAnswer];
    });
  },
  []);
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizIsCompleteImg} alt="Quiz Complete" />
        <h2>Quiz Complete</h2>
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[activeQuesitionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer timeout={15000} onTimeout={handleSkipAnswer} />
        <h2>{QUESTIONS[activeQuesitionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
