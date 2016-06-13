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
			DocumentBuilderFactory factory=DocumentBuilderFactory.newInstance(); 
			DocumentBuilder builder=factory.newDocumentBuilder(); 
			Document doc = builder.parse(ObjXml);
			NodeList list = doc.getElementsByTagName("id");  
			Element element = (Element)list.item(0);  
	        ctrlID = element.getFirstChild().getNodeValue(); 
	        System.out.println("input id: "+ ctrlID);
		}catch(Exception e){
			
		}
	    //get dbconnection and query
		try {
			DatabaseConnection dbconn = new DatabaseConnection();
			Connection conn = dbconn.getConnection();
			StringResult retObj=null;
		    retObj =GetResponseResultByDatabaseQuery(conn,request);
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
	public StringResult GetResponseResultByDatabaseQuery(Connection conn,HttpServletRequest request){
		StringResult retObj=new StringResult();
		String strXmlReqsponse="";
		String strname = "";
		String strpassword = "";
	    retObj.error=-1;
	    String strSQL="select name,password from user where userid =" + ctrlID ;
	    try{
	    	ResultSet rs;
	    	Statement stmt=conn.createStatement();
	    	rs=stmt.executeQuery(strSQL);
	    	if(rs.next()){
	    		strname = rs.getString(1);
		        strpassword = rs.getString(2);
	    	}else{
	    		strname = null;
		        strpassword = null;
	    	}
	        //construct ouput xml
	    	DocumentBuilderFactory   docbuilderfactory   =   DocumentBuilderFactory.newInstance();
	        DocumentBuilder   docbuilder   =   docbuilderfactory.newDocumentBuilder();
	        TransformerFactory tFactory = TransformerFactory.newInstance();
	        Transformer transformer = tFactory.newTransformer();
	        Document xmldoc   =   docbuilder.newDocument();
	        //build xml
	        Element ObjNode=xmldoc.createElement("object");
	        Element NameNode=xmldoc.createElement("name");
	        ObjNode.appendChild(NameNode);
	        Element PasswordNode=xmldoc.createElement("password");
	        ObjNode.appendChild(PasswordNode);
	        Text textName;
	        textName = xmldoc.createTextNode(strname);
	        NameNode.appendChild(textName);
	        Text textPassword;
	        textPassword = xmldoc.createTextNode(strpassword);
	        PasswordNode.appendChild(textPassword);
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