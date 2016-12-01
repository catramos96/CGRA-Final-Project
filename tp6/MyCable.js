/**
 * MyCable 
 * Classe que cria o objeto cabo+gancho do drone
 * @constructor
 */
 function MyCable(scene, comprimento) {
 	CGFobject.call(this,scene);
    
 	this.initBuffers();
    this.comprimento = comprimento;
    this.rot = 0;	//rotacao do gancho (abre e fecha)

	this.cable = new MyFullCylinder(scene,3,20);	//cabo
	this.base = new MyUnitCubeQuad(scene);	//base para segurar o gancho
	this.hook = new MyBezier(scene, 10);	//gancho
 };

 MyCable.prototype = Object.create(CGFobject.prototype);
 MyCable.prototype.constructor = MyCable;

 MyCable.prototype.update = function(newLength, rot) {
 	this.comprimento = newLength;
 	oldRot = this.rot;
 	if(!((oldRot <= 0 && rot < 0) || (oldRot >= 1.6 && rot > 0)))	// 0 <= rotacao <= 1.6
 		this.rot += rot;
 }

 MyCable.prototype.display = function() {

	//cabo
	this.scene.pushMatrix();
 		this.scene.scale(0.1, this.comprimento, 0.1);
 		this.cable.display();
 	this.scene.popMatrix();

	//gancho
	//base
	this.scene.pushMatrix();
 		this.scene.translate(0,-this.comprimento/2,0);
 		this.scene.scale(0.3, 0.07, 0.3);
 		this.base.display();
 	this.scene.popMatrix();

	//direito
 	this.scene.pushMatrix();
 		this.scene.translate(0,-this.comprimento/2,0);
 		this.scene.rotate(-this.rot,1,0,0);
 		this.scene.translate(0,-0.25,0);
 		this.scene.scale(0.3, 0.5, 0.3);
 		this.hook.display();
 	this.scene.popMatrix();

	//esquerdo
 	 this.scene.pushMatrix();
 	 	this.scene.translate(0,-this.comprimento/2,0);
 	 	this.scene.rotate(this.rot,1,0,0);
 	 	this.scene.translate(0,-0.25,0);
 		this.scene.scale(0.3, 0.5, 0.3);
 		this.scene.rotate(Math.PI,0,1,0);
 		this.hook.display();
 	this.scene.popMatrix();
 
 };