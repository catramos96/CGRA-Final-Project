/**
 * MyCharge
 * Classe que cria o objeto "carga", que neste caso se trata de uma versão da bomba do super mário
 * @constructor
 */
 function MyCharge(scene) {
 	CGFobject.call(this,scene);   
 	this.initBuffers();
 	//posicao inicial da bomba
 	this.x = 2;
 	this.y = 0.5;
 	this.z = 6;
 	//boleano que indica se a carga está em movimento com o drone
 	this.isMoving = false;
 	//rotacao inicial do drone, quando apanha a carga -> serve para a rotacao da carga ser igual à do drone sem haver nenhuma rotacao inicial
 	this.rotation = 0;

 	this.bomb = new MySemiSphere(scene,20,20);
 	this.rope = new MyBezier(scene,10);
 	this.cilBase = new MyFullCylinder(scene,20,20);
 };

 MyCharge.prototype = Object.create(CGFobject.prototype);
 MyCharge.prototype.constructor = MyCharge;

 MyCharge.prototype.setRotation = function(rot){
    this.rotation = rot;
 }

 MyCharge.prototype.setIsMoving = function(res){
    this.isMoving = res;
 }

 MyCharge.prototype.getIsMoving = function(){
    return this.isMoving;
 }

 MyCharge.prototype.getChargePosition = function() {
 	var pos = new Array(this.x, this.y+1, this.z); 
 	return pos;
 }

 MyCharge.prototype.addPosition = function(x,y,z) {
 	this.x += x;
 	this.y += y;
 	this.z += z;
 }

 MyCharge.prototype.display = function() {

  //semi esfera de cima
  this.scene.pushMatrix();
    this.scene.scale(0.7,0.7,0.7);
    this.scene.translate(0,1,0);
    this.scene.bombEyesAppearance.apply();
 	this.bomb.display();
  this.scene.popMatrix();

  //semi esfera de baixo
  this.scene.pushMatrix();
    this.scene.scale(0.7,0.7,0.7);
    this.scene.rotate(Math.PI,0,0,1);
    this.scene.blackAppearance.apply();
 	this.bomb.display();
  this.scene.popMatrix();
 	
 //rastilho
 this.scene.pushMatrix();
    this.scene.translate(0,1.2,-0.2);
    this.scene.scale(0.1,0.5,1);
    this.scene.rotate(Math.PI,0,0,1);
    this.scene.blackAppearance.apply();
 	this.rope.display();
  this.scene.popMatrix();

//cabeça (base do cilindro)
 this.scene.pushMatrix();
    this.scene.translate(0,1,0);
    this.scene.scale(0.3,0.2,0.3);
    if(this.isMoving)
      this.scene.redAppearance.apply();
    else
      this.scene.blueAppearance.apply();
 	this.cilBase.display();
  this.scene.popMatrix();

//pé direito
  this.scene.pushMatrix();
    this.scene.translate(-0.3,-0.4,0.2);
    this.scene.scale(0.3,0.2,0.5);
    this.scene.yellowAppearance.apply();
    this.cilBase.display();
  this.scene.popMatrix();

//pé esquerdo
  this.scene.pushMatrix();
    this.scene.translate(0.3,-0.4,0.2);
    this.scene.scale(0.3,0.2,0.5);
    this.cilBase.display();
  this.scene.popMatrix();

  //roldana de cima
  this.scene.pushMatrix();
    this.scene.translate(0,0.7,-0.9);
    this.scene.scale(0.2,0.3,0.3);
      this.scene.rotate(Math.PI/2,0,0,1);
      this.cilBase.display();
    this.scene.popMatrix();

  //roldana de baixo
  this.scene.pushMatrix();
    this.scene.translate(0,0.2,-0.9);
    this.scene.scale(0.2,0.3,0.3);
    this.scene.rotate(Math.PI/2,0,0,1);
    this.cilBase.display();
  this.scene.popMatrix();
 };