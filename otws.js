const WebSocket   = require('ws');

const match = require('./match.js');

var outfitTrackerWSUrl = "wss://www.outfit-tracker.com:4567/facilities"
var ws = new WebSocket(outfitTrackerWSUrl);

var subAttempt = 0;
var unsubAttempt = 0;


ws.on('open', function open() {
  subAttempt += 1;
});

ws.on('message', function (data) {
  match.dealWithTheData(data)
});

ws.on('close', function (data) {
  ws.close();
  ws = new WebSocket(outfitTrackerWSUrl);
});

ws.on('error', function (data) {
  ws.close();
  ws = new WebSocket(outfitTrackerWSUrl);
});

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
  subscribe(ws);
}

function resetMatch() {
  unsubscribe(ws);
}


exports.setMatch = setMatch;
exports.resetMatch = resetMatch;
