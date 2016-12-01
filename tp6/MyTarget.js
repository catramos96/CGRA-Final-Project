/**
 * MyTarget
 * Objeto alvo da carga transportada pelo drone
 * @constructor
 */
 function MyTarget(scene) {
 	CGFobject.call(this,scene);   
 	this.initBuffers();
	//posicao inicial
 	this.x = 13;
 	this.y = 1;
 	this.z = 6;

 	this.target = new MyCircle(scene,20);
 	this.base = new MyCylinder(scene, 20,20);
 };

 MyTarget.prototype = Object.create(CGFobject.prototype);
 MyTarget.prototype.constructor = MyTarget;

 MyTarget.prototype.getTargetPosition = function() {
 	var pos = new Array(this.x, this.y, this.z); //tamanho da base
 	return pos;
 }

 MyTarget.prototype.display = function() {
	//topo
	this.scene.pushMatrix();
	   this.scene.translate(0,1,0);
	   this.scene.rotate(-Math.PI/2, 1,0,0);
	   this.scene.pigTargetAppearance.apply();
 	   this.target.display();
 	this.scene.popMatrix();
 		
 	//base
 	this.scene.pushMatrix();
 	   this.scene.translate(0,0.5,0);
	   this.scene.baseAppearance.apply();
 	   this.base.display();
 	this.scene.popMatrix();
 	
 };