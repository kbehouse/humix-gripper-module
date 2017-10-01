//--------------------------------GPIO--------------------------------//
var GripperPIN = 7;

var gpio = require('rpi-gpio');
function gripper_open(){
    gpio.write(GripperPIN, true , function(err) {
		if (err) {
            //throw err;
            console.warn('Written to pin '+GripperPIN  +'  cmd = true' + gripper +' FAIL err='+err);
        }
		//process.exit();
	});
    
}

function gripper_close(){
    gpio.write(GripperPIN, false , function(err) {
		if (err) {
            //throw err;
            console.warn('Written to pin '+GripperPIN  +'  cmd = false  FAIL err='+err);
        }
		//process.exit();
	});
    
}

//--------------------------------Humix--------------------------------//
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
        gpio.setup(GripperPIN, gpio.DIR_OUT, gripper_open);

    }else if(i_cmd == 'close' || i_cmd =='False'){
        logger.info('Close Gripper');

        gpio.setup(GripperPIN, gpio.DIR_OUT, gripper_close);


    }else{
        logger.error('Fault Command = ' + i_cmd);
    }
    
}

humix.on('connection', function(humixSensorModule){
    hsm = humixSensorModule;

    logger = hsm.getLogger();

    hsm.on("gripper_cmd", function (data) {

        gripper_cmd(data);
    })


    logger.info('humix-gripper-module READY!');



});