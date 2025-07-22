CREATE TABLE team (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    password_changed BOOLEAN NOT NULL,
    correct_answer VARCHAR(255),
    correct_answer_time TIMESTAMP,
    hint_level INT NOT NULL,
    attempts_left INT NOT NULL
);

CREATE TABLE hint (
    id BIGSERIAL PRIMARY KEY,
    content VARCHAR(255),
    level INT NOT NULL,
    team_id BIGINT NOT NULL,
    FOREIGN KEY (team_id) REFERENCES team(id)
);

CREATE TABLE submission (
    id BIGSERIAL PRIMARY KEY,
    submission_text VARCHAR(255),
    submission_time TIMESTAMP,
    is_correct BOOLEAN NOT NULL,
    team_id BIGINT NOT NULL,
    FOREIGN KEY (team_id) REFERENCES team(id)
);
