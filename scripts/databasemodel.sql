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
