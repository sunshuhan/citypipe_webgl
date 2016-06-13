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
/* input xml
 <?xml version='1.0'  encoding='gb2312'?>
<id>39</id>
  */
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
/* response xml
<object>
<name>bob</name>
<password>bobpw</password>
</object>
 */
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
}

function SetControlValue(controlID,cntrolVal)
{
	var  controlobj=document.getElementById(controlID);
 	controlobj.value=cntrolVal;  
}


