
package com.example.hintgamedb.repository;

import com.example.hintgamedb.domain.Hint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HintRepository extends JpaRepository<Hint, Long> {
}
