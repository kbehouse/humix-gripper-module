var gpio = require('rpi-gpio');
 
gpio.setup(7, gpio.DIR_OUT, write);

cmd = process.argv[2];

console.log('cmd = ' + cmd);


gripper = true;

gripper = (cmd == 'open') ? true:false;


function write() {
	gpio.write(7, gripper , function(err) {
		if (err) throw err;
		console.log('Written to pin 7 cmd =' + gripper);
		process.exit();
	});
}
