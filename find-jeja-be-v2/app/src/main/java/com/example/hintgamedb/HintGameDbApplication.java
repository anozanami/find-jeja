package com.example.hintgamedb;

import com.example.hintgamedb.domain.AnswerHint;
import com.example.hintgamedb.domain.Team;
import com.example.hintgamedb.repository.AnswerHintRepository;
import com.example.hintgamedb.repository.TeamRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class HintGameDbApplication {

    public static void main(String[] args) {
        SpringApplication.run(HintGameDbApplication.class, args);
    }

    @Bean
    public CommandLineRunner demoData(TeamRepository teamRepository, AnswerHintRepository answerHintRepository) {
        return args -> {
            // Create teams
            String[] teamNames = {"1조", "2조", "3조", "4조", "5조", "6조", "7조"};
            String[] correctAnswers = {"answer1", "answer2", "answer3", "answer4", "answer5", "answer6", "answer7"};

            for (int i = 0; i < teamNames.length; i++) {
                Team team = new Team();
                team.setName(teamNames[i]);
                team.setPassword("sk5972110"); // Set initial password to sk5972110
                team.setPasswordChanged(false); // Set passwordChanged to false initially
                team.setCorrectAnswer(correctAnswers[i]);
                team.setCorrectAnswerTime(null); // Initialize correct answer time to null
                team.setHintLevel(1);
                team.setAttemptsLeft(3);
                teamRepository.save(team);
            }

            // Create answer hints
            String[] answerNames = {"베드로", "안드레", "야고보", "요한", "빌립", "바돌로매", "도마", "마태", "알패오의 아들 야고보", "다대오", "시몬", "가롯 유다"};
            for (String answerName : answerNames) {
                for (int j = 1; j <= 3; j++) {
                    AnswerHint answerHint = new AnswerHint();
                    answerHint.setAnswerName(answerName);
                    answerHint.setLevel(j);
                    answerHint.setContent(answerName + " 힌트 " + j);
                    answerHintRepository.save(answerHint);
                }
            }
        };
    }
}