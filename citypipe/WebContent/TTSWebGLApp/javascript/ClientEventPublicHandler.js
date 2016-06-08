var xRequest = null;
var READY_STATE_UNINITIALIZED=0;
var READY_STATE_LOADING=1;
var READY_STATE_LOADED=2;
var READY_STATE_INTERACTIVE=3;
var READY_STATE_COMPLETE=4;
function ClickEventActionHandlerButGet()
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
	sendRequest(SendDocXml,"POST");
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


function sendRequest(xmlObj, HttpMethod)
{
	var url="/citypipe/ObjectServlet";
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
	//alert("s");
	//var ready= xRequest.readyState;
	if(xRequest.readyState==4)  
     {  
      if(xRequest.status==200)  
      {//
    	// var strdata = xRequest.responseText;
    	//    alert(strdata);
		handlingAjxResponseMessageXML();
		
	  }
	}
}

function handlingAjxResponseMessageXML ()
{
	var outMsg = document.getElementById("outputmsg");
    if(xRequest.responseText.length>0)
    {
       var xmlDoc = xRequest.responseXML;
       var nameNodeList = xmlDoc.getElementsByTagName("name");
       var nameNodeLength = nameNodeList.length;
       if(nameNodeLength < 1){
    	   outMsg.innerHTML = "no such id in the database;"
       }
       var nameNode = nameNodeList[0];
       var pwNodeList = xmlDoc.getElementsByTagName("password");
       var pwNodeLength = pwNodeList.length;
       var pwNode = pwNodeList[0];
       
       outMsg.innerHTML = "name: "+nameNode.childNodes[0].nodeValue +
       "  password: "+pwNode.childNodes[0].nodeValue;
      
    }
   else
   {
      alert("Error ocurred on Server!");
   }
}

function SetControlValue(controlID,cntrolVal)
{
	var  controlobj=document.getElementById(controlID);
 	controlobj.value=cntrolVal;  
}


