/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();
	
	var group = this.gui.addFolder("Lights");
	group.open();
	for(i = 0; i < 5; i++)
		group.add(this.scene, 'light'+i);
		
	this.gui.add(this.scene, 'clockAnimation');


	droneAppearanceList =  {Red: 0, Hal: 1, Chuck: 2, Blue: 3, 
Bomb: 4, Stella: 5, Bubbles: 6, Matilda: 7, Terrence: 8, MightyEagle: 9}; 

	this.gui.add(this.scene, 'droneAppearance',droneAppearanceList);

	this.gui.add(this.scene, 'droneSpeed', 0.1, 2);

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		//Rotation

		//Left - A/a
		case 65: case 97:
		{
			this.scene.drone.setState("RotLeft");
			this.scene.rotDrone(Math.PI/24);
			break;
		}
		//Right - D/d
		case 68: case 100:
		{
			this.scene.drone.setState("RotRight");
			this.scene.rotDrone(-Math.PI/24);
			break;
		}

		//Translation

		//Froward - W/w
		case 87: case 119:
		{
			this.scene.drone.setState("Forward");
			this.scene.translDrone(Math.sin(this.scene.drone.rotation)*0.1,0,Math.cos(this.scene.drone.rotation)*0.1);
			this.scene.incDrone(Math.PI/100);
			break;
		}
		//Backward - S/s
		case 83: case 115:
		{
			this.scene.drone.setState("Backward");
			this.scene.translDrone(-Math.sin(this.scene.drone.rotation)*0.1,0,-Math.cos(this.scene.drone.rotation)*0.1);
			this.scene.incDrone(-Math.PI/100);
			break;
		}
		//Up - I/i
		case 63: case 105:
		{
			this.scene.drone.setState("Up");
			this.scene.translDrone(0,0.1,0);
			break;
		}
		//Down - J/j
		case 74: case 106:
		{
			this.scene.drone.setState("Down");
			this.scene.translDrone(0,-0.1,0);
			break;
		}
		//Up hook - P/p
		case 80: case 112:
		{
			this.scene.translHook(-0.1);
			break;
		}
		//Down hook - L/l
		case 76: case 108:
		{
			this.scene.translHook(+0.1);
			break;
		}

	};
};
