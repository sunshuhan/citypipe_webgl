/*
 * default setting, including canvas, scene, camera, trackballcontrols...
 * */
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById('webgl')
});
renderer.setClearColor(0xffffff);
var canvas=document.getElementById('webgl');
var rect = canvas.getBoundingClientRect();
camera = new THREE.PerspectiveCamera(45,canvas.width/canvas.height,1,1000);
camera.position.set( 10, 10, 50 );

var trackballControl = new THREE.TrackballControls( camera, renderer.domElement );
var mouse = new THREE.Vector2();

var raycaster = new THREE.Raycaster();
//initial time
var last=Date.now();
var t=0;
//intersects stores all the picked objects;
var intersects=[];
var TTSModels =[];//function same as subforxml,used in ajaxobjectinf.html
var subforxml = [];//subforxml stores all the models to be rendered used in citypipe.html related file
window.addEventListener( 'resize', onWindowResize, false );
document.addEventListener( 'touchstart', onDocumentTouchStart, false );
document.addEventListener('keydown',onDocumentKeyDown,false);
document.addEventListener('keyup',onDocumentKeyUp,false);	
function loadpolintlight(x,y,z,i,color)
{
	light = new THREE.PointLight( color, i );
	light.position.set( x, y, z );
	scene.add( light );
}
function refresh()
{
	window.location.reload();
}

//handle picking, change the color of the picked object
/*function onMouseDown(event){
	mouse.x = (( event.clientX-rect.left)/ rect.width ) * 2 - 1;
	mouse.y = - ( (event.clientY-rect.top)/ rect.height ) * 2 + 1;
	raycaster.setFromCamera( mouse, camera );
	//intersects = raycaster.intersectObjects( objects );
	intersects = raycaster.intersectObjects( scene.children );
	if ( intersects.length > 0 ) {
			intersects[ 0 ].object.material.color.setHex(Math.random() * 0xffffff  );
	}
}*/
function onDocumentTouchStart( event ) {	
	event.preventDefault();
	event.clientX = event.touches[0].clientX;
	event.clientY = event.touches[0].clientY;
	onDocumentMouseDown( event );
}
var moveleft;
var moveright;
var movetop;
var movedown;
function onDocumentKeyDown(event)
{
	switch(event.keyCode)
	{
		case 37 : moveleft=true;break;
		case 39 : moveright= true;break;
		case 38 : movetop= true;break;
		case 40 : movedown= true;break;	
	}
}
function onDocumentKeyUp(event)
{
	switch(event.keyCode)
	{
		case 37 : moveleft=false;break;
		case 39 : moveright= false;break;
		case 38 : movetop= false;break;
		case 40 : movedown= false;break;		
	}
}
function onWindowResize() {
	camera.updateProjectionMatrix();
}


