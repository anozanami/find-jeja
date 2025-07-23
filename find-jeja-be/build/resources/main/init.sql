CREATE TABLE IF NOT EXISTS team (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    password_changed BOOLEAN NOT NULL,
    correct_answer VARCHAR(255),
    correct_answer_time DATETIME,
    hint_level INT NOT NULL,
    attempts_left INT NOT NULL
);

CREATE TABLE IF NOT EXISTS hint (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    level INT NOT NULL,
    team_id BIGINT NOT NULL,
    FOREIGN KEY (team_id) REFERENCES team(id)
);

CREATE TABLE IF NOT EXISTS submission (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    team_id BIGINT NOT NULL,
    content VARCHAR(255) NOT NULL,
    is_correct BOOLEAN NOT NULL,
    submitted_at DATETIME NOT NULL,
    FOREIGN KEY (team_id) REFERENCES team(id)
);