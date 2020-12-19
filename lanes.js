const Faction = require('./faction.js');
const match = require('./match.js');

class Base {
  constructor(id, type, name, home) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.home = home;
    this.faction = Faction.NS
  }

  toJson() {
    return {
      id:this.id,
      type:this.type,
      name:this.name,
      home:this.home,
      faction:match.isFactionUsed(this.faction) ? Faction.name(this.faction) : Faction.name(Faction.NS)
    }
  }
}

let lanes = {
  1: {"id":1, "min":30, "zone":6, "bases": [
    new Base(206000, "TechPlant", "Heyoka Tech Plant", true),
    new Base(206002, "SmallOutPost", "Heyoka Chemical", false),
    new Base(222180, "SmallOutPost", "Chimney Rock Depot", false),
    new Base(211001, "SmallOutPost", "Tumas Skylance Battery", false),
    new Base(211000, "TechPlant", "Tumas Tech Plant", true)
  ]},
  2: {"id":2, "min":45, "zone":6, "bases": [
    new Base(204000, "AmpStation", "Kwahtee Amp Station", true),
    new Base(204003, "SmallOutPost", "Kwahtee Mountain Complex", false),
    new Base(222080, "SmallOutPost", "Genudine Physics Lab", false),
    new Base(222330, "SmallOutPost", "Shrouded Skyway", false),
    new Base(222340, "SmallOutPost", "The Scarfield Reliquary", false),
    new Base(210001, "SmallOutPost", "Wokuk Ecological Preserve", false),
    new Base(210000, "AmpStation", "Wokuk Amp Station", true)
  ]},
  3: {"id":3, "min":30, "zone":6, "bases": [
    new Base(216000, "LargeOutPost", "Crux Headquarters", true),
    new Base(222120, "SmallOutPost", "Blackshard Tungsten Mine", false),
    new Base(260004, "SmallOutPost", "Amerish ARX Reserve", false),
    new Base(222130, "SmallOutPost", "Shadespire Farms", false),
    new Base(215000, "LargeOutPost", "Crux Mining Operation", true)
  ]},
  4: {"id":4, "min":30, "zone":2, "bases": [
    new Base(6400, "LargeOutPost", "Feldspar Canyon Base", true),
    new Base(6500, "SmallOutPost", "The Stronghold", false),
    new Base(7020, "SmallOutPost", "Tawrich Tower", false),
    new Base(7010, "SmallOutPost", "Tawrich Depot", false),
    new Base(6100, "LargeOutPost", "Crossroads Watchtower", true)
  ]},
  5: {"id":5, "min":30, "zone":2, "bases": [
    new Base(3201, "AmpStation", "Dahaka Amp Station", true),
    new Base(3230, "SmallOutPost", "Dahaka Southern Post", false),
    new Base(214, "SmallOutPost", "Indar Comm. Array", false),
    new Base(4020, "SmallOutPost", "Allatum Broadcast Hub", false),
    new Base(4001, "BioLab", "Allatum Bio Lab", true)
  ]},
  6: {"id":6,"min":30, "zone":4, "bases": [
    new Base(302000, "BioLab", "Acan Bio Lab", true),
    new Base(302030, "SmallOutPost", "Acan Southern Labs", false),
    new Base(282000, "SmallOutPost", "Woodman ASE Labs", false),
    new Base(287090, "SmallOutPost", "Mossridge Command Center", false),
    new Base(294000, "LargeOutPost", "Bravata PMC Compound", true)
  ]},
  7: {"id":7, "min":30, "zone":4, "bases": [
    new Base(304000, "BioLab", "Zotz Bio Lab", true),
    new Base(304030, "SmallOutPost", "Zotz Agriculture Lab", false),
    new Base(282000, "SmallOutPost", "The Ziggurat", false),
    new Base(287060, "SmallOutPost", "Eastern Substation", false),
    new Base(293000, "BioLab", "Genesis Terraforming Plant", true)
  ]},
  8: {"id":8, "min":30, "zone":4, "bases": [
    new Base(307000, "TechPlant", "Chac Tech Plant", true),
    new Base(307030, "SmallOutPost", "Chac Intel Hub", false),
    new Base(296000, "LargeOutPost", "Hayd Skydock", false),
    new Base(287020, "SmallOutPost", "Construction Site Beta", false),
    new Base(297000, "LargeOutPost", "Hatcher Airstation", true)
  ]},
  9: {"id":9, "min":30, "zone":4, "bases": [
    new Base(302000, "TechPlant", "Ghanan Tech Plant", true),
    new Base(305030, "SmallOutPost", "Ghanan Eastern Gatehouse", false),
    new Base(290000, "LargeOutPost", "Fort Drexler", false),
    new Base(300020, "SmallOutPost", "Hurakan Western Pass", false),
    new Base(300000, "AmpStation", "Hurakan AMP Station", true)
  
  ]},
  10: {"id":10, "min":30, "zone":8, "bases": [
    new Base(253000, "AmpStation", "Freyr AMP Station", true),
    new Base(237000, "SmallOutPost", "The Traverse", false),
    new Base(246000, "LargeOutPost", "Mattherson's Triumph", false),
    new Base(239000, "SmallOutPost", "Pale Canyon Chemical", false),
    new Base(400314, "AmpStation", "Baldur AMP Station", true)
  ]}
}


function getLane(id) {
    return lanes[id]
}

function toJson(lane) {
  return {
      id:lane.id,
      min:lane.min,
      zone:lane.zone,
      bases:lane.bases.map(base => base.toJson())
  }
}

exports.Base = Base;
exports.getLane = getLane;
exports.toJson = toJson;
