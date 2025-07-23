
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function LoginForm({ onLogin }) {
  const [teamName, setTeamName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(teamName, password);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card rounded-3 shadow-lg">
            <div className="card-header card-header-login text-center py-4" style={{ backgroundColor: '#1976D2', color: 'white', borderBottom: 'none', borderRadius: '10px 10px 0 0' }}>
              <small className="d-block mb-1" style={{ color: 'white' }}>2025 삼광교회 청년회 하계수련회</small>
              <h2 className="card-title mb-0" style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>제자를 찾아라!</h2>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <TextField
                  label="팀 이름"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                />
                <TextField
                  label="비밀번호"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3 }}
                >
                  접속
                </Button>
              </form>
            </div>
          </div>
          <img src="/cndm_logo.jpg" alt="Logo" className="mx-auto d-block mb-3" style={{ width: '230px', height: 'auto' }} />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
