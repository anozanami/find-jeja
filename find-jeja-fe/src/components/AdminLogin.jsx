import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Card, CardContent, CardHeader, Alert } from '@mui/material';

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear previous error
    setError('');
    try {
      await onLogin(password);
    } catch (err) {
      setError('관리자 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card raised sx={{ borderRadius: 3, boxShadow: 6 }}>
        <CardHeader
          title={
            <Box sx={{ textAlign: 'center', py: 2, bgcolor: 'primary.main', color: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                관리자 로그인
              </Typography>
            </Box>
          }
          sx={{ p: 0 }} // Remove default padding
        />
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
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
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, py: 1.5 }}
            >
              로그인
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AdminLogin;