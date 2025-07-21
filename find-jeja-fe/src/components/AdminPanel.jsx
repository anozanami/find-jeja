import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPanel({ teamsData, adminSettings, onLevelChange, successfulSubmissions }) {
  const navigate = useNavigate();

  const handleAnswerInputClick = () => {
    navigate('/admin/answer-input');
  };

  const handleHintInputClick = () => {
    navigate('/admin/hint-input');
  };

  return (
    <div className="container py-4">
      <div className="card mb-4">
        <div className="card-header card-header-admin">
          <h2>관리자 패널</h2>
        </div>
        <div className="card-body">
          <div className="list-group mt-3">
            {(teamsData || []).map((team) => (
              <div key={team.name} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{team.name} (정답: {team.correctAnswer || '미설정'})</span>
                <select
                  className="form-select w-auto"
                  value={adminSettings[team.name]}
                  onChange={(e) => onLevelChange(team.name, parseInt(e.target.value, 10))}
                >
                  {[...Array(5).keys()].map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <button className="btn btn-info mt-4 w-100" onClick={handleAnswerInputClick}>
            정답 설정
          </button>
          <button className="btn btn-secondary mt-2 w-100" onClick={handleHintInputClick}>
            힌트 설정
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;