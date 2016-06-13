/*
 * animation setting, decide how to render the scene
 * */
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