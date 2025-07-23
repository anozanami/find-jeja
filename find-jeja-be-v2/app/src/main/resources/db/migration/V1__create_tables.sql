CREATE TABLE team (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    password_changed BOOLEAN NOT NULL,
    correct_answer VARCHAR(255),
    correct_answer_time DATETIME,
    hint_level INT NOT NULL,
    attempts_left INT NOT NULL
);

CREATE TABLE answer_hint (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    answer_name VARCHAR(255) NOT NULL,
    level INT NOT NULL,
    content VARCHAR(255)
);

CREATE TABLE submission (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    submission_text VARCHAR(255),
    submission_time DATETIME,
    is_correct BOOLEAN NOT NULL,
    team_id BIGINT NOT NULL,
    FOREIGN KEY (team_id) REFERENCES team(id)
);
