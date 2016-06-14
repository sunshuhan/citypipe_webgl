var xRequest = null;
var READY_STATE_UNINITIALIZED=0;
var READY_STATE_LOADING=1;
var READY_STATE_LOADED=2;
var READY_STATE_INTERACTIVE=3;
var READY_STATE_COMPLETE=4;
function ClickEventActionHandlerButGet(url)
{
	var retDataStatus=true;
	
	if (window.ActiveXObject)
	{  
		var SendDocXml=new ActiveXObject("Microsoft.XMLDOM");  
    }  
    else{  
        if (document.implementation&& document.implementation.createDocument)
		{  
            var SendDocXml= document.implementation.createDocument("","",null);  
        }  
    }  
	retDataStatus= prepareXMLRequestMessage(SendDocXml);
	if(retDataStatus==false)
	{
		return false;
	}
	sendRequest(SendDocXml,"POST",url);
	return true;
}

function prepareXMLRequestMessage(xmlDoc)
{
	var retDataStatus=true;
	var sendMsgHead = xmlDoc.createProcessingInstruction("xml","version='1.0'  encoding='gb2312'");
	xmlDoc.appendChild(sendMsgHead);
	var idNode = xmlDoc.createElement("id");
	xmlDoc.appendChild(idNode);
	var  inputid=document.getElementById("input_id");
	var inputidvalue =inputid.value;
	var paramtext=xmlDoc.createTextNode(inputidvalue);
	idNode.appendChild(paramtext);
	
	if(retDataStatus==false) return false;
	return retDataStatus;
}


function sendRequest(xmlObj, HttpMethod,url)
{
	//var url="/citypipe/ObjectServlet";
	if(!HttpMethod) HttpMethod="GET";
	if(window.XMLHttpRequest)
	{
		xRequest = new XMLHttpRequest;
	}
	else if(window.ActiveXObject)
	{
		xRequest= new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(xRequest)
	{
		xRequest.onreadystatechange=onReadyState;
		var retobj= xRequest.open(HttpMethod,url,false);
		if(retobj=="") return;
			xRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xRequest.send(xmlObj);
		//alert("1");
		
   }
}


function onReadyState()
{
	if(xRequest.readyState==4)  
	{  
		if(xRequest.status==200)  
		{
			handlingAjxResponseMessageXML();
		}
	}
}

function handlingAjxResponseMessageXML ()
{	
	var outputmsg = '';
	var outMsg = document.getElementById("outputmsg");
	var xmlDoc = xRequest.responseXML;
	if(xmlDoc.getElementsByTagName("Error").length > 0)
	outMsg.innerHTML = "no such id in the database";
	else{
		var properties = xmlDoc.documentElement.childNodes;
		for(var i = 0 ; i < properties.length; i++){
			outputmsg += properties[i].nodeName + ': ' +properties[i].childNodes[0].nodeValue + '<br>';
		}
		outMsg.innerHTML = outputmsg;
	}
	//if response xml is object model information, render
	if(xmlDoc.getElementsByTagName("type").length > 0){
		renderxml(xRequest.responseXML);
	}
}

function renderxml(xml)
{
	 var objects = xml.getElementsByTagName("object");
	 for(var o=0;o<objects.length;o++)
		{
			if(objects[o].getElementsByTagName("type")[0].childNodes[0].nodeValue=='sphere')
			{
				var id = objects[o].getElementsByTagName("id")[0].childNodes[0].nodeValue;
				var translation_x = objects[o].getElementsByTagName("translation_x")[0].childNodes[0].nodeValue;
				var translation_y = objects[o].getElementsByTagName("translation_y")[0].childNodes[0].nodeValue;
				var translation_z = objects[o].getElementsByTagName("translation_z")[0].childNodes[0].nodeValue;
				var scale_x = objects[o].getElementsByTagName("scale_x")[0].childNodes[0].nodeValue;
				var scale_y = objects[o].getElementsByTagName("scale_y")[0].childNodes[0].nodeValue;
				var scale_z = objects[o].getElementsByTagName("scale_z")[0].childNodes[0].nodeValue;
				var rotate_x = objects[o].getElementsByTagName("rotation_x")[0].childNodes[0].nodeValue;
				var rotate_y = objects[o].getElementsByTagName("rotation_y")[0].childNodes[0].nodeValue;
				var rotate_z = objects[o].getElementsByTagName("rotation_z")[0].childNodes[0].nodeValue;
				var color =parseInt(objects[o].getElementsByTagName("color")[0].childNodes[0].nodeValue);
				var radius = objects[o].getElementsByTagName("att1")[0].childNodes[0].nodeValue;
				var object = new TTSObject(id,'sphere',translation_x,translation_y,translation_z,scale_x,scale_y,scale_z,rotate_x,
						rotate_y,rotate_z,color,radius);
				TTSModels.push(object);
			}
		}

}


