import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";

const ResultPage = ({ verdictText, resetQuiz, personalityType }) => {
  const { title, respondent, main, reason, constitutionalArticle } =
    verdictText;
  const resultRef = useRef(null);
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월 ${currentDate.getDate()}일`;
  const [imageError, setImageError] = useState(false);

  // 성격 유형에 맞는 이미지 경로 생성
  const resultImagePath = `/images/${personalityType}.png`;

  // 이미지 저장 기능
  const saveAsImage = () => {
    if (resultRef.current) {
      html2canvas(resultRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = `${title.substring(0, 20)}_파면결과.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  // 링크 복사 기능
  const copyLink = () => {
    const textArea = document.createElement("textarea");
    textArea.value = window.location.href;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("링크가 복사되었습니다!");
  };

  return (
    <div className="page result-page">
      <div ref={resultRef}>
        <div className="result-title-container">
          <h2 className="result-title">{title}</h2>
        </div>

        <div className="result-image">
          <img
            src={imageError ? "/images/default-result.png" : resultImagePath}
            alt="파면 이미지"
            onError={() => setImageError(true)}
          />
        </div>

        <div className="verdict">
          <div className="verdict-header">
            <div className="case-number">사건번호: 2025헌-나1234</div>
            <div className="verdict-title">판 결 문</div>
          </div>

          <div className="parties">
            <p>원고: 무지개나라 국민</p>
            <p>{respondent}</p>
          </div>

          <div className="verdict-content">
            <h3>주문:</h3>
            <p>{main}</p>

            <h3>이유:</h3>
            <p>{reason}</p>

            <p>{constitutionalArticle}</p>
          </div>

          <div className="verdict-footer">
            <p>{formattedDate}</p>
            <p>무지개나라 헌법재판소</p>
            <div className="seal">인장</div>
          </div>
        </div>
      </div>

      <div className="share-container">
        <h3 className="share-title">내 결과 공유하기</h3>
        <div className="share-buttons">
          <button className="share-btn save-image-btn" onClick={saveAsImage}>
            결과 저장
          </button>
          <button className="share-btn copy-link-btn" onClick={copyLink}>
            링크 복사
          </button>
        </div>
      </div>

      <button
        className="btn"
        onClick={resetQuiz}
        style={{ marginTop: "30px", width: "100%" }}
      >
        다시 테스트하기
      </button>
    </div>
  );
};

export default ResultPage;
