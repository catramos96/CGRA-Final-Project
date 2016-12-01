/**
 * MyDrone
 * Objeto do tipo Drone
 * @constructor
 */
 function MyDrone(scene) {
 	CGFobject.call(this,scene);
 	//posicao inicial
    this.x = 7.5;
    this.y = 5;
    this.z = 7.5;
    //rotacao inicial
    this.rotation = 0;
    //primeiro estado
    this.state = "Static";
    //comprimento do cabo
    this.cableLength = 1;
 	this.initBuffers();
 	
 	this.fullCylinder = new MyFullCylinder(scene,20,20);
	this.semiSphere = new MySemiSphere(scene,25,20);
	this.circle = new MyCircle(scene,20,20);
	this.base = new MyUnitCubeQuad(scene);
	this.curve = new MyBezier(scene, 10);
	this.hook = new MyCable(scene, this.cableLength);

	//helices rotation
	this.rotHL = 0;
	this.rotHR = 0;
	this.rotHF = 0;
	this.rotHB = 0;

	//drone inclination
	this.inclination = 0;
	this.speed = 1;

	//textures
	this.currDroneAppearance = 0;

 };

 MyDrone.prototype = Object.create(CGFobject.prototype);
 MyDrone.prototype.constructor = MyDrone;

 MyDrone.prototype.setCurrDroneAppearance = function(appearance){
 	this.currDroneAppearance = appearance;
 }

 MyDrone.prototype.addPosition = function(x,y,z) {
   this.x = this.x + x;
   this.y = this.y + y;
   this.z = this.z + z;
 };

 MyDrone.prototype.addRotation = function(rot){
   this.rotation = this.rotation + rot;
 }

  MyDrone.prototype.setState = function(st){
   this.state =st;
 }

 MyDrone.prototype.setSpeed = function(sp){
 	this.speed = sp;
 }

 MyDrone.prototype.addInclination = function(inc){

 	if(inc == 0){
 		if(this.state == 'Static'){
 			if(this.inclination > 0){
				this.inclination-=Math.PI/100;
				this.scene.translDrone(-Math.sin(this.scene.drone.rotation)*0.05/2,0,-Math.cos(this.scene.drone.rotation)*0.05/2);
 			}
 			else if(this.inclination < 0){
 				this.inclination += Math.PI/100;
 				this.scene.translDrone(Math.sin(this.scene.drone.rotation)*0.05/2,0,Math.cos(this.scene.drone.rotation)*0.05/2);
 			}
 		}
 	}
 	else if(!(this.inclination + inc > Math.PI/10 || this.inclination + inc < -Math.PI/10))
 	this.inclination += inc;
 }

 MyDrone.prototype.moveHook = function(length){
	this.cableLength += length;
	if(this.cableLength <= 0)
		this.cableLength -= length;
	if(length < 0) //o cabo esta a subir
		rot = 0.1;
	else
		rot = -0.1;
	this.hook.update(this.cableLength, rot);
 };

 MyDrone.prototype.getHookPosition = function() {
 	var pos = new Array(this.x, this.y-this.cableLength-0.5, this.z); //posicao do drone menos o tamanho do cabo e dos ganchos
 	return pos;
 }

 MyDrone.prototype.update = function(deltaTime){ //ms
	var SLOW_ROT_VEL = 0.2
	var NORMAL_ROT_VEL = 1;
	var FAST_ROT_VEL = 10;
 		
 		var ang =2 * Math.PI * deltaTime/1000 *this.speed;	//1 rot/s
		
		if(this.state == "Static" || this.state == "Up" ||this.state == "Down")
		{
			this.rotHL += ang;
 			this.rotHR += ang;
 			this.rotHF += ang;
 			this.rotHB += ang;
		}
		else if(this.state == "Forward"){
			this.rotHL += ang;
 			this.rotHR += ang;
 			this.rotHF += ang * SLOW_ROT_VEL;
 			this.rotHB += ang;
		}
		else if(this.state == "Backward"){
			this.rotHL += ang;
 			this.rotHR += ang; 
 			this.rotHF += ang; 
 			this.rotHB += ang * SLOW_ROT_VEL; 
		}
		else if(this.state == "RotRight" || this.state == "RotLeft"){
			this.rotHL += ang * FAST_ROT_VEL;
 			this.rotHR += ang * FAST_ROT_VEL;
 			this.rotHF += ang * SLOW_ROT_VEL; 
 			this.rotHB += ang * SLOW_ROT_VEL;
		}
 		

 }

  MyDrone.prototype.display = function() {

  	this.scene.pushMatrix();
  		this.scene.rotate(this.inclination,1,0,0);

		//CILINDROS X - alinea 1a
  		this.scene.pushMatrix();
	     	this.scene.scale(0.05,0.05,2);
	     	this.scene.rotate(Math.PI,0,1,1);
	     	this.scene.yellowAppearance.apply();
			this.fullCylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
	   		this.scene.scale(2,0.05,0.05);
	   		this.scene.rotate(Math.PI,1,1,0);
	   		this.scene.yellowAppearance.apply();
			this.fullCylinder.display();
		this.scene.popMatrix();

		//CILINDROS HELICES - alinea 1b
		this.scene.pushMatrix();
	   		this.scene.translate(1,0,0);
	  		this.scene.scale(0.1,0.1,0.1);
	  		this.scene.yellowAppearance.apply();
			this.fullCylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
	   		this.scene.translate(-1,0,0);
	  		this.scene.scale(0.1,0.1,0.1);
	  		this.scene.yellowAppearance.apply();
			this.fullCylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
	   		this.scene.translate(0,0,1);
	  		this.scene.scale(0.1,0.1,0.1);
	  		this.scene.yellowAppearance.apply();
			this.fullCylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
	    	this.scene.translate(0,0,-1);
			this.scene.scale(0.1,0.1,0.1);
			this.scene.yellowAppearance.apply();
			this.fullCylinder.display();
		this.scene.popMatrix();

		//SEMI-ESFERA - alinea 1c
		this.scene.pushMatrix();
			this.scene.translate(0,0.1,0);
			this.scene.scale(0.50,0.3,0.50);
			this.scene.droneAppearances[this.currDroneAppearance].apply();
			this.semiSphere.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0,-0.045,0);
			this.scene.rotate(Math.PI/2,1,0,0);
			this.scene.scale(0.5,0.5,0.3);
			this.circle.display();
		this.scene.popMatrix();

		//SEMI-ESFERA HELICES - alinea 3
		this.scene.pushMatrix();
			this.scene.translate(-1,0.085,0);
			this.scene.scale(0.1,0.05,0.1);
			this.semiSphere.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1,0.085,0);
			this.scene.scale(0.1,0.05,0.1);
			this.semiSphere.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0,0.085,1);
			this.scene.scale(0.1,0.05,0.1);
			this.semiSphere.display();
		this.scene.popMatrix();
	
		this.scene.pushMatrix();
			this.scene.translate(0,0.085,-1);
			this.scene.scale(0.1,0.05,0.1);
			this.semiSphere.display();
		this.scene.popMatrix();

		//HELICES - alinea 3
		this.scene.pushMatrix();
	   		this.scene.translate(1,0.055,0);
	   		this.scene.rotate(- this.rotHL,0,1,0);
	    	this.scene.scale(0.35,0.01,0.05);
			this.fullCylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
	   		this.scene.translate(-1,0.055,0);
	   		this.scene.rotate(-this.rotHR,0,1,0);
	    	this.scene.scale(0.35,0.01,0.05);
			this.fullCylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
	   		this.scene.translate(0,0.055,1);
	    	this.scene.rotate(this.rotHF,0,1,0);
	 	 	this.scene.scale(0.35,0.01,0.05);
			this.fullCylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
	   		this.scene.translate(0,0.055,-1);
	   		this.scene.rotate(this.rotHB,0,1,0);
	  		this.scene.scale(0.35,0.01,0.05);
			this.fullCylinder.display();
		this.scene.popMatrix();

		// legs
		//barra 1
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2,0,1,0);
 			this.scene.translate(0,-0.5,-0.5);
 			this.scene.rotate(Math.PI/2,0,0,1);
 			this.scene.scale(0.05, 1, 0.05);
 			this.scene.blackAppearance.apply();
 			this.base.display();
 		this.scene.popMatrix();

		//barra 2
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2,0,1,0);
 			this.scene.translate(0,-0.5,0.5);
 			this.scene.rotate(Math.PI/2,0,0,1);
 			this.scene.scale(0.05, 1, 0.05);
 			this.base.display();
 		this.scene.popMatrix();

 		//superficie de bézier
		//curva1
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2,0,1,0);
			this.scene.translate(0.25,-0.25,0);
			this.scene.rotate(Math.PI,0,1,0);
			this.scene.scale(0.1, 0.5, 1);
			this.curve.display();
		this.scene.popMatrix();

		//curva2
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2,0,1,0);
			this.scene.translate(-0.25,-0.25,0);
			this.scene.rotate(Math.PI,0,1,0);
			this.scene.scale(0.1, 0.5, 1);
			this.curve.display();
		this.scene.popMatrix();

		//curva3
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2,0,1,0);
			this.scene.translate(0.25,-0.25,0);
			this.scene.scale(0.1, 0.5, 1);
			this.curve.display();
		this.scene.popMatrix();

		 //curva4
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2,0,1,0);	
			this.scene.translate(-0.25,-0.25,0);
			this.scene.scale(0.1, 0.5, 1);
			this.curve.display();
		this.scene.popMatrix();
	this.scene.popMatrix();

	//cabo e gancho -> nao sofrem da inclinacao do drone
	this.scene.pushMatrix();
		this.scene.translate(0,-this.cableLength/4,0);
 		this.scene.scale(0.5, 0.5, 0.5);
 		this.scene.yellowAppearance.apply();
 		this.hook.display();
 	this.scene.popMatrix();

  };