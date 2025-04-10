// components/LoadingPage.js
import React from "react";

const LoadingPage = () => {
  return (
    <div className="page loading-page">
      <h3 className="loading-text">탄핵 심판 중...</h3>
      <div className="loader"></div>
      <p>헌법재판소가 당신의 사례를 검토하고 있습니다</p>
      <div
        className="ad-space"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div>대선 2025.06.03(화) </div>
        <div>사전투표 05.29(금) ~ 30(토)</div>
      </div>
    </div>
  );
};

export default LoadingPage;
