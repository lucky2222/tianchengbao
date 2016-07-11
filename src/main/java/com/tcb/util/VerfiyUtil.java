package com.tcb.util;

import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class VerfiyUtil
{
	private static final Logger logger = LoggerFactory.getLogger(FunctionUtil.class);
	
	/**
	 * 箱号校验
	 * author gening
	 * date 2015年4月8日
	 * @param v 待校验的箱号
	 * @return
	 */
	public static boolean VerfiyContainer(String v)
    {
		logger.debug("VerfiyContainer ---------"+v);
        try
        {
            Pattern pattern = Pattern.compile("^[A-Z]{4}[0-9]{7}$");
            if(!pattern.matcher(v).matches())
            {
                return false;
            }
            char[] ctnele = v.toCharArray();
            int total = 0;
            for (int i = 0; i < ctnele.length-1; i++)
            {
                if (i<4)
                {
                    int n = ctnele[i]-55+((ctnele[i]-55)/11);
                    if (n%11==0||(n%11==1 && n/11 == 3))
                    {
                        n++;
                    }
                    total += n * Math.pow(2, i);
                }
                else
                {
                    int n = ctnele[i]-48;
                    total += n*Math.pow(2, i);
                }
            }
            
            int mod = total%11;
            if (mod == 0 || mod==10 || ctnele[10]-48 == mod)
            {
                return true;
            }
            return false;
        }
        catch (Exception e)
        {
        	e.printStackTrace();
			logger.debug("VerfiyContainer---Error:"+e.getMessage());
            return false;
        }
    }
	
	/**
	 * 仅包含字母或数字 校验
	 * author gening
	 * date 2015年4月8日
	 * @param v 待校验字符串
	 * @return
	 */
	public static boolean VerfiyLetterNumber(String v)
	{
		logger.debug("VerfiyLetterNumber ---------"+v);
        try
        {
            Pattern pattern = Pattern.compile("^[A-Z0-9]+$");
            return pattern.matcher(v).matches();
        }
        catch (Exception e)
        {
        	e.printStackTrace();
			logger.debug("VerfiyLetterNumber---Error:"+e.getMessage());
            return false;
        }
	}
	
	/**
	 * 正整数校验--正则
	 * author gening
	 * date 2015年4月9日
	 * @param v
	 * @param flag true:非0开头，false:可包含0开头
	 * @return
	 */
	public static boolean VerfiyNumber(String v,boolean flag)
	{
		try
		{
			String regex = "";
			if (flag)
			{
				regex = "^([1-9][0-9]*)$";
			}
			else
			{
				regex = "^[0-9]+$";
			}
			Pattern pattern = Pattern.compile(regex);
	        return pattern.matcher(v).matches();
		} catch (Exception e)
		{
			e.printStackTrace();
			logger.debug("VerfiyNumber---Error:"+e.getMessage());
			return false;
		}
	}
	
	public static boolean VerfiyFloadNumber(String v,int n,boolean flag)
	{
		try
		{
			String regex = "^[0-9]+(\\.[0-9]{1,"+n+"}){0,1}$";
			if (flag)
			{
				regex += "|^[1-9][0-9]*$";
			}
			
			return Pattern.compile(regex).matcher(v).matches();
		}
		catch (Exception e)
		{
			e.printStackTrace();
			logger.debug("VerfiyFloadNumber---Error:"+e.getMessage());
			return false;
		}
	}
}
