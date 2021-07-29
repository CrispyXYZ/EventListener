import {Commands, World} from 'Minecraft';

var Options =
{
  "dontShowBadWords": false,
  "badWordsList": [],
  "enhancedMonsters": true,
  "enableFlyCommand": true,
  "invisibleSneaking": false, //not implement
  "enableCustomCammands": true,
  "customCommands": [
    {
      "command": ".helloworld",
      /**
       * executes when command sends.
       * @param sender {Player} - player who send the command.
       * @return {void}
       */
      "onExecute": function(sender){
        Commands.run(`tell ${sender.name} Hello World!`);
      }
    }
  ]
  
};



export {Options};