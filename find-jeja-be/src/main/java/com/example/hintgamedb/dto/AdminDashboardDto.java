
package com.example.hintgamedb.dto;

import java.util.List;

public class AdminDashboardDto {
    private List<TeamDto> teams;
    private List<SubmissionDto> successfulSubmissions;

    public AdminDashboardDto(List<TeamDto> teams, List<SubmissionDto> successfulSubmissions) {
        this.teams = teams;
        this.successfulSubmissions = successfulSubmissions;
    }

    public List<TeamDto> getTeams() {
        return teams;
    }

    public void setTeams(List<TeamDto> teams) {
        this.teams = teams;
    }

    public List<SubmissionDto> getSuccessfulSubmissions() {
        return successfulSubmissions;
    }

    public void setSuccessfulSubmissions(List<SubmissionDto> successfulSubmissions) {
        this.successfulSubmissions = successfulSubmissions;
    }
}
