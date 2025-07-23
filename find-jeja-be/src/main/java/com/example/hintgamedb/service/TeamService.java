
package com.example.hintgamedb.service;

import com.example.hintgamedb.domain.Hint;
import com.example.hintgamedb.domain.Submission;
import com.example.hintgamedb.domain.Team;
import com.example.hintgamedb.dto.HintDto;
import com.example.hintgamedb.dto.SubmitResponse;
import com.example.hintgamedb.repository.SubmissionRepository;
import com.example.hintgamedb.repository.TeamRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID; // For unique file names
import java.util.stream.Collectors;

@Service
public class TeamService {

    private final TeamRepository teamRepository;
    private final SubmissionRepository submissionRepository;
    

    public TeamService(TeamRepository teamRepository, SubmissionRepository submissionRepository) {
        this.teamRepository = teamRepository;
        this.submissionRepository = submissionRepository;
        
    }

    public Team loginTeam(String name, String password) {
        Team team = teamRepository.findByName(name).orElseThrow(() -> new RuntimeException("Team not found"));
        if (!team.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }
        return team;
    }

    public void updateTeamPassword(String teamName, String newPassword) {
        Team team = getTeamByName(teamName);
        team.setPassword(newPassword);
        team.setPasswordChanged(true);
        teamRepository.save(team);
    }

    public Team getTeamByName(String name) {
        return teamRepository.findByName(name).orElseThrow(() -> new RuntimeException("Team not found"));
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public List<HintDto> getHintsForTeam(String teamName) {
        Team team = getTeamByName(teamName);
        return team.getHints().stream()
                .filter(hint -> hint.getLevel() <= team.getHintLevel())
                .map(hint -> new HintDto(hint.getContent(), hint.getLevel()))
                .collect(Collectors.toList());
    }

    public SubmitResponse submitAnswer(String teamName, String answer) {
        Team team = getTeamByName(teamName);
        if (team.getAttemptsLeft() <= 0) {
            throw new RuntimeException("No attempts left");
        }

        boolean isCorrect = team.getCorrectAnswer().equalsIgnoreCase(answer);
        if (isCorrect && team.getCorrectAnswerTime() == null) { // Only set time if not already set
            team.setCorrectAnswerTime(LocalDateTime.now());
        }
        team.setAttemptsLeft(team.getAttemptsLeft() - 1);

        Submission submission = new Submission();
        submission.setTeam(team);
        submission.setSubmittedAnswer(answer);
        submission.setCorrect(isCorrect);
        submission.setSubmittedAt(LocalDateTime.now());
        submissionRepository.save(submission);

        teamRepository.save(team);

        return new SubmitResponse(isCorrect, team.getAttemptsLeft());
    }

    public void updateHintLevel(String teamName, int level) {
        Team team = getTeamByName(teamName);
        team.setHintLevel(level);
        teamRepository.save(team);
    }

    public List<Submission> getSuccessfulSubmissions() {
        return submissionRepository.findByIsCorrectTrueOrderBySubmittedAtAsc();
    }

    public void updateCorrectAnswer(String teamName, String answer) {
        Team team = getTeamByName(teamName);
        team.setCorrectAnswer(answer);
        teamRepository.save(team);
    }

    
}
