CREATE DATABASE IF NOT EXISTS fanstatstic_db;

USE fanstatstic_db;

CREATE TABLE IF NOT EXISTS players (
	id INT(10) UNSIGNED AUTO_INCREMENT NOT NULL
    , first_name VARCHAR(250) NOT NULL
    , last_name VARCHAR(250) NOT NULL
    , player_position VARCHAR(250) NOT NULL
    , PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS teams (
	id INT(10) UNSIGNED AUTO_INCREMENT NOT NULL
    , team_city VARCHAR(250) NOT NULL
    , team_name VARCHAR(250) NOT NULL
    , team_abbr VARCHAR(4) NOT NULL
    , PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS player_team (
	id INT(10) UNSIGNED AUTO_INCREMENT NOT NULL
    , player_id INT(10) UNSIGNED NOT NULL
    , team_id INT(10) UNSIGNED  NOT NULL
    , date_started DATE NOT NULL
    , date_left DATE
    , PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS stats (
	id INT(10) UNSIGNED AUTO_INCREMENT NOT NULL
    , stat_name VARCHAR(250) NOT NULL
    , stat_abbr VARCHAR(250) NOT NULL
    , stat_column VARCHAR(30) NOT NULL
    , PRIMARY KEY (id)
);

-- CREATE INDEX IF stat_name_index ON stats (stat_name);

CREATE TABLE IF NOT EXISTS player_stats (
	id INT(10) UNSIGNED AUTO_INCREMENT NOT NULL
    , player_id INT(10) UNSIGNED NOT NULL
    , games_played INT (10) NOT NULL
    , pass_att INT (10) NOT NULL
	, pass_comp INT (10) NOT NULL
    , pass_yd INT (10) NOT NULL
    , pass_td INT (10) NOT NULL
    , pass_int INT (10) NOT NULL
    , qbr INT (10) NOT NULL
    , rush_att INT (10) NOT NULL
    , rush_yds INT (10) NOT NULL
    , rush_td INT (10) NOT NULL
    , rush_fum INT (10) NOT NULL
    , targ INT (10) NOT NULL
    , rec INT (10) NOT NULL
    , rec_yds INT (10) NOT NULL
    , rec_td INT (10) NOT NULL
    , tackle_solo INT (10) NOT NULL
    , tackle_tot INT (10) NOT NULL
    , tackle_ast INT (10) NOT NULL
    , sacks INT (10) NOT NULL
    , sack_yds INT (10) NOT NULL
    , tackle_for_loss INT (10) NOT NULL
    , interceptions INT (10) NOT NULL
    , int_td INT (10) NOT NULL
    , kick_ret_td INT (10) NOT NULL
    , punt_ret_td INT (10) NOT NULL
    , fg_made INT (10) NOT NULL
    , fg_att INT (10) NOT NULL
    , fg_made_1_19 INT (10) NOT NULL
    , fg_att_1_19 INT (10) NOT NULL
    , fg_made_20_29 INT (10) NOT NULL
    , fg_att_20_29 INT (10) NOT NULL
    , fg_made_30_39 INT (10) NOT NULL
    , fg_att_30_39 INT (10) NOT NULL
    , fg_made_40_49 INT (10) NOT NULL
    , fg_att_40_40 INT (10) NOT NULL
    , fg_made_50 INT (10) NOT NULL
    , fg_att_50 INT (10) NOT NULL
    , xp_made INT (10) NOT NULL
    , xp_att INT (10) NOT NULL
    , PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users (
	id INT(10) UNSIGNED AUTO_INCREMENT NOT NULL
    , email VARCHAR(100) NOT NULL
    , user_password VARCHAR(50) NOT NULL
    , PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS searches (
	id INT(10) UNSIGNED AUTO_INCREMENT NOT NULL
    , user_id INT(10) UNSIGNED NOT NULL
    , player_id VARCHAR(250) NOT NULL
    , stat_id VARCHAR(250) NOT NULL
    , PRIMARY KEY (id)
);

ALTER TABLE player_team ADD CONSTRAINT `FK_PLAYER_TEAM__PLAYER_ID` FOREIGN KEY (player_id) REFERENCES players(id) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE player_team ADD CONSTRAINT `FK_PLAYER_TEAM_TEAM_ID` FOREIGN KEY (team_id) REFERENCES teams(id);
ALTER TABLE player_stats ADD CONSTRAINT `FK_PLAYER_STATS_PLAYER_ID` FOREIGN KEY (player_id) REFERENCES players(id);
-- ALTER TABLE searches ADD CONSTRAINT `FK_SEARCHES_USER_ID` FOREIGN KEY (user_id) REFERENCES users(id);