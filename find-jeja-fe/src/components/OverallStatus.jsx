import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOverallStatus } from '../api';

function OverallStatus() {
  const navigate = useNavigate();
  const [teamsData, setTeamsData] = useState([]);
  const [successfulSubmissions, setSuccessfulSubmissions] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getOverallStatus(); // This fetches AdminDashboardDto
        setTeamsData(response.data.teams);
        setSuccessfulSubmissions(response.data.successfulSubmissions);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="container py-4">
      <div className="card mb-4">
        <div className="card-header card-header-admin d-flex justify-content-between align-items-center">
          <h2>전체 현황</h2>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            뒤로 가기
          </button>
        </div>
        <div className="card-body">
          <h3 className="mb-3">팀 현황</h3>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>팀 이름</th>
                  <th>현재 힌트 레벨</th>
                  <th>남은 입력 횟수</th>
                  <th>정답 여부</th>
                  <th>정답 시간</th>
                  <th>등수</th>
                </tr>
              </thead>
              <tbody>
                {teamsData
                  .sort((a, b) => {
                    // Sort by correctAnswerTime (earliest first for ranking)
                    if (a.correctAnswerTime && b.correctAnswerTime) {
                      return new Date(a.correctAnswerTime) - new Date(b.correctAnswerTime);
                    } else if (a.correctAnswerTime) {
                      return -1; // a has time, b doesn't, so a comes first
                    } else if (b.correctAnswerTime) {
                      return 1; // b has time, a doesn't, so b comes first
                    } else {
                      return 0; // neither has time, maintain current order
                    }
                  })
                  .map((team, index) => (
                    <tr key={team.id}>
                      <td>{team.name}</td>
                      <td>{team.hintLevel}</td>
                      <td>{team.attemptsLeft}</td>
                      <td>{team.correctAnswerTime ? 'O' : 'X'}</td>
                      <td>
                        {team.correctAnswerTime
                          ? new Date(team.correctAnswerTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
                          : '-'}
                      </td>
                      <td>{team.correctAnswerTime ? index + 1 : '-'}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <div className="card">
        <div className="card-header card-header-admin">
          <h3>정답 맞춘 현황</h3>
        </div>
        <div className="card-body">
          {successfulSubmissions.length > 0 ? (
            <ul className="list-group mt-3">
              {successfulSubmissions.map((submission, index) => (
                <li key={index} className="list-group-item">
                  <strong>{submission.teamName}</strong> - {submission.submittedAnswer} (제출 시간: {new Date(submission.submittedAt).toLocaleString()})
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3">아직 정답을 맞춘 팀이 없습니다.</p>
          )}
        </div>
      </div> */}
    </div>
  );
}

export default OverallStatus;