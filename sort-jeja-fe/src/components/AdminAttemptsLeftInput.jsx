import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOverallStatus } from '../api';

function AdminAttemptsLeftInput({ onUpdateAttemptsLeft }) {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(0);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getOverallStatus();
        const teamNames = response.data.teams.map(team => team.name);
        setTeams(teamNames);
        if (teamNames.length > 0) {
          setSelectedTeam(teamNames[0]);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
        alert("팀 목록을 불러오는 데 실패했습니다.");
      }
    };
    fetchTeams();
  }, []);

  const handleSave = async () => {
    if (!selectedTeam) {
      alert('팀을 선택해주세요.');
      return;
    }
    await onUpdateAttemptsLeft(selectedTeam, attemptsLeft);
    alert(`${selectedTeam} 팀의 남은 횟수가 성공적으로 업데이트되었습니다!`);
    navigate('/admin'); // 저장 후 관리자 패널로 돌아가기
  };

  return (
    <div className="container py-4">
      <div className="card">
        <div className="card-header card-header-admin">
          <h2>남은 횟수 설정</h2>
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
            <label htmlFor="attemptsLeftInput" className="form-label">남은 횟수</label>
            <input
              type="number"
              id="attemptsLeftInput"
              className="form-control"
              value={attemptsLeft}
              onChange={(e) => setAttemptsLeft(parseInt(e.target.value, 10))}
              min="0"
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

export default AdminAttemptsLeftInput;