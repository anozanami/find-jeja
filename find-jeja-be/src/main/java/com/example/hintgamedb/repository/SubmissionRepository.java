
package com.example.hintgamedb.repository;

import com.example.hintgamedb.domain.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByIsCorrectTrueOrderBySubmittedAtAsc();
}
