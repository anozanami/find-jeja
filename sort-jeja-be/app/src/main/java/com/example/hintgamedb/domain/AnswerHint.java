package com.example.hintgamedb.domain;

import javax.persistence.*;

@Entity
public class AnswerHint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String correctAnswer;

    @Lob
    private String hint1;

    @Lob
    private String hint2;

    @Lob
    private String hint3;

    @Lob
    private String hint4;

    @Lob
    private String hint5;

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

    public String getHint1() {
        return hint1;
    }

    public void setHint1(String hint1) {
        this.hint1 = hint1;
    }

    public String getHint2() {
        return hint2;
    }

    public void setHint2(String hint2) {
        this.hint2 = hint2;
    }

    public String getHint3() {
        return hint3;
    }

    public void setHint3(String hint3) {
        this.hint3 = hint3;
    }

    public String getHint4() {
        return hint4;
    }

    public void setHint4(String hint4) {
        this.hint4 = hint4;
    }

    public String getHint5() {
        return hint5;
    }

    public void setHint5(String hint5) {
        this.hint5 = hint5;
    }
}
