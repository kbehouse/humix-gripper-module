## Overview

This is Humix Module for Gripper 

The gripper is controlled by Raspberry Pi(RPi)

Control the gripper with RPi GIPO 7   (setting in index.js -> GripperPIN)

# Get Started

## Download and install dependencies

* Install humix-ros-module
```
git clone git@github.com:kbehouse/humix-gripper-module.git
cd humix-gripper-module
npm install
```
## Start module

* Start Humix
```
# In MAC or PC, start humix-think
cd ~/humix/humix-think/
npm start

# In raspberry pi, start humix-sense
cd ~/humix/humix-sense
vim config.js    # Modify thinkURL & senseId
npm start

# In raspberry pi,start humix-gripper-module
cd ~/humix/humix-gripper-module
npm start
```

* Open Humix in MAC or PC
http://localhost:3000
