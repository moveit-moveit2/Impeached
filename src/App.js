// App.js - Main component
import React, { useState } from "react";
import "./App.css";
import LandingPage from "./components/LandingPage";
import QuestionPage from "./components/QuestionPage";
import LoadingPage from "./components/LoadingPage";
import ResultPage from "./components/ResultPage";
import { questions, resultTypes } from "./data/quizData";

function App() {
  // State variables
  const [currentPage, setCurrentPage] = useState("landing");
  const [currentUser, setCurrentUser] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [personalityType, setPersonalityType] = useState("");
  const [verdictText, setVerdictText] = useState({
    title: "",
    respondent: "",
    main: "",
    reason: "",
    constitutionalArticle: "",
  });

  // Navigate to a different page
  const showPage = (page) => {
    setCurrentPage(page);
  };

  // Start the quiz
  const startQuiz = (username) => {
    setCurrentUser(username);
    setCurrentQuestionIndex(0);
    setAnswers(Array(questions.length).fill(null)); // Reset answers
    showPage("question");
  };

  // Load a specific question
  const loadQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  // Handle option selection
  const selectOption = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  // Navigate to next question or loading page
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      loadQuestion(currentQuestionIndex + 1);
    } else {
      showPage("loading");
      // Simulate loading time before calculating result
      setTimeout(calculateResult, 3000);
    }
  };

  // Navigate to previous question
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      loadQuestion(currentQuestionIndex - 1);
    }
  };

  // Calculate personality type and result
  const calculateResult = () => {
    // Group answers by trait categories
    const groupedAnswers = [
      answers.slice(0, 3), // 외향 vs 내향 (질문 1-3)
      answers.slice(3, 6), // 이성 vs 감성 (질문 4-6)
      answers.slice(6, 9), // 현실 vs 이상 (질문 7-9)
      answers.slice(9, 12), // 이기적 vs 이타적 (질문 10-12)
      answers.slice(12), // 예민 vs 둔감 (질문 13-15)
    ];

    // Trait definitions
    const traits = [
      { name: "E", opposite: "I" }, // 외향 vs 내향
      { name: "T", opposite: "F" }, // 이성 vs 감성
      { name: "S", opposite: "N" }, // 현실 vs 이상
      { name: "S", opposite: "A" }, // 이기적 vs 이타적
      { name: "S", opposite: "I" }, // 예민 vs 둔감
    ];

    // Determine personality type
    const type = traits
      .map((trait, i) => {
        const aCount = groupedAnswers[i].filter((a) => a === "A").length;
        const groupSize = 3; // All groups have 3 questions
        return aCount > groupSize / 2 ? trait.name : trait.opposite;
      })
      .join("");

    setPersonalityType(type);
    updateResultText(type);
    showPage("result");
  };

  // Get constitutional article based on personality type
  const getConstitutionalArticle = (type) => {
    // Base constitutional article
    const baseArticle =
      '이는 무지개나라 헌법 제1조 "무지개나라는 민주공화국이다"와 ' +
      '제7조 "공무원은 국민 전체에 대한 봉사자이며, 국민에 대하여 책임을 진다"를 ' +
      "명백히 위반한 행위이다.";

    // Type specific articles
    const typeSpecificArticles = {
      // 외향+이성 조합 - 권력남용 관련
      ET: '또한 헌법 제10조 "모든 국민은 인간으로서의 존엄과 가치를 가지며, 행복을 추구할 권리를 가진다"를 침해하였다.',

      // 외향+감성 조합 - 국가 재정 낭비 관련
      EF: '또한 헌법 제119조 "국가는 균형있는 국민경제의 성장 및 안정과 적정한 소득의 분배를 유지하고, 시장의 지배와 경제력의 남용을 방지하며, 경제주체간의 조화를 통한 경제의 민주화를 위하여 경제에 관한 규제와 조정을 할 수 있다"를 위반하였다.',

      // 내향+이성 조합 - 직무유기 관련
      IT: "또한 헌법 제69조 \"대통령은 취임에 즈음하여 국회에서 다음의 선서를 한다. '나는 헌법을 준수하고 국가를 보위하며 조국의 평화적 통일과 국민의 자유와 복리의 증진 및 민족문화의 창달에 노력하여 대통령으로서의 직책을 성실히 수행할 것을 국민 앞에 엄숙히 선서합니다'\"에 따른 성실 의무를 저버렸다.",

      // 내향+감성 조합 - 국익 훼손 관련
      IF: '또한 헌법 제66조 제3항 "대통령은 조국의 평화적 통일을 위한 성실한 의무를 진다"와 제74조 제1항 "대통령은 헌법과 법률이 정하는 바에 의하여 국군을 통수한다"에 따른 국가수호 의무를 저버렸다.',
    };

    // Specific violations based on detailed traits
    const specificViolations = {
      // 현실+이기적 조합 - 부패/비리 관련
      SS: '더불어 헌법 제46조 "국회의원은 청렴의 의무가 있다"에 상응하는 대통령의 청렴 의무를 위반하였다.',

      // 이상+이기적 조합 - 국가 자원 낭비
      NS: '더불어 헌법 제120조 "광물 기타 중요한 지하자원·수산자원·수력과 경제상 이용할 수 있는 자연력은 법률이 정하는 바에 의하여 일정한 기간 그 채취·개발 또는 이용을 특허할 수 있다"에 따른 국가 자원의 합리적 이용 의무를 저버렸다.',

      // 현실+이타적 조합 - 직권남용
      SA: '더불어 헌법 제11조 "모든 국민은 법 앞에 평등하다. 누구든지 성별·종교 또는 사회적 신분에 의하여 정치적·경제적·사회적·문화적 생활의 모든 영역에 있어서 차별을 받지 아니한다"를 위반하였다.',

      // 이상+이타적 조합 - 국가 안보 위협
      NA: '더불어 헌법 제5조 "무지개나라는 국제평화의 유지에 노력하고 침략적 전쟁을 부인한다"에 따른 국제 평화 유지 의무를 저버렸다.',
    };

    // Combine articles based on personality type
    let result = baseArticle;

    // Add first two letters (외향/내향 + 이성/감성)
    const prefix = type.substring(0, 2);
    if (typeSpecificArticles[prefix]) {
      result += " " + typeSpecificArticles[prefix];
    }

    // Add middle two letters (현실/이상 + 이기적/이타적)
    const middle = type.substring(2, 4);
    if (specificViolations[middle]) {
      result += " " + specificViolations[middle];
    }

    return (
      result +
      ' 더불어 "대통령으로서의 품위를 현저히 손상시키는 행위"에 해당하므로 헌법재판소는 만장일치로 파면을 결정한다.'
    );
  };

  // Update the result text based on personality type
  const updateResultText = (type) => {
    // 1. 원본 결과 텍스트 가져오기 (가장 중요한 부분)
    const originalResultText = resultTypes[type];

    // 2. 파면 사유 완전하게 추출하기 (String.substring으로 완전한 텍스트 추출)
    const reasonStartIndex = originalResultText.indexOf("은 ") + 2;
    const completeReason = originalResultText.substring(reasonStartIndex);

    // 3. 마침표 제거하고 문법적으로 자연스럽게 결과 문구 생성
    // "~했다"로 끝나는 경우 "했다"를 제거하고 "해서"로 대체
    let reasonForTitle = completeReason;
    if (reasonForTitle.endsWith("했다.")) {
      reasonForTitle = reasonForTitle.slice(0, -3); // "했다." 제거
      reasonForTitle += "해서";
    } else if (reasonForTitle.endsWith("했다")) {
      reasonForTitle = reasonForTitle.slice(0, -2); // "했다" 제거
      reasonForTitle += "해서";
    } else if (reasonForTitle.endsWith(".")) {
      reasonForTitle = reasonForTitle.slice(0, -1); // 마침표만 제거
      reasonForTitle += "해서";
    } else {
      reasonForTitle += "해서";
    }

    const impeachmentTitle = `${currentUser} 대통령은 ${reasonForTitle} 파면되었습니다.`;

    // 4. 판결 이유 생성 (기존 로직 유지하되 completeReason 사용)
    let verdictReason = "";

    // E/I trait
    if (type.startsWith("E")) {
      verdictReason = `피고 ${currentUser}은(는) 대중 앞에서 적극적인 행보를 보이며 ${completeReason}`;
    } else {
      verdictReason = `피고 ${currentUser}은(는) 소극적으로 주로 교류하며 ${completeReason}`;
    }

    // Add T/F trait
    if (type.charAt(1) === "T") {
      verdictReason += ` 피고는 객관적 수치와 논리를 내세워 이러한 행위가 국가 발전에 도움이 된다고 주장하였으나,`;
    } else {
      verdictReason += ` 피고는 국민 정서와 공감대를 근거로 이러한 행위가 국민 행복에 기여한다고 주장하였으나,`;
    }

    // Add S/N trait
    if (type.charAt(2) === "S") {
      verdictReason += ` 그것이 실질적으로 국가 운영에 심각한 장애를 초래하였다.`;
    } else {
      verdictReason += ` 그것이 지나치게 미래지향적 발상으로 국가 운영의 현실을 간과하였다.`;
    }

    // Add S/A trait
    if (type.charAt(3) === "S") {
      verdictReason += ` 또한 피고는 자신과 측근의 이익을 국가 이익보다 우선시하였으며,`;
    } else {
      verdictReason += ` 또한 피고는 대의명분을 내세워 무모한 정책을 강행하였으며,`;
    }

    // Add S/I trait
    if (type.charAt(4) === "S") {
      verdictReason += ` 사소한 비판에도 과민하게 반응하여 국정 운영의 안정성을 해쳤다.`;
    } else {
      verdictReason += ` 국민의 반발과 경고에 무감각하게 대응하여 심각한 국가적 혼란을 초래하였다.`;
    }

    // Update verdict text
    setVerdictText({
      title: impeachmentTitle,
      respondent: `피고: ${currentUser} 대통령`,
      main: `피고 ${currentUser}은(는) 대통령직에서 파면한다.`,
      reason: verdictReason,
      constitutionalArticle: getConstitutionalArticle(type),
    });
  };

  // Reset the quiz
  const resetQuiz = () => {
    setCurrentUser("");
    setCurrentQuestionIndex(0);
    setAnswers(Array(questions.length).fill(null));
    setPersonalityType("");
    showPage("landing");
  };

  return (
    <div className="container">
      <div className="header">
        <div className="court-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.54-2.77 8.62-7 10.19-4.23-1.57-7-5.65-7-10.19v-4.7l7-3.12z" />
            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
          </svg>
        </div>
        <h1 className="title">당신이 대통령직에서 파면된 이유</h1>
      </div>

      {currentPage === "landing" && <LandingPage startQuiz={startQuiz} />}

      {currentPage === "question" && (
        <QuestionPage
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          selectOption={selectOption}
          goToNextQuestion={goToNextQuestion}
          goToPreviousQuestion={goToPreviousQuestion}
        />
      )}

      {currentPage === "loading" && <LoadingPage />}

      {currentPage === "result" && (
        <ResultPage
          verdictText={verdictText}
          personalityType={personalityType}
          resetQuiz={resetQuiz}
        />
      )}
      {/* Copyright and Contact Information */}
      <footer className="copyright">
        <p>
          © {new Date().getFullYear()} Rainbow Presidential Impeachment
          Simulator. All Rights Reserved.
        </p>
        <p>투표를잘하쟈</p>
        <p>Contact: lilycocochoi@gmail.com</p>
      </footer>
    </div>
  );
}

export default App;
