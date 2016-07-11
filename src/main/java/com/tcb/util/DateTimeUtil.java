package com.tcb.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

public class DateTimeUtil {
	/**
	 * 获取现在时间
	 * 
	 * @return 返回时间类型 yyyy-MM-dd HH:mm:ss
	 */
	public static String getNowDateStr() {
		Date currentTime = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return formatter.format(currentTime);
	}

	/**
	 * 当前天字符串
	 */
	public static String getNowDate() {
		Date currentTime = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		return formatter.format(currentTime);
	}

	/**
	 * 当前天字符串
	 */
	public static String getNowDayStr() {
		Date currentTime = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		return formatter.format(currentTime);
	}

	/**
	 * 当月第一天
	 */
	public static String getThisMonthFirstDate() {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-01");
		// 获取当前月第一天：
		Calendar c = Calendar.getInstance();
		c.add(Calendar.MONTH, 0);
		// 设置为1号,当前日期既为本月第一天
		c.set(Calendar.DAY_OF_MONTH, 1);
		return formatter.format(c.getTime());
	}

	/**
	 * 当月最后一天
	 */
	public static String getThisMonthLastDate() {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		Calendar ca = Calendar.getInstance();
		ca.set(Calendar.DAY_OF_MONTH,
				ca.getActualMaximum(Calendar.DAY_OF_MONTH));
		return formatter.format(ca.getTime());
	}

	/**
	 * 上月第一天
	 */
	public static String getPreMonthFirstDate() {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal_1 = Calendar.getInstance();
		cal_1.add(Calendar.MONTH, -1);
		// 设置为1号,当前日期既为本月第一天
		cal_1.set(Calendar.DAY_OF_MONTH, 1);
		return format.format(cal_1.getTime());
	}

	/**
	 * 上月最后一天
	 */
	public static String getPreMonthLastDate() {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cale = Calendar.getInstance();
		cale.set(Calendar.DAY_OF_MONTH, 0);
		return format.format(cale.getTime());
	}

	/**
	 * 某月前一月第一天
	 * 
	 * @param zone
	 * @throws ParseException
	 */
	public static String getPreMonthFirstDate(String monthstr)
			throws ParseException {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM");
		ParsePosition pos = new ParsePosition(0);
		Date strtodate = format1.parse(monthstr, pos);
		Calendar cal_1 = Calendar.getInstance();
		cal_1.setTime(strtodate);
		cal_1.add(Calendar.MONTH, -1);
		// 设置为1号,当前日期既为本月第一天
		cal_1.set(Calendar.DAY_OF_MONTH, 1);
		return format.format(cal_1.getTime());
	}

	/**
	 * 某月前一月最后一天
	 */
	public static String getPreMonthLastDate(String monthstr) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM");
		ParsePosition pos = new ParsePosition(0);
		Date strtodate = format1.parse(monthstr, pos);
		Calendar cale = Calendar.getInstance();
		cale.setTime(strtodate);
		cale.set(Calendar.DAY_OF_MONTH, 0);
		return format.format(cale.getTime());
	}

	/**
	 * 某月第一天
	 * 
	 * @param zone
	 * @throws ParseException
	 */
	public static String getMonthFirstDate(String monthstr)
			throws ParseException {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM");
		ParsePosition pos = new ParsePosition(0);
		Date strtodate = format1.parse(monthstr, pos);
		Calendar cal_1 = Calendar.getInstance();
		cal_1.setTime(strtodate);
		// 设置为1号,当前日期既为本月第一天
		cal_1.set(Calendar.DAY_OF_MONTH, 1);
		return format.format(cal_1.getTime());
	}

	/**
	 * 某月最后一天
	 */
	public static String getMonthLastDate(String monthstr) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM");
		ParsePosition pos = new ParsePosition(0);
		Date strtodate = format1.parse(monthstr, pos);
		Calendar cale = Calendar.getInstance();
		cale.setTime(strtodate);
		cale.set(Calendar.DAY_OF_MONTH,
				cale.getActualMaximum(Calendar.DAY_OF_MONTH));
		return format.format(cale.getTime());
	}

	/**
	 * 获取对应日期是周几
	 */
	public static int getWeekDayDateStr(String datetime) {

		Calendar calendar = getCalendarByDateStr(datetime);
		int weekNum = calendar.get(Calendar.DAY_OF_WEEK) - 1;
		if (weekNum == 0) {
			weekNum = 7;
		}
		return weekNum;
	}

	/**
	 * 根据日期字符串获取Calendar对象
	 */
	public static Calendar getCalendarByDateStr(String datetime) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		java.util.Date date = new java.util.Date();
		try {
			date = sdf.parse(datetime);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar;
	}

	/**
	 * 获取中文周几
	 */
	public static String getWeekNumCN(int weekNum) {
		String result = "";
		switch (weekNum) {
		case 1:
			result = "一";
			break;
		case 2:
			result = "二";
			break;
		case 3:
			result = "三";
			break;
		case 4:
			result = "四";
			break;
		case 5:
			result = "五";
			break;
		case 6:
			result = "六";
			break;
		case 7:
			result = "日";
			break;
		default:
			break;

		}
		return result;
	}

	/**
	 * Calendar对象转换成String yyyy-MM-dd
	 */
	public static String calendarToString(Calendar c) {

		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String dateStr = df.format(c.getTime());
		return dateStr;
	}

	/**
	 * 获取两个日期相差多少天
	 */
	public static long getMinusDay(String fromDate, String endDate) {
		long day = 0;
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		try {

			java.util.Date now = df.parse(fromDate);

			java.util.Date date = df.parse(endDate);

			long l = date.getTime() - now.getTime();

			day = l / (24 * 60 * 60 * 1000);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return day;
	}

	/**
	 * 日期加相应天数
	 * 
	 * @throws ParseException
	 */
	public static String addDaysByDateStr(String date, int day) {
		Calendar calendar = getCalendarByDateStr(date);
		calendar.add(Calendar.DATE, day);
		return calendarToString(calendar);
	}

	/**
	 * 根据格式获取当前时间
	 */
	public static String getNowDateStrByFormat(String format) {
		Date currentTime = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat(format);
		return formatter.format(currentTime);
	}

	/**
	 * 根据格式获取当前时间+-时间差
	 * 
	 * @param format
	 *            日期格式
	 * @param timeSpan
	 *            毫秒
	 * @return
	 */
	public static String getDateStrByFormatCompareNow(String format,
			int timeSpan) {
		Date currentTime = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat(format);
		return formatter.format(new Date(currentTime.getTime() + timeSpan));
	}

	/**
	 * 根据格式获取日期
	 */
	public static String getDateStrByFormat(String datetime, String format) {
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			date = sdf.parse(datetime);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		SimpleDateFormat formatter = new SimpleDateFormat(format);
		return formatter.format(date);
	}

	/**
	 * 获取带星期的日期
	 * 
	 * @return
	 */
	public static String getChinaNowDate() {
		Date currentTime = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy年MM月dd日 E",
				Locale.CHINA);
		return formatter.format(currentTime);
	}

	/**
	 * Date 转换 String By Format author gening date 2015年5月16日
	 * 
	 * @param date
	 * @param format
	 * @return
	 * @throws Exception
	 */
	public static String date2String(Date date, String format) throws Exception {
		SimpleDateFormat formatter = new SimpleDateFormat(format);
		return formatter.format(date);
	}

	public static Date string2Date(String v, String format) throws Exception {
		DateFormat fm = new SimpleDateFormat(format);
		Date date = fm.parse(v);
		return date;
	}

	/**
	 * 开航日是否过期，不允许修改
	 * 
	 * @param etd
	 * @return
	 * @throws Exception
	 */
	public static boolean isETDExpired(String etd) throws Exception {
		int etdWeekNum = getWeekDayDateStr(etd);
		String etdCompareByWeek = addDaysByDateStr(etd, 7 - etdWeekNum
				+ ConstantMap.ETDExpireWeekDay);

		Date etdCompareDateByWeek = string2Date(etdCompareByWeek, "yyyy-MM-dd");

		Calendar etdCalendar = getCalendarByDateStr(etd);
		int etdMonthDays = etdCalendar.get(Calendar.DATE);

		etdCalendar.set(Calendar.DATE, 1);// 把日期设置为当月第一天
		etdCalendar.roll(Calendar.DATE, -1);// 日期回滚一天，也就是最后一天
		int monthDays = etdCalendar.get(Calendar.DATE);

		String etdCompareByMonth = addDaysByDateStr(etd, monthDays
				- etdMonthDays + ConstantMap.ETDExpireWeekDay);
		Date etdCompareDateByMonth = string2Date(etdCompareByMonth,
				"yyyy-MM-dd");

		Date nowDate = new Date();
		if (nowDate.getTime() > etdCompareDateByWeek.getTime()
				|| nowDate.getTime() > etdCompareDateByMonth.getTime()) {
			return true;
		}
		return false;

	}
}
