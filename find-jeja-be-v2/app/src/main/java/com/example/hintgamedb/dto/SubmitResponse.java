package com.example.hintgamedb.dto;

public class SubmitResponse {
    private boolean correct;
    private int attemptsLeft;

    public SubmitResponse(boolean correct, int attemptsLeft) {
        this.correct = correct;
        this.attemptsLeft = attemptsLeft;
    }

    public boolean isCorrect() {
        return correct;
    }

    public void setCorrect(boolean correct) {
        this.correct = correct;
    }

    public int getAttemptsLeft() {
        return attemptsLeft;
    }

    public void setAttemptsLeft(int attemptsLeft) {
        this.attemptsLeft = attemptsLeft;
    }
}
