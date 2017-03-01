'use strict';

var test = require('./../models');

/*
    routes needed
        get route for 
*/
module.exports = function(app) {
	app.get('/compareplayers', function(req, res) {
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

        //  test.Player.findAll({
        //     where: {
        //         id: 6923
        //     },
        //     include: [
        //         {
        //             model: test.Player_team,
        //             as: 'Player_team',
        //             include: [
        //                 {
        //                     model: test.Team
        //                 }
        //             ]
        //         },
        //         {
        //             model: test.Player_stat,
        //             as: 'Player_stat'
        //         }
        //     ]
        // }).then(function(testDB) {
        //     console.log(testDB[0].dataValues);
        //     // console.log(testDB[0].dataValues.Player_team[0].dataValues);
        // });
	});
};