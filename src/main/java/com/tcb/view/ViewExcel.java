package com.tcb.view;

import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.view.document.AbstractExcelView;

import com.sun.xml.internal.messaging.saaj.packaging.mime.internet.MimeUtility;
import com.tcb.dao.base.DataRow;
import com.tcb.dao.base.ResultByPage;
import com.tcb.util.DateTimeUtil;

public class ViewExcel extends AbstractExcelView {
	private static final Logger logger = LoggerFactory.getLogger(ViewExcel.class);
	@Override
	protected void buildExcelDocument(Map model, HSSFWorkbook workbook,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// TODO Auto-generated method stub
		String sheetname = "列表";
		if(request.getAttribute("PageTitle")!=null)
		{
			sheetname =request.getAttribute("PageTitle").toString();
		}
		logger.debug("Excel model->"+model.toString());
		HSSFSheet sheet = workbook.createSheet(sheetname);
		HSSFCellStyle headStyle = workbook.createCellStyle();
		//字体
		HSSFFont f  = workbook.createFont();
		f.setFontHeightInPoints((short) 11);// 字号
		f.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);// 加粗   
		headStyle.setFont(f);
		//四面边框
		headStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN );// 下边框   
		headStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);// 左边框   
		headStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);// 右边框   
		headStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);// 上边框   
		//底色 黄
		headStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		headStyle.setFillForegroundColor(HSSFColor.YELLOW.index);
		//内容样式
		HSSFCellStyle resultStyle = workbook.createCellStyle();
		resultStyle.setWrapText(true);
		resultStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN );// 下边框   
		resultStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);// 左边框   
		resultStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);// 右边框   
		resultStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);// 上边框   
		// dateStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("mm/dd/yyyy"));
		logger.debug("Excel model result->"+model.containsKey("modelAndView"));
		Pattern pattern = Pattern.compile("^(\\-|\\+)?\\d+(\\.\\d+)?$");
		
		if(model.containsKey("result"))
		{
			ResultByPage result = (ResultByPage)model.get("result");
			List<DataRow> fieldlist = result.getFieldlist();
			if(fieldlist.size()>0)
			{
				HSSFRow headRow = sheet.createRow(0);
				logger.debug("Excel headRow->"+headRow.toString());
				for(int i=0;i<fieldlist.size();i++)
				{
					DataRow field = fieldlist.get(i);
					HSSFCell temp =  headRow.createCell(i);
					temp.setCellType(HSSFCell.CELL_TYPE_STRING);
					temp.setCellValue(field.getString("fieldname"));
					temp.setCellStyle(headStyle);
				}
				List<DataRow> resultlist = result.getResultlist();
				if(resultlist.size()>0)
				{
					for(short i=0;i<resultlist.size();i++)
					{
						HSSFRow resultRow = sheet.createRow(i+1);
						for(int j=0;j<fieldlist.size();j++)
						{
							DataRow field = fieldlist.get(j);
							HSSFCell temp =  resultRow.createCell(j);
							if(resultlist.get(i).getString(field.getString("fieldid"))!=null&&pattern.matcher(resultlist.get(i).getString(field.getString("fieldid"))).matches())
							{
								temp.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
								temp.setCellValue(resultlist.get(i).getBigDecimal(field.getString("fieldid")).doubleValue());
							}else{
								temp.setCellType(HSSFCell.CELL_TYPE_STRING);
								temp.setCellValue(new HSSFRichTextString(resultlist.get(i).getString(field.getString("fieldid"))));
							}
							temp.setCellStyle(resultStyle);
						}
					}
				}
			}
		}
		String filename = sheetname+DateTimeUtil.getNowDayStr()+".xls";// 设置下载时客户端Excel的名称
		filename = encodeFilename(filename, request);// 处理中文文件名
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-disposition", "attachment;filename="
				+ filename);
		OutputStream ouputStream = response.getOutputStream();
		workbook.write(ouputStream);
		ouputStream.flush();
		ouputStream.close();
	}

	public String encodeFilename(String filename, HttpServletRequest request) {
		/**
		 * 获取客户端浏览器和操作系统信息 在IE浏览器中得到的是：User-Agent=Mozilla/4.0 (compatible; MSIE
		 * 6.0; Windows NT 5.1; SV1; Maxthon; Alexa Toolbar)
		 * 在Firefox中得到的是：User-Agent=Mozilla/5.0 (Windows; U; Windows NT 5.1;
		 * zh-CN; rv:1.7.10) Gecko/20050717 Firefox/1.0.6
		 */
		String agent = request.getHeader("USER-AGENT");
		try {
			if ((agent != null) && (-1 != agent.indexOf("MSIE"))) {
				String newFileName = URLEncoder.encode(filename, "UTF-8");
				newFileName = StringUtils.replace(newFileName, "+", "%20");
				if (newFileName.length() > 150) {
					newFileName = new String(filename.getBytes("GB2312"),
							"ISO8859-1");
					newFileName = StringUtils.replace(newFileName, " ", "%20");
				}
				return newFileName;
			}
			if ((agent != null) && (-1 != agent.indexOf("Mozilla")))
				return MimeUtility.encodeText(filename, "UTF-8", "B");

			return filename;
		} catch (Exception ex) {
			return filename;
		}
	}
}
