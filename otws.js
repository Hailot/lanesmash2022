const WebSocket   = require('ws');

const match = require('./match.js');

var runningWs = null;
var subAttempt = 0;
var unsubAttempt = 0;

function connect() {
var outfitTrackerWSUrl = "wss://www.outfit-tracker.com:4567/facilities"
var ws = new WebSocket(outfitTrackerWSUrl);

runningWs = ws;
ws.on('open', function open() {
  subAttempt += 1;
});

ws.on('message', function (data) {
  match.dealWithTheData(data)
});

ws.on('close', function (data) {
  console.log('Socket is closed. Reconnect will be attempted in 1 second.', data);
    setTimeout(function() {
      connect();
    }, 1000);
  
});

ws.on('error', function (data) {
  ws.close();
});

}

connect();


function subscribe(ws) {
  bases_ids = match.getHud().getBasesIDs()
  zone_id = match.getHud().getZone()
  for (var i in bases_ids) {
    if (ws.readyState == 1) {
      var msg = {subscribe: {worldId: 19, facilityId:bases_ids[i]}};
      console.log(msg)
      ws.send(JSON.stringify(msg));
    }
  }
}

function unsubscribe(ws) {
  // unsubscribes from all events
  unsubAttempt += 1;
  try {
    bases_ids = match.getHud().getBasesIDs()
    for (var i in bases_ids) {
      if (ws.readyState == 1) {
        var msg = {unsubscribe: {worldId: 19, facilityId:bases_ids[i]}};
        console.log(msg)
        ws.send(JSON.stringify(msg));
      }
    }

  }
  catch(err) {
    console.log(err)
    if (ws.readyState == 1) {
      unsubscribe(ws);
    }
  }
}

function setMatch() {
  subscribe(runningWs);
}

function resetMatch() {
  unsubscribe(runningWs);
}


exports.setMatch = setMatch;
exports.resetMatch = resetMatch;
