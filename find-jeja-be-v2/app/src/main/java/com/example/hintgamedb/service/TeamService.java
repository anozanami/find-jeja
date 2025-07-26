package com.example.hintgamedb.service;

import com.example.hintgamedb.domain.AnswerHint;
import com.example.hintgamedb.domain.Submission;
import com.example.hintgamedb.domain.Team;
import com.example.hintgamedb.dto.AnswerHintDto;
import com.example.hintgamedb.dto.CorrectAnswerDto;
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

    public SubmitResponse submitAnswer(String teamName, Long answerId) {
        Team team = getTeamByName(teamName);
        if (team.getAttemptsLeft() <= 0) {
            throw new RuntimeException("No attempts left");
        }

        AnswerHint submittedAnswerHint = answerHintRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));
        String submittedAnswerText = submittedAnswerHint.getCorrectAnswer();

        // 모든 정답 목록을 가져와서 제출된 정답이 그 중 하나와 일치하는지 확인
        List<AnswerHint> allCorrectAnswers = answerHintRepository.findAll();
        boolean isCorrect = allCorrectAnswers.stream()
                                .anyMatch(ah -> ah.getCorrectAnswer().equalsIgnoreCase(submittedAnswerText));

        if (isCorrect && team.getCorrectAnswerTime() == null) {
            team.setCorrectAnswer(submittedAnswerText); // 팀이 맞춘 정답을 저장
            team.setCorrectAnswerTime(LocalDateTime.now());
        }
        team.setAttemptsLeft(team.getAttemptsLeft() - 1);

        Submission submission = new Submission();
        submission.setTeam(team);
        submission.setSubmissionText(submittedAnswerText);
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

    public void updateCorrectAnswer(String teamName, Long answerId) {
        Team team = getTeamByName(teamName);
        AnswerHint newCorrectAnswerHint = answerHintRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));
        team.setCorrectAnswer(newCorrectAnswerHint.getCorrectAnswer());
        teamRepository.save(team);
    }

    public List<Submission> getSuccessfulSubmissions() {
        return submissionRepository.findByIsCorrectTrue();
    }

    public List<CorrectAnswerDto> getAllCorrectAnswers() {
        return answerHintRepository.findAll().stream()
                .map(answerHint -> new CorrectAnswerDto(answerHint.getId(), answerHint.getCorrectAnswer()))
                .collect(Collectors.toList());
    }

    public void updateAttemptsLeft(String teamName, int attemptsLeft) {
        Team team = getTeamByName(teamName);
        team.setAttemptsLeft(attemptsLeft);
        teamRepository.save(team);
    }
}
