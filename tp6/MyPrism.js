/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {

 	this.vertices = [];

 	this.indices = [];

 	this.normals = [];

 	this.textCoords = [];

	alfa = 2*Math.PI/this.slices;
	beta = alfa/2;
	for(k = 0; k < this.stacks; k++){ //stacks

 		for(var i = 0; i < this.slices;i++){

			num = i+k*this.slices;
 			//cada face é constituida por 2 triangulos
 			this.indices.push(0+4*num,1+4*num,3+4*num);
			this.indices.push(3+4*num,2+4*num,0+4*num);

			//por cada alfa são criados 2 vértices e 2 normais, e cada for cria 4
 			for(var j = i; j < i+2; j++){
 				this.vertices.push(Math.cos(alfa*j), Math.sin(alfa*j), 0.5-k/this.stacks); //p0
 				this.vertices.push(Math.cos(alfa*j), Math.sin(alfa*j), 0.5-k/this.stacks-1/this.stacks); //p1

 				
 				this.normals.push(Math.cos(alfa*i+beta), Math.sin(alfa*i+beta), 0); 
 				this.normals.push(Math.cos(alfa*i+beta), Math.sin(alfa*i+beta), 0); 
 			}
 		}
	}

 	console.log(this.indices.length);
 	console.log(this.normals.length);
 	console.log(this.vertices.length);

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };