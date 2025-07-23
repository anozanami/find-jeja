
package com.example.hintgamedb.controller;

import com.example.hintgamedb.domain.Team;
import com.example.hintgamedb.dto.AnswerHintDto;
import com.example.hintgamedb.service.TeamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow requests from any origin for development
public class TeamController {

    private final TeamService teamService;
    private static final String ADMIN_PASSWORD = "392766yyc@!"; // Simple admin password

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @PostMapping("/login/admin")
    public ResponseEntity<String> adminLogin(@RequestBody LoginRequest loginRequest) {
        if (ADMIN_PASSWORD.equals(loginRequest.getPassword())) {
            return ResponseEntity.ok("Admin login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid admin password");
        }
    }

    @PostMapping("/login/team")
    public ResponseEntity<TeamDto> teamLogin(@RequestBody LoginRequest loginRequest) {
        try {
            Team team = teamService.loginTeam(loginRequest.getName(), loginRequest.getPassword());
            TeamDto dto = new TeamDto();
            dto.setId(team.getId());
            dto.setName(team.getName());
            dto.setHintLevel(team.getHintLevel());
            dto.setAttemptsLeft(team.getAttemptsLeft());
            dto.setCorrectAnswer(team.getCorrectAnswer());
            dto.setCorrectAnswerTime(team.getCorrectAnswerTime());
            dto.setPasswordChanged(team.isPasswordChanged());
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(null); // Return 401 for invalid credentials
        }
    }

    @GetMapping("/teams/{teamName}/hints")
    public List<AnswerHintDto> getHintsForTeam(@PathVariable String teamName) {
        return teamService.getHintsForTeam(teamName);
    }

    @PostMapping("/teams/{teamName}/submit")
    public SubmitResponse submitAnswer(@PathVariable String teamName, @RequestBody SubmitRequest submitRequest) {
        return teamService.submitAnswer(teamName, submitRequest.getAnswer());
    }

    @GetMapping("/overall-status")
    public AdminDashboardDto getOverallStatus() {
        List<Team> teams = teamService.getAllTeams();
        List<TeamDto> teamDtos = teams.stream().map(team -> {
            TeamDto dto = new TeamDto();
            dto.setId(team.getId());
            dto.setName(team.getName());
            dto.setHintLevel(team.getHintLevel());
            dto.setAttemptsLeft(team.getAttemptsLeft());
            dto.setCorrectAnswer(team.getCorrectAnswer());
            dto.setCorrectAnswerTime(team.getCorrectAnswerTime());
            dto.setPasswordChanged(team.isPasswordChanged());
            return dto;
        }).collect(Collectors.toList());

        List<SubmissionDto> submissionDtos = teamService.getSuccessfulSubmissions().stream().map(submission -> {
            SubmissionDto dto = new SubmissionDto();
            dto.setTeamName(submission.getTeam().getName());
            dto.setSubmittedAnswer(submission.getSubmittedAnswer());
            dto.setSubmittedAt(submission.getSubmittedAt());
            return dto;
        }).collect(Collectors.toList());

        return new AdminDashboardDto(teamDtos, submissionDtos);
    }

    @PutMapping("/admin/teams/{teamName}/level")
    public ResponseEntity<String> updateHintLevel(@PathVariable String teamName, @RequestParam int level, @RequestBody LoginRequest loginRequest) {
        if (!ADMIN_PASSWORD.equals(loginRequest.getPassword())) {
            return ResponseEntity.status(401).body("Invalid admin password");
        }
        teamService.updateHintLevel(teamName, level);
        return ResponseEntity.ok("Hint level updated");
    }

    @PutMapping("/admin/teams/{teamName}/answer")
    public ResponseEntity<String> updateCorrectAnswer(@PathVariable String teamName, @RequestParam String answer, @RequestBody LoginRequest loginRequest) {
        if (!ADMIN_PASSWORD.equals(loginRequest.getPassword())) {
            return ResponseEntity.status(401).body("Invalid admin password");
        }
        teamService.updateCorrectAnswer(teamName, answer);
        return ResponseEntity.ok("Correct answer updated");
    }

    @PutMapping("/teams/{teamName}/change-password")
    public ResponseEntity<String> changeTeamPassword(@PathVariable String teamName, @RequestBody LoginRequest loginRequest) {
        try {
            teamService.updateTeamPassword(teamName, loginRequest.getPassword());
            return ResponseEntity.ok("Password updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/rulebook")
    public ResponseEntity<String> getRulebookContent() {
        return ResponseEntity.ok("룰북 예시입니다");
    }
}
