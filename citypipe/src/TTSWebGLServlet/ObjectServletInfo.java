package TTSWebGLServlet;

import java.sql.*;
import java.util.*; 
import org.w3c.dom.*; 
import javax.xml.parsers.*; 
import java.io.*; 
import javax.servlet.*;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.*;
import javax.xml.transform.*;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.*;
/**
 * Servlet implementation class ObjectServlet
 */
public class ObjectServletInfo extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final String CONTENT_TYPE = "text/xml; charset=GB2312";
	public String ctrlID = "";
	public class StringResult{
	      public int error;
	      public String strXmlReqsponse;
	      public StringResult(){
	      }
	}
    public ObjectServletInfo() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HandlingAjaxRequestMethod(request,response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}
	public void HandlingAjaxRequestMethod (HttpServletRequest request, HttpServletResponse response){
		response.setContentType(CONTENT_TYPE);
	    String strResponse = "";
	    //parse input xml, get input id
	    try
		{ 
	    	InputStream ObjXml = request.getInputStream();
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance(); 
			DocumentBuilder builder = factory.newDocumentBuilder(); 
			Document doc = builder.parse(ObjXml);
			NodeList list = doc.getElementsByTagName("id");  
			Element element = (Element)list.item(0);  
	        ctrlID = element.getFirstChild().getNodeValue(); 
	        System.out.println("input objid: " + ctrlID);
		}catch(Exception e){
			
		}
	    //get dbconnection and query
		try {
			DatabaseConnection dbconn = new DatabaseConnection();
			Connection conn = dbconn.getConnection();
			StringResult retObj = null;
		    retObj = GetResponseResultByDatabaseQuery(conn,ctrlID);
		    if(retObj.error > 0){
		    	strResponse = retObj.strXmlReqsponse;   	
		    }
		    else{
		    	strResponse ="<Error>Error Ocurred!</Error>";
		    }
		    PrintWriter out = response.getWriter();
	    	out.println(strResponse);
		} catch (Exception e) {
			
		}
	    
	    
	}
	//return object model information 
	public StringResult GetResponseResultByDatabaseQuery(Connection conn,String inputid){
		StringResult retObj = new StringResult();
		String strXmlReqsponse = "";
		String type = "";
		String position_x = "";
		String position_y = "";
		String position_z = "";
		String rotation_x = "";
		String rotation_y = "";
		String rotation_z = "";
		String scale_x = "";
		String scale_y = "";
		String scale_z = "";
		String color = "";
		String att1 = "";
		String att2 = "";
		String att3 = "";
		String att4 = "";
	    retObj.error = -1;
	    String strSQL = "select objid,type,px,py,pz,rx,ry,rz,sx,sy,sz,color,att1,att2,att3,att4 from objects where objid =" + inputid ;
	    try{
	    	ResultSet rs;
	    	Statement stmt=conn.createStatement();
	    	rs=stmt.executeQuery(strSQL);
	    	if(rs.next()){
	    		type = rs.getString(2);
	    		position_x = rs.getString(3);
	    		position_y = rs.getString(4);
	    		position_z = rs.getString(5);
	    		rotation_x = rs.getString(6);
	    		rotation_y = rs.getString(7);
	    		rotation_z = rs.getString(8);
	    		scale_x = rs.getString(9);
	    		scale_y = rs.getString(10);
	    		scale_z = rs.getString(11);
	    		color = rs.getString(12);
	    		att1 = rs.getString(13);
	    		att2 = rs.getString(14);
	    		att3 = rs.getString(15);
	    		att4 =rs.getString(16);		
	    	}else{
	    		retObj.error = -1;
	    		return retObj;
	    	}
	        //construct ouput xml
	    	DocumentBuilderFactory docbuilderfactory = DocumentBuilderFactory.newInstance();
	        DocumentBuilder docbuilder = docbuilderfactory.newDocumentBuilder();
	        TransformerFactory tFactory = TransformerFactory.newInstance();
	        Transformer transformer = tFactory.newTransformer();
	        Document xmldoc = docbuilder.newDocument();
	        //build xml  
	        Element ObjNode = xmldoc.createElement("object");
	        //id tag
	        Element IdNode = xmldoc.createElement("id");
	        ObjNode.appendChild(IdNode);
	        Text textId;
	        textId = xmldoc.createTextNode(inputid);
	        IdNode.appendChild(textId);
	      //type tag
	        Element TypeNode = xmldoc.createElement("type");
	        ObjNode.appendChild(TypeNode);
	        Text textType;
	        textType = xmldoc.createTextNode(type);
	        TypeNode.appendChild(textType);
	      //translation_x tag    (position_x)
	        Element PxNode = xmldoc.createElement("translation_x");
	        ObjNode.appendChild(PxNode);
	        Text textPx;
	        textPx = xmldoc.createTextNode(position_x);
	        PxNode.appendChild(textPx);
	      //translation_y tag
	        Element PyNode = xmldoc.createElement("translation_y");
	        ObjNode.appendChild(PyNode);
	        Text textPy;
	        textPy = xmldoc.createTextNode(position_y);
	        PyNode.appendChild(textPy);
	      //translation_z tag
	        Element PzNode = xmldoc.createElement("translation_z");
	        ObjNode.appendChild(PzNode);
	        Text textPz;
	        textPz = xmldoc.createTextNode(position_z);
	        PzNode.appendChild(textPz);
	      //rotation_x tag
	        Element RxNode = xmldoc.createElement("rotation_x");
	        ObjNode.appendChild(RxNode);
	        Text textRx;
	        textRx = xmldoc.createTextNode(rotation_x);
	        RxNode.appendChild(textRx);
	      //rotation_y tag
	        Element RyNode = xmldoc.createElement("rotation_y");
	        ObjNode.appendChild(RyNode);
	        Text textRy;
	        textRy = xmldoc.createTextNode(rotation_y);
	        RyNode.appendChild(textRy);
	      //rotation_z tag
	        Element RzNode = xmldoc.createElement("rotation_z");
	        ObjNode.appendChild(RzNode);
	        Text textRz;
	        textRz = xmldoc.createTextNode(rotation_z);
	        RzNode.appendChild(textRz);
	      //scale_x tag
	        Element SxNode = xmldoc.createElement("scale_x");
	        ObjNode.appendChild(SxNode);
	        Text textSx;
	        textSx = xmldoc.createTextNode(scale_x);
	        SxNode.appendChild(textSx);
	      //scale_y tag
	        Element SyNode = xmldoc.createElement("scale_y");
	        ObjNode.appendChild(SyNode);
	        Text textSy;
	        textSy = xmldoc.createTextNode(scale_y);
	        SyNode.appendChild(textSy);
	      //scale_z tag
	        Element SzNode = xmldoc.createElement("scale_z");
	        ObjNode.appendChild(SzNode);
	        Text textSz;
	        textSz = xmldoc.createTextNode(scale_z);
	        SzNode.appendChild(textSz);
	      //Color tag
	        Element ColorNode = xmldoc.createElement("color");
	        ObjNode.appendChild(ColorNode);
	        Text textColor;
	        textColor = xmldoc.createTextNode(color);
	        ColorNode.appendChild(textColor);
	      //att1 tag  
	        Element Att1Node = xmldoc.createElement("att1");
	        ObjNode.appendChild(Att1Node);
	        Text textAtt1;
	        textAtt1 = xmldoc.createTextNode(att1);
	        Att1Node.appendChild(textAtt1);
	      //att2 tag  
	        Element Att2Node = xmldoc.createElement("att2");
	        ObjNode.appendChild(Att2Node);
	        Text textAtt2;
	        textAtt2 = xmldoc.createTextNode(att2);
	        Att2Node.appendChild(textAtt2);
	      //att3 tag  
	        Element Att3Node = xmldoc.createElement("att3");
	        ObjNode.appendChild(Att3Node);
	        Text textAtt3;
	        textAtt3 = xmldoc.createTextNode(att3);
	        Att3Node.appendChild(textAtt3);
	      //att1 tag  
	        Element Att4Node = xmldoc.createElement("att4");
	        ObjNode.appendChild(Att4Node);
	        Text textAtt4;
	        textAtt4 = xmldoc.createTextNode(att4);
	        Att4Node.appendChild(textAtt4);
	        
	        Source sourceDom = new DOMSource(ObjNode);
	        StringWriter outres = new StringWriter();
	        Result outputres = new StreamResult(outres);
	        transformer.transform(sourceDom, outputres);
	        outres.flush();
	        strXmlReqsponse = outres.toString();
	        retObj.strXmlReqsponse = strXmlReqsponse;
	        rs.close();
	        stmt.close();
            conn.close();
            retObj.error = 1;
	    }catch(Exception e){
	    	retObj.error = -1;
	    }
		return retObj;
	}
	
	}

/*
 example output xml
<object>
<id>2</id>
<type>sphere</type>
<position_x>15</position_x>
<position_y>15</position_y>
<position_z>0</position_z>
<rotation_x>0</rotation_x>
<rotation_y>0</rotation_y>
<rotation_z>0</rotation_z>
<scale_x>1</scale_x>
<scale_y>1</scale_y>
<scale_z>1</scale_z>
<color>0x00ff00</color>
<att1>3</att1>
<att2>0</att2>
<att3>0</att3>
<att4>0</att4>
</object>
*/