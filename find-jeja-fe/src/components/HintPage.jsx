
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHintsForTeam, getOverallStatus } from '../api'; // Import getOverallStatus

function HintPage({ teamName, onLogout }) { // Removed attemptsLeft from props
  const navigate = useNavigate();
  const [hints, setHints] = useState([]);
  const [attemptsLeft, setAttemptsLeft] = useState(3); // Initialize attemptsLeft locally

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch hints
        const hintsResponse = await getHintsForTeam(teamName);
        setHints(hintsResponse.data);

        // Fetch overall status to get attemptsLeft for the current team
        const overallStatusResponse = await getOverallStatus();
        const currentTeamData = overallStatusResponse.data.teams.find(team => team.name === teamName);
        if (currentTeamData) {
          setAttemptsLeft(currentTeamData.attemptsLeft);
        }
      } catch (error) {
        console.error("Error fetching data in HintPage:", error);
      }
    };
    fetchData();
  }, [teamName, hints, attemptsLeft]);

  return (
    <div className="container py-4">
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2>{teamName} 힌트</h2>
          <button className="btn btn-danger" onClick={onLogout}>로그아웃</button>
        </div>
        <div className="card-body">
          <div className="list-group mt-3">
            {hints.length > 0 ? (
              hints.map((hint, index) => (
                <div key={index} className="list-group-item list_group-item-action">
                  <h5 className="mb-1">힌트 {hint.level}</h5>
                  <p className="mb-1">{hint.content}</p>
                </div>
              ))
            ) : (
              <div className="alert alert-info" role="alert">
                표시할 힌트가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <p className="card-text">남은 입력 횟수: {attemptsLeft}</p>
          <button
            className="btn btn-primary w-100"
            onClick={() => navigate('/answer-submission', { state: { attemptsLeft: attemptsLeft } })}
            disabled={attemptsLeft === 0}
          >
            정답 입력
          </button>
          {attemptsLeft === 0 && (
            <div className="alert alert-warning mt-3" role="alert">
              모든 입력 횟수를 소진했습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HintPage;
