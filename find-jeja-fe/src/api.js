
import axios from 'axios';

export const adminLogin = (password) => {
    return axios.post(`/api/login/admin`, { password });
};

export const teamLogin = (name, password) => {
    return axios.post(`/api/login/team`, { name, password });
};

export const getOverallStatus = () => {
    return axios.get(`/api/overall-status`);
};

export const getHintsForTeam = (teamName) => {
    return axios.get(`/api/teams/${teamName}/hints`);
};

export const submitAnswer = (teamName, answer) => {
    return axios.post(`/api/teams/${teamName}/submit`, { answer });
};

export const updateHintLevel = (teamName, level, password) => {
    return axios.put(`/api/admin/teams/${teamName}/level?level=${level}`, { password });
};

export const updateCorrectAnswer = (teamName, answer, password) => {
    return axios.put(`/api/admin/teams/${teamName}/answer?answer=${answer}`, { password });
};

export const changeTeamPassword = (teamName, newPassword) => {
    return axios.put(`/api/teams/${teamName}/change-password`, { password: newPassword });
};

export const getRulebookContent = () => {
    return axios.get(`/api/rulebook`);
};


