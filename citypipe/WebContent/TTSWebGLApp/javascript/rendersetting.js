var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById('webgl')
});
renderer.setClearColor(0xffffff);
var canvas=document.getElementById('webgl');
var rect = canvas.getBoundingClientRect();
camera = new THREE.PerspectiveCamera(45,canvas.width/canvas.height,1,1000);
camera.position.set( 10, 10, 50 );
var controls = new THREE.TrackballControls( camera, renderer.domElement );
var mouse = new THREE.Vector2();
var objects=[];
var raycaster = new THREE.Raycaster();
var last=Date.now();
var t=0;
var subforxml = [];
window.addEventListener( 'resize', onWindowResize, false );
//document.addEventListener( 'mousedown', onDocumentMouseDown, false );�ڹ켣�����js�ļ����޸�mousedown����ʵ��ʰȡ
document.addEventListener( 'touchstart', onDocumentTouchStart, false );
document.addEventListener('keydown',onDocumentKeyDown,false);
document.addEventListener('keyup',onDocumentKeyUp,false);	
//var obj1 = new Pobject(5,'sphere',0,0,0,1,1,1,0,0,0,10,44);
//obj1.render();
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
	//camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	//renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
	requestAnimationFrame( animate );
	render();
}
function render() {
	if(movetop)camera.position.y+= 0.2;
	if(movedown)camera.position.y-= 0.2;
	if(moveleft)camera.position.x-= 0.2;
	if(moveright)camera.position.x+= 0.2;
	var now = Date.now();
	t = (now-last)*0.001;
	document.getElementById("timepassed").innerHTML = Math.floor(t);				
	if(t>0)
	{
		var addselect = document.getElementById("tryselect");
		if((subforxml.length+1)>addselect.length)
		{
			for(var o=0;o<subforxml.length;o++)
			{
				var option = document.createElement("option");
				var title = subforxml[o].name;//alert(title);
				option.setAttribute("value",o+1);
				option.appendChild(document.createTextNode(title));
				addselect.appendChild(option);
			}
		}			
	}	

	if(t>1)
	{
		var addselect = document.getElementById("tryselect");
		var index=addselect.selectedIndex ; 
		if(addselect.options[index].value!=0)
		{
			if(changepos==1)
			{
				var changex = document.getElementById("changex").value;
				var changey = document.getElementById("changey").value;
				var changez = document.getElementById("changez").value;
					for(var i=0; i<subforxml.length ; i++)
					{
						if(subforxml[i].name==addselect.options[index].text)
						{
							subforxml[i].position_x=changex;
							subforxml[i].position_y=changey;
							subforxml[i].position_z=changez;
						}
					}
			changepos=0;
			}	
		}
	}
				//���ݾ�����ʱ��t������subforxml�����е��ӹ���
	for(var i=0;i<subforxml.length;i++)
		subforxml[i].refresh(t);
	controls.update();
	renderer.render( scene, camera );
}
animate();