package com.tcb.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.tcb.annotation.CheckLogin;
import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.util.DateTimeUtil;
import com.tcb.util.FileUtil;
import com.tcb.util.GeneratorIDUtil;
import com.tcb.util.ResultByPageService;

@Controller
public class UploadController
{
	private static final Logger logger = LoggerFactory.getLogger(UploadController.class);
	@Autowired
	ResultByPageService rbpservice;
	@Autowired
	private DBService dbservice;

	/**
	 * @upfile 就是上面提到的upfile，要对应一致
	 */
	@RequestMapping(value = "/ueditor/upload/uploadimg", method = RequestMethod.POST)
	@ResponseBody
	public String upload(@RequestParam("upfile") MultipartFile upfile, HttpServletRequest request, HttpServletResponse response) throws Exception
	{
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		String result = "";
		String savePath =FileUtil.getAttachmentPath(request);
		if (savePath == null)
		{
			System.out.println(">> the get file path error!");
			return result;
		}
		FileOutputStream out = null;
		try
		{
			// 存放路径，如果不存在则创建路径
			File file = new File(savePath);
			if (!file.exists())
				file.mkdirs();
			System.out.println(file.getAbsolutePath());
			// 随机生成文件名，oname是原始文件名称
			// String fname = randomName(),
			String oname = upfile.getOriginalFilename();
			String fname = getName(oname);
			out = new FileOutputStream(savePath + "/" + fname);
			System.out.println(savePath + "/" + fname);
			out.write(upfile.getBytes());
			out.close();
			// {"name":"10571402926855858.jpg", "originalName": "china.jpg",
			// "size": 43086, "state": "SUCCESS", "type": ".jpg", "url":
			// "upload/20140616/10571402926855858.jpg"}
			// result返回的url参照IndexController._file方法
			result = "{\"name\":\"" + fname + "\", \"originalName\": \"" + oname + "\", \"size\": " + upfile.getSize() + ", \"state\": \"SUCCESS\", \"type\": \""
					+ this.getFileExt(oname) + "\", \"url\": \"" + savePath + "_" + fname + "\"}";
			result = result.replaceAll("\\\\", "\\\\");
		}
		catch (Exception e)
		{
		}
		finally
		{
			out.close();
		}

		return result;
	}

	/**
	 * 获得图片
	 * 
	 * @param path
	 *            图片路径：140615_xxx，格式为:datedir_filename
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "/ueditor/file/{path:.+}")
	public @ResponseBody void _file(@PathVariable String path, HttpServletRequest request, HttpServletResponse response)
	{
		// 这个path就是上面result的url
		// 因为我是多层目录所以就使用了_下划线代替/
		// 主要就是注意路径要对应一致就行了
		System.out.println(request.getRequestURL());
		System.out.println("path-->" + path);
		path = path.replaceAll("_", "/");
		FileInputStream in = null;
		OutputStream out = null;
		try
		{
			File file = new File(path);
			System.out.println(file.getAbsolutePath());
			in = new FileInputStream(file);
			byte[] b = new byte[(int) file.length()];
			in.read(b);
			in.close();
			response.setContentType("image/*");
			out = response.getOutputStream();
			out.write(b);
			out.flush();
			out.close();
		}
		catch (IllegalArgumentException e)
		{
			e.printStackTrace();
		}
		catch (SecurityException e)
		{
			e.printStackTrace();
		}
		catch (IOException e)
		{
			e.printStackTrace();
		}
		finally
		{
			try
			{
				if (in != null)
					in.close();
				if (out != null)
					out.close();
			}
			catch (IOException e)
			{
				e.printStackTrace();
			}
		}
	}

	/**
	 * 依据原始文件名生成新文件名
	 *
	 * @return
	 */
	private String getName(String fileName)
	{
		Random random = new Random();
		return random.nextInt(10000) + System.currentTimeMillis() + this.getFileExt(fileName);
	}

	/**
	 * 获取文件扩展名
	 *
	 * @return string
	 */
	private String getFileExt(String fileName)
	{
		return fileName.substring(fileName.lastIndexOf("."));
	}

	/**
	 * @upfile 就是上面提到的upfile，要对应一致
	 */
	@CheckLogin
	@RequestMapping(value = "/upload/uploadfile", method = RequestMethod.POST)							   
	@ResponseBody
	public String testUpload(@RequestParam("myfile") MultipartFile upfile, HttpServletRequest request, HttpServletResponse response) throws IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		DataRow param = rbpservice.getParamByRequest(request);
		logger.debug(param.toString());
		logger.debug("uploadfile ..." + upfile.getName());
		String uploadpath = param.getString("uploadpath");
		if (!param.containsKey("uploadpath") || uploadpath==null||uploadpath.isEmpty())
		{
			param.put("jquery-upload-file-error", "上传路径错误！");
			logger.debug(JSON.toJSONString(param));
			return JSON.toJSONString(param);
		}
		String dirpath=FileUtil.getAttachmentPath(request);
		FileOutputStream out = null;
		try
		{
			// 存放路径，如果不存在则创建路径
			File file = new File(dirpath+uploadpath);
			if (!file.exists())
				file.mkdirs();
			System.out.println(file.getAbsolutePath());
			String oname = upfile.getOriginalFilename();
			// 随机生成文件名，oname是原始文件名称
			String fname = getName(oname);
			out = new FileOutputStream(dirpath+uploadpath + "/" + fname);
			System.out.println(dirpath+uploadpath + "/" + fname);
			out.write(upfile.getBytes());
			out.close();
			param.put("url", uploadpath + "/" + fname);
			if(param.containsKey("tablename")&&param.getString("tablename")!=null&&!param.getString("tablename").isEmpty())
			{
				param.put("TaskAttachmentID",GeneratorIDUtil.generatorId());
				param.put("attachmenturl", uploadpath + "/" + fname);
				param.put("attachmentname",oname);
				param.put("createstaffid", ((DataRow) request.getSession().getAttribute("OnlineStaff")).getString("staffid"));
				param.put("createtime", DateTimeUtil.getNowDateStr());
				param.put("flag", "1");
				dbservice.Insert(param.getString("tablename"), param);
			}
		}
		catch (Exception e)
		{
		}
		finally
		{
			out.close();
		}
		return JSON.toJSONString(param);
	}

}
