/**
 * MyCylinder
 * Objeto do tipo cilindro (sem tampos)
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	this.slices = slices;
	this.stacks = stacks;
 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
 	
 	this.vertices = [];

 	this.indices = [];

 	this.normals = [];

 	this.texCoords = [];

 	alfa = 2*Math.PI/this.slices;
 	var deltaT = 1/this.stacks;
 	var deltaS = 1/this.slices;

	for(i = 0; i < this.slices+1;i++){

 		for(k = 0; k < this.stacks+1; k++){ 
		
 		this.vertices.push(Math.cos(alfa*i), 0.5-k/this.stacks,Math.sin(alfa*i));
 		this.normals.push(Math.cos(alfa*i), 0,Math.sin(alfa*i));
		this.texCoords.push(i*deltaS,k*deltaT); 

		//ver indices
 		if(i != 0 && k != 0){
 			this.indices.push( i*(this.stacks+1) + k, (i-1)*(this.stacks+1) + k,(i-1)*(this.stacks+1) + k-1);
 			this.indices.push((i-1)*(this.stacks+1) + (k-1),i*(this.stacks+1) + (k-1),i*(this.stacks+1) + k);
 		}	 	
 	}

	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };