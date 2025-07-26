
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const adminLogin = (password) => {
    return axios.post(`${API_URL}/login/admin`, { password });
};

export const teamLogin = (name, password) => {
    return axios.post(`${API_URL}/login/team`, { name, password });
};

export const getOverallStatus = () => {
    return axios.get(`${API_URL}/overall-status`);
};

export const getHintsForTeam = (teamName) => {
    return axios.get(`${API_URL}/teams/${teamName}/hints`);
};

export const submitAnswer = (teamName, answerId) => {
    return axios.post(`${API_URL}/teams/${teamName}/submit`, { answerId });
};

export const updateHintLevel = (teamName, level, password) => {
    return axios.put(`${API_URL}/admin/teams/${teamName}/level?level=${level}`, { password });
};

export const updateCorrectAnswer = (teamName, answerId, password) => {
    return axios.put(`${API_URL}/admin/teams/${teamName}/answer?answerId=${answerId}`, { password });
};

export const changeTeamPassword = (teamName, newPassword) => {
    return axios.put(`${API_URL}/teams/${teamName}/change-password`, { password: newPassword });
};

export const getRulebookContent = () => {
    return axios.get(`${API_URL}/rulebook`);
};

export const getAllCorrectAnswers = () => {
    return axios.get(`${API_URL}/correct-answers`);
};

export const updateAttemptsLeft = (teamName, attemptsLeft, password) => {
    return axios.put(`${API_URL}/admin/teams/${teamName}/attempts-left?attemptsLeft=${attemptsLeft}`, { password });
};


