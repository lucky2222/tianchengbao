package com.tcb.controller;

import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.dao.base.ResultByPage;
import com.tcb.util.AutoCompleteUtil;
import com.tcb.util.ResultByPageService;

@Controller
public class TestController {
	private static final Logger logger = LoggerFactory
			.getLogger(TestController.class);
	
	@Autowired
	ResultByPageService rbpservice;
	@Autowired
	private DBService dbservice;
	
	@RequestMapping(value = "/sysmanage/menubytagsifriam", method = RequestMethod.GET)
	public String login()
	{
		return "sysmanage/menubytagsifriam";
	}
	
	/**
	 * 测试导出pdf的压缩文件
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/test/testpdfzip", method = RequestMethod.GET)
	public void testpdfzip(HttpServletResponse response) throws Exception
	{
		response.setCharacterEncoding("utf-8");  
        response.setContentType("multipart/form-data");  
        response.setHeader("Content-Disposition", "attachment;fileName=导出Pdf.zip");
        OutputStream os=response.getOutputStream();
        ZipOutputStream out = new ZipOutputStream(os);
        for(int i=0;i<3;i++)
        {
        	out.putNextEntry(new ZipEntry("公司名字"+i+".pdf"));
        	out.write(getPdf("公司名字"+i).toByteArray());
        }
        out.closeEntry();
        out.close();
	}
	/**
	 * 生成PDF
	 * @param name
	 * @return
	 */
	public ByteArrayOutputStream getPdf(String name)
	{
		Document doc = new Document();
		ByteArrayOutputStream bout= null;
		try{
			bout=new ByteArrayOutputStream();
			PdfWriter.getInstance(doc,bout);
			doc.open();
			
			BaseFont bfChinese = BaseFont.createFont("STSong-Light", "UniGB-UCS2-H", BaseFont.NOT_EMBEDDED); 
			Font FontChinese = new Font(bfChinese, 12, Font.NORMAL);
			doc.add(new Paragraph("测试表格"+name,FontChinese));
			doc.addTitle("test table");
			doc.addAuthor("zuozhe");
			doc.addSubject("zhuti");

			PdfPTable table = new PdfPTable(3);
	        table.setTotalWidth(new float[]{ 144, 72, 72});
	        table.setLockedWidth(true);
	        PdfPCell cell;
	        cell = new PdfPCell(new Phrase("Table 5"));
	        cell.setColspan(3);
	        table.addCell(cell);
	        cell = new PdfPCell(new Phrase("Cell with rowspan 2"));
	        cell.setRowspan(2);
	        table.addCell(cell);
	        table.addCell("row 1; cell 1");
	        table.addCell("row 1; cell 2");
	        table.addCell("row 2; cell 1");
	        table.addCell("row 2; cell 2");
	        
			doc.add(table);
			
			doc.close();
			
		}catch(Exception e){
			e.printStackTrace();
		}
		return bout;
	}
	/**
	 * 测试多选框
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/test/multipleselect", method = RequestMethod.GET)
	@ResponseBody
	public Object testMultipleSelect(HttpServletRequest request)
			throws Exception {
		 ResultByPage param = rbpservice.getByRequest(request);
//		 param.getCondition().put(
//				"staffid",
//				((DataRow) request.getSession().getAttribute("OnlineStaff"))
//						.getString("staffid"));
		 param.setPerpage(500);
		
		dbservice.selectListByPage("code_code.selectAllCodePath", param);
		return AutoCompleteUtil.generatorMultipleSelectTable(param);
	}
	
	@RequestMapping(value = "/test/testbatchinsert", method = RequestMethod.GET)
	@ResponseBody
	public Object testBatchInsert(HttpServletRequest request)
			throws Exception {
		List<DataRow> ladingbillnos  = dbservice.queryForList("select ladingbillno from tl_ordercargodetail a where a.ETD='2015-07-26'");
		logger.debug("ladingbillnos.size:"+ladingbillnos.size());
		dbservice.batchInsert("ti_ladingbillnetinfo", ladingbillnos);
		return "testbatchinsert is ok";
	}
}
