var socket = io();
socket.emit('subscribe', {admin:true});

$(function(){
  $( "#matchInitializer" ).submit(function( event ) {
    lane = parseInt($("#selectLane").val())
    caster1 = $("#caster1").val().toUpperCase()
    caster2 = $("#caster2").val().toUpperCase()
    team1 = $("#team1").val().toUpperCase()
    team2 = $("#team2").val().toUpperCase()
    factionTeam1 = parseInt($("#selectFactionTeam1").val())
    factionTeam2 = parseInt($("#selectFactionTeam2").val())
    if (caster1 != "" && caster2 != "" && factionTeam1 != factionTeam2 && team1 != "" && team2 != "") {
      $( "#btnServer").addClass("d-none")
      $( ".buttonsDiv").removeClass("d-none")
      socket.emit('initializeMatch', {
        lane : lane,
        caster1 : caster1,
        caster2 : caster2,
        factionTeam1 : factionTeam1,
        factionTeam2 : factionTeam2,
        team1 : team1,
        team2 : team2
      });
    }
    event.preventDefault();
  });

  $("#btnStart").on('click', function(){
    socket.emit('Start');
  })

  $("#btnReset").on('click', function(){
    if (confirm("Are you sure you wanna RESET")) {
      socket.emit('Reset');
      $( "#btnServer").removeClass("d-none")
      $( ".buttonsDiv").addClass("d-none")
    }
  })

  socket.on('broadcast',function(data) {
    $("#selectLane").val(data.lane)
    $("#caster1").val(data.caster1)
    $("#caster2").val(data.caster2)
    $("#team1").val(data.team1.name)
    $("#team2").val(data.team2.name)
    $("#selectFactionTeam1").val(data.team1.faction)
    $("#selectFactionTeam2").val(data.team2.faction)
    if (data.hasBeenInit) {
      $( "#btnServer").addClass("d-none")
      $( ".buttonsDiv").removeClass("d-none")
    }
  });

});
