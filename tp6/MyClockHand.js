/**
 * MyClockHand
 * ponteiros do relogio
 * @constructor
 */
 function MyClockHand(scene, tamanho) {
 	CGFobject.call(this,scene);

	this.tamanho = tamanho;    //multiplicador para fazer scale
	this.cylinder = new MyFullCylinder(scene,12,1);
	this.angle = 0;

 	this.initBuffers();
 };

 MyClockHand.prototype = Object.create(CGFobject.prototype);
 MyClockHand.prototype.constructor = MyClockHand;

 MyClockHand.prototype.setAngle = function(angle) {

 	this.angle = angle*Math.PI/180;
 }

 MyClockHand.prototype.display = function() {
	this.scene.pushMatrix();
		this.scene.rotate(-this.angle,0,0,1); 
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.translate(0,0,0.45*this.tamanho/2);
		this.scene.scale(0.01,0.01, 0.45*this.tamanho); 
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.blackAppearance.apply();
		this.cylinder.display();
	this.scene.popMatrix();

 };