/*
物体即网格(mesh)，由geometry和material定义
//att1,2,3,4 are extra properties for descripbing object information,such as radius property for sphere object
*/
function TTSObject(id,pipetype,tx,ty,tz,sx,sy,sz,rx,ry,rz,c,att1,att2,att3,att4){
	this.id = id;
	this.type = pipetype;
	this.translation_x = tx;
	this.translation_y = ty;
	this.translation_z = tz;
	this.scale_x = sx;
	this.scale_y = sy;
	this.scale_z = sz;
	this.rotation_x = rx;
	this.rotation_y = ry;
	this.rotation_z = rz;
	this.color = c;
	this.att1 = att1;
	this.att2 = att2||0;
	this.att3 = att3||0;
	this.att4 = att4||0;
	this.mesh = null;	
}
TTSObject.prototype.removeFromScene = function()
{
	if(this.mesh !== null)
	scene.remove(this.mesh);
}
TTSObject.prototype.addToScene = function(t)
{	
	t = t||0;
	rx = eval(this.rotation_x);
	ry = eval(this.rotation_y);
	rz = eval(this.rotation_z);
	tx = eval(this.translation_x);
	ty = eval(this.translation_y);
	tz = eval(this.translation_z);
	sx = eval(this.scale_x);
	sy = eval(this.scale_y);
	sz = eval(this.scale_z);
	if(this.mesh === null)
	{
		//add to scene according to the object type
		if(this.type=='sphere')
		{			
			var sphere = new THREE.SphereGeometry(this.att1, 30, 30);
			var material = new THREE.MeshLambertMaterial({color: this.color, side: THREE.DoubleSide});
			var mesh = new THREE.Mesh(sphere, material);
			mesh.rotation.x = rx;
			mesh.rotation.y = ry;
			mesh.rotation.z = rz;
			mesh.position.x = tx; 
			mesh.position.y = ty;
			mesh.position.z = tz;
			mesh.scale.x = sx;
			mesh.scale.y = sy;
			mesh.scale.z = sz;
			mesh.objname ='sphere';	
			this.mesh = mesh;
			scene.add(this.mesh);
		}
		if(this.type=='box')
		{			
			var box = new THREE.BoxGeometry(this.att1,this.att2,this.att3);
			var material = new THREE.MeshLambertMaterial({color: this.color, side: THREE.DoubleSide});
			var mesh = new THREE.Mesh(box, material);
			mesh.rotation.x = rx;
			mesh.rotation.y = ry;
			mesh.rotation.z = rz;
			mesh.position.x = tx; 
			mesh.position.y = ty;
			mesh.position.z = tz;
			mesh.scale.x = sx;
			mesh.scale.y = sy;
			mesh.scale.z = sz;
			mesh.objname ='box';	
			this.mesh = mesh;
			scene.add(this.mesh);
		}
	}
	else if(this.mesh !== null){
		//refresh the mesh position....
		this.mesh.rotation.x = rx;
		this.mesh.rotation.y = ry;
		this.mesh.rotation.z = rz;
		this.mesh.position.x = tx; 
		this.mesh.position.y = ty;
		this.mesh.position.z = tz;
		this.mesh.scale.x = sx;
		this.mesh.scale.y = sy;
		this.mesh.scale.z = sz;	
	}
}