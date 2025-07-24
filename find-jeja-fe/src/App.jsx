
import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import HintPage from './components/HintPage';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import AnswerSubmissionPage from './components/AnswerSubmissionPage';
import AdminAnswerInput from './components/AdminAnswerInput';
import AdminHintInput from './components/AdminHintInput';
import OverallStatus from './components/OverallStatus';
import PasswordChangeForm from './components/PasswordChangeForm'; // Import new component
import Rulebook from './components/Rulebook'; // Import Rulebook component

import { teamLogin, adminLogin, getOverallStatus, getHintsForTeam, submitAnswer, updateHintLevel, updateCorrectAnswer, changeTeamPassword } from './api';

import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Noto Sans KR, sans-serif',
  },
});

function App() {
  const navigate = useNavigate();
  const [loggedInTeam, setLoggedInTeam] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState(''); // Store admin password temporarily
  const [teamsData, setTeamsData] = useState([]); // Stores data for all teams
  const [successfulSubmissions, setSuccessfulSubmissions] = useState([]); // Stores successful submissions

  useEffect(() => {
    // Fetch initial data for admin panel if admin is logged in
    if (isAdminLoggedIn) {
      fetchAdminDashboardData();
    }
  }, [isAdminLoggedIn]);

  const fetchAdminDashboardData = async () => {
    try {
      const response = await getOverallStatus(); // This now returns AdminDashboardDto
      setTeamsData(response.data.teams);
      setSuccessfulSubmissions(response.data.successfulSubmissions);
    } catch (error) {
      console.error("Error fetching admin dashboard data:", error);
    }
  };

  const handleLogin = async (teamName, password) => {
    try {
      const response = await teamLogin(teamName, password);
      const fetchedTeamData = response.data; // teamLogin now returns TeamDto

      setLoggedInTeam(teamName);
      console.log("Logged in team:", teamName);

      if (fetchedTeamData && !fetchedTeamData.passwordChanged) {
        // If password not changed, redirect to password change form
        navigate('/change-password', { state: { teamName: teamName } });
      } else {
        // Proceed to hint page if password already changed
        // Update teamsData with this single team's data
        setTeamsData(prevTeamsData => {
          const existingTeamIndex = prevTeamsData.findIndex(team => team.name === fetchedTeamData.name);
          if (existingTeamIndex > -1) {
            const newTeamsData = [...prevTeamsData];
            newTeamsData[existingTeamIndex] = fetchedTeamData;
            return newTeamsData;
          } else {
            return [...prevTeamsData, fetchedTeamData];
          }
        });
      }

    } catch (error) {
      console.error("Error during team login:", error);
      if (error.response && error.response.status === 401) {
        alert('팀 이름 또는 비밀번호가 올바르지 않습니다.');
      } else {
        alert('로그인 중 오류가 발생했습니다.');
      }
    }
  };

  const handlePasswordChange = async (teamName, newPassword) => {
    try {
      await changeTeamPassword(teamName, newPassword);
      alert('비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.');
      setLoggedInTeam(''); // Log out after password change
      navigate('/'); // Go back to login page
    } catch (error) {
      console.error("Error changing password:", error);
      alert('비밀번호 변경에 실패했습니다: ' + (error.response?.data || error.message));
    }
  };

  const handleLogout = () => {
    setLoggedInTeam('');
  };

  const handleAdminLogin = async (password) => {
    try {
      await adminLogin(password);
      setIsAdminLoggedIn(true);
      setAdminPassword(password); // Store password for subsequent admin actions
      fetchAdminDashboardData(); // Fetch data after successful admin login
    } catch (error) {
      alert('관리자 비밀번호가 틀렸습니다.');
    }
  };

  const handleLevelChange = async (teamName, level) => {
    try {
      await updateHintLevel(teamName, level, adminPassword);
      fetchAdminDashboardData(); // Refresh data after update
    } catch (error) {
      console.error("Error updating hint level:", error);
      alert("힌트 레벨 업데이트 실패");
    }
  };

  const handleAnswerSubmit = async (answer) => {
    try {
      const response = await submitAnswer(loggedInTeam, answer);
      if (response.data.correct) {
        alert('정답입니다!');
      } else {
        alert(`오답입니다. 남은 횟수: ${response.data.attemptsLeft}`);
      }
      // Update teamsData to reflect the new attemptsLeft for the loggedInTeam
      setTeamsData(prevTeamsData =>
        prevTeamsData.map(team =>
          team.name === loggedInTeam
            ? { ...team, attemptsLeft: response.data.attemptsLeft }
            : team
        )
      );
      // Also refresh admin dashboard data to get updated successful submissions
      fetchAdminDashboardData();
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("정답 제출 실패");
    }
  };

  const handleUpdateCorrectAnswer = async (teamName, answer) => {
    try {
      await updateCorrectAnswer(teamName, answer, adminPassword);
      fetchAdminDashboardData(); // Refresh data after update
      alert('정답이 성공적으로 업데이트되었습니다.');
    } catch (error) {
      console.error("Error updating correct answer:", error);
      alert("정답 업데이트 실패");
    }
  };

  const getTeamData = (teamName) => {
    return teamsData.find(team => team.name === teamName);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* Left: 전체 현황 */}
            <Box>
              <Link to="/overall-status" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <IconButton color="inherit">
                  <BarChartIcon />
                </IconButton>
                <Typography variant="h6" component="span">팀 현황</Typography>
              </Link>
            </Box>

            {/* Center: 홈 */}
            <Box sx={{ mx: 'auto' }}>
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <IconButton color="inherit">
                  <HomeIcon />
                </IconButton>
                <Typography variant="h6" component="span">홈</Typography>
              </Link>
            </Box>

            {/* Right: 룰북 */}
            <Box>
              <Link to="/rulebook" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <IconButton color="inherit">
                  <BookIcon />
                </IconButton>
                <Typography variant="h6" component="span">룰북</Typography>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Admin button at bottom right */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '1000' }}>
        <Link to="/admin">
          <IconButton color="primary" sx={{ backgroundColor: 'primary.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}>
            <AdminPanelSettingsIcon style={{ fontSize: '1.5rem' }} />
          </IconButton>
        </Link>
      </div>

      <div className="container mt-3 app-container">
        <Routes>
          <Route
            path="/"
            element={
              loggedInTeam ? (
                <HintPage
                  teamName={loggedInTeam}
                  onLogout={handleLogout}
                />
              ) : (
                <LoginForm onLogin={handleLogin} />
              )
            }
          />
        <Route
          path="/admin"
          element={
            isAdminLoggedIn ? (
              <AdminPanel
                teams={teamsData} // Pass full teamsData
                adminSettings={Object.fromEntries(teamsData.map(team => [team.name, team.hintLevel]))} // Pass hint levels
                onLevelChange={handleLevelChange}
                successfulSubmissions={successfulSubmissions} // Pass successful submissions
              />
            ) : (
              <AdminLogin onLogin={handleAdminLogin} />
            )
          }
        />
        <Route
          path="/admin/answer-input"
          element={
            isAdminLoggedIn ? (
              <AdminAnswerInput
                teams={teamsData.map(team => team.name)}
                onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
              />
            ) : (
              <AdminLogin onLogin={handleAdminLogin} />
            )
          }
        />
        <Route
          path="/overall-status"
          element={<OverallStatus
            isAdminLoggedIn={isAdminLoggedIn}
            teamsData={teamsData}
            successfulSubmissions={successfulSubmissions}
          />}
        />
        <Route
          path="/answer-submission"
          element={<AnswerSubmissionPage onAnswerSubmit={handleAnswerSubmit} />} // No need to pass attemptsLeft here, it's handled by backend
        />
        <Route
          path="/admin/hint-input"
          element={
            isAdminLoggedIn ? (
              <AdminHintInput adminPassword={adminPassword} />
            ) : (
              <AdminLogin onLogin={handleAdminLogin} />
            )
          }
        />
        <Route
          path="/change-password"
          element={<PasswordChangeForm onChangePassword={handlePasswordChange} />}
        />
        <Route
          path="/rulebook"
          element={<Rulebook />}
        />
      </Routes>
    </div>
    </ThemeProvider>
  );
}

export default App;