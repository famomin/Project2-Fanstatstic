CREATE DATABASE IF NOT EXISTS fanstatstic_db;

USE fanstatstic_db;

CREATE TABLE IF NOT EXISTS players (
	id INT(10) UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY
    , first_name VARCHAR(250) NOT NULL
    , last_name VARCHAR(250) NOT NULL
    , position VARCHAR(250) NOT NULL
    , FOREIGN KEY (id) REFERENCES player_team (player_id)
    , FOREIGN KEY (id) REFERENCES player_stats (player_id)
);

CREATE TABLE IF NOT EXISTS teams (
	id INT(10) UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY
    , team_city VARCHAR(250) NOT NULL
    , team_name VARCHAR(250) NOT NULL
    , team_abbr VARCHAR(2) NOT NULL
    , FOREIGN KEY (id) REFERENCES player_team (team_id)
);

CREATE TABLE IF NOT EXISTS player_team (
	id INT(10) UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY
    , player_id INT(10)
    , team_id INT(10)
    , date_started DATE NOT NULL
    , date_left DATE
);

CREATE TABLE IF NOT EXISTS stats (
	id INT(10) UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY
    , stat_name VARCHAR(250) NOT NULL
    , stat_abbr VARCHAR(250) NOT NULL
    , stat_def VARCHAR(250)
);

CREATE INDEX stat_name_index ON stats (stat_name);

CREATE TABLE IF NOT EXISTS player_stats (
	id INT(10) UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY
    , player_id INT(10) NOT NULL
    , 
);

