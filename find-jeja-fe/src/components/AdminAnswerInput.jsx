import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCorrectAnswers } from '../api';

function AdminAnswerInput({ teams, onUpdateCorrectAnswer }) {
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState(teams[0] || '');
  const [selectedAnswerId, setSelectedAnswerId] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState([]);

  useEffect(() => {
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
  }, []);

  const handleSave = async () => {
    if (!selectedAnswerId) {
      alert('정답을 선택해주세요.');
      return;
    }
    await onUpdateCorrectAnswer(selectedTeam, selectedAnswerId);
    alert(`${selectedTeam} 팀의 정답이 성공적으로 업데이트되었습니다!`);
  };

  return (
    <div className="container py-4">
      <div className="card">
        <div className="card-header card-header-admin">
          <h2>정답 설정</h2>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="teamSelect" className="form-label">팀 선택</label>
            <select
              id="teamSelect"
              className="form-select"
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="correctAnswerSelect" className="form-label">정답 선택</label>
            <select
              id="correctAnswerSelect"
              className="form-select"
              value={selectedAnswerId}
              onChange={(e) => setSelectedAnswerId(e.target.value)}
            >
              <option value="">정답을 선택하세요</option>
              {correctAnswers.map((answer) => (
                <option key={answer.id} value={answer.id}>
                  {answer.correctAnswer}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary me-2" onClick={handleSave}>
            저장
          </button>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            뒤로 가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminAnswerInput;