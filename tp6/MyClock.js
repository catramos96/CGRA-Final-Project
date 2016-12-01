/**
 * MyClock
 * Constroi um relogio com animacao
 * @constructor
 */
 function MyClock(scene,hour,min,sec) {
 	CGFobject.call(this,scene);

	var ang = 360/60; //graus

	this.Hour = hour || 0;
	this.Min = min || 0;
	this.Sec = sec || 0;

	var totalTime = this.Hour*60*60 + this.Min * 60 + this.Sec;
	
    this.circle = new MyCircle(scene, 12);
	this.cylinder = new MyCylinder(scene,12,1);
	this.handHour = new MyClockHand(scene,0.8);
	this.handMin = new MyClockHand(scene, 1.2);
	this.handSec = new MyClockHand(scene,1.8);
	
	this.handHour.setAngle(5*ang*totalTime/60/60);
	this.handMin.setAngle(ang*totalTime/60);
	this.handSec.setAngle(ang*totalTime);

 	this.initBuffers();

 	this.paused = false;

 	this.time = totalTime*1000;
 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;

 MyClock.prototype.setPaused = function(b) {
 	this.paused = b;
 }

  MyClock.prototype.getPaused = function() {
 	return this.paused;
 }

 MyClock.prototype.update = function(currTime)
 {
 	if(!this.paused){
 		this.time = this.time + currTime;
 		this.Hour = this.time/60/60/1000;
 		this.Min = this.time/60/1000;
 		this.Sec = this.time/1000;

 		var ang =360/60; //angulo de um segundo
 		//segundos
 		this.handSec.setAngle(ang*this.Sec);
		//minutos
		this.handMin.setAngle(ang*this.Min);
		//horas
		this.handHour.setAngle(5*ang*this.Hour);//5*ang = 1h
 	}
 }

 MyClock.prototype.display = function() {

 	this.scene.pushMatrix();
 		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.materialDefault.apply();
		this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.scene.clockAppearance.apply();
		this.circle.display();
	this.scene.popMatrix();

	//Ponteiros
	this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.handHour.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.handMin.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.handSec.display();
	this.scene.popMatrix();


 };