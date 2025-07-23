package com.example.hintgamedb.dto;

public class AnswerHintDto {
    private String content;
    private int level;

    public AnswerHintDto(String content, int level) {
        this.content = content;
        this.level = level;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }
}
