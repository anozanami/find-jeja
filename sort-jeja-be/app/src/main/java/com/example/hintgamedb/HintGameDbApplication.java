package com.example.hintgamedb;

import com.example.hintgamedb.domain.AnswerHint;
import com.example.hintgamedb.domain.Team;
import com.example.hintgamedb.repository.AnswerHintRepository;
import com.example.hintgamedb.repository.TeamRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class HintGameDbApplication {

    public static void main(String[] args) {
        SpringApplication.run(HintGameDbApplication.class, args);
    }

    
}