import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllCorrectAnswers, getOverallStatus } from '../api';

function AnswerSubmissionPage({ onAnswerSubmit, teamName }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { attemptsLeft: initialAttemptsLeft } = location.state || { attemptsLeft: 3 };

  const [selectedAnswerId, setSelectedAnswerId] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(initialAttemptsLeft);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  useEffect(() => {
    // teamName이 없으면 로그인 페이지로 리다이렉트
    if (!teamName) {
      alert('로그인이 필요합니다.');
      navigate('/');
      return;
    }

    const fetchAttemptsLeft = async () => {
      try {
        const response = await getOverallStatus();
        const currentTeamData = response.data.teams.find(team => team.name === teamName);
        if (currentTeamData) {
          setAttemptsLeft(currentTeamData.attemptsLeft);
        }
      } catch (error) {
        console.error("Error fetching attemptsLeft:", error);
      }
    };

    fetchAttemptsLeft();

    const fetchCorrectAnswers = async () => {
      try {
        const response = await getAllCorrectAnswers();
        setCorrectAnswers(response.data);
      } catch (error) {
        console.error("Error fetching correct answers:", error);
        alert("정답 목록을 불러오는 데 실패했습니다.");
      }
    };
    fetchCorrectAnswers();
  }, [teamName, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAnswerId) {
      alert('정답을 선택해주세요.');
      return;
    }
    try {
      const newAttemptsLeft = await onAnswerSubmit(teamName, selectedAnswerId); // 반환값 받기
      setAttemptsLeft(newAttemptsLeft); // attemptsLeft 상태 업데이트
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
              <select
                className="form-select"
                value={selectedAnswerId}
                onChange={(e) => setSelectedAnswerId(e.target.value)}
                disabled={attemptsLeft === 0}
              >
                <option value="">정답을 선택하세요</option>
                {correctAnswers.map((answer) => (
                  <option key={answer.id} value={answer.id}>
                    {answer.correctAnswer}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={attemptsLeft === 0 || !selectedAnswerId}
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