-- Existing user accounts exported from the original SQLite database.
-- Password hashes are preserved so existing passwords continue to work.
INSERT INTO users (id, name, email, password_hash) VALUES (1, 'Deva Tait', 'deva122905@gmail.com', '$2a$12$JM9H9b0L5tFzSKNqW6rqRuGaACiVeRLlVD7sh0sxh1HRR6TN1DF7q') ON CONFLICT (id) DO NOTHING;
INSERT INTO users (id, name, email, password_hash) VALUES (2, 'Edward Sanchez', '123@gmail.com', '$2a$12$RK6yJ4qZx/EWVYCRly331u0Mhp/0Z.jlMusCCUFTmdhbtRuQm82eG') ON CONFLICT (id) DO NOTHING;
SELECT setval(pg_get_serial_sequence('users', 'id'), COALESCE((SELECT MAX(id) FROM users), 1), (SELECT COUNT(*) > 0 FROM users));
