var socket = io();
socket.emit('subscribe');

let NONE_ID = 0
let VS_ID = 1
let NC_ID = 2
let TR_ID = 3
let NSO_ID = 4

function getFaction(factionId) {
  if (factionId == VS_ID) {
    return "VS"
  }
  if (factionId == NC_ID) {
    return "NC"
  }
  if (factionId == TR_ID) {
    return "TR"
  }
  return "NC"
}

socket.on('broadcast',function(data) {
  if (data.team1 != undefined && data.team2 != undefined) {
    $("#team1").text(data.team1)
    $("#team2").text(data.team2)
    $(".MainBackground").removeClass("NC-TR")
    $(".MainBackground").removeClass("NC-VS")
    $(".MainBackground").removeClass("VS-NC")
    $(".MainBackground").removeClass("VS-TR")
    $(".MainBackground").removeClass("TR-NC")
    $(".MainBackground").removeClass("TR-VS")
    $(".MainBackground").addClass(getFaction(data.factionTeam1) + "-" + getFaction(data.factionTeam2))
  }
  if (data.scoreTeam1 != undefined && data.scoreTeam2 != undefined) {
      $("#scoreTeam1").text("" + data.scoreTeam1)
      $("#scoreTeam2").text("" + data.scoreTeam2)
  }
});
