
/** 
	curva y = ax^2 , neste caso, y = 0.5 - z^2
 */
function MyBezier(scene, nrDivs) {
	CGFobject.call(this,scene);

	// nrDivs = 1 if not provided
	nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;

	this.nrDivs = nrDivs;
	this.patchLength = 1.0 / nrDivs;
	this.minS = 0;
    this.maxS = 1;
    this.minT = 0;
    this.maxT = 1;
	this.kS = (this.maxS - this.minS)/ nrDivs;
	this.kT = (this.maxT - this.minT)/ nrDivs;
	
	this.initBuffers();
};

MyBezier.prototype = Object.create(CGFobject.prototype);
MyBezier.prototype.constructor = MyBezier;

MyBezier.prototype.initBuffers = function() {

	// vertices, normals e textCoords
	this.vertices = [];
	this.normals = [];	
	this.texCoords = [];
	
	var yCoord = 0.5; //curva começa em y = 0.5
	var zCoord = 0;

	for (var j = 0; j <= this.nrDivs; j++) 
	{
		var xCoord = -0.5;
		for (var i = 0; i <= this.nrDivs; i++) 
		{
			this.vertices.push(xCoord, yCoord, zCoord);
			
			this.normals.push(0,0.5-(zCoord*zCoord),zCoord); // y = 0.5-z2

			this.texCoords.push(this.minS+this.kS*i, this.minT+this.kT*j);
			
			xCoord += this.patchLength;
		}
		yCoord -= this.patchLength;
		zCoord = Math.sqrt(0.5-yCoord)/2; //atualiza zCoord
		// y = 0.5 - z^2
	}
	
	//indices iguais a um plano
	this.indices = [];
	var ind=0;

	for (var j = 0; j < this.nrDivs; j++) 
	{
		for (var i = 0; i <= this.nrDivs; i++) 
		{
			this.indices.push(ind);
			this.indices.push(ind+this.nrDivs+1);

			ind++;
		}
		if (j+1 < this.nrDivs)
		{
			this.indices.push(ind+this.nrDivs);
			this.indices.push(ind);
		}
	}
	
	this.primitiveType = this.scene.gl.TRIANGLE_STRIP;

	this.initGLBuffers();
};

