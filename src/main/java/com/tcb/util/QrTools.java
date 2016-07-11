package com.tcb.util;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

public class QrTools {
	private static final int BLACK = 0xff000000;
	private static final int WHITE = 0xFFFFFFFF;
	
	/**
	 * 生成普通二维码
	 * @param content
	 * @return 二维码的地址
	 * @throws WriterException 
	 * @throws IOException 
	 */
	public String createQr(String content) throws WriterException, IOException
	{
		String qrurl="";
		
		String fileName=GeneratorIDUtil.generatorId()+".png";
		
		int width = 200; // 图像宽度
		int height = 200; // 图像高度
		String format = "png";// 图像类型
		Map<EncodeHintType, Object> hints = new HashMap<EncodeHintType, Object>();

		// 指定纠错等级
		hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
		// 指定编码格式
		hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
		//边缘留白
		hints.put(EncodeHintType.MARGIN, 1);
		
		BitMatrix bitMatrix = new MultiFormatWriter().encode(content,BarcodeFormat.QR_CODE, width, height, hints);// 生成矩阵
		BufferedImage image = new BufferedImage(width, height,
				BufferedImage.TYPE_INT_RGB);
		for (int x = 0; x < width; x++) {
			for (int y = 0; y < height; y++) {
				image.setRGB(x, y, bitMatrix.get(x, y) ? BLACK : WHITE);
			}
		}
		
		File file = new File(fileName);
		System.out.println(file.getAbsolutePath());
		if (!ImageIO.write(image, format, file)) {
			throw new IOException("Could not write an image of format "
					+ format + " to " + file);
		}
		System.out.println("输出成功.");
		return qrurl;
	}
	/**
	 * 生成带汉字的二维码
	 * @param name //二维码中间显示汉字
	 * @param content //二维码内容
	 * @throws WriterException
	 * @throws IOException
	 */
	public void createQr(String name,String content) throws WriterException, IOException {
		//中间文字尺寸等
		int nameheight=18;//高度
		int namewidth = name.length()*15;//长度
		int namstartx =  (200-namewidth)/2;
		int namstarty = (200-nameheight)/2;
		
		String fileName = "name.png";
		int width = 200; // 图像宽度
		int height = 200; // 图像高度
		String format = "png";// 图像类型
		Map<EncodeHintType, Object> hints = new HashMap<EncodeHintType, Object>();

		// 指定纠错等级
		hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
		// 指定编码格式
		hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
		BitMatrix bitMatrix = new MultiFormatWriter().encode(content,
				BarcodeFormat.QR_CODE, width, height, hints);// 生成矩阵
		BufferedImage image = new BufferedImage(width, height,
				BufferedImage.TYPE_INT_RGB);
		// 获取图形上下文 
		Graphics g = image.getGraphics();
		g.setColor(Color.white);
		g.fillRect(namstartx,namstarty,namewidth,nameheight);//画着色块
		g.setColor(Color.black);
		g.drawRect(namstartx,namstarty,namewidth,nameheight);//画线框
		Font font = new Font("微软雅黑", Font.BOLD, 14);
		g.setFont(font);
		g.drawString(name, namstartx+2,namstarty+14);
		
		for (int x = 0; x < width; x++) {
			for (int y = 0; y < height; y++) {
				if(!(x>namstartx-1&&x<(namstartx+namewidth+2)&&y>namstarty-1&&y<(namstarty+nameheight+2)))
				{
					image.setRGB(x, y, bitMatrix.get(x, y) ? BLACK : WHITE);
				}
			}
		}
		
		File file = new File(fileName);
		System.out.println(file.getAbsolutePath());
		if (!ImageIO.write(image, format, file)) {
			throw new IOException("Could not write an image of format "
					+ format + " to " + file);
		}
		System.out.println("输出成功.");
	}
	
	/**
	 * 生成带logo的二维码
	 * @param content
	 * @param imageurl  logo的地址
	 * @throws WriterException
	 * @throws IOException
	 */
	public void createQrByImage(String content,String imageurl) throws WriterException, IOException
	{
		//中间文字尺寸等
				String fileName = "image.png";
				int width = 200; // 图像宽度
				int height = 200; // 图像高度
				String format = "png";// 图像类型
				Map<EncodeHintType, Object> hints = new HashMap<EncodeHintType, Object>();

				// 指定纠错等级
				hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
				// 指定编码格式
				hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
				BitMatrix bitMatrix = new MultiFormatWriter().encode(content,
						BarcodeFormat.QR_CODE, width, height, hints);// 生成矩阵
				BufferedImage image = new BufferedImage(width, height,
						BufferedImage.TYPE_INT_RGB);
				
				for (int x = 0; x < width; x++) {
					for (int y = 0; y < height; y++) {
						image.setRGB(x, y, bitMatrix.get(x, y) ? BLACK : WHITE);
					}
				}
				
				int logoWidth = image.getWidth()/4;   //设置logo图片宽度为二维码图片的五分之一 
			    int logoHeight = image.getHeight()/4; //设置logo图片高度为二维码图片的五分之一 
			    int logoX = (image.getWidth()-logoWidth)/2;   //设置logo图片的位置,这里令其居中 
			    int logoY = (image.getHeight()-logoHeight)/2; //设置logo图片的位置,这里令其居中 
			    Graphics2D graphics = image.createGraphics(); 
			    graphics.drawImage(ImageIO.read(new File(imageurl)), logoX, logoY, logoWidth, logoHeight, null); 
			    graphics.dispose(); 
				
				File file = new File(fileName);
				System.out.println(file.getAbsolutePath());
				if (!ImageIO.write(image, format, file)) {
					throw new IOException("Could not write an image of format "
							+ format + " to " + file);
				}
				System.out.println("输出成功.");
	}
	public static void main(String[] args) throws WriterException, IOException {
		QrTools test = new QrTools();
		test.createQr("http://www.oschina.net/");
		// test.testDecode();
		test.createQr("汉字测试","http://www.oschina.net/");
		test.createQrByImage("测试成功", "D:\\sts-bundle\\workspace\\test\\APL.PNG");
	}

}
