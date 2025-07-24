package com.example.hintgamedb.service;

import com.example.hintgamedb.domain.AnswerHint;
import com.example.hintgamedb.domain.Submission;
import com.example.hintgamedb.domain.Team;
import com.example.hintgamedb.dto.AnswerHintDto;
import com.example.hintgamedb.dto.SubmitResponse;
import com.example.hintgamedb.repository.AnswerHintRepository;
import com.example.hintgamedb.repository.SubmissionRepository;
import com.example.hintgamedb.repository.TeamRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeamService {

    private final TeamRepository teamRepository;
    private final SubmissionRepository submissionRepository;
    private final AnswerHintRepository answerHintRepository;

    public TeamService(TeamRepository teamRepository, SubmissionRepository submissionRepository, AnswerHintRepository answerHintRepository) {
        this.teamRepository = teamRepository;
        this.submissionRepository = submissionRepository;
        this.answerHintRepository = answerHintRepository;
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

    public List<AnswerHintDto> getHintsForTeam(String teamName) {
        Team team = getTeamByName(teamName);
        String correctAnswer = team.getCorrectAnswer();
        AnswerHint answerHint = answerHintRepository.findByCorrectAnswer(correctAnswer);

        if (answerHint == null) {
            return List.of();
        }

        int hintLevel = team.getHintLevel();
        List<AnswerHintDto> hints = new java.util.ArrayList<>();

        if (hintLevel >= 1 && answerHint.getHint1() != null) {
            hints.add(new AnswerHintDto(answerHint.getHint1()));
        }
        if (hintLevel >= 2 && answerHint.getHint2() != null) {
            hints.add(new AnswerHintDto(answerHint.getHint2()));
        }
        if (hintLevel >= 3 && answerHint.getHint3() != null) {
            hints.add(new AnswerHintDto(answerHint.getHint3()));
        }
        if (hintLevel >= 4 && answerHint.getHint4() != null) {
            hints.add(new AnswerHintDto(answerHint.getHint4()));
        }
        if (hintLevel >= 5 && answerHint.getHint5() != null) {
            hints.add(new AnswerHintDto(answerHint.getHint5()));
        }
        return hints;
    }

    public SubmitResponse submitAnswer(String teamName, String answer) {
        Team team = getTeamByName(teamName);
        if (team.getAttemptsLeft() <= 0) {
            throw new RuntimeException("No attempts left");
        }

        boolean isCorrect = team.getCorrectAnswer().equalsIgnoreCase(answer);
        if (isCorrect && team.getCorrectAnswerTime() == null) {
            team.setCorrectAnswerTime(LocalDateTime.now());
        }
        team.setAttemptsLeft(team.getAttemptsLeft() - 1);

        Submission submission = new Submission();
        submission.setTeam(team);
        submission.setSubmissionText(answer);
        submission.setCorrect(isCorrect);
        submission.setSubmissionTime(LocalDateTime.now());
        submissionRepository.save(submission);

        teamRepository.save(team);

        return new SubmitResponse(isCorrect, team.getAttemptsLeft());
    }

    public void updateHintLevel(String teamName, int level) {
        Team team = getTeamByName(teamName);
        team.setHintLevel(level);
        teamRepository.save(team);
    }

    public void updateCorrectAnswer(String teamName, String answer) {
        Team team = getTeamByName(teamName);
        team.setCorrectAnswer(answer);
        teamRepository.save(team);
    }

    public List<Submission> getSuccessfulSubmissions() {
        return submissionRepository.findByIsCorrectTrue();
    }
}
