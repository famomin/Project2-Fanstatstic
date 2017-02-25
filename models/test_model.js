'use strict';

module.exports = function(sequelize, DataTypes) {
    var Team = sequelize.define("Team", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        team_city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        team_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        team_abbr: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {timestamps: false});

    return Team;
};

// module.exports = function(sequelize, DataTypes) {
//     var Player = sequelize.define("Player", {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true
//         },
//         first_name: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         last_name: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         player_position: {
//             type: DataTypes.STRING,
//         }
//     });

//     return Player;
// };

// module.exports = function(sequelize, DataTypes) {
//     var Stat = sequelize.define("Stat", {
//         stat_name: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         stat_abbr: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         stat_column: {
//             type: DataTypes.STRING,
//             allowNull: false
//         }
//     });

//     return Stat;
// };

// module.exports = function(sequelize, DataTypes) {
//     var Player_stat = sequelize.define("Player_stat", {
//         player_id: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: Player,
//                 key: 'id'
//             }
//         },
//         games_played: {

//         },
//         pass_att: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , pass_comp: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , pass_yd: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , pass_td: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , pass_int: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , qbr: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , rush_att: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , rush_yds: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , rush_td: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , rush_fum: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , targ: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , rec: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , rec_yds: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , rec_td: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , tackle_solo: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , tackle_tot: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , tackle_ast: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , sacks: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , sack_yds: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , tackle_for_loss: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , interceptions: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , int_td: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , kick_ret_td: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , punt_ret_td: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , fg_made: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , fg_att: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , fg_made_1_19: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , fg_att_1_19: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , fg_made_20_29: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , fg_att_20_29: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , fg_made_30_39: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , fg_att_30_39: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , fg_made_40_49: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , fg_att_40_40: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , fg_made_50: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , fg_att_50: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , xp_made: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//         , xp_att: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//     });

//     return Player_stat;
// };

// module.exports = function(sequelize, DataTypes) {
//     var Player_team = sequelize.define("Player_team", {
//         player_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: Player,
//                 key: 'id'
//             }
//         },
//         team_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: Team,
//                 key: 'id'
//             }
//         },
//         date_started: {
//             type: DataTypes.DATEONLY,
//             allowNull: false
//         },
//         date_left: {
//             type: DataTypes.DATEONLY,
//             allowNull: true
//         }
//     });

//     return Player_team;
// };

// module.exports = function(sequelize, DataTypes) {
//     var Searche = sequelize.define("Searche", {
//         user_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: User,
//                 key: 'id'
//             }
//         },
//         player_id: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         stat_id: {
//             type: DataTypes.STRING,
//             allowNull: false
//         }
//     });

//     return Searche;
// };

// module.exports = function(sequelize, DataTypes) {
//     var User = sequelize.define("User", {
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         user_password: {
//             type: DataTypes.STRING,
//             allowNull: false
//         }
//     });

//     return User;
// };