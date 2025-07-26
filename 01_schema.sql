CREATE TABLE IF NOT EXISTS team (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    password_changed BOOLEAN DEFAULT FALSE,
    correct_answer VARCHAR(255),
    correct_answer_time DATETIME(6),
    hint_level INT DEFAULT 1,
    attempts_left INT DEFAULT 3,
    team_rank INT,
    score INT
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS answer_hint (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    correct_answer VARCHAR(255),
    hint1 LONGTEXT,
    hint2 LONGTEXT,
    hint3 LONGTEXT,
    hint4 LONGTEXT,
    hint5 LONGTEXT
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS submission (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    submission_text VARCHAR(255),
    submission_time DATETIME(6),
    is_correct BOOLEAN,
    team_id BIGINT,
    FOREIGN KEY (team_id) REFERENCES team(id)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;