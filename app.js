const express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var events = require('events');
var path = require('path');
var bodyParser = require("body-parser");
var engines = require('consolidate');

localPath = "./"

team1 = undefined
team2 = undefined
factionTeam1 = undefined
factionTeam2 = undefined
scoreTeam1 = 0
scoreTeam2 = 0
lane = 1
round = 1
start = false
pause = undefined

app.use(express.static(localPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/public/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.get('/admin', function(req, res){
  var filePath = localPath+"admin.html"
  var resolvedPath = path.resolve(filePath);
  return res.sendFile(resolvedPath);
});

app.get('/', function(req, res){
  var filePath = localPath+"index.html"
  var resolvedPath = path.resolve(filePath);
  return res.sendFile(resolvedPath);
});

app.get('/versus', function(req, res){
  var filePath = localPath+"versus.html"
  var resolvedPath = path.resolve(filePath);
  return res.sendFile(resolvedPath);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  socket.on('subscribe', function() {
    if (team1 != undefined && team2 != undefined) {
      io.sockets.emit('broadcast', {
        team1 : team1,
        team2 : team2,
        factionTeam1: factionTeam1,
        factionTeam2: factionTeam2,
        lane : lane,
        round:round,
        scoreTeam1:scoreTeam1,
        scoreTeam2:scoreTeam2
      });
    }
  });

  socket.on('updateTeam', function(data){
    if (start == false) {
      team1 = data.team1
      team2 = data.team2
      factionTeam1 = data.factionTeam1,
      factionTeam2 = data.factionTeam2,
      io.sockets.emit('broadcast', {
        team1: team1,
        team2: team2,
        factionTeam1: factionTeam1,
        factionTeam2: factionTeam2,
      });
    }
  });

  socket.on('updateScore', function(data){
    if (start == true) {
      scoreTeam1 = data.scoreTeam1
      scoreTeam2 = data.scoreTeam2
    }
  });

  socket.on('updateLane', function(data){
    if (start == false) {
      lane = data.lane
      io.sockets.emit('broadcast', {
        lane: lane,
      });
    }
  });

  socket.on('start', function(data){
    if (start == false) {
      pause = false
      start = true
      io.sockets.emit('broadcast', {
        round:round,
        start:start,
        pause:pause
      });
      round = round + 1
    }
  });

  socket.on('pause', function(data){
    pause = true
    io.sockets.emit('broadcast', {
      pause:pause,
    });
  });

  socket.on('resume', function(data){
    pause = false
    io.sockets.emit('broadcast', {
      pause:pause,
    });
  });

  socket.on('restart', function(data){
    round = 1
    pause = true
    start = false
    scoreTeam1 = 0
    scoreTeam2 = 0
    io.sockets.emit('broadcast', {
      round:round,
      pause:pause,
      start:start,
      scoreTeam1:scoreTeam1,
      scoreTeam2:scoreTeam2
    });
  });

  socket.on('endRound', function(data){
    pause = true
    start = false
    io.sockets.emit('broadcast', {
      round:round,
      pause:pause,
      start:start,
    });
  });
});
