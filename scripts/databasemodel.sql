CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS words (
    word VARCHAR(25) PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS test_categories (
    id SERIAL PRIMARY KEY,
    text_mode TEXT,
    time_seconds INTEGER,
    word_count INTEGER,
    quote_length TEXT,
    label TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS test_results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
    total_words_typed INTEGER NOT NULL,
    correct_words_typed INTEGER NOT NULL,
    total_chars_typed INTEGER NOT NULL,
    correct_chars_typed INTEGER NOT NULL,
    test_mode INTEGER NOT NULL REFERENCES test_categories,
    wpm INTEGER NOT NULL,
    accuracy INTEGER NOT NULL
);




-- CREATE TABLE IF NOT EXISTS test_modes(
--     id SERIAL PRIMARY KEY ,
--     text_mode text,
--     time_seconds INT ,
--     word_count INT ,
--     quote_length text ,
--     label text NOT NULL
-- );
--
--
-- CREATE TABLE IF NOT EXISTS test_results(
--     id SERIAL PRIMARY KEY ,
--     user_id INT NOT NULL ,
--     total_words_typed INT NOT NULL ,
--     correct_words_typed INT NOT NULL ,
--     total_chars_typed INT NOT NULL ,
--     correct_chars_typed INT NOT NULL,
--     test_mode INT NOT NULL ,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
--     FOREIGN KEY (test_mode) REFERENCES test_categories(id)
-- );
--
--
-- CREATE TABLE IF NOT EXISTS text_bank(
--     id SERIAL PRIMARY KEY ,
--     text_option text NOT NULL ,
--     content text NOT NULL
-- );
--
-- CREATE INDEX index_text_option ON text_bank(text_option);
--
-- INSERT INTO test_categories (text_mode, time_seconds, word_count, quote_length, label) VALUES
-- ('count', NULL, 25, NULL, '25 word count'),
-- ('count', NULL, 50, NULL, '50 word count'),
-- ('count', NULL, 75, NULL, '75 word count'),
--
-- ('time', 30, NULL, NULL, '30 second timer'),
-- ('time', 60, NULL, NULL, '60 second timer'),
-- ('time', 90, NULL, NULL, '90 second timer'),
--
-- ('quotes', NULL, NULL, 'short', 'short quotes'),
-- ('quotes', NULL, NULL, 'med', 'medium quotes'),
-- ('quotes', NULL, NULL, 'long', 'long quotes');
--
-- CREATE TABLE IF NOT EXISTS words(
--     word varchar(25) primary key
-- );