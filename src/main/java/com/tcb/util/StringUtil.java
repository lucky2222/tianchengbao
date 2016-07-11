package com.tcb.util;

public class StringUtil {
	public static String arrayStrAddSplit(String str, String splitstr) {
		String restr = "";
		String[] strarray = str.split(splitstr);
		for (String item : strarray) {
			if (item.isEmpty()) {
				continue;
			}
			restr = restr + "'" + item + "',";
		}

		if (restr.length() > 0
				&& (restr.lastIndexOf(splitstr) == (restr.length() - 1))) {
			restr = restr.substring(0, restr.length() - 1);
		}
		return restr;
	}

	public static String join(Object[] array, char separator) {
		if (array == null) {
			return null;
		}
		int arraySize = array.length;
		int bufSize = (arraySize == 0 ? 0 : ((array[0] == null ? 16 : array[0]
				.toString().length()) + 1) * arraySize);
		StringBuffer buf = new StringBuffer(bufSize);

		for (int i = 0; i < arraySize; i++) {
			if (i > 0) {
				buf.append(separator);
			}
			if (array[i] != null) {
				buf.append(array[i]);
			}
		}
		return buf.toString();
	}

	public static boolean isNullOrEmpty(String string) {
		if (string == null || string.isEmpty()) {
			return true;
		}
		return false;
	}

	/**
	 * 格式化浮点数，小数点后几位
	 * @param 被格式化数据
	 * @param 小数点后位数
	 * @return
	 */
	public static String formatDoubleAfterPoint(String data, int length) {
		double d =Double.parseDouble(data);
		return String.format("%-10." + length + "f", d).trim();
	}
}
