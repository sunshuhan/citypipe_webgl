/*
物体即网格(mesh)，由geometry和material定义
geometry1表示直管的几何形状，geometry2表示弯管的几何形状，
几何形状由ColladaLoader加载collada格式的三维模型得到
材质material也在此定义
Pobject类表示的是物体，定义了平移旋转缩放颜色等属性，及渲染的方法
*/
var sphere = new THREE.SphereGeometry( 1, 30, 30 );
var material = new THREE.MeshLambertMaterial( { color:0x333333, side: THREE.DoubleSide } );
var	pmesh = new THREE.Mesh( sphere, material );
var geometry1;
var geometry2;
var loader = new THREE.ColladaLoader();
loader.options.convertUpAxis = true;
loader.load( '../models/collada/tube3.dae', function ( collada ) {	
	tube1 = collada.scene;
	tube1.traverse( function ( child ) {
		if ( child instanceof THREE.Mesh ) {
			child.geometry.computeFaceNormals();
			child.material.shading = THREE.FlatShading;
			geometry1 = child.geometry;
		}
	} );
} );				
loader.load( '../models/collada/90_tube.dae', function ( collada ) {	
	tube1 = collada.scene;
	tube1.traverse( function ( child ) {
		if ( child instanceof THREE.Mesh ) {
			child.geometry.computeFaceNormals();
			child.material.shading = THREE.FlatShading;
			geometry2 = child.geometry;
		}
	} );
} );
function Pobject(id,pipetype,tx,ty,tz,sx,sy,sz,rx,ry,rz,r,c,mesh){
	
	this.id = id;
	this.type = pipetype;
	this.translation_x = tx;
	this.translation_y = ty;
	this.translation_z = tz;
	this.scale_x=sx;
	this.scale_y=sy;
	this.scale_z=sz;
	this.rotation_x=rx;
	this.rotation_y=ry;
	this.rotation_z=rz;
	this.radius=r;
	
	this.color=c;
	this.mesh=pmesh;	
}
Pobject.prototype.refresh=function(t,px,py,pz)
{
	//this.mesh.position.z= 5*Math.sin(0.1*t);
	//this.mesh.position.x= 5*Math.cos(0.1*t);
	//alert(px);
	t = t||0;
	px = px||0;
	py = py||0;
	pz = pz||0;
	this.mesh.position.x=eval(this.translation_x)+eval(px);
	this.mesh.position.y=eval(this.translation_y)+eval(py);
	this.mesh.position.z=eval(this.translation_z)+eval(pz);
	this.mesh.rotation.x=eval(this.rotation_x);
	this.mesh.rotation.y=eval(this.rotation_y);
	this.mesh.rotation.z=eval(this.rotation_z);
}
Pobject.prototype.remove=function()
{
	scene.remove(this.mesh);
}
Pobject.prototype.render=function(px,py,pz,t)
{	
	t = t||0;
	px = px||0;
	py = py||0;
	pz = pz||0;
	rx=eval(this.rotation_x);
	ry=eval(this.rotation_y);
	rz=eval(this.rotation_z);
	x=eval(this.translation_x)+eval(px) ;
	y=eval(this.translation_y)+eval(py);
	z=eval(this.translation_z)+eval(pz) ;
	sx=this.scale_x;
	sy=this.scale_y;
	sz=this.scale_z;
	r=this.radius;
	c=this.color;
	var mesh;
	if(this.type=='straightpipe')
	{
		var material = new THREE.MeshLambertMaterial( { color: c, side: THREE.DoubleSide } );
		mesh = new THREE.Mesh( geometry1, material );
		mesh.rotation.x=rx;
		mesh.rotation.y=ry;
		mesh.rotation.z=rz;
		mesh.position.x=x; 
		mesh.position.y=y;
		mesh.position.z=z;
		mesh.scale.x=sx;
		mesh.scale.y=sy;
		mesh.scale.z=sz;	
		mesh.objname='straightpipe';
		this.mesh=mesh;	
		scene.add(this.mesh);
		//objects.push(this.mesh);
	}
	if(this.type=='90curvepipe')
	{
		var material = new THREE.MeshLambertMaterial( { color: c, side: THREE.DoubleSide } );
		mesh = new THREE.Mesh( geometry2, material );
		mesh.rotation.x=rx;
		mesh.rotation.y=ry;
		mesh.rotation.z=rz;
		mesh.position.x=x; 
		mesh.position.y=y;
		mesh.position.z=z;
		mesh.scale.x=sx;
		mesh.scale.y=sy;
		mesh.scale.z=sz;	
		mesh.objname='curvepipe';
		this.mesh=mesh;
		scene.add(this.mesh);
	//	objects.push(this.mesh);
	}
	if(this.type=='sphere')
	{			
		var sphere = new THREE.SphereGeometry( r, 30, 30 );
		var material = new THREE.MeshLambertMaterial( { color: c, side: THREE.DoubleSide } );
		mesh = new THREE.Mesh( sphere, material );
		mesh.rotation.x=rx;
		mesh.rotation.y=ry;
		mesh.rotation.z=rz;
		mesh.position.x=x; 
		mesh.position.y=y;
		mesh.position.z=z;
		mesh.scale.x=sx;
		mesh.scale.y=sy;
		mesh.scale.z=sz;
		mesh.objname='sphere';		
		this.mesh=mesh;
		scene.add(this.mesh);
	//	objects.push(this.mesh);
	}
}