// components/LandingPage.js
import React, { useState } from "react";

const LandingPage = ({ startQuiz }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      startQuiz(username.trim());
    }
  };

  return (
    <div className="page landing-page">
      <h2 className="landing-title">당신은 어떤 대통령이었을까요?</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">이름 또는 닉네임을 입력하세요</label>
          <input
            type="text"
            id="username"
            placeholder="예: 길동"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button type="submit" className="btn" disabled={!username.trim()}>
          테스트 시작하기
        </button>
      </form>
    </div>
  );
};

export default LandingPage;
