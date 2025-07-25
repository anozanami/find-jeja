
package com.example.hintgamedb.domain;

import javax.persistence.*;

@Entity
public class Hint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private int level;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "answer_hint_id")
    private AnswerHint answerHint;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public AnswerHint getAnswerHint() {
        return answerHint;
    }

    public void setAnswerHint(AnswerHint answerHint) {
        this.answerHint = answerHint;
    }
}
