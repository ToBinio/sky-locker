-- DROP EVERYTHING
DROP TABLE IF EXISTS session;

-- CREATE EVERYTHING
CREATE TABLE session
(
    id            uuid      DEFAULT gen_random_uuid() PRIMARY KEY,
    creation_date timestamp DEFAULT now() NOT NULL,
    name          text                    NOT NULL,
    avatar_url    text                    NOT NULL,
    github_id     text                    NOT NULL
)
