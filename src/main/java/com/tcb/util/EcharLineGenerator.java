package com.tcb.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tcb.dao.base.DataRow;

public class EcharLineGenerator {
	private static final Logger logger = LoggerFactory.getLogger(EcharLineGenerator.class);
	private List<DataRow> datalist;//数据列表
	private String xFieldid;//横坐标字段名称
	private ArrayList<String> yFields;//分组数据字段组
	private HashMap<String,String> yFieldsName;//分组数据字段组转换
	private String title;
	private String subtitle;
	private ArrayList<String> xAxis;// 横轴坐标项 字符串
	private DataRow yAxis;// 内容数据 <String,ArrayList>
	private HashMap<String,String> markPoint;// 需要标示的值
	
	public void setDatalist(List<DataRow> datalist)
	{
		this.datalist = datalist;
	}
	
	public void setyFieldsName(HashMap<String, String> yFieldsName) {
		this.yFieldsName = yFieldsName;
	}

	public String getxFieldid() {
		return xFieldid;
	}

	public void setxFieldid(String xFieldid) {
		this.xFieldid = xFieldid;
	}

	public ArrayList<String> getyFields() {
		return yFields;
	}

	public void setyFields(ArrayList<String> yFields) {
		this.yFields = yFields;
	}
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getSubtitle() {
		return subtitle;
	}
	public void setSubtitle(String subtitle) {
		this.subtitle = subtitle;
	}
	public ArrayList<String> getxAxis() {
		return xAxis;
	}
	public void setxAxis(ArrayList<String> xAxis) {
		this.xAxis = xAxis;
	}
	public DataRow getyAxis() {
		return yAxis;
	}
	public void setyAxis(DataRow yAxis) {
		this.yAxis = yAxis;
	}
	public HashMap<String, String> getMarkPoint() {
		return markPoint;
	}
	public void setMarkPoint(HashMap<String, String> markPoint) {
		this.markPoint = markPoint;
	}
	//Map转换成字符串  key 为空时是把所有key变成字符串，否则是将对应的value变成字符串
	public String toStringFromMap(DataRow data ,String key)
	{
		StringBuffer itemstr = new StringBuffer();
		if(key==null)
		{
			Iterator iters = data.keySet().iterator();
			while(iters.hasNext())
			{
				String item = (String)iters.next();
				logger.debug(item);
				logger.debug(yFieldsName.toString());
				if(yFieldsName!=null&&yFieldsName.containsKey(item))
				{
					itemstr.append("'").append(yFieldsName.get(item)).append("',");
				}else{
					itemstr.append("'").append(item).append("',");
				}
			}
			if(itemstr.lastIndexOf(",")>0)
			{
				itemstr.delete(itemstr.lastIndexOf(","), itemstr.length());
			}
			
		}else{
			if(data.containsKey(key))
			{
				return toString((ArrayList)data.get(key)).replaceAll("'","");
			}
		}
		return itemstr.toString();
	}
	
	//ArrayList转换成字符串
	public String toString(ArrayList<String> list)
	{
		StringBuffer liststr = new StringBuffer();
		for(int i=0;i<list.size();i++)
		{
			if(list.get(i)==null||list.get(i).toString().equals(""))
			{
				liststr.append("'").append(0).append("'");
			}else{
				liststr.append("'").append(list.get(i)).append("'");
			}
			
			if(i<(list.size()-1))
			{
				liststr.append(",");
			}
		}
		return liststr.toString();
	}
	//通过纵轴字段解析数据
	public void excuteYData()
	{
		//横轴数据分析
		HashMap<String,String> xmap = new HashMap<String, String>();
		ArrayList<String> xlist = new ArrayList<String>();
		//纵轴数据整合
		DataRow ymap = new DataRow();
		for(int i=0;i<yFields.size();i++)
		{
			ymap.put(yFields.get(i), new ArrayList<Integer>());
		}
		for(int i=0;i<datalist.size();i++)
		{
			DataRow dataitem = datalist.get(i);
			if(!xmap.containsKey(dataitem.getString(xFieldid)))
			{
				xmap.put(dataitem.getString(xFieldid), dataitem.getString(xFieldid));
				xlist.add(dataitem.getString(xFieldid));
			}
			for(int j=0;j<yFields.size();j++)
			{
				ArrayList<String> ymaplist = (ArrayList<String>)ymap.get(yFields.get(j));
				ymaplist.add(dataitem.getString(yFields.get(j)));
			}
		}
		this.setxAxis(xlist);
		this.setyAxis(ymap);
	}
	//生成图表数据
	public String toString()
	{
		excuteYData();
		StringBuffer linestr = new StringBuffer();
		linestr.append(" {").append("\n");
		//标题
		linestr.append("\t").append("title : {").append("\n");
		linestr.append("\t").append("\t").append("text: '").append(title).append("',").append("\n");
		linestr.append("\t").append("\t").append("subtext: '").append(subtitle).append("'").append("\n");
		linestr.append("\t").append("},").append("\n");
		linestr.append("\t").append("tooltip : {").append("\n");
		linestr.append("\t\t").append("trigger: 'axis'").append("\n");
		linestr.append("\t").append("},").append("\n");
		linestr.append("\t").append("legend : {").append("\n");
		//分组数据
		linestr.append("\t\t").append("data: [").append(toStringFromMap(yAxis,null)).append("]").append("\n");
		linestr.append("\t").append("},").append("\n");
		linestr.append("\t").append("toolbox : {").append("\n");
		linestr.append("\t\t").append("show : true,").append("\n");
		linestr.append("\t\t").append("feature : {").append("\n");
		linestr.append("\t\t\t").append("mark : {show: true},").append("\n");
		linestr.append("\t\t\t").append("dataView : {show: true, readOnly: false},").append("\n");
		linestr.append("\t\t\t").append("magicType : {show: true, type: ['line', 'bar']},").append("\n");
		linestr.append("\t\t\t").append("restore : {show: true},").append("\n");
		linestr.append("\t\t\t").append("saveAsImage : {show: true}").append("\n");
		linestr.append("\t\t").append("}").append("\n");
		linestr.append("\t").append("},").append("\n");
		linestr.append("\t").append("calculable : true,").append("\n");
		//横坐标
		linestr.append("\t").append(" xAxis : [").append("\n");
		linestr.append("\t\t").append("{").append("\n");
		linestr.append("\t\t\t").append("type : 'category',").append("\n");
		linestr.append("\t\t\t").append("boundaryGap : false,").append("\n");
		linestr.append("\t\t\t").append("data : [").append(toString(xAxis)).append("]").append("\n");
		linestr.append("\t\t").append("}").append("\n");
		linestr.append("\t").append("],").append("\n");
		//纵坐标格式
		linestr.append("\t").append(" yAxis : [").append("\n");
		linestr.append("\t\t").append("{").append("\n");
		linestr.append("\t\t\t").append("type : 'value',").append("\n");
		linestr.append("\t\t\t").append("axisLabel : {").append("\n");
		linestr.append("\t\t\t\t").append("formatter: '{value}'").append("\n");
		linestr.append("\t\t\t").append("}").append("\n");
		linestr.append("\t\t").append("}").append("\n");
		linestr.append("\t").append("],").append("\n");
		//明细数据
		linestr.append("\t").append("series : [").append("\n");
		Iterator yitems = yAxis.keySet().iterator();
		while(yitems.hasNext())
		{
			String ykey = (String)yitems.next();
			linestr.append("\t\t").append("{").append("\n");
			if(yFieldsName.containsKey(ykey))
			{
				linestr.append("\t\t\t").append("name:'").append(yFieldsName.get(ykey)).append("',").append("\n");
			}else{
				linestr.append("\t\t\t").append("name:'").append(ykey).append("',").append("\n");
			}
			linestr.append("\t\t\t").append("type:'line',").append("\n");
			if(markPoint!=null)
			{
				linestr.append("\t\t\t").append("data:[").append(toStringFromMap(yAxis,ykey)).append("],").append("\n");
			}else{
				linestr.append("\t\t\t").append("data:[").append(toStringFromMap(yAxis,ykey)).append("]").append("\n");
			}
			//是否标注
			if(markPoint!=null&&markPoint.containsKey(ykey))
			{
				linestr.append("\t\t\t").append("markPoint : {").append("\n");
				linestr.append("\t\t\t\t").append("symbolSize:16,").append("\n");
				linestr.append("\t\t\t\t").append("data : [").append("\n");
				ArrayList ylist  = (ArrayList)yAxis.get(ykey);
				if(xAxis.size()==ylist.size())
				{
					for(int i=0;i<ylist.size();i++)
					{
						if(i<(ylist.size()-1))
						{
							linestr.append("\t\t\t\t\t").append("{name: '当前值',value :").append(ylist.get(i)).append(", xAxis: '").append(xAxis.get(i)).append("', yAxis: ").append(ylist.get(i)).append("},").append("\n");
						}else{
							linestr.append("\t\t\t\t\t").append("{name: '当前值',value :").append(ylist.get(i)).append(", xAxis: '").append(xAxis.get(i)).append("', yAxis: ").append(ylist.get(i)).append("}").append("\n");
						}						
					}
				}
				linestr.append("\t\t\t\t").append("]").append("\n");
				linestr.append("\t\t\t").append("}").append("\n");
			}
			
			if(yitems.hasNext())
			{
				linestr.append("\t\t").append("}").append(",").append("\n");
			}else{
				linestr.append("\t\t").append("}").append("\n");
			}
		}
		
		linestr.append("\t").append("]").append("\n");
		linestr.append("};").append("\n");
		
		return linestr.toString().replaceAll("\n","");
	}
}
