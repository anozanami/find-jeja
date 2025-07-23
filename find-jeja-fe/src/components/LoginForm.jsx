
import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Card, CardContent, CardHeader, Grid } from '@mui/material';

function LoginForm({ onLogin }) {
  const [teamName, setTeamName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(teamName, password);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card raised sx={{ borderRadius: 3, boxShadow: 6 }}>
        <CardHeader
          title={
            <Box sx={{ textAlign: 'center', py: 2, bgcolor: 'primary.main', color: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
              <Typography variant="body2" display="block" sx={{ mb: 1, color: 'white' }}>
                2025 삼광교회 청년회 하계수련회
              </Typography>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                제자를 찾아라!
              </Typography>
            </Box>
          }
          sx={{ p: 0 }} // Remove default padding
        />
        <CardContent sx={{ p: 4 }}>
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
              sx={{ mt: 3, py: 1.5 }}
            >
              접속
            </Button>
          </form>
        </CardContent>
      </Card>
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <img src="/cndm_logo.jpg" alt="Logo" style={{ width: '230px', height: 'auto' }} />
      </Box>
    </Container>
  );
}

export default LoginForm;
