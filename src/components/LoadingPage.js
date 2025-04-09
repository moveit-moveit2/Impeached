// components/LoadingPage.js
import React from "react";

const LoadingPage = () => {
  return (
    <div className="page loading-page">
      <h3 className="loading-text">탄핵 심판 중...</h3>
      <div className="loader"></div>
      <p>헌법재판소가 당신의 사례를 검토하고 있습니다</p>
      <div className="ad-space">광고 영역</div>
    </div>
  );
};

export default LoadingPage;
