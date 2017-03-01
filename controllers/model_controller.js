'use strict';

var test = require('./../models');

/*
    routes needed
        get route for 
*/
module.exports = function(app) {
	app.get('/getData', function(req, res) {
        // test.Team.findAll({}).then(function(testDB) {
        //     // console.log(testDB);
        //     var teams = [];
        //     for (var i = 0; i < testDB.length; i++) {
        //         teams.push(testDB[i].dataValues);
        //     }
        //     console.log("Teams");
        //     console.log(teams);
        // });

        // test.Player.findAll({}).then(function(testDB) {
        //     var players = [];
        //     for (var i = 0; i < testDB.length; i++) {
        //         players.push(testDB[i].dataValues);
        //     }
        //     console.log("\n\nPlayers");
        //     console.log(players);
        // });

        // test.Stat.findAll({}).then(function(testDB) {
        //     var stats = [];
        //     for (var i = 0; i < testDB.length; i++) {
        //         stats.push(testDB[i].dataValues);
        //     }
        //     console.log("\n\nStats");
        //     console.log(stats);
        // });

        // test.Player_stat.findAll({}).then(function(testDB) {
        //     var player_stats = [];
        //     for (var i = 0; i < testDB.length; i++) {
        //         player_stats.push(testDB[i].dataValues);
        //     }
        //     console.log("\n\nPlayer_stats");
        //     console.log(player_stats);
        // });

        // test.Searche.findAll({}).then(function(testDB) {
        //     var player_stats = [];
        //     for (var i = 0; i < testDB.length; i++) {
        //         player_stats.push(testDB[i].dataValues);
        //     }
        //     console.log("\n\nPlayer_stats");
        //     console.log(player_stats);
        // });

        // test.Player_team.findAll({
        test.Player.findAll({
            where: {
                $or: {
                    first_name: {
                        $like: '%a%'
                    },
                    last_name: {
                        $like: '%b%'
                    },
                    player_position: {
                        $like: '%c%'
                    }
                }
            }, include: [
                {
                    model: test.Player_team,
                    as: 'Player_team',
                    include: [
                        {
                            model: test.Team,
                            where: {
                                team_abbr: {
                                    $like: '%ho%'
                                }
                            }
                        }
                    ]
                }
            ]
        }).then(function(testDB) {
            var player_team = [];
            for (var i = 0; i < testDB.length; i++) {
                player_team.push(testDB[i].dataValues);
            }
            console.log("\n\nPlayer_team");
            console.log(player_team);
        });

        /*
            SELECT first_name, last_name, player_position, team_abbr
                from players
                inner join player_teams
                    on players.id = player_teams.player_id
                inner join teams
                    on teams.id = player_teams.team_id
        */
        /*test.Player_stat.find({
            include: [
                {
                    model: test.Player,
                    where: [
                        'EXISTS (' +
                        'SELECT player_stats.games_played, player_stats.player_id, players.first_name FROM players ' +
                        'WHERE player_stats.player_id = players.id'
                    ]
                }
            ]
        }).then(function(testDB) {
            var player_team = [];
            for (var i = 0; i < testDB.length; i++) {
                player_team.push(testDB[i].dataValues);
            }
            console.log(player_team);
        });*/

         /*test.Team.findAll({
            // attributes: ['Player.id', 'Player.first_name', 'Player.last_name', 'Player_stats.games_played'],
            include: [
                {
                    model: test.Player_team,
                    as: 'Player_team',
                    include: [
                        {
                            model: test.Player
                        }
                    ]
                }
            ]
        }).then(function(testDB) {
            // console.log(testDB[0].dataValues);
            console.log(testDB[0].dataValues.Player_team[0].dataValues);
        });*/
	});
};