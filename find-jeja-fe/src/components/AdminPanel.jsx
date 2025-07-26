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

  const handleAttemptsLeftInputClick = () => { // 새로운 핸들러
    navigate('/admin/attempts-left-input');
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
                <div className="d-flex align-items-center">
                  <span className="me-2">힌트 레벨:</span>
                  <select
                    className="form-select w-auto me-3"
                    value={adminSettings[team.name]}
                    onChange={(e) => onLevelChange(team.name, parseInt(e.target.value, 10))}
                  >
                    {[...Array(6).keys()].map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-info mt-4 w-100" onClick={handleAnswerInputClick}>
            정답 설정
          </button>
          <button className="btn btn-secondary mt-2 w-100" onClick={handleHintInputClick}>
            힌트 설정
          </button>
          <button className="btn btn-primary mt-2 w-100" onClick={handleAttemptsLeftInputClick}> {/* 새로운 버튼 */}
            입력 횟수 설정
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;