package com.tcb.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.Security;

import com.google.common.base.Strings;

public class EncryptHelper {

	// 全局数组
	private final static String[] strDigits = { "0", "1", "2", "3", "4", "5",
			"6", "7", "8", "9", "a", "b", "c", "d", "e", "f" };

	// 返回形式为数字跟字符串
	private static String byteToArrayString(byte bByte) {
		int iRet = bByte;
		// System.out.println("iRet="+iRet);
		if (iRet < 0) {
			iRet += 256;
		}
		int iD1 = iRet / 16;
		int iD2 = iRet % 16;
		return strDigits[iD1] + strDigits[iD2];
	}

	// 返回形式只为数字
	private static String byteToNum(byte bByte) {
		int iRet = bByte;
		System.out.println("iRet1=" + iRet);
		if (iRet < 0) {
			iRet += 256;
		}
		return String.valueOf(iRet);
	}

	// 转换字节数组为16进制字串
	private static String byteToString(byte[] bByte) {
		StringBuffer sBuffer = new StringBuffer();
		for (int i = 0; i < bByte.length; i++) {
			sBuffer.append(byteToArrayString(bByte[i]));
		}
		return sBuffer.toString();
	}

	public static String GetMD5Code(String strObj)
			throws NoSuchAlgorithmException {
		String result = "";
		MessageDigest md = MessageDigest.getInstance("MD5");
		byte[] bByte = md.digest(strObj.getBytes());
		int k = 0;
		while (k < bByte.length) {
			int a = bByte[k++];

			if (a < 0) {
				result += strDigits[(a + 256) / 16];
			} else {
				result += strDigits[a / 16];
			}

			if (a < 0) {
				result += strDigits[(a + 256) % 16];
			} else {
				result += strDigits[a % 16];
			}

		}

		return result;

	}

	/*
	 * private static byte[] keys = { 18, 52, 86, 120, 144, 171, 205, 239 };
	 * 
	 * 
	 * public static String EncryptDES(String encryptString, String encryptKey)
	 * { try { encryptKey = Strings.padEnd(encryptKey, 8, ' '); byte[] rgbKey =
	 * encryptKey.substring(0, 8).getBytes(); byte[] rgbIV = keys; byte[]
	 * inputByteArray = encryptString.getBytes(); DESCryptoServiceProvider dcsp
	 * = new DESCryptoServiceProvider(); MemoryStream memoryStream = new
	 * MemoryStream(); CryptoStream cryptoStream = new
	 * CryptoStream(memoryStream, dcsp.CreateEncryptor(rgbKey, rgbIV),
	 * CryptoStreamMode.Write); cryptoStream.Write(inputByteArray, 0,
	 * inputByteArray.Length); cryptoStream.FlushFinalBlock(); return
	 * Convert.ToBase64String(memoryStream.ToArray()); } catch { return
	 * encryptString; } }
	 * 
	 * 
	 * public static string Encrypt(string encryptString, string key) {
	 * DESCryptoServiceProvider des = new DESCryptoServiceProvider(); byte[]
	 * inputByteArray = Encoding.Default.GetBytes(encryptString);
	 * ////把字符串放到byte数组中 des.Key = ASCIIEncoding.ASCII.GetBytes(key);
	 * ////建立加密对象的密钥和偏移量 des.IV = ASCIIEncoding.ASCII.GetBytes(key);
	 * ////原文使用ASCIIEncoding.ASCII方法的GetBytes方法 MemoryStream ms = new
	 * MemoryStream(); ////使得输入密码必须输入英文文本 CryptoStream cs = new CryptoStream(ms,
	 * des.CreateEncryptor(), CryptoStreamMode.Write);
	 * 
	 * cs.Write(inputByteArray, 0, inputByteArray.Length); cs.FlushFinalBlock();
	 * 
	 * StringBuilder ret = new StringBuilder(); foreach (byte b in ms.ToArray())
	 * { ret.AppendFormat("{0:X2}", b); }
	 * 
	 * return ret.ToString(); }
	 * 
	 * 
	 * public static string DecryptDES(string decryptString, string decryptKey)
	 * { try { decryptKey = decryptKey.PadRight(8, ' '); byte[] rgbKey =
	 * Encoding.UTF8.GetBytes(decryptKey); byte[] rgbIV = keys; byte[]
	 * inputByteArray = Convert.FromBase64String(decryptString);
	 * DESCryptoServiceProvider dcsp = new DESCryptoServiceProvider();
	 * MemoryStream memoryStream = new MemoryStream(); CryptoStream cryptoStream
	 * = new CryptoStream(memoryStream, dcsp.CreateDecryptor(rgbKey, rgbIV),
	 * CryptoStreamMode.Write); cryptoStream.Write(inputByteArray, 0,
	 * inputByteArray.Length); cryptoStream.FlushFinalBlock(); return
	 * Encoding.UTF8.GetString(memoryStream.ToArray()); } catch { return
	 * decryptString; } }
	 * 
	 * 
	 * public static String MD5Encode(String strSource) { return
	 * MD5Encode(strSource, 0); }
	 * 
	 * 
	 * public static String MD5Encode(String strSource, int length) { byte[]
	 * bytes = strSource.getBytes(); byte[] hashValue =
	 * ((Security.Cryptography.HashAlgorithm
	 * )System.Security.Cryptography.CryptoConfig
	 * .CreateFromName("MD5")).ComputeHash(bytes); StringBuilder sb = new
	 * StringBuilder(); switch (length) { case 16: for (int i = 4; i < 12; i++)
	 * { sb.Append(hashValue[i].ToString("x2")); }
	 * 
	 * break; case 32: for (int i = 0; i < 16; i++) {
	 * sb.Append(hashValue[i].ToString("x2")); }
	 * 
	 * break; default: for (int i = 0; i < hashValue.Length; i++) {
	 * sb.Append(hashValue[i].ToString("x2")); }
	 * 
	 * break; }
	 * 
	 * return sb.ToString(); }
	 */

}
