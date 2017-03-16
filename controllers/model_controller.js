'use strict';

// model is the an object of all of the functions exported from the model files
var model = require('./../models');

/*
    routes needed
        get route for 
*/
module.exports = function (app) {
    // get route that searches for players from the players table using Twitter Typeahead
    // each key stroke triggers a query that searches for records that have a first name, last name, or position like what the user has typed
    // the query does a tripple join on the players, player_teams, and teams tables
    app.get('/search', function (req, res) {
        model.Player.findAll({
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
                    model: model.Player_team,
                    as: 'Player_team',
                    include: [
                        {
                            model: model.Team
                        }
                    ]
                }
            ] // end of include array
        }).then(function (results) {
            // when the query is done, run this callback function and pass in results as the parameter
            // results is an array filled with the records the query returned
            // create an empty array to hold the data we want
            // loop through results and push the dataValues which contains the player's info
            var player_team = [];
            for (var i = 0; i < results.length; i++) {
                player_team.push(results[i].dataValues);
            }
            // return a stringified version of the array back to the ajax call
            res.end(JSON.stringify(results));
        }); // end of .then promise
    }); // end of app.get('/search')

    // post route that runs a query does a triple join on the players table, player_teams and player_stats
    // this query returns the stats of the players that the user selected to be displayed
    app.post('/displayComparison', function (req, res) {
        model.Player.findAll({
            where: {
                id: {
                    $in: req.body.playerID.split(",")
                }
            },
            include: [
                {
                    model: model.Player_team,
                    as: 'Player_team',
                    include: [
                        {
                            model: model.Team
                        }
                    ]
                },
                {
                    model: model.Player_stat,
                    as: 'Player_stat'
                }
            ] // end of include array
        }).then(function (results) {
            // create an empty array to hold the new player objects we create in the for loop
            // loop through results and create an object with 'FirstName LastName PlayerTeam PlayerPosition' string and the player's stats as properties
            // push the object to the players array
            var players = [];
            for (var i = 0; i < results.length; i++) {
                var newPlayer = {
                    playerInfo: results[i].dataValues.first_name + " " + results[i].dataValues.last_name + " " + results[i].Player_team[0].Team.team_abbr + " " + results[i].player_position,
                    stats: results[i].Player_stat[0].dataValues
                };
                players.push(newPlayer);
            };
            // render the players array to playerstats.handlebars
            res.render('playerstats', { Player: players });
        }); // end of .then promise
    }); // end of app.post('displayComparison')
}; // end of module.exports