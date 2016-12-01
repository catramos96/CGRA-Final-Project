var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	//inicializar texturas
	this.enableTextures(true);

	this.initCameras();

	this.initLights();

	this.lastTime = -1;

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.wall = new MyQuad(this);
	this.floor = new MyQuad(this);	//mudar a inicializacao
	this.clock = new MyClock(this,3,30,45);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS,0,1,0,1);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS,0,1,0,1);
	this.drone = new MyDrone(this);
	this.drone.rotation = Math.PI + Math.PI/6;
	this.semysphere = new MySemiSphere(this,50,50);
	this.cylinder = new MyFullCylinder(this,3,1);
	this.semysphere = new MySemiSphere(this,100,100);
	this.circle = new MyCircle(this,5);
	this.charge = new MyCharge(this);
	this.target = new MyTarget(this);

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	//objetos
	//tableAppearance
	this.tableAppearance = new CGFappearance(this);
	this.tableAppearance.setAmbient(0.3,0.3,0.3,1);
	this.tableAppearance.setDiffuse(0.8 ,0.8 ,0.8 ,1); //forte componente difusa
	this.tableAppearance.setSpecular(0.2,0.2,0.2,1); // pouca componente especular
	this.tableAppearance.setShininess(50);
	this.tableAppearance.loadTexture("../resources/images/table.png");
	
	//floor
	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(0.3,0.3,0.3,1);
	this.floorAppearance.setDiffuse(0.8 ,0.8 ,0.8 ,1); //forte componente difusa
	this.floorAppearance.setSpecular(0.2,0.2,0.2,1); // pouca componente especular
	this.floorAppearance.setShininess(50);
	this.floorAppearance.loadTexture("../resources/images/relva.png");
	this.floorAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");
	
	//window
	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setAmbient(0.3,0.3,0.3,1);
	this.windowAppearance.setDiffuse(0.8 ,0.8 ,0.8 ,1); //forte componente difusa
	this.windowAppearance.setSpecular(0.2,0.2,0.2,1); // pouca componente especular
	this.windowAppearance.setShininess(50);
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");
	
	//plano de fundo
	this.wallpapperAppearance = new CGFappearance(this);
	this.wallpapperAppearance.setAmbient(0.3,0.3,0.3,1);
	this.wallpapperAppearance.setDiffuse(0.8 ,0.8 ,0.8 ,1); //forte componente difusa
	this.wallpapperAppearance.setSpecular(0.2,0.2,0.2,1); // pouca componente especular
	this.wallpapperAppearance.setShininess(50);
	this.wallpapperAppearance.loadTexture("../resources/images/fundo.png");
	//this.wallpapperAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");

	//foto de grupo
	this.photoAppearance = new CGFappearance(this);
	this.photoAppearance.setAmbient(0.3,0.3,0.3,1);
	this.photoAppearance.setDiffuse(0.8 ,0.8 ,0.8 ,1); //forte componente difusa
	this.photoAppearance.setSpecular(0.2,0.2,0.2,1); // pouca componente especular
	this.photoAppearance.setShininess(50);
	this.photoAppearance.loadTexture("../resources/images/angryBirds.png");
	this.photoAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");

	//slides
	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setAmbient(0.3,0.3,0.3,1);
	this.slidesAppearance.setDiffuse(0.8 ,0.8 ,0.8 ,1); //forte componente difusa
	this.slidesAppearance.setSpecular(0.2,0.2,0.2,1); // pouca componente especular
	this.slidesAppearance.setShininess(20);
	this.slidesAppearance.loadTexture("../resources/images/slides.png");

	//board
	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
	this.boardAppearance.setDiffuse(0.4 ,0.4 ,0.4 ,1); //forte componente difusa
	this.boardAppearance.setSpecular(0.6,0.6,0.6,1); // pouca componente especular
	this.boardAppearance.setShininess(150);
	this.boardAppearance.loadTexture("../resources/images/board.png");	

	//clock
	this.clockAppearance = new CGFappearance(this);
	this.clockAppearance.setAmbient(0.3,0.3,0.3,1);
	this.clockAppearance.setDiffuse(0.4 ,0.4 ,0.4 ,1); //forte componente difusa
	this.clockAppearance.setSpecular(0.6,0.6,0.6,1); // pouca componente especular
	this.clockAppearance.setShininess(150);
	this.clockAppearance.loadTexture("../resources/images/clock.png");	

	//base
	this.baseAppearance = new CGFappearance(this);
	this.baseAppearance.setShininess(150);
	this.baseAppearance.loadTexture("../resources/images/base.png");

	//alvo
	this.pigTargetAppearance = new CGFappearance(this);
	this.pigTargetAppearance.setShininess(150);
	this.pigTargetAppearance.loadTexture("../resources/images/pigTarget.png");

	//drone
	this.redBirdAppearance = new CGFappearance(this);
	this.redBirdAppearance.setShininess(150);
	this.redBirdAppearance.loadTexture("../resources/images/totalRedBird.png");

	this.greenBirdAppearance = new CGFappearance(this);
	this.greenBirdAppearance.loadTexture("../resources/images/totalGreenBird.png");

	this.yellowBirdAppearance = new CGFappearance(this);
	this.yellowBirdAppearance.setShininess(150);
	this.yellowBirdAppearance.loadTexture("../resources/images/totalYellowBird.png");
	
	this.blueBirdAppearance = new CGFappearance(this);
	this.blueBirdAppearance.setShininess(150);
	this.blueBirdAppearance.loadTexture("../resources/images/totalBlueBird.png");
	
	this.blackBirdAppearance = new CGFappearance(this);
	this.blackBirdAppearance.setShininess(150);
	this.blackBirdAppearance.loadTexture("../resources/images/totalBlackBird.png");
	
	this.pinkBirdAppearance = new CGFappearance(this);
	this.pinkBirdAppearance.setShininess(150);
	this.pinkBirdAppearance.loadTexture("../resources/images/totalPinkBird.png");
	
	this.goldenBirdAppearance = new CGFappearance(this);
	this.goldenBirdAppearance.setShininess(150);
	this.goldenBirdAppearance.loadTexture("../resources/images/totalGoldenBird.png");
	
	this.whiteBirdAppearance = new CGFappearance(this);
	this.whiteBirdAppearance.setShininess(150);
	this.whiteBirdAppearance.loadTexture("../resources/images/totalWhiteBird.png");
	
	this.bigRedBirdAppearance = new CGFappearance(this);
	this.bigRedBirdAppearance.setShininess(150);
	this.bigRedBirdAppearance.loadTexture("../resources/images/totalTerrenceBird.png");
	
	this.eagleBirdAppearance = new CGFappearance(this);
	this.eagleBirdAppearance.setShininess(150);
	this.eagleBirdAppearance.loadTexture("../resources/images/eagleBird.png");
	
	//bomba olhos
	this.bombEyesAppearance = new CGFappearance(this);
	this.bombEyesAppearance.setShininess(150);
	this.bombEyesAppearance.loadTexture("../resources/images/bomb1.png");

	//vermelho
	this.redAppearance = new CGFappearance(this);
	this.redAppearance.setShininess(150);
	this.redAppearance.loadTexture("../resources/images/red.png");

	//azul
	this.blueAppearance = new CGFappearance(this);
	this.blueAppearance.setShininess(150);
	this.blueAppearance.loadTexture("../resources/images/blue.png");

	//amarelo
	this.yellowAppearance = new CGFappearance(this);
	this.yellowAppearance.setShininess(150);
	this.yellowAppearance.loadTexture("../resources/images/yellow.png");

	//preto
	this.blackAppearance = new CGFappearance(this);
	this.blackAppearance.setShininess(150);
	this.blackAppearance.loadTexture("../resources/images/black.png");

	this.droneAppearances = [this.redBirdAppearance, this.greenBirdAppearance, this.yellowBirdAppearance,this.blueBirdAppearance,this.blackBirdAppearance,
							this.pinkBirdAppearance, this.goldenBirdAppearance, this.whiteBirdAppearance, this.bigRedBirdAppearance, this.eagleBirdAppearance];
	this.droneAppearance = 0;

	this.droneSpeed = 1;

	//1.5
	this.setUpdatePeriod(50); //taxa de actualização de 1/100ms
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0,0,0, 1.0);
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 3, 1); //+ para 
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)

	this.lights[1].setPosition(10.5, 6, 3, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(10.5, 6, 10, 1.0);
	this.lights[2].setVisible(true); // show marker on light position (different from enabled)

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();

	this.lights[3].setPosition(3, 6, 10, 1);
	this.lights[3].setVisible(true);
	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0, 1.0, 0, 1.0);

	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(1);
	this.lights[3].enable();

	this.lights[4].setPosition(10.5,6,10,1);
	this.lights[4].setVisible(true);
	this.lights[4].setAmbient(0, 0, 0, 1);
	this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[4].setSpecular(1.0, 1.0, 0, 1.0);
	this.lights[4].enable();

	this.light0 = true;
	this.light1 = true;
	this.light2 = true;
	this.light3 = true;
	this.light4 = true;

};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++){
		this.lights[i].update();
		if(i == 0)
			b = this.light0;
		else if(i == 1)
			b = this.light1;
		else if(i == 2)
			b = this.light2;
		else if(i == 3)
			b = this.light3;
		else if( i == 4)
			b = this.light4;
		if(b)
			this.lights[i].enable();
		else
			this.lights[i].disable();
	}
	
}

LightingScene.prototype.rotDrone = function (rot){ 
	this.drone.addRotation(rot);
};

LightingScene.prototype.incDrone = function (inc){ 
	this.drone.addInclination(inc);
};

LightingScene.prototype.translDrone = function (x,y,z){ 
	this.drone.addPosition(x,y,z);
	if(this.charge.getIsMoving())
		this.charge.addPosition(x,y,z);
};

LightingScene.prototype.translHook = function (length){ 
	this.drone.moveHook(length);
	if(this.charge.getIsMoving())
		this.charge.addPosition(0,-length,0);
};

LightingScene.prototype.droneTouchingCharge = function (){ 

	var hookPos = this.drone.getHookPosition();
	var chargePos = this.charge.getChargePosition();

	//para o drone estar suficientemente perto da carga, os seus zz e xx devem estar a menos de 0.5 u.c. e o y a menos de 0.1 u.c.
	xx = Math.abs(hookPos[0] - chargePos[0]);
	yy = Math.abs(hookPos[1] - chargePos[1]);
	zz = Math.abs(hookPos[2] - chargePos[2]);

	if(xx <= 0.5 && yy <= 0.1 && zz <= 0.5){
		this.charge.setIsMoving(true);
		this.charge.setRotation(this.drone.rotation);
	}
};

LightingScene.prototype.droneTouchingTarget = function (){ 
	var hookPos = this.drone.getHookPosition();
	var targetPos = this.target.getTargetPosition();

	//para o drone estar suficientemente perto da carga, os seus zz e xx devem estar a menos de 0.5 u.c. e o y a menos de 0.1 u.c.
	xx = Math.abs(hookPos[0] - targetPos[0]);
	yy = Math.abs(hookPos[1] - targetPos[1]);
	zz = Math.abs(hookPos[2] - targetPos[2]);

	if(xx <= 1 && yy <= 1.5 + 0.1 && zz <= 1)
		this.charge.setIsMoving(false);
};

LightingScene.prototype.update = function(currTime) {
	var deltaTime;

	if(this.lastTime == -1)
	{
		this.lastTime = currTime;
		return;
	}

	deltaTime = currTime - this.lastTime;
	this.lastTime = currTime;
	this.clock.update(deltaTime);	
	
	this.drone.setCurrDroneAppearance(this.droneAppearance);	//escolher a aparencia do drone
	this.drone.setSpeed(this.droneSpeed);	//escolher a velocidade do drone

	this.drone.update(deltaTime);
	this.incDrone(0);
	this.drone.setState("Static");
}

LightingScene.prototype.clockAnimation = function (){
	b = this.clock.getPaused();
	this.clock.setPaused(!b);
};

LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section


	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearance.apply();	//colocar o chao
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.wallpapperAppearance.apply();
		this.wall.display();
	this.popMatrix();

	// Wall Right
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.wallpapperAppearance.apply();
		this.wall.display();
	this.popMatrix();
/*
	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.materialDefault.apply();
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();*/
/*
	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.materialA.apply();
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();
*/
	// Board
	this.pushMatrix();
		this.translate(7.2, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.photoAppearance.apply();
		this.boardB.display();
	this.popMatrix();

	//clock
	this.pushMatrix();
		this.translate(7.2,7.2,0.1);
		this.scale(0.5, 0.5, 0.2);
		this.clock.display();
	this.popMatrix();

	//drone
	this.pushMatrix();
		this.translate(this.drone.x,this.drone.y,this.drone.z);
		this.scale(2, 2, 2);
		this.rotate(this.drone.rotation,0,1,0);
		this.drone.display();
	this.popMatrix();

	this.droneTouchingCharge();	//verificamos se o drone está a tocar na carga
	this.droneTouchingTarget();

	//carga do drone
	this.pushMatrix();
		this.translate(this.charge.x, this.charge.y, this.charge.z)
		this.materialA.apply();
		if(this.charge.getIsMoving()){
			this.rotate(this.drone.rotation-this.charge.rotation,0,1,0); //o objeto mantém a sua posição original
		}
		this.charge.display();
	this.popMatrix();

	//alvo do drone
	this.pushMatrix();
		this.materialA.apply();
		this.translate(this.target.x,this.target.y-1,this.target.z);
		this.target.display();
	this.popMatrix();

	// ---- END Primitive drawing section
};
