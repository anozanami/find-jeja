import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOverallStatus, updateHintLevel } from '../api';

function AdminHintInput({ adminPassword }) {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [hintLevel, setHintLevel] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getOverallStatus();
        const teamsData = response.data.teams;
        setTeams(teamsData);
        if (teamsData.length > 0) {
          setSelectedTeam(teamsData[0].name);
          setHintLevel(teamsData[0].hintLevel); // Set initial hint level
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    fetchTeams();
  }, []);

  useEffect(() => {
    const currentTeam = teams.find(team => team.name === selectedTeam);
    if (currentTeam) {
      setHintLevel(currentTeam.hintLevel);
    }
  }, [selectedTeam, teams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedTeam) {
      try {
        await updateHintLevel(selectedTeam, hintLevel, adminPassword);
        alert(`팀 ${selectedTeam}의 힌트 레벨이 ${hintLevel}로 업데이트되었습니다.`);
        navigate('/admin');
      } catch (error) {
        console.error('Error updating hint level:', error);
        alert('힌트 레벨 업데이트에 실패했습니다.');
      }
    }
  };

  return (
    <div className="container py-4">
      <div className="card mb-4">
        <div className="card-header card-header-admin">
          <h2>힌트 레벨 설정</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="teamSelect" className="form-label">팀 선택</label>
              <select
                id="teamSelect"
                className="form-select"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
              >
                {teams.map((team) => (
                  <option key={team.name} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="hintLevel" className="form-label">힌트 레벨</label>
              <input
                type="number"
                id="hintLevel"
                className="form-control"
                value={hintLevel}
                onChange={(e) => setHintLevel(parseInt(e.target.value, 10))}
                min="0"
                max="5"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">힌트 레벨 업데이트</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminHintInput;