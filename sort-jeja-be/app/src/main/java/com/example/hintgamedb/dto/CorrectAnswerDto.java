package com.example.hintgamedb.dto;

public class CorrectAnswerDto {
    private Long id;
    private String correctAnswer;

    public CorrectAnswerDto(Long id, String correctAnswer) {
        this.id = id;
        this.correctAnswer = correctAnswer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }
}
