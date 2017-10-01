var HumixSense = require('humix-sense');
var config = {
    "moduleName" : "humix-gripper-module",
    "commands" : ["gripper_cmd"],
    "events" : ["gripper_event"],
    "log" : {
        file : 'humix-gripper-module.log',
        fileLevel : 'info',
        consoleLevel : 'debug'
      }
};

var humix = new HumixSense(config);
var hsm;
var logger;

// console.log('========= starting ' + config['moduleName'] + ' ===========');


function gripper_cmd(i_cmd){
    console.log('i_cmd type = ' +  typeof(i_cmd));
    i_cmd = i_cmd.replace(/"/g, "").toLowerCase();  // reapce all '"' char, like "Open" -> Open

    if(i_cmd == 'open' || i_cmd =='true'){
        logger.info('Open Gripper');

    }else if(i_cmd == 'close' || i_cmd =='False'){
        logger.info('Close Gripper');

    }else{
        logger.error('Fault Command = ' + i_cmd);
    }
    
}

humix.on('connection', function(humixSensorModule){
    hsm = humixSensorModule;

    logger = hsm.getLogger();

    hsm.on("gripper_cmd", function (data) {
        // logger.info('received gripper_cmd data:'+data);

        gripper_cmd(data);
    })


});