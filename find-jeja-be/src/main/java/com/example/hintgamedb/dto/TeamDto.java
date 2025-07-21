
package com.example.hintgamedb.dto;

import java.time.LocalDateTime;

public class TeamDto {
    private Long id;
    private String name;
    private int hintLevel;
    private int attemptsLeft;
    private String correctAnswer;
    private LocalDateTime correctAnswerTime; // New field
    private boolean passwordChanged; // New field

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getHintLevel() {
        return hintLevel;
    }

    public void setHintLevel(int hintLevel) {
        this.hintLevel = hintLevel;
    }

    public int getAttemptsLeft() {
        return attemptsLeft;
    }

    public void setAttemptsLeft(int attemptsLeft) {
        this.attemptsLeft = attemptsLeft;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public LocalDateTime getCorrectAnswerTime() {
        return correctAnswerTime;
    }

    public void setCorrectAnswerTime(LocalDateTime correctAnswerTime) {
        this.correctAnswerTime = correctAnswerTime;
    }

    public boolean isPasswordChanged() {
        return passwordChanged;
    }

    public void setPasswordChanged(boolean passwordChanged) {
        this.passwordChanged = passwordChanged;
    }
}
