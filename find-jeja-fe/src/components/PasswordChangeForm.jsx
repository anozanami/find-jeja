
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PasswordChangeForm({ onChangePassword }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { teamName } = location.state || {};

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    if (!teamName) {
      setMessage('팀 이름을 찾을 수 없습니다. 다시 로그인해주세요.');
      return;
    }

    try {
      await onChangePassword(teamName, newPassword);
      setMessage('비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.');
      // Optionally, navigate to login page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setMessage('비밀번호 변경에 실패했습니다: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header card-header-login">
              <h2 className="card-title text-center text-color-light">비밀번호 변경</h2>
            </div>
            <div className="card-body">
              <p className="text-center">최초 접속입니다. 보안을 위해 비밀번호를 변경해주세요.</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">새 비밀번호</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">비밀번호 확인</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {message && <div className={`alert ${message.includes('성공') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
                <button type="submit" className="btn btn-primary w-100">비밀번호 변경</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordChangeForm;
