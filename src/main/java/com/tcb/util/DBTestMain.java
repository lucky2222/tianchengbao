package com.tcb.util;
/*
 *  主函数-手动执行，一次性
 *  自动生成sql，并配置到表中
 *  配置文件目录需根据自己目录填写
 */
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.util.StringUtils;

import com.google.common.base.Joiner;
import com.google.common.base.Preconditions;
import com.google.common.base.Splitter;
import com.google.common.base.Stopwatch;
import com.google.common.reflect.Invokable;
import com.google.common.reflect.Reflection;
import com.mysql.jdbc.util.Base64Decoder;
import com.tcb.dao.base.DataRow;

import java.util.concurrent.TimeUnit;


public class DBTestMain {
	
	public static void main(String[] args) throws Exception {
		//ApplicationContext act = new FileSystemXmlApplicationContext("D:\\sts-bundle\\workspace\\SpringTest\\SpringTest\\src\\main\\webapp\\WEB-INF\\spring\\appServlet\\servlet-context.xml");
		//GeneratorSql gscc = (GeneratorSql) act.getBean("GeneratorSql");
		//gscc.test();
		/*String key = "c2VsZWN0IGN1c3RuYW1lLHN0YWZmbmFtZSxzdW0oeC5hY3R1YWxudW0pIGFjdHVhbG51bSxzdW0oeC5hY3R1YWx0ZXVudW0pIGFjdHVhbHRldW51bSAKZnJvbSBzZWF3b3JrLnRzX2NvbXBhbnlwcm9maXQgeCB3aGVyZSBub3QgZXhpc3RzCihzZWxlY3QgMSBmcm9tIHNlYXdvcmsudHNfY29tcGFueXByb2ZpdCBiCndoZXJlIHguY3VzdGlkPWIuY3VzdGlkCmFuZCBiLmV0ZD49JyN7c3RhcnRkYXRlfScKYW5kIGIuZXRkPD0nI3tlbmRkYXRlfScKKQphbmQgeC5ldGQ PScje3ByZXN0YXJ0ZGF0ZX0nCmFuZCB4LmV0ZDw9JyN7cHJlZW5kZGF0ZX0nCmFuZCBhY3R1YWx0ZXVudW0 MApncm91cCBieSBjdXN0bmFtZSxzdGFmZm5hbWUKb3JkZXIgYnkgc3VtKHguYWN0dWFsdGV1bnVtKSBkZXNj";
		System.out.println(key);
		key = key.replaceAll(" ", "+");
		System.out.println(key);
		Base64Decoder base64decoder = new Base64Decoder();
		System.out.println(new String(base64decoder.decode(key.getBytes(), 0,key.getBytes().length)));*/
		Stopwatch stopwatch = Stopwatch.createStarted();
		System.out.println(StringUtil.arrayStrAddSplit("aaa,bb,c,",","));
		
		Joiner joiner = Joiner.on("; ").skipNulls();
		System.out.println(joiner.join("aaa","bbJ","c","","",""));
		Splitter splitter = Splitter.on(",");
		System.out.println(splitter.splitToList("aaa,bb,c,"));
		int value =10;
		Preconditions.checkArgument(value >= 0.0, "negative value: %s", value);
		Preconditions.checkNotNull("","不能输入空啊");
		System.out.println(StringUtils.isEmpty("a"));
		//反射调用
		 
		
		GeneratorSql obj = (GeneratorSql) Class.forName("com.tcb.util.GeneratorSql").newInstance();
		Class<?> clazz = obj.getClass();
		DataRow  data = new DataRow();
		data.put("tradereturn","tradeok .....");
		Method setmeth =clazz.getDeclaredMethod("testDo", DataRow.class);
		System.out.println(setmeth.invoke(obj, data));
		
		
		stopwatch.stop(); // optional
		
		long millis = stopwatch.elapsed(TimeUnit.MILLISECONDS);

		   System.out.println("time: " + stopwatch);
		
		   
		  HashMap para = new HashMap();
		  para.put("a",111);
		  System.out.println(para.get("a"));
		  System.out.println((String)para.get("a"));
	}

}
