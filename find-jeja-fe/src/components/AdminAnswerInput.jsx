import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminAnswerInput({ teams, hintData, onUpdateCorrectAnswer }) {
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState(teams[0] || '');
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    if (selectedTeam && hintData[selectedTeam]) {
      setCorrectAnswer(hintData[selectedTeam].correctAnswer || '');
    }
  }, [selectedTeam, hintData]);

  const handleSave = async () => {
    await onUpdateCorrectAnswer(selectedTeam, correctAnswer);
    alert(`Correct answer for ${selectedTeam} saved!`);
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
            <label htmlFor="correctAnswerInput" className="form-label">정답 입력</label>
            <input
              type="text"
              className="form-control"
              id="correctAnswerInput"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              placeholder="정답을 입력하세요"
            />
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