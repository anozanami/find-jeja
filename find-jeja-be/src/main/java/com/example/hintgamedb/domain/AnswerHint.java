package com.example.hintgamedb.domain;

import javax.persistence.*;

@Entity
public class AnswerHint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String answerName;

    private int level;

    private String content;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnswerName() {
        return answerName;
    }

    public void setAnswerName(String answerName) {
        this.answerName = answerName;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}