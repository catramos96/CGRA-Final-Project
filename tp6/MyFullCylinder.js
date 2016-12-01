/**
 * MyClock
 * cilindro com tampos
 * @constructor
 */
 function MyFullCylinder(scene,slices,stacks) {
 	CGFobject.call(this,scene);
 	this.slices = slices || 12;
 	this.stacks = stacks || 1;
    this.circle = new MyCircle(scene, this.slices);
	this.cylinder = new MyCylinder(scene,this.slices,this.stacks);

 	this.initBuffers();
 };

 MyFullCylinder.prototype = Object.create(CGFobject.prototype);
 MyFullCylinder.prototype.constructor = MyClock;

MyFullCylinder.prototype.display = function() {
    this.scene.pushMatrix();
		this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	    this.scene.translate(0,-0.5,0);
	    this.scene.rotate(Math.PI/2,1,0,0);
		this.circle.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	    this.scene.translate(0,0.5,0);
	    this.scene.rotate(-Math.PI/2,1,0,0);
		this.circle.display();
	this.scene.popMatrix();
 };