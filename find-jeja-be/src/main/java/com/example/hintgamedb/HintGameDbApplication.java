
package com.example.hintgamedb;

import com.example.hintgamedb.domain.Hint;
import com.example.hintgamedb.domain.Team;
import com.example.hintgamedb.repository.TeamRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;

@SpringBootApplication
public class HintGameDbApplication {

    public static void main(String[] args) {
        SpringApplication.run(HintGameDbApplication.class, args);
    }

    @Bean
    public CommandLineRunner demoData(TeamRepository teamRepository) {
        return args -> {
            // Create teams and hints
            String[] teamNames = {"1조", "2조", "3조", "4조", "5조", "6조", "7조", "test"};
            String[] correctAnswers = {"", "", "", "", "", "", "", ""};

            for (int i = 0; i < teamNames.length; i++) {
                Team team = new Team();
                team.setName(teamNames[i]);
                team.setPassword("sk5972110"); // Set initial password to sk5972110
                team.setPasswordChanged(false); // Set passwordChanged to false initially
                team.setCorrectAnswer(correctAnswers[i]);
                team.setCorrectAnswerTime(null); // Initialize correct answer time to null
                team.setHintLevel(1);
                team.setAttemptsLeft(3);

                for (int j = 1; j <= 3; j++) {
                    Hint hint = new Hint();
                    hint.setContent("Hint " + j);
                    hint.setLevel(j);
                    hint.setTeam(team);
                    team.getHints().add(hint);
                }
                teamRepository.save(team);
            }
        };
    }
}
