-- Existing appointments exported from the original SQLite database.
SELECT setval(pg_get_serial_sequence('appointments', 'id'), COALESCE((SELECT MAX(id) FROM appointments), 1), (SELECT COUNT(*) > 0 FROM appointments));
