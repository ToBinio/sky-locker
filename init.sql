-- DROP EVERYTHING
drop table IF EXISTS session;
drop table IF EXISTS file;
drop table IF EXISTS folder;

-- CREATE EVERYTHING
create TABLE session
(
    id            uuid      DEFAULT gen_random_uuid() PRIMARY KEY,
    creation_date timestamp DEFAULT now() NOT NULL,
    name          text                    NOT NULL,
    avatar_url    text                    NOT NULL,
    github_id     text                    NOT NULL
);

create TABLE folder
(
    id     uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    parent_folder uuid REFERENCES folder (id)

    name text NOT NULL
);

create TABLE file
(
    id     uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    folder uuid REFERENCES folder (id) NOT NULL

    name text NOT NULL
);

