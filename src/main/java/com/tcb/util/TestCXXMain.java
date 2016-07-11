package com.tcb.util;

import java.security.MessageDigest;

public class TestCXXMain {
	// 全局数组
	private final static String[] strDigits = { "0", "1", "2", "3", "4", "5",
			"6", "7", "8", "9", "a", "b", "c", "d", "e", "f" };
	public static void main(String[] args) throws Exception {
		String resultString = new String("11136dmVyaWZ5X2Zvcj11c2VyJmxvZ2luX25hbWU9MTUxMjIzNTQyNjMmcGFzc3dvcmQ9SGFuZ3hpbmclNDA4ODgmdHM9MjAxNS0wNS0yOCsxNiUzYTE1JTNhMjU=ZWI5ZmMzNDk2MDFjNjkzNTJjODU5YzFmYWEyODc4NzQ=");
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] bByte = md.digest(resultString.getBytes());
        int k=0;
        while(k<bByte.length)
        {
        	int a = bByte[k++];

        	if(a<0)
        	{
        		System.out.print(strDigits[(a+256)/16]);
        	}else{
        		System.out.print(strDigits[a/16]);
        	}
        	
        	System.out.print("");
        	
        	
        	if(a<0)
        	{
        		System.out.print(strDigits[(a+256)%16]);
        	}else{
        		System.out.print(strDigits[a%16]);
        	}
        	
        	System.out.print("");
        }
        
        System.out.println();
        
       /* for(byte bb : bByte)
        {
        	System.out.print(TestCXXMain.byteToArrayString(bb));
        }*/
        
	}

}

