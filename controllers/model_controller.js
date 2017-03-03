'use strict';

var test = require('./../models');

/*
    routes needed
        get route for 
*/
module.exports = function(app) {
	app.get('/search', function(req, res) {
        // test.Player_team.findAll({
        console.log(req.query);
        test.Player.findAll({
            where: {
                $or: {
                    first_name: {
                        $like: req.query.key + '%'
                    },
                    last_name: {
                        $like: req.query.key + '%'
                    },
                    player_position: {
                        $like: req.query.key + '%'
                    }
                }
            }, include: [
                {
                    model: test.Player_team,
                    as: 'Player_team',
                    include: [
                        {
                            model: test.Team
                        }
                    ]
                }
            ]
        }).then(function(testDB) {
            var player_team = [];
            for (var i = 0; i < testDB.length; i++) {
                var player = {
                    player_team
                }
                player_team.push(testDB[i].dataValues);
            }
            console.log("\n\nPlayer_team\n\n");
            console.log(player_team[0]);
            res.end(JSON.stringify(testDB));
            /*console.log(player_team[0].Player_team[0].dataValues);
            console.log(player_team[0].Player_team[0].dataValues.Team.dataValues);*/
        });

	});
    
    app.post('/displayComparison', function(req, res) {
        // console.log(req.body);
         test.Player.findAll({
            where: {
                id: {
                    $in: req.body.ids
                }
            },
            include: [
                {
                    model: test.Player_team,
                    as: 'Player_team',
                    include: [
                        {
                            model: test.Team
                        }
                    ]
                },
                {
                    model: test.Player_stat,
                    as: 'Player_stat'
                }
            ]
        }).then(function(testDB) {
            var players = [];
            for (var i = 0; i < testDB.length; i++) {
                var newPlayer = {
                    playerInfo: testDB[i].dataValues.first_name + " " + testDB[i].dataValues.last_name + " " + testDB[i].Player_team[0].Team.team_abbr + " " + testDB[i].player_position,
                    stats: testDB[i].Player_stat.dataValues
                };

                players.push(newPlayer);
            };

            res.render('playerstats', {Player: players});
            console.log(testDB[0].dataValues);
            console.log();
            console.log(testDB[0].Player_team[0].dataValues);
            console.log();
            console.log(testDB[0].Player_team[0].dataValues.Team);
            console.log();
            console.log(testDB[0].Player_stat[0].dataValues);
        });
    });
};