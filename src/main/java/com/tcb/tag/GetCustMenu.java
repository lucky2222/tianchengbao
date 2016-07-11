package com.tcb.tag;

import java.util.HashMap;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.tcb.dao.base.DataList;
import com.tcb.dao.base.DataRow;

import sun.util.logging.resources.logging;

public class GetCustMenu extends TagSupport {
	
	//菜单列表
	private String memulist;
	


	public String getMemulist() {
		return memulist;
	}



	public void setMemulist(String memulist) {
		this.memulist = memulist;
	}



	@Override
	public int doStartTag() throws JspException {
		JspWriter out = this.pageContext.getOut();
    	try {
    		JSONArray a = JSON.parseArray(this.getMemulist()); 
    		DataList firstLevel = new DataList();

    		
    		HashMap  secondLeve = new HashMap();
    		
    		HashMap  thirdLeve = new HashMap();
    		
    		
    		for(int i=0;i<a.size();i++){
    			JSONObject temp = (JSONObject) a.get(i);
    			if("1".equals(temp.getString("level"))){
    				firstLevel.add(temp);
    			}
    			if("2".equals(temp.getString("level"))){   				
    				if(secondLeve.get(temp.getString("parent_catalog_id"))==null){
    					DataList  firstLeve2 = new DataList();
    					secondLeve.put(temp.getString("parent_catalog_id"), firstLeve2);
    					firstLeve2.add(temp);
    				}else{
    					DataList  firstLeve2 = (DataList) secondLeve.get(temp.getString("parent_catalog_id"));
    					firstLeve2.add(temp);
    				}
    			}
    			if("3".equals(temp.getString("level"))){
    				if(thirdLeve.get(temp.getString("parent_catalog_id"))==null){
    					DataList  firstLeve3 = new DataList();
    					thirdLeve.put(temp.getString("parent_catalog_id"), firstLeve3);
    					firstLeve3.add(temp);
    				}else{
    					DataList  firstLeve3 = (DataList) thirdLeve.get(temp.getString("parent_catalog_id"));
    					firstLeve3.add(temp);
    				}
    			}	
    		}
    		
//    		System.out.println("---firstLevel--"+firstLevel);
//    		System.out.println("---secondLeve--"+secondLeve);
//    		System.out.println("---thirdLeve--"+thirdLeve);
    		
    		if(a.size()>0){
    			//out.print("<div class=\"categories pr mb10\">");
    			//out.print("<h3 class=\"categories_tit\"><a href=\"/shengda/showcatagory/0\" target=\"_blank\">Categories</a></h3>");
    			out.print("<ul class=\"categories_list\" id=\"categories_list\">");
    				for(int i=0;i<firstLevel.size();i++){
    					JSONObject  firstLeve_temp = (JSONObject) firstLevel.get(i);
    					out.print("<li>");
    					out.print("<h2><a href=\"/shengda/showcatagory/"+firstLeve_temp.getString("catalog_id")+"\" title=\""+firstLeve_temp.getString("catalog_name")+"\" target=\"_blank\">"+firstLeve_temp.getString("catalog_name")+"</a></h2>");
    					out.print("<div class=\"categories_list_nav clearfix\" style=\"display: none;z-index:1000\">");
    					out.print("<dl class=\"categories_list_dl\">");
    					out.print("<dt>"+firstLeve_temp.getString("catalog_name")+"</dt>");
    					System.out.println("---catalog_id--"+firstLeve_temp.getString("catalog_id"));
    					out.print("<dd>");
    					DataList firstLeve2 = (DataList)secondLeve.get(firstLeve_temp.getString("catalog_id"));
    					if(firstLeve2!=null)
    						for(int j=0;j<firstLeve2.size();j++){
    							JSONObject  secondLeve_temp = (JSONObject) firstLeve2.get(j);
//    							out.print("<h3><a href=\"http://www.Sino-Sources/solar-cells/pl4972.html\" title=\"Solar Cells\" target=\"_blank\">Solar Cells</a></h3>");
    							out.print("<h3><a href=\"/shengda/showcatagory/"+secondLeve_temp.getString("catalog_id")+"\" title=\""+secondLeve_temp.getString("catalog_name")+"\" target=\"_blank\">"+secondLeve_temp.getString("catalog_name")+"</a></h3>");
    						}
    						out.print(" <a href=\"/shengda/showcatagory/All-Categories\" class=\"fb\" target=\"_blank\">See all categories</a>");
//    						for(int k=0;k<firstLeve2.size();k++){
//    							JSONObject  secondLeve_temp = (JSONObject) firstLeve2.get(k);
//    							if(secondLeve_temp==null)continue;
//    							out.print("<li style=\"overflow:hidden;\">");    							
//    							out.print("<div class=\"fenlei_con_tit\"> <a class=\"over_2\" href=\"category.php?id="+secondLeve_temp.getString("catalog_id")+"\">"+secondLeve_temp.getString("catalog_name")+"</a></div>");
//    							out.print("<div class=\"fenlei_con_a_list\"> ");
//    							DataList firstLeve3 = (DataList)thirdLeve.get(secondLeve_temp.getString("catalog_id"));
//    							if(firstLeve3!=null)
//    								for(int m=0;m<firstLeve3.size();m++){
//    									JSONObject  thirdLeve_temp = (JSONObject) firstLeve3.get(m);
//    									out.print("<a href=\"category.php?id="+thirdLeve_temp.getString("catalog_id")+"\" target=\"_blank\">"+thirdLeve_temp.getString("catalog_name")+"</a>  <span class=\"linetop\" style=\"\" >|</span>");								
//    								}
//    							out.print("</div><div class=\"clear\"></div></li>");
//    							
//    							
//    						}
    					out.print("</dd>");
    					out.print("</dl>");
    					out.print("</div>");
    					out.print("</li>");
    				}
    				out.print("<li class=\"last\"><a href=\"/shengda/showcatagory/All-Categories\" class=\"fb\" target=\"_blank\">ALL CATEGORIES</a></li>");
    			out.print("</ul>");
    			//out.print("</div>");
    		}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return TagSupport.SKIP_BODY; 
	}
}
