import React from 'react';
import { useNavigate } from 'react-router-dom';

function OverallStatus({ isAdminLoggedIn, teamsData, successfulSubmissions }) {
  const navigate = useNavigate();

  const calculateScore = (team) => {
    if (!team.correctAnswerTime) return 0; // 정답을 맞추지 못했으면 0점

    const baseScore = 10000; // 기본 점수
    const timePenaltyPerMinute = 10; // 1분당 감점
    const attemptsBonusPerAttempt = 100; // 남은 기회 1번당 보너스 점수

    // 게임 시작 시간을 2025년 7월 23일 17시 00분 00초로 가정 (예시)
    // 실제 게임 시작 시간은 백엔드에서 관리하거나, 프론트엔드에서 설정해야 합니다.
    // 여기서는 임의의 시간을 기준으로 계산합니다.
    const gameStartTime = new Date('2025-07-23T17:00:00').getTime();
    const answerTime = new Date(team.correctAnswerTime).getTime();

    const timeElapsedMinutes = (answerTime - gameStartTime) / (1000 * 60);

    let score = baseScore - (timeElapsedMinutes * timePenaltyPerMinute);

    // 남은 정답 기회에 따른 보너스 점수
    score += team.attemptsLeft * attemptsBonusPerAttempt;

    return Math.max(0, Math.round(score)); // 점수는 0점 미만이 될 수 없도록
  };

  const sortedTeams = (teamsData || [])
    .map(team => ({
      ...team,
      score: calculateScore(team)
    }))
    .sort((a, b) => {
      if (isAdminLoggedIn) {
        // 정답을 맞춘 팀 우선, 그 다음 점수 높은 순, 그 다음 정답 시간 빠른 순
        if (a.correctAnswerTime && b.correctAnswerTime) {
          if (b.score !== a.score) {
            return b.score - a.score; // 점수 높은 순
          }
          return new Date(a.correctAnswerTime) - new Date(b.correctAnswerTime); // 정답 시간 빠른 순
        } else if (a.correctAnswerTime) {
          return -1; // a만 정답 맞춤
        } else if (b.correctAnswerTime) {
          return 1; // b만 정답 맞춤
        }
        return 0; // 둘 다 정답 못 맞춤
      } else {
        // 일반 사용자일 경우 정렬 없음 (기존 순서 유지)
        return 0;
      }
    });

  return (
    <div className="container py-4">
      <div className="card mb-4">
        <div className="card-header card-header-admin d-flex justify-content-between align-items-center">
          <h2>팀 현황</h2>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            뒤로 가기
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            {teamsData.length > 0 ? (
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th style={{ fontSize: '1em', whiteSpace: 'nowrap' }}>조 이름</th>
                    <th style={{ fontSize: '1em', whiteSpace: 'nowrap' }}>힌트 레벨</th>
                    <th style={{ fontSize: '1em', whiteSpace: 'nowrap' }}>남은 횟수</th>
                    <th style={{ fontSize: '1em', whiteSpace: 'nowrap' }}>정답 여부</th>
                    <th style={{ fontSize: '1em', whiteSpace: 'nowrap' }}>정답 시간</th>
                    <th>정답</th>
                    {isAdminLoggedIn && <th>등수</th>}
                    {isAdminLoggedIn && <th>점수</th>}
                  </tr>
                </thead>
                <tbody>
                  {sortedTeams.map((team, index) => (
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
                        <td>{team.correctAnswerTime ? team.correctAnswer : '-'}</td>
                        {isAdminLoggedIn && <td>{team.correctAnswerTime ? index + 1 : '-'}</td>}
                        {isAdminLoggedIn && <td>{team.correctAnswerTime ? team.score : '-'}</td>}
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p className="mt-3">팀 현황 데이터를 불러오는 중이거나, 데이터가 없습니다.</p>
            )}
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