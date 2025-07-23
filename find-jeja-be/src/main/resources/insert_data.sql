-- Insert data for teams
INSERT INTO team (name, password, password_changed, correct_answer, correct_answer_time, hint_level, attempts_left) VALUES
('1조', 'sk5972110', FALSE, '', NULL, 1, 3),
('2조', 'sk5972110', FALSE, '', NULL, 1, 3),
('3조', 'sk5972110', FALSE, '', NULL, 1, 3),
('4조', 'sk5972110', FALSE, '', NULL, 1, 3),
('5조', 'sk5972110', FALSE, '', NULL, 1, 3),
('6조', 'sk5972110', FALSE, '', NULL, 1, 3),
('7조', 'sk5972110', FALSE, '', NULL, 1, 3),
('test', 'sk5972110', FALSE, '', NULL, 1, 3),
('team1', 'sk5972110', FALSE, '', NULL, 1, 3);

-- Insert data for hints (assuming team_id is auto-incremented and starts from 1)
-- For '1조' (team_id = 1)
INSERT INTO hint (content, level, team_id) VALUES
('Hint 1', 1, 1),
('Hint 2', 2, 1),
('Hint 3', 3, 1);

-- For '2조' (team_id = 2)
INSERT INTO hint (content, level, team_id) VALUES
('Hint 1', 1, 2),
('Hint 2', 2, 2),
('Hint 3', 3, 2);

-- For '3조' (team_id = 3)
INSERT INTO hint (content, level, team_id) VALUES
('Hint 1', 1, 3),
('Hint 2', 2, 3),
('Hint 3', 3, 3);

-- For '4조' (team_id = 4)
INSERT INTO hint (content, level, team_id) VALUES
('Hint 1', 1, 4),
('Hint 2', 2, 4),
('Hint 3', 3, 4);

-- For '5조' (team_id = 5)
INSERT INTO hint (content, level, team_id) VALUES
('Hint 1', 1, 5),
('Hint 2', 2, 5),
('Hint 3', 3, 5);

-- For '6조' (team_id = 6)
INSERT INTO hint (content, level, team_id) VALUES
('Hint 1', 1, 6),
('Hint 2', 2, 6),
('Hint 3', 3, 6);

-- For '7조' (team_id = 7)
INSERT INTO hint (content, level, team_id) VALUES
('Hint 1', 1, 7),
('Hint 2', 2, 7),
('Hint 3', 3, 7);

-- For 'test' (team_id = 8)
INSERT INTO hint (content, level, team_id) VALUES
('Hint 1', 1, 8),
('Hint 2', 2, 8),
('Hint 3', 3, 8);