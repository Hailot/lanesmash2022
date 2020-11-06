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
  4: {"id":4, "min":30, "zone":8, "bases": [
    new Base(256000, "AmpStation", "Nott Amp Station", true),
    new Base(256020, "SmallOutPost", "Nott Research Camp", false),
    new Base(242000, "SmallOutPost", "Geological Survey Camp", false),
    new Base(244000, "SmallOutPost", "Frostfall Overlook", false),
    new Base(257020, "SmallOutPost", "Ymir Eastern Way", false),
    new Base(257000, "BioLab", "Ymir Biolab", true)
  ]},
  5: {"id":5, "min":30, "zone":8, "bases": [
    new Base(253000, "AmpStation", "Freyr Amp Station", true),
    new Base(253020, "SmallOutPost", "Freyr Geothermal", false),
    new Base(233000, "SmallOutPost", "Aurora Materials Lab", false),
    new Base(255030, "SmallOutPost", "Mani Lake Satellite", false),
    new Base(255000, "BioLab", "Mani Bio Lab", true)
  ]},
  6: {"id":6,"min":30, "zone":4, "bases": [
    new Base(304000, "BioLab", "Zotz Bio Lab", true),
    new Base(304030, "SmallOutPost", "Zotz Agriculture Lab", false),
    new Base(282000, "SmallOutPost", "The Ziggurat", false),
    new Base(283000, "SmallOutPost", "Nettlemire Gardens", false),
    new Base(306020, "SmallOutPost", "Mulac Foundry, true", false),
    new Base(306000, "TechPlant", "Mulac Tech Plant", true)
  ]},
  7: {"id":7,"min":30, "zone":4, "bases": [
    new Base(305000, "TechPlant", "Ghanan Tech Plant", true),
    new Base(305010, "SmallOutPost", "Ghanan Southern Crossing", false),
    new Base(277000, "SmallOutPost", "Johari Cove", false),
    new Base(278000, "SmallOutPost", "Roothouse Distiller", false),
    new Base(303010, "SmallOutPost", "Bitol StockPile", false),
    new Base(303000, "BioLab", "Bitol Bio Lab", true)
  ]},
  8: {"id":8, "min":30, "zone":4, "bases": [
    new Base(304000, "BioLab", "Zotz Bio Lab", true),
    new Base(304030, "SmallOutPost", "Zotz Agriculture Lab", false),
    new Base(282000, "SmallOutPost", "The Ziggurat", false),
    new Base(287060, "SmallOutPost", "Eastern Substation", false),
    new Base(293000, "BioLab", "Genesis Terraforming Plant", true)
  ]},
  9: {"id":9, "min":30, "zone":4, "bases": [
    new Base(302000, "BioLab", "Acan Bio Lab", true),
    new Base(302030, "SmallOutPost", "Acan Southern Labs", false),
    new Base(276000, "SmallOutPost", "Woodman ASE Labs", false),
    new Base(287090, "SmallOutPost", "Mossridge Command Center", false),
    new Base(294000, "LargeOutPost", "Bravata PMC Compound", true)
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
