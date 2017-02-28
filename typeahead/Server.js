var express=require('express');
var app=express();
var  mysql=require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'fanstatstic_db'
});

connection.connect();

app.set('views',__dirname + '/views');
app.use(express.static(__dirname + '/JS'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/',function(req,res){
    res.render('index.html');
});

app.get('/search',function(req,res){
    connection.query('SELECT players.first_name, players.last_name, players.player_position, teams.team_abbr, players.id FROM players '
        + 'INNER JOIN player_teams ON players.id = player_teams.player_id '
        + 'INNER JOIN teams ON teams.id = player_teams.team_id '
        + 'WHERE players.first_name LIKE "%' + req.query.key + '%"'
        + ' OR players.last_name LIKE "%' + req.query.key + '%"'
        + ' OR teams.team_abbr LIKE "%' + req.query.key + '%"'
        + ' OR players.player_position LIKE "%' + req.query.key + '%"', function(err, rows, fields) {
        if (err) throw err;
        res.end(JSON.stringify(rows));
	});
});

app.listen(8080, function(){
    console.log("We have started our server on port 3000");
});
