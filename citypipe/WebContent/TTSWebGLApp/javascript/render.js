/*
 * add objects and subprocess to subforxml[] ,(stores all the models information to be rendered)
 * */			
var changepos=0;
function changeposition()
{
	changepos=1;
}	
			/** add object directly
			var g = new THREE.BoxGeometry( 5, 5, 5 );
			var m = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
			var me = new THREE.Mesh( g, m );
			scene.add( me );
			**/
var xmlfilename;
			
//submitinfo() parse corresponding xml file , add subprocess to subforxml[](defined in rendersetting.js)
function submitinfo()
{
	last=Date.now();
	loadpolintlight(document.getElementsByName("light_x")[0].value,document.getElementsByName("light_y")[0].value,document.getElementsByName("light_z")[0].value,5,document.getElementsByName("pointcolor")[0].value);
	for(var i=0;i<subforxml.length;i++)
		subforxml[i].refresh(remove);
		var objnum=0;
		var subsum=0;
	for(var i=0;i<document.getElementsByName("xmlfile").length;i++)
	{
		if(document.getElementsByName("xmlfile")[i].checked==true)
		{
			xmlfilename=document.getElementsByName("xmlfile")[i].value;	
			$.ajax({
				type: "get",
				url: '../xml/'+xmlfilename,	
				success: function(data){
				var subpro = data.getElementsByTagName("subprocess");
				for(var i=0;i<subpro.length;i++)
				{
					var name= subpro[i].getAttribute("name");
					var log = subpro[i].getElementsByTagName("logic")[0].childNodes[0].nodeValue;
					var time = subpro[i].getElementsByTagName("time")[0].childNodes[0].nodeValue;
					var px = subpro[i].getElementsByTagName("position_x")[0].childNodes[0].nodeValue;
					var py = subpro[i].getElementsByTagName("position_y")[0].childNodes[0].nodeValue;
					var pz = subpro[i].getElementsByTagName("position_z")[0].childNodes[0].nodeValue;
					var sub = new Subprocess(name,log,time,px,py,pz);
					var objects=subpro[i].getElementsByTagName("object");
					objnum+=objects.length;
					for(var o=0;o<objects.length;o++)
					{
						if(objects[o].getElementsByTagName("type")[0].childNodes[0].nodeValue=='sphere')
						{
							var id = objects[o].getElementsByTagName("id")[0].childNodes[0].nodeValue;
							var radius = objects[o].getElementsByTagName("radius")[0].childNodes[0].nodeValue;
							var translation_x = objects[o].getElementsByTagName("translation_x")[0].childNodes[0].nodeValue;
							var translation_y = objects[o].getElementsByTagName("translation_y")[0].childNodes[0].nodeValue;
							var translation_z = objects[o].getElementsByTagName("translation_z")[0].childNodes[0].nodeValue;
							var scale_x = objects[o].getElementsByTagName("scale_x")[0].childNodes[0].nodeValue;
							var scale_y = objects[o].getElementsByTagName("scale_y")[0].childNodes[0].nodeValue;
							var scale_z = objects[o].getElementsByTagName("scale_z")[0].childNodes[0].nodeValue;
							var rotate_x = objects[o].getElementsByTagName("rotate_x")[0].childNodes[0].nodeValue;
							var rotate_y = objects[o].getElementsByTagName("rotate_y")[0].childNodes[0].nodeValue;
							var rotate_z = objects[o].getElementsByTagName("rotate_z")[0].childNodes[0].nodeValue;
							var color =parseInt(objects[o].getElementsByTagName("color")[0].childNodes[0].nodeValue);
							var objinsub = new Pobject(id,'sphere',translation_x,translation_y,translation_z,scale_x,scale_y,scale_z,rotate_x,
									rotate_y,rotate_z,radius,color);
							sub.addobj(objinsub);
						}
						if(objects[o].getElementsByTagName("type")[0].childNodes[0].nodeValue=='90curvepipe')
						{
							var id = objects[o].getElementsByTagName("id")[0].childNodes[0].nodeValue;
							var translation_x = objects[o].getElementsByTagName("translation_x")[0].childNodes[0].nodeValue;
							var translation_y = objects[o].getElementsByTagName("translation_y")[0].childNodes[0].nodeValue;
							var translation_z = objects[o].getElementsByTagName("translation_z")[0].childNodes[0].nodeValue;
							var scale_x = objects[o].getElementsByTagName("scale_x")[0].childNodes[0].nodeValue;
							var scale_y = objects[o].getElementsByTagName("scale_y")[0].childNodes[0].nodeValue;
							var scale_z = objects[o].getElementsByTagName("scale_z")[0].childNodes[0].nodeValue;
							var rotate_x = objects[o].getElementsByTagName("rotate_x")[0].childNodes[0].nodeValue;
							var rotate_y = objects[o].getElementsByTagName("rotate_y")[0].childNodes[0].nodeValue;
							var rotate_z = objects[o].getElementsByTagName("rotate_z")[0].childNodes[0].nodeValue;
							var color =parseInt(objects[o].getElementsByTagName("color")[0].childNodes[0].nodeValue);
							var objinsub = new Pobject(id,'90curvepipe',translation_x,translation_y,translation_z,scale_x,scale_y,scale_z,rotate_x,
									rotate_y,rotate_z,0,color);
							sub.addobj(objinsub);					
						}
						if(objects[o].getElementsByTagName("type")[0].childNodes[0].nodeValue=='straightpipe')
						{
							var id = objects[o].getElementsByTagName("id")[0].childNodes[0].nodeValue;
							var translation_x = objects[o].getElementsByTagName("translation_x")[0].childNodes[0].nodeValue;
							var translation_y = objects[o].getElementsByTagName("translation_y")[0].childNodes[0].nodeValue;
							var translation_z = objects[o].getElementsByTagName("translation_z")[0].childNodes[0].nodeValue;
							var scale_x = objects[o].getElementsByTagName("scale_x")[0].childNodes[0].nodeValue;
							var scale_y = objects[o].getElementsByTagName("scale_y")[0].childNodes[0].nodeValue;
							var scale_z = objects[o].getElementsByTagName("scale_z")[0].childNodes[0].nodeValue;
							var rotate_x = objects[o].getElementsByTagName("rotate_x")[0].childNodes[0].nodeValue;
							var rotate_y = objects[o].getElementsByTagName("rotate_y")[0].childNodes[0].nodeValue;
							var rotate_z = objects[o].getElementsByTagName("rotate_z")[0].childNodes[0].nodeValue;
							var color =parseInt(objects[o].getElementsByTagName("color")[0].childNodes[0].nodeValue);
							var objinsub = new Pobject(id,'straightpipe',translation_x,translation_y,translation_z,scale_x,scale_y,scale_z,rotate_x,
									rotate_y,rotate_z,0,color);
							sub.addobj(objinsub);								
						}
					}
					subforxml.push(sub);
				}
				},

				complete: function()
				{	
					document.getElementById("subprosum").innerHTML=subforxml.length;
					document.getElementById("objnum").innerHTML=objnum;	
				}
			});
						//ajax��ȡ����xml�ѽ���
		}
	}		
}
			//try add object directly

			//var testobj = new THREE.Mesh( THREE.BoxGeometry( 1, 1, 1 ), THREE.MeshBasicMaterial( { color: 0xffff00 } ));
			//scene.add( testobj );