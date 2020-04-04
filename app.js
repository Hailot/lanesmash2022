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

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  socket.on('subscribe', function() {
    if (team1 != undefined && team2 != undefined) {
      io.sockets.emit('broadcast', {
        team1 : team1,
        team2 : team2,
        lane : lane,
        round:round,
      });
    }
  });

  socket.on('updateTeam', function(data){
    if (start == false) {
      team1 = data.team1
      team2 = data.team2
      io.sockets.emit('broadcast', {
        team1: team1,
        team2: team2,
      });
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
    pause = false
    start = true
    io.sockets.emit('broadcast', {
      round:round,
      start:start,
      pause:pause
    });
    round = round + 1
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
    io.sockets.emit('broadcast', {
      round:round,
      pause:pause,
      start:start,
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
