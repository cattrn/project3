DROP TABLE IF EXISTS schedules;

CREATE TABLE IF NOT EXISTS schedules (
    id serial PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    day SMALLINT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);