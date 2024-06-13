-- DROP EVERYTHING
DROP TABLE IF EXISTS session;
DROP TABLE IF EXISTS file;
DROP TABLE IF EXISTS folder;

-- CREATE EVERYTHING
CREATE TABLE session
(
    id            UUID      DEFAULT gen_random_uuid() PRIMARY KEY,
    creation_date TIMESTAMP DEFAULT now() NOT NULL,
    name          TEXT                    NOT NULL,
    avatar_url    TEXT                    NOT NULL,
    github_id     TEXT                    NOT NULL
);

CREATE TABLE folder
(
    id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    parent_folder UUID REFERENCES folder (id),

    name          TEXT NOT NULL
);

CREATE TABLE file
(
    id     UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    folder UUID REFERENCES folder (id) NOT NULL,

    name   TEXT                        NOT NULL
);

-- BASE VALUES
INSERT INTO folder(parent_folder, name)
VALUES (null, 'public'),
       (null, 'public2')
