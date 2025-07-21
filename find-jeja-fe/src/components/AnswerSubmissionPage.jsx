import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AnswerSubmissionPage({ onAnswerSubmit }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { attemptsLeft: initialAttemptsLeft } = location.state || { attemptsLeft: 3 };

  const [answerInput, setAnswerInput] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(initialAttemptsLeft);

  useEffect(() => {
    if (initialAttemptsLeft !== undefined) {
      setAttemptsLeft(initialAttemptsLeft);
    }
  }, [initialAttemptsLeft]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAnswerSubmit(answerInput);
      // alert('정답이 성공적으로 제출되었습니다.');
      // navigate(-1); // Go back to the previous page after submission
    } catch (error) {
      alert('정답 제출에 실패했습니다: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="container py-4">
      <div className="card">
        <div className="card-header card-header-login">
          <h2>정답 입력</h2>
        </div>
        <div className="card-body">
          <p className="card-text">남은 입력 횟수: {attemptsLeft}</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="정답을 입력하세요"
                value={answerInput}
                onChange={(e) => setAnswerInput(e.target.value)}
                disabled={attemptsLeft === 0}
              />
              <button
                className="btn btn-primary"
                type="submit"
                disabled={attemptsLeft === 0}
              >
                제출
              </button>
            </div>
          </form>
          {attemptsLeft === 0 && (
            <div className="alert alert-warning" role="alert">
              모든 입력 횟수를 소진했습니다.
            </div>
          )}
          <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
            뒤로 가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnswerSubmissionPage;