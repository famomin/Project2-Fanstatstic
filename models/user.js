var bcrypt = require('bcrypt-nodejs')

module.exports = function(sequelize, DataTypes) {
    var User =  sequelize.define('User', {
        username: {
                  type: DataTypes.STRING, 
                  unique: true,
                  allowNull: true
                  },
        password: {
                   type: DataTypes.STRING,
                   allowNull: true
                  },
        firstname: {
                   type: DataTypes.STRING,
                   allowNull: true
                  },
        lastname: {
                   type: DataTypes.STRING,
                   allowNull: true
                  },
        birthdate: {
                   type: DataTypes.INTEGER,
                   allowNull: true
                   }
                }, 
                {
                  classMethods: {
                    validePassword: function(password, passwd, done, user){
                        bcrypt.compare(password, passwd, function(err, isMatch){
                            if (err) throw err;
                            if (isMatch) {
                                return done(null, user)
                            } else {
                                return done(null, false)
                            }
                        });
                    }
                  }
                }, 
                {
                    dialect: 'mysql'
                }

              ); 
    User.hook('beforeCreate', function(user, cb){
        var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
            return salt });
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err) return next(err);
            user.password = hash;
            user.save(cb);
        });
    })
    return User;
}