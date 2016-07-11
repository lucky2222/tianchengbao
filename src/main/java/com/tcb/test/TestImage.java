package com.tcb.test;

import java.awt.Graphics;
import java.awt.Image;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.awt.image.CropImageFilter;
import java.awt.image.FilteredImageSource;
import java.awt.image.ImageFilter;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;

import javax.imageio.ImageIO;

public class TestImage {
	/**
	 * 根据原目录中的文件列表，更新目标目录中的app图片
	 * @param srcpath
	 * @param destpath
	 */
	public void appImageInit(String srcpath,String destpath)
	{
		//首先变量目标目录
		HashMap descmap = new HashMap();
		File root = new File(destpath);
	    File[] files = root.listFiles();
	    for(File file : files){
	    	if(file.isFile())//跳过目录只是处理文件
	    	{
	    		descmap.put(file.getName(),file.lastModified());//记录已生成文件
	    	}
	    }
	    //然后开始遍历源文件
	    File src = new File(srcpath);
	    File[] srcfiles = src.listFiles();
	    for(File file : srcfiles){
	    	if(file.isFile())//跳过目录只是处理文件
	    	{
	    		int end = file.getName().lastIndexOf(".");
	    		if(end>0)
	    		{
		    		String ExtName = file.getName().substring(end);
		    		if(ExtName!=null&&(ExtName.toLowerCase().equals(".jpg")||ExtName.toLowerCase().equals(".gif")||ExtName.toLowerCase().equals(".png")||ExtName.toLowerCase().equals(".bmp")||ExtName.toLowerCase().equals(".jpeg")))
		    		{//确认是图片格式，开始处理
		    			if(!descmap.containsKey(file.getName())||file.lastModified()>(Long)descmap.get(file.getName()))
		    			{//没有生成过app图片，或者图片已重新编辑过
		    				createAppImage(file.getAbsolutePath(),root.getAbsolutePath()+"/"+file.getName());
		    			}
		    		}
	    		}
	    	}
	    }
	}
	/**
	 * 将图片截取缩放到响应大小，不失真，但截取
	 * @param srcImageFile
	 * @param destImageFile
	 */
	public void createAppImage(String srcImageFile,String destImageFile)
	{
		System.out.println(srcImageFile+"...to..."+destImageFile);
		BufferedImage src;
		try {
			src = ImageIO.read(new File(srcImageFile));
			if(src==null)
			{
				return ;
			}
			int width = src.getWidth(); // 得到源图宽
	        int height = src.getHeight(); // 得到源图长
	        //开始截图，截成正方形
	        int x =0;
	        int y=0;
	        if(width>height)
	        {
	        	width = height;
	        }else{
	        	height = width;
	        }
	        ImageFilter cropFilter = new CropImageFilter(x, y, width, height);
	        Image img = Toolkit.getDefaultToolkit().createImage(
	                new FilteredImageSource(src.getSource(),
	                        cropFilter));
	        //开始缩放成响应大小
	        width = 90;
	        height =90;
	        Image image = img.getScaledInstance(width, height,
	                Image.SCALE_DEFAULT);
	        BufferedImage tag = new BufferedImage(width, height,
	                BufferedImage.TYPE_INT_RGB);
	        Graphics g = tag.getGraphics();
	        g.drawImage(image, 0, 0, null); // 绘制缩小后的图
	        g.dispose();
	        ImageIO.write(tag, "JPEG", new File(destImageFile));// 输出到文件流
		} catch (IOException e) {
			e.printStackTrace();
		} 
	}
	
	public static void main(String[] args) throws Exception {
		TestImage ti = new TestImage();
		ti.appImageInit("/opt/tcb/uploads/articleshowimg","/opt/tcb/uploads/appimg");
	}

}
