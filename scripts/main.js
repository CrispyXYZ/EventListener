import {Commands, Effects, World} from 'Minecraft';
import {
filtchat,
filtlist,
enflycmd,
emonster,
invsneak,
custocmd,
cmdslist } from './optionsParser.js';


/**
 * Send message to Minecraft client.
 * @param msg {String} - The message that will be sent to the Minecraft client.
 * @return {void}
 */
const log = function(msg) {
  Commands.run(`say ${msg}`);
};


/**
 * Test if the string contains another string.
 * @param another {String} - another string.
 * @return {boolean} - true: contains; false: does not contain.
 */
String.prototype.contains = function(another) {
  return this.indexOf(another) != -1;
};


/**
 * Test if the string contains any of the strings in the array.
 * @param arr {String[]}
 * @return {boolean} - true: contains any; false: does not contain.
 */
String.prototype.containsOR = function(arr) {
  let b = false;
  for(let i = 0; i < arr.length; i++){
    b = b || this.contains(arr[i]);
  }
  return b;
};


/**
 * Test if the entity is monster.
 * @param entity {Entity}
 * @return {boolean}
 */
function isMonster(entity) {
  switch(entity.id.substring(10)){
    case "blaze":
    case "cave_spider":
    case "creeper":
    case "drowned":
    case "elder_guardian":
    case "enderman":
    case "endermite":
    case "evocation_illager":
    case "ghast":
    case "guardian":
    case "husk":
    case "magma_cube":
    case "phantom":
    case "piglin":
    case "piglin_brute":
    case "pillager":
    case "ravager":
    case "shulker":
    case "silverfish":
    case "skeleton":
    case "slime":
    case "spider":
    case "stray":
    case "vex":
    case "vindicator":
    case "witch":
    case "wither":
    case "zombie":
    case "zombie_pigman":
    case "zombie_villager_v2":
      return true;
    default:
      return false;
  }
}

// wait for 1.17.20 update
if(false){
const cancelPiston = function(e) {
  e.cancel = true;
  log('§4Piston is disabled in this world.');
};
}


if(emonster){
  World.events.createEntity.subscribe( (e) => {
    let {entity} = e;
    entity.addEffect(Effects.empty,1,1);
    if(isMonster(entity)){
      let num = 100-Math.floor(Math.random()*100);
      let obj = new Object();
      switch(true){
        case num>=61&&num<=80:
          obj.eff=Effects.speed;
          obj.amp=1;
          break;
        case num>=81&&num<=90:
          obj.eff=Effects.regeneration;
          obj.amp=1;
          break;
        case num>=91&&num<=94:
          obj.eff=Effects.speed;
          obj.amp=2;
          break;
        case num>=95&&num<=97:
          obj.eff=Effects.resistance;
          obj.amp=1;
          break;
        case num>=98&&num<=99:
          obj.eff=Effects.regeneration;
          obj.amp=2;
          break;
        case num==100:
          obj.eff=Effects.invisibility;
          obj.amp=1;
          break;
        default:
          obj.eff=Effects.empty;
          obj.amp=1;
          break;
      }
      entity.addEffect(obj.eff,2147483647,obj.amp);
    }
  });
}


World.events.beforeChat.subscribe( (e) => {
  if(custocmd){
    for(let i = 0, l = cmdslist.length; i < l; i++){
      let obj = cmdslist[i];
      if(e.message == obj.command) {
        obj.onExecute(e.sender);
        
      }
    }
  } else if(enflycmd && e.message.startsWith('.fly')) {
    let player = e.sender;
    if(e.message == '.fly true')  Commands.run(`ability ${player.name} mayfly true`);
    if(e.message == '.fly false')  Commands.run(`ability ${player.name} mayfly false`);
    e.canceled = true;
  } else if(filtchat && e.message.containsOR(filtlist)) {
    e.message = '***';
  }
});

/*
World.events.tick.subscribe( () => {
  let players = World.getPlayers();
  for(let i=0;i<players.length;i++){
    let p = players[i];
    if(p.sneaking) p.addEffect(Effects.invisibility,1,1);
  }
});
*/