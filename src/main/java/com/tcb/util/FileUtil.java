package com.tcb.util;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.URLEncoder;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tcb.dao.base.DataRow;
import com.tcb.dao.base.StaticCache;
import com.tcb.view.ViewExcel;

public class FileUtil {
	private final static Logger logger = LoggerFactory
			.getLogger(FileUtil.class);

	/**
	 * 
	 * 读取Excel的内容，第一维数组存储的是一行中格列的值，二维数组存储的是多少个行
	 * 
	 * @param file
	 *            读取数据的源Excel
	 * 
	 * @param ignoreRows
	 *            读取数据忽略的行数，比喻行头不需要读入 忽略的行数为1
	 * 
	 * @return 读出的Excel中数据的内容
	 * 
	 * @throws FileNotFoundException
	 * 
	 * @throws IOException
	 */
	public static List<DataRow> getData(File file, int ignoreRows,
			String[] titleArr) throws FileNotFoundException, IOException {
		// List<String[]> result = new ArrayList<String[]>();
		List<DataRow> resultDr = new ArrayList<DataRow>();
		BufferedInputStream in = new BufferedInputStream(new FileInputStream(
				file));
		// 打开HSSFWorkbook
		POIFSFileSystem fs = new POIFSFileSystem(in);
		HSSFWorkbook wb = new HSSFWorkbook(fs);
		HSSFCell cell = null;
		// for (int sheetIndex = 0; sheetIndex < wb.getNumberOfSheets();
		// sheetIndex++) {
		for (int sheetIndex = 0; sheetIndex < 1; sheetIndex++) {
			HSSFSheet st = wb.getSheetAt(sheetIndex);
			// 第一行为标题
			HSSFRow rowTitle = st.getRow(0);
			List<String> titleValues = new ArrayList<String>();
			if (rowTitle == null) {
				continue;
			}
			for (short columnIndex = 0; columnIndex <= rowTitle
					.getLastCellNum(); columnIndex++) {
				String value = "";
				cell = rowTitle.getCell(columnIndex);
				if (cell != null) {
					// 注意：一定要设成这个，否则可能会出现乱码
					// cell.setEncoding(HSSFCell.ENCODING_UTF_16);
					switch (cell.getCellType()) {
					case HSSFCell.CELL_TYPE_STRING:
						value = cell.getStringCellValue();
						break;
					case HSSFCell.CELL_TYPE_NUMERIC:
						if (HSSFDateUtil.isCellDateFormatted(cell)) {
							Date date = cell.getDateCellValue();
							if (date != null) {
								value = new SimpleDateFormat("yyyy-MM-dd")
										.format(date);
							} else {
								value = "";
							}
						} else {
							value = new DecimalFormat("0").format(cell
									.getNumericCellValue());
						}
						break;
					case HSSFCell.CELL_TYPE_FORMULA:
						// 导入时如果为公式生成的数据则无值
						if (!cell.getStringCellValue().equals("")) {
							value = cell.getStringCellValue();
						} else {
							value = cell.getNumericCellValue() + "";
						}
						break;
					case HSSFCell.CELL_TYPE_BLANK:
						break;
					case HSSFCell.CELL_TYPE_ERROR:
						value = "";
						break;
					case HSSFCell.CELL_TYPE_BOOLEAN:
						value = (cell.getBooleanCellValue() == true ? "Y" : "N");
						break;
					default:
						value = "";
					}
				}
				value = rightTrim(value);
				if (value.trim().equals("")) {
					break;
				}
				if (titleArr != null) {
					if (columnIndex >= titleArr.length
							|| !titleArr[columnIndex].equals(value)) {
						DataRow dr = new DataRow();
						dr.put("Error", "表头与模板不符");
						resultDr.add(dr);
						return resultDr;
					}
				}
				titleValues.add(value);
			}
			for (int rowIndex = ignoreRows; rowIndex <= st.getLastRowNum(); rowIndex++) {
				HSSFRow row = st.getRow(rowIndex);
				if (row == null) {
					break;
					// continue;
				}
				// int tempRowSize = row.getLastCellNum() + 1;
				DataRow valuesDr = new DataRow();
				// String[] values = new String[rowSize];
				// Arrays.fill(values, "");
				// for (short columnIndex = 0; columnIndex <=
				// row.getLastCellNum(); columnIndex++) {
				for (short columnIndex = 0; columnIndex < titleValues.size(); columnIndex++) {
					String value = "";
					cell = row.getCell(columnIndex);
					if (cell != null) {
						// 注意：一定要设成这个，否则可能会出现乱码
						// cell.setEncoding(HSSFCell.ENCODING_UTF_16);
						switch (cell.getCellType()) {
						case HSSFCell.CELL_TYPE_STRING:
							value = cell.getStringCellValue();
							break;
						case HSSFCell.CELL_TYPE_NUMERIC:
							if (HSSFDateUtil.isCellDateFormatted(cell)) {
								Date date = cell.getDateCellValue();
								if (date != null) {
									value = new SimpleDateFormat("yyyy-MM-dd")
											.format(date);
								} else {
									value = "";
								}
							} else {
								cell.setCellType(HSSFCell.CELL_TYPE_STRING);
								value = cell.getStringCellValue();
								// String numberVal = cell
								// .getNumericCellValue() + "";
								// if (numberVal.endsWith(".0"))
								// {
								// numberVal = numberVal.substring(0,
								// numberVal.length() - 2);
								// }
								// if (!StringUtil.isNullOrEmpty(numberVal))
								// {
								// if (numberVal.contains("."))
								// {
								// value = numberVal;
								// }
								// else
								// {
								// value = new DecimalFormat("0")
								// .format(cell
								// .getNumericCellValue());
								// }
								// }
							}
							break;
						case HSSFCell.CELL_TYPE_FORMULA:
							// 导入时如果为公式生成的数据则无值
							if (!cell.getStringCellValue().equals("")) {
								value = cell.getStringCellValue();
							} else {
								value = cell.getNumericCellValue() + "";
							}
							break;
						case HSSFCell.CELL_TYPE_BLANK:
							break;
						case HSSFCell.CELL_TYPE_ERROR:
							value = "";
							break;
						case HSSFCell.CELL_TYPE_BOOLEAN:
							value = (cell.getBooleanCellValue() == true ? "Y"
									: "N");
							break;
						default:
							value = "";
						}
					}
					if (columnIndex == 0 && value.trim().equals("")) {
						break;
					}
					valuesDr.put(titleValues.get(columnIndex), rightTrim(value));
				}
				if (valuesDr.keySet().size() > 0) {
					resultDr.add(valuesDr);
					// result.add(values);
				}
			}
		}
		in.close();
		// String[][] returnArray = new String[result.size()][rowSize];
		//
		// for (int i = 0; i < returnArray.length; i++) {
		//
		// returnArray[i] = (String[]) result.get(i);
		//
		// }
		//
		// return returnArray;
		return resultDr;
	}

	/**
	 * 
	 * 去掉字符串右边的空格
	 * 
	 * @param str
	 *            要处理的字符串
	 * 
	 * @return 处理后的字符串
	 */
	public static String rightTrim(String str) {
		if (str == null) {
			return "";
		}
		int length = str.length();
		for (int i = length - 1; i >= 0; i--) {
			if (str.charAt(i) != 0x20) {
				break;
			}
			length--;
		}
		return str.substring(0, length).replace(" ", " ").trim();
	}

	/**
	 * 
	 * 导出txt
	 * 
	 * @throws IOException
	 *
	 */
	public static void exportTxtFile(String filename, byte[] content,
			HttpServletResponse response) throws IOException {
		response.setContentType("text/plain");
		response.setHeader("Content-disposition", "attachment;filename=\"" + filename + ".txt" +"\"");
		OutputStream ouputStream = response.getOutputStream();
		ouputStream.write(content);
		ouputStream.flush();
		ouputStream.close();
	}
	
	
	/**
	 * 
	 * 导出excel
	 * 
	 * @throws IOException
	 *
	 */
	public static void exportExcelFile(String filename, byte[] content,
			HttpServletResponse response) throws IOException {
		
		response.setCharacterEncoding("GBK"); 
		response.setContentType("application/vnd.ms-excel;charset=UTF-8");
		response.setHeader("Content-disposition", "attachment;filename=\""
				+ new String(filename.getBytes("gb2312"), "ISO8859-1" ) + ".xls"+"\"");
		OutputStream ouputStream = response.getOutputStream();
		ouputStream.write(content);
		ouputStream.flush();
		ouputStream.close();
	}


	public static void createTxtFile(String filename, String dir, String context)
			throws Exception {
		// TODO Auto-generated method stub
		logger.debug("createTxtFile-----filename:" + filename);
		logger.debug("createTxtFile-----dir:" + dir);
		if (StringUtil.isNullOrEmpty(filename) || StringUtil.isNullOrEmpty(dir)) {
			throw new Exception("文件名、或路径不合法！");
		}
		FileOutputStream out = null;
		OutputStreamWriter osw = null;
		File filePath = new File(dir);
		if (!filePath.exists()) {
			filePath.mkdirs();
		}
		out = new FileOutputStream(dir +java.io.File.separator+filename);
		osw = new OutputStreamWriter(out, "UTF-8");
		osw.write(context);
		osw.flush();
		osw.close();
		out.close();
	}

	public static void download(String filename, String path,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// TODO Auto-generated method stub
		logger.debug("download----filename:" + filename);
		logger.debug("download----path:" + path);

		if (StringUtil.isNullOrEmpty(filename)
				|| StringUtil.isNullOrEmpty(path)) {
			throw new Exception("文件名、或路径无效！");
		}

		if (request.getHeader("User-Agent").toUpperCase().indexOf("MSIE") > 0) {
			filename = URLEncoder.encode(filename, "UTF-8");
		} else {
			filename = new String(filename.getBytes("UTF-8"), "ISO8859-1");
		}

		// 设置response相应属性，设置为下载
		response.setContentType("application/x-msdownload");
		response.setHeader("Content-Disposition", "attachment;filename=\""
				+ filename+"\"");
		// 获得response中的输出流
		OutputStream out = response.getOutputStream();
		InputStream inStream = new FileInputStream(path);
		byte[] b = new byte[1024];
		int len;

		while ((len = inStream.read(b)) > 0) {
			out.write(b, 0, len);
		}
		inStream.close();
		out.flush();
		out.close();
	}
	
	public static void OutputExcel(String filename, String suffix,
			HSSFWorkbook workbook, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		ViewExcel viewexcel = new ViewExcel();
		filename = filename + DateTimeUtil.getNowDateStr() + suffix;// 设置下载时客户端Excel的名称
		filename = viewexcel.encodeFilename(filename, request);// 处理中文文件名
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-disposition", "attachment;filename=\""
				+ filename+"\"");
		OutputStream ouputStream = response.getOutputStream();
		workbook.write(ouputStream);
		ouputStream.flush();
		ouputStream.close();
	}
	/**
	 * 获取附件上传根目录
	 */
	public static String getAttachmentPath(HttpServletRequest request){
		
		Properties prop = System.getProperties();
		String os = prop.getProperty("os.name");
		if(os.startsWith("win") || os.startsWith("Win"))
		{
			//return "D:\\seawork"+java.io.File.separator+"webapp";
			return StaticCache.getConfigByKey("winuploadrootpath");
		}else
		{
			//return java.io.File.separator+"home"+java.io.File.separator+"seawork"+java.io.File.separator+"webapp";
			return StaticCache.getConfigByKey("linuxuploadrootpath");
		}

	}
	
	  /** 
     * 读取文件 
     *  
     * @param file 
     *            文件路径 
     * @return 返回二进制数组 
     */  
    @SuppressWarnings("resource")
	public static String readFile(String file) {  
        FileInputStream fis = null;  
        ByteArrayOutputStream bos = null;  
        try {  
            fis = new FileInputStream(file);  
            bos = new ByteArrayOutputStream();  
            int bytesRead;  
            byte buffer[] = new byte[1024 * 1024];  
            while ((bytesRead = fis.read(buffer)) != -1) {  
                bos.write(buffer, 0, bytesRead);  
                Arrays.fill(buffer, (byte) 0);  
            }  
        } catch (IOException e1) {  
            e1.printStackTrace();  
        } finally {  
            try {  
                if (bos != null)  
                    bos.close();  
            } catch (IOException e) {  
                e.printStackTrace();  
            }  
        }  
        return bos.toString();  
    }  

}
