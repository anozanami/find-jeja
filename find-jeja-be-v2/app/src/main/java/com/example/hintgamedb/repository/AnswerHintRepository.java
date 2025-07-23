package com.example.hintgamedb.repository;

import com.example.hintgamedb.domain.AnswerHint;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AnswerHintRepository extends JpaRepository<AnswerHint, Long> {
    List<AnswerHint> findByAnswerNameAndLevelLessThanEqual(String answerName, int level);
}
