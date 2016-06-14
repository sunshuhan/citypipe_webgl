/*
物体即网格(mesh)，由geometry和material定义

*/
//var sphere = new THREE.SphereGeometry( 1, 30, 30 );
//var material = new THREE.MeshLambertMaterial( { color:0x333333, side: THREE.DoubleSide } );
//var	pmesh = new THREE.Mesh( sphere, material );
//att1,2,3,4 are extra properties for descripbing object information,such as radius property for sphere object
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
	this.color=c;
	this.att1 = att1;
	this.mesh=null;	
}
/*
TTSObject.prototype.refresh=function()
{

	
}
*/
TTSObject.prototype.removeFromScene = function()
{
	scene.remove(this.mesh);
}
TTSObject.prototype.addToScene = function()
{	
	rx=this.rotation_x;
	ry=this.rotation_y;
	rz=this.rotation_z;
	tx=this.translation_x;
	ty=this.translation_y;
	tz=this.translation_z;
	sx=this.scale_x;
	sy=this.scale_y;
	sz=this.scale_z;
	att1=this.att1;
	c=this.color;
	var mesh;
	if(this.mesh === null)
	if(this.type=='sphere')
	{			
		var sphere = new THREE.SphereGeometry( att1, 30, 30 );
		var material = new THREE.MeshLambertMaterial( { color: c, side: THREE.DoubleSide } );
		mesh = new THREE.Mesh( sphere, material );
		mesh.rotation.x=rx;
		mesh.rotation.y=ry;
		mesh.rotation.z=rz;
		mesh.position.x=tx; 
		mesh.position.y=ty;
		mesh.position.z=tz;
		mesh.scale.x=sx;
		mesh.scale.y=sy;
		mesh.scale.z=sz;
		mesh.objname='sphere';	
		this.mesh=mesh;
		scene.add(this.mesh);
	}
}