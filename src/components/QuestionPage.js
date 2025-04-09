// components/QuestionPage.js
import React from "react";

const QuestionPage = ({
  questions,
  currentQuestionIndex,
  answers,
  selectOption,
  goToNextQuestion,
  goToPreviousQuestion,
}) => {
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestionIndex];

  return (
    <div className="page question-page">
      <div className="question-counter">
        <span>{currentQuestionIndex + 1}</span> /{" "}
        <span>{questions.length}</span>
      </div>
      <h3 className="question-text">{currentQuestion.text}</h3>
      <div className="options">
        {currentQuestion.options.map((option) => (
          <div
            key={option.value}
            className={`option ${
              selectedAnswer === option.value ? "selected" : ""
            }`}
            onClick={() => selectOption(option.value)}
          >
            {option.text}
          </div>
        ))}
      </div>
      <div className="navigation">
        <button
          className="nav-btn"
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          이전
        </button>
        <button
          className="nav-btn"
          onClick={goToNextQuestion}
          disabled={selectedAnswer === null}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;
