var socket = io();
socket.emit('subscribe');

$(function(){

  $("#btnLane").on('click', function(){
    lane = $("#selectLane").val()
    socket.emit('updateLane', {
      lane : lane,
    });
  })

  $( "#teamForm" ).submit(function( event ) {
    team1 = $("#team1").val()
    team2 = $("#team2").val()
    if (team1 != "" && team2 != "") {
      socket.emit('updateTeam', {
        team1 : team1,
        team2 : team2
      });
    }
    event.preventDefault();
  });

  $("#btnStart").on('click', function(){
    $("#btnPauseResume").removeClass("d-none");
    $("#btnPause").removeClass("d-none");
    $("#btnResume").addClass("d-none");
    socket.emit('start');
  })

  $("#btnPause").on('click', function(){
    $("#btnPause").addClass("d-none");
    $("#btnResume").removeClass("d-none");
      socket.emit('pause');
  })

  $("#btnResume").on('click', function(){
    $("#btnResume").addClass("d-none");
    $("#btnPause").removeClass("d-none");
      socket.emit('resume');
  })

  $("#btnEndRound").on('click', function(){
      $("#btnPauseResume").addClass("d-none");
      socket.emit('endRound');
  })

  $("#btnReStart").on('click', function(){
      $("#btnPauseResume").addClass("d-none");
      socket.emit('restart');
  })
});
