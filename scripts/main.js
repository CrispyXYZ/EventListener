import {Commands, World} from 'Minecraft';
import {filtchat, filtlist} from './optionsParser.js';

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

// wait for 1.17.20 update
if(false){
const cancelPiston = function(e) {
  e.cancel = true;
  log('§4Piston is disabled in this world.');
};
}

// developing feature
if(false){
World.events.createEntity.subscribe( (e) => {
  var pos = e.entity.location;
  log(`${e.entity.id}: ${pos.x}, ${pos.y}, ${pos.z}`);
});
}

if(filtchat){
  World.events.beforeChat.subscribe( (e)=>{
    if(e.message.containsOR(filtlist)){
      e.message = '***';
    }
  });
}