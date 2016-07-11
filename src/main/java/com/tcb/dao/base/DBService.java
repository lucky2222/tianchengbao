package com.tcb.dao.base;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.sql.Blob;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.jdbc.core.support.AbstractLobCreatingPreparedStatementCallback;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.LobCreator;
import org.springframework.jdbc.support.lob.LobHandler;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @Comments 数据库操作服务封装,通过数据库参数配置的sql执行
 * @author jiayl
 * @version 0.1
 */
@Service(value = "DBService")
@Transactional
public class DBService {
	private static final Logger logger = LoggerFactory
			.getLogger(DBService.class);
	private static HashMap<String, List<DataRow>> tablefield = new HashMap<String, List<DataRow>>();// 表字段列表
	private static HashMap<String, String> codemap = new HashMap<String, String>();// codecode表中所有的SQL
	private static HashMap<String, List<DataRow>> fieldmap = new HashMap<String, List<DataRow>>();// 查询语句的表头设置
	private static DataRow<String,String> tradebpm = new DataRow<String,String>();//存放tradetype与对应处理函数的对应关系

	private JdbcTemplate jdbcTemplate;
	
	public void setJdbcTemplate(JdbcTemplate jdbcTemplate)
	{
		this.jdbcTemplate = jdbcTemplate;
	}
	
	public void initColumnslist(String tablename)
	{
		List<DataRow> columnslist = getTableColumnList(tablename);
		tablefield.put(tablename, columnslist);
	}
	
	/**
	 * 通过sql的key和条件查询单条记录
	 */
	public DataRow querySimpleRowByName(String name, DataRow param)
			throws Exception {
		String sql = getSqlByCodeKey(name, param);
		return querySimpleRowBySql(sql);
	}

	/**
	 * 通过Sql查询单条记录
	 */
	public DataRow querySimpleRowBySql(String sql)   throws Exception {
		final DataRow data = new DataRow();
		logger.debug(sql);
		jdbcTemplate.query(sql, new RowCallbackHandler() {
			public void processRow(ResultSet rs) throws SQLException{
				ResultSetMetaData rsmd = rs.getMetaData();
				for (int column = 1; column <= rsmd.getColumnCount(); column++) {
					if (rsmd.getColumnType(column) == Types.BLOB
							|| rsmd.getColumnType(column) == Types.LONGVARBINARY) {
							Blob blob = rs.getBlob(column);
							try {
								data.put(rsmd.getColumnLabel(column), (new String(
										blob.getBytes(1, (int) blob.length()),
										"GBK")));
							} catch (UnsupportedEncodingException e) {
								throw new SQLException("数据库查询错误:"+e.getMessage());
							}
							// logger.debug(rsmd.getColumnName(column)+"="+data.getString(rsmd.getColumnName(column)));
					} else if(rsmd.getColumnType(column) == Types.DATE||
							rsmd.getColumnType(column) == Types.TIME||
							rsmd.getColumnType(column) == Types.TIMESTAMP){
						data.put(rsmd.getColumnLabel(column),
								rs.getObject(column));
					}else if(rsmd.getColumnType(column) == Types.CHAR||
							rsmd.getColumnType(column) == Types.LONGVARCHAR||
							rsmd.getColumnType(column) == Types.VARCHAR||
							rsmd.getColumnType(column) == Types.LONGNVARCHAR) {
						data.put(rsmd.getColumnLabel(column),
								rs.getString(column));
					}else{
						data.put(rsmd.getColumnLabel(column),
								rs.getObject(column));
					}
				}
				return ;
			}
		});
		return data;
	}

	/**
	 * 通过SQL查询带BLOB字段的记录
	 */
	public List<DataRow> queryBlobForList(String sql) {
		final ArrayList list = new ArrayList();
		jdbcTemplate.query(sql, new RowCallbackHandler() {
			public void processRow(ResultSet rs) throws SQLException {
				DataRow data = new DataRow();
				ResultSetMetaData rsmd = rs.getMetaData();
				
				for (int column = 1; column <= rsmd.getColumnCount(); column++) {
					// logger.debug(rsmd.getColumnName(column)+" type="+rsmd.getColumnType(column));
					if (rsmd.getColumnType(column) == Types.BLOB
							|| rsmd.getColumnType(column) == Types.LONGVARBINARY) {
						try {
							Blob blob = rs.getBlob(column);
							data.put(rsmd.getColumnLabel(column), (new String(
									blob.getBytes(1, (int) blob.length()),
									"GBK")));
							// logger.debug(rsmd.getColumnName(column)+"="+data.getString(rsmd.getColumnName(column)));
						} catch (UnsupportedEncodingException e) {
							e.printStackTrace();
						}
					} else if(rsmd.getColumnType(column) == Types.DATE||
							rsmd.getColumnType(column) == Types.TIME||
							rsmd.getColumnType(column) == Types.TIMESTAMP){
						data.put(rsmd.getColumnLabel(column),
								rs.getObject(column));
					}else if(rsmd.getColumnType(column) == Types.CHAR||
							rsmd.getColumnType(column) == Types.LONGVARCHAR||
							rsmd.getColumnType(column) == Types.VARCHAR||
							rsmd.getColumnType(column) == Types.LONGNVARCHAR) {
						data.put(rsmd.getColumnLabel(column),
								rs.getString(column));
					}else{
						data.put(rsmd.getColumnLabel(column),
								rs.getObject(column));
					}
					
				}
				list.add(data);
			}
		});
		return list;
	}

	public List<DataRow> queryForList(String sql) {
		return this.queryBlobForList(sql);
	}

	/**
	 * 查询列表实体 sql全路径名，参数
	 */
	public List<DataRow> queryForListByCodeKey(String name,
			DataRow param) throws Exception {
		String sql = getSqlByCodeKey(name, param);
		logger.debug(sql);
		return this.queryBlobForList(sql);
	}

	/**
	 * 查询单实体 sql全路径名，参数
	 */
	public DataRow queryForMapByCodeKey(String name, DataRow param)
			throws Exception {
		DataRow map = new DataRow();
		String sql = getSqlByCodeKey(name, param);
		logger.debug(sql);
		try{
			map = querySimpleRowBySql(sql);
		}catch(EmptyResultDataAccessException e){
			return new DataRow();
		}
		return map;
	}

	// @Transactional
	/**
	 * 分页查询 sql全路径名，参数
	 */
	public void selectListByPage(String name, ResultByPage rbp)
			throws Exception {
		rbp.setSql(getSqlByCodeKey(name, rbp.getCondition()));
		rbp.setAllcount(Integer
				.valueOf(jdbcTemplate.queryForMap(generatorCountSql(rbp))
						.get("allcount").toString()));
		if(rbp.isExportflag())
		{
			rbp.setResultlist(queryBlobForList(rbp.getSql()));
		}else{
			rbp.setResultlist(queryBlobForList(generatorPageSql(rbp)));
		}
		rbp.setFieldlist(getTableHead(name));
		logger.debug(rbp.getSql());
	}
	
	/**
	 * 不分页查询 sql全路径名，参数
	 */
	public void selectList(String name, ResultByPage rbp)
			throws Exception {
		rbp.setSql(getSqlByCodeKey(name, rbp.getCondition()));
		rbp.setResultlist(queryBlobForList(rbp.getSql()));
		rbp.setFieldlist(getTableHead(name));
		logger.debug(rbp.getSql());
	}

	/**
	 * 分页查询 sql全路径名，参数
	 */
	public void selectListByPageOfBlob(String name, ResultByPage rbp)
			throws Exception {
		rbp.setSql(getSqlByCodeKey(name, rbp.getCondition()));
		rbp.setAllcount(Integer
				.valueOf(jdbcTemplate.queryForMap(generatorCountSql(rbp))
						.get("allcount").toString()));
		rbp.setResultlist(queryBlobForList(generatorPageSql(rbp)));
		rbp.setFieldlist(getTableHead(name));
		logger.debug(rbp.getSql());
	}

	/**
	 * 执行update，insert语句
	 */
	public void execute(String name, DataRow param) throws Exception {
		String sql = getSqlByCodeKey(name, param);
		jdbcTemplate.execute(sql);
	}

	/**
	 * 分页查询 sql全路径名，参数
	 */
	public void selectListByTestSql(ResultByPage rbp) throws Exception  {
		String sqlcode=  rbp.getCondition().getString("sqlcode").replaceAll("``","#{");
		logger.debug(sqlcode);
		
		String sql = generatorSql(sqlcode, rbp.getCondition());
		rbp.setSql(sql);
		rbp.setAllcount(Integer
				.valueOf(jdbcTemplate.queryForMap(generatorCountSql(rbp))
						.get("allcount").toString()));
		// 查询
		final ArrayList list = new ArrayList();
		final ArrayList fieldlist = new ArrayList();
		jdbcTemplate.query(generatorPageSql(rbp), new RowCallbackHandler() {
			public void processRow(ResultSet rs) throws SQLException {
				DataRow data = new DataRow();
				ResultSetMetaData rsmd = rs.getMetaData();
				for (int column = 1; column <= rsmd.getColumnCount(); column++) {
					// logger.debug(rsmd.getColumnName(column)+" type="+rsmd.getColumnType(column));
					if (rsmd.getColumnType(column) == Types.BLOB
							|| rsmd.getColumnType(column) == Types.LONGVARBINARY) {
						try {
							Blob blob = rs.getBlob(column);
							data.put(rsmd.getColumnName(column), (new String(
									blob.getBytes(1, (int) blob.length()),
									"GBK")));
							// logger.debug(rsmd.getColumnName(column)+"="+data.getString(rsmd.getColumnName(column)));
						} catch (UnsupportedEncodingException e) {
							e.printStackTrace();
						}
					} else {
						data.put(rsmd.getColumnName(column),
								rs.getObject(column));
					}
					if (fieldlist.size() < rsmd.getColumnCount()) {
						DataRow head = new DataRow();
						head.put("tablename", rsmd.getTableName(column));
						head.put("columnlabel", rsmd.getColumnLabel(column));
						head.put("fieldname", rsmd.getColumnName(column));
						head.put("fieldid", rsmd.getColumnName(column));
						head.put("ordernum", column);
						head.put("sortflag", 1);
						fieldlist.add(head);
					}
				}
				list.add(data);
			}
		});

		rbp.setResultlist(list);
		rbp.setFieldlist(fieldlist);
	}

	/**
	 * 分页查询 sqlRef，参数
	 */
	public void selectListByTestSqlKey(String sqlRef, ResultByPage rbp)
			throws Exception {
		// 查询
		rbp.setSql(getSqlByCodeKey(sqlRef, rbp.getCondition()));
		final ArrayList list = new ArrayList();
		final ArrayList fieldlist = new ArrayList();
		jdbcTemplate.query(generatorPageSql(rbp), new RowCallbackHandler() {
			public void processRow(ResultSet rs) throws SQLException {
				DataRow data = new DataRow();
				ResultSetMetaData rsmd = rs.getMetaData();
				for (int column = 1; column <= rsmd.getColumnCount(); column++) {
					// logger.debug(rsmd.getColumnName(column)+" type="+rsmd.getColumnType(column));
					if (rsmd.getColumnType(column) == Types.BLOB
							|| rsmd.getColumnType(column) == Types.LONGVARBINARY) {
						try {
							Blob blob = rs.getBlob(column);
							data.put(rsmd.getColumnName(column), (new String(
									blob.getBytes(1, (int) blob.length()),
									"GBK")));
							// logger.debug(rsmd.getColumnName(column)+"="+data.getString(rsmd.getColumnName(column)));
						} catch (UnsupportedEncodingException e) {
							e.printStackTrace();
						}
					} else {
						data.put(rsmd.getColumnName(column),
								rs.getObject(column));
					}
					if (fieldlist.size() < rsmd.getColumnCount()) {
						DataRow head = new DataRow();
						head.put("tablename", rsmd.getTableName(column));
						head.put("columnlabel", rsmd.getColumnLabel(column));
						head.put("fieldname", rsmd.getColumnName(column));
						head.put("fieldid", rsmd.getColumnName(column));
						head.put("ordernum", column);
						head.put("sortflag", 1);
						fieldlist.add(head);
					}
				}
				list.add(data);
			}
		});

		rbp.setResultlist(list);
		rbp.setFieldlist(fieldlist);
	}

	/**
	 * @Comments 通过表名和主键查询单条数据
	 */
	public DataRow querySimpleRowByKey(String tablename, String simplekey)
			throws Exception {
		String sql = generatorQuerySqlByKey(tablename, simplekey);
		return querySimpleRowBySql(sql);
	}

	/**
	 * @Comments 通过表名和主键查询单条数据
	 * 
	 * @Param tablename表名 param为查询条件 sortstr为排序字符串
	 */
	public DataRow querySimpleRowByParam(String tablename, DataRow param,
			String sortstr) throws Exception {
		String sql = generatorQuerySqlByParam(tablename, param, sortstr,
				" limit 1");
		logger.debug(sql);
		return querySimpleRowBySql(sql);
	}

	/**
	 * @Comments 通过表名和条件集合查询数据列表
	 * 
	 * @Param tablename表名 param为查询条件 sortstr为排序字符串 limitstr为查询条数限制
	 */
	public List<DataRow> queryListByParam(String tablename, DataRow param,
			String sortstr, String limitstr) throws Exception {
		String sql = generatorQuerySqlByParam(tablename, param, sortstr,
				limitstr);
		logger.debug("sql-->"+sql);
		return queryBlobForList(sql);
	}

	/**
	 *  根据SQL的唯一ID获取表头
	 * @param codekey
	 * @return
	 * @throws Exception
	 */
	public List<DataRow> getTableHead(String codekey) throws Exception {
		if (!fieldmap.containsKey(codekey)) {
			String[] keystr = codekey.split("\\.");
			if (keystr.length == 2) {
				DataRow param = new DataRow();
				param.put("codepath", keystr[0]);
				param.put("codeid", keystr[1]);
				param.put("state", 1);
				List<DataRow> headlist = queryListByParam("sys_tablehead",
						param, "order by ordernum", null);
				if (headlist.size() > 0) {
					logger.debug(codekey+" size -->"+fieldmap.size());
					fieldmap.put(codekey, headlist);
				}
			}
		}
		return fieldmap.get(codekey);
	}

	/**
	 *  根据SQL的唯一ID移除SQL语句
	 * @param codekey
	 */
	public void removeSqlByCodeKey(String codekey) {
		if (codemap.containsKey(codekey)) {
			codemap.remove(codekey);
		}
	}
	/**
	 *  根据SQL的唯一ID移除SQL语句
	 * @param codekey
	 */
	public void removeTableHeadByCodeKey(String codekey) {
		if (fieldmap.containsKey(codekey)) {
			fieldmap.remove(codekey);
		}
	}

	/**
	 *  根据SQL的唯一ID获取SQL语句
	 * @param codekey
	 * @return
	 * @throws Exception
	 */
	public String getSqlByCodeKey(String codekey) throws Exception {
		logger.debug("getSqlByCodeKey :" + codekey);
		if (!codemap.containsKey(codekey)) {
			String[] keystr = codekey.split("\\.");
			if (keystr.length == 2) {
				DataRow param = new DataRow();
				param.put("codepath", keystr[0]);
				param.put("codeid", keystr[1]);
				param.put("state", 1);
				DataRow code = querySimpleRowByParam("sys_code_code", param, null);
				if (code != null && !code.isEmpty()) {
					codemap.put(codekey, code.getString("sqlcode"));
				}
			}
		}
		return codemap.get(codekey);
	}

	/**
	 *  根据SQL的唯一ID和查询条件获取SQL语句
	 * @param codekey
	 * @param condition
	 * @return
	 * @throws Exception
	 */
	public String getSqlByCodeKey(String codekey, DataRow condition)
			throws Exception {
		return generatorSql(getSqlByCodeKey(codekey), condition);
	}

	/**
	 *  按行替换SQL语句中的变量
	 * @param line
	 * @param condition
	 * @return
	 */
	public String generatorSqlByLine(String line, DataRow condition) {
		Pattern pattern = Pattern.compile("#\\{.*?\\}");
		Matcher matches = pattern.matcher(line);
		while (matches.find()) {
			String mstr = matches.group();
			String keystr = mstr.replace("#{", "").replace("}", "")
					.toUpperCase();
			if (condition != null && condition.containsKey(keystr)
					&& condition.get(keystr) != null
					&& !condition.get(keystr).toString().equals("")) {
				line = line.replace(mstr, condition.get(keystr).toString());
			} else {
				return "";
			}
		}
		return line;
	}

	/**
	 *  替换SQL语句中的变量
	 * @param sql
	 * @param condition
	 * @return
	 */
	public String generatorSql(String sql, DataRow condition) {
		String[] sqls = sql.split("\n");
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < sqls.length; i++) {
			sb.append(generatorSqlByLine(sqls[i], condition)).append("\n");
		}
		logger.debug(sb.toString());
		return sb.toString();
	}

	/**
	 *  组织查询结果集条数的SQL
	 * @param rbp
	 * @return
	 */
	public String generatorCountSql(ResultByPage rbp) {
		return "select count(1) allcount from ( " + rbp.getSql() + " ) row_";
	}

	/**
	 * 分页查询语句处理
	 * @param rbp
	 * @return
	 */
	public String generatorPageSql(ResultByPage rbp) {
		StringBuilder sql = new StringBuilder("select * from ( ");
		sql.append(rbp.getSql());
		if (!rbp.getOrderbyfield().isEmpty()) {
			sql.insert(0,"select * from ( ").append(" ) order_ ").append("order by ");
			Iterator orderfields = rbp.getOrderbyfield().keySet().iterator();
			while (orderfields.hasNext()) {
				String fieldname = (String) orderfields.next();
				sql.append(fieldname).append(" ")
						.append(rbp.getOrderbyfield().get(fieldname))
						.append(",");
			}
			sql.delete(sql.length() - 1, sql.length());
		}
		sql.append(" ) row_ limit ").append(rbp.getStart()).append(" , ")
				.append(rbp.getPerpage());
		logger.debug(sql.toString());
		return sql.toString();
	}

	/**
	 * @Comments 通过主键Insert表数据
	 */
	public int Insert(String tablename, DataRow param) throws Exception {
		String sql = generatorInsertSql(tablename, param);
		logger.debug(sql);
		return jdbcTemplate.update(sql);
	}

	/**
	 * @Comments 通过主键Update表数据
	 */
	public int UpdateByKey(String tablename, DataRow param) throws Exception {
		String sql = generatorUpdateSqlByKey(tablename, param);
		logger.debug(sql);
		return jdbcTemplate.update(sql);
	}

	/**
	 * @Comments 通过参数Upate表数据
	 */
	public int UpdateByParam(String tablename, DataRow param, DataRow codition)
			throws Exception {
		String sql = generatorUpdateSqlByParam(tablename, param, codition);
		logger.debug(sql);
		return jdbcTemplate.update(sql);
	}

	/**
	 * @Comments 通过主键Delete表数据
	 */
	public int DelByKey(String tablename, DataRow param) throws Exception {
		String sql = generatorDeleteSqlByKey(tablename, param);
		logger.debug(sql);
		return jdbcTemplate.update(sql);
	}

	/**
	 * @Comments 通过参数Delete表数据
	 */
	public int DelByParam(String tablename, DataRow param) throws Exception {
		String sql = generatorDeleteSqlByParam(tablename, param);
		logger.debug(sql);
		return jdbcTemplate.update(sql);
	}

	/**
	 * @Comments 通过参数自动生成Insert语句
	 */

	// 自动生成Insert语句
	public String generatorInsertSql(String tablename, DataRow param)
			throws Exception {
		List<DataRow> columnslist;
		if (tablefield.containsKey(tablename)) {
			columnslist = tablefield.get(tablename);
		} else {
			// 查询表字段
			columnslist = getTableColumnList(tablename);
			if (columnslist != null) {
				tablefield.put(tablename, columnslist);
			}
		}
		if(columnslist.size()==0)
		{
			throw new Exception("操作的表："+tablename+"不存在");
		}
		StringBuilder insertstr = new StringBuilder();
		StringBuilder insertvaluestr = new StringBuilder();
		insertstr.append("\t\t").append("insert into ").append(tablename)
				.append("(\n");
		insertvaluestr.append("\t\t").append("values (\n");
		for (DataRow item : columnslist) {
			if (item.containsKey("column_key")
					&& item.get("column_key").toString().equals("PRI")) {
				if (!param.containsKey(item.get("column_name").toString())) {
					throw new Exception("主键不能为空");
				}
			}

			if ((param.containsKey(item.getString("column_name"))
					&&(param.get(item.getString("column_name"))!=null
					&&!param.getString(item.getString("column_name")).isEmpty()))
					|| (item.containsKey("column_default")
							&& item.get("column_default") != null &&! item
							.getString("column_default").isEmpty())) {
				insertstr.append("\t\t\t").append(item.get("column_name"))
						.append(",\n");
				if (param.containsKey(item.getString("column_name"))
						&&param.get(item.getString("column_name"))!=null
						&&!param.getString(item.getString("column_name")).isEmpty()) {
					if (item.get("data_type").equals("int")) {
						insertvaluestr.append(
								param.getString(item.get("column_name")
										.toString())).append(",\n");
					} else {
						insertvaluestr
								.append("'")
								.append(param.getString(
										item.get("column_name").toString())
										.replaceAll("\\'", "\\\\'"))
								.append("',\n");
					}
				} else {
					if (item.get("data_type").equals("int")) {
						insertvaluestr.append(item.get("column_default"))
								.append(",\n");
					} else {
						insertvaluestr.append("'")
								.append(item.get("column_default"))
								.append("',\n");
					}
				}
			}

		}
		insertstr.delete(insertstr.lastIndexOf(","), insertstr.length());
		insertvaluestr.delete(insertvaluestr.lastIndexOf(","),
				insertvaluestr.length());
		insertstr.append(")\n");
		insertvaluestr.append(")\n");
		insertstr.append(insertvaluestr);
		return insertstr.toString();
	}

	/**
	 *  查询表字段内容
	 * @param tablename
	 * @param param
	 * @param condition
	 * @return
	 * @throws Exception
	 */
	public List<DataRow> getTableColumnList(String tablename) {
		String sql = "select column_name,data_type,column_comment,column_key,column_default from information_schema.columns where  table_schema= 'truckdb' and table_name='"
				+ tablename + "' order by ORDINAL_POSITION";
		logger.debug(sql);
		final List<DataRow> columnlist = new ArrayList<DataRow>();
		jdbcTemplate.query(sql, new RowCallbackHandler() {
			public void processRow(ResultSet rs) throws SQLException {
				DataRow data = new DataRow();
				data.put("column_name", rs.getString("column_name"));
				data.put("data_type", rs.getString("data_type"));
				data.put("column_comment", rs.getString("column_comment"));
				data.put("column_key", rs.getString("column_key"));
				data.put("column_default", rs.getString("column_default"));
				columnlist.add(data);
			}
		});
		return columnlist;
	}

	/**
	 *  自动生成按主键Update语句
	 * @param tablename
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public String generatorUpdateSqlByKey(String tablename, DataRow param)
			throws Exception {
		List<DataRow> columnslist;
		if (tablefield.containsKey(tablename)) {
			columnslist = tablefield.get(tablename);
		} else {
			// 查询表字段
			columnslist = getTableColumnList(tablename);
			if (columnslist != null) {
				tablefield.put(tablename, columnslist);
			}
		}
		StringBuilder updatestr = new StringBuilder();
		StringBuilder updatewherestr = new StringBuilder();
		updatestr.append("\t\t").append("update ").append(tablename)
				.append("\n").append(" \t\tset\n");
		for (DataRow item : columnslist) {
			if (item.containsKey("column_key")
					&& item.get("column_key").toString().equals("PRI")) {
				if (!param.containsKey(item.get("column_name").toString())) {
					throw new Exception("主键不能为空");
				}
				
				if (!param.containsKey(item.getString("column_name"))) {
					continue;
				}
				
				if (updatewherestr.length() > 0) {
					if (item.get("data_type").equals("int")) {
						updatewherestr
								.append("\t\t and ")
								.append(item.get("column_name"))
								.append("=")
								.append(param.getString(item.get("column_name")
										.toString())).append(" \n");
					} else {
						updatewherestr
								.append("\t\t and ")
								.append(item.get("column_name"))
								.append("='")
								.append(param.getString(
										item.get("column_name").toString())
										.replaceAll("\\'", "\\\\'"))
								.append("' \n");
					}
				} else {
					if (item.get("data_type").equals("int")) {
						updatewherestr
								.append("\t\t")
								.append(item.get("column_name"))
								.append("=")
								.append(param.getString(item.get("column_name")
										.toString())).append(" \n");
					}else {
						updatewherestr
								.append("\t\t")
								.append(item.get("column_name"))
								.append("='")
								.append(param.getString(
										item.get("column_name").toString())
										.replaceAll("\\'", "\\\\'"))
								.append("' \n");
					}
				}

			} else {
				if (!param.containsKey(item.getString("column_name"))
						||param.get(item.getString("column_name"))==null
						||param.getString(item.getString("column_name")).isEmpty()) {
					if(!param.containsKey(item.getString("column_name")))
					{
						continue;
					}else if(param.get(item.getString("column_name"))==null){
						updatestr
						.append("\t\t")
						.append(item.get("column_name"))
						.append(" = null, \n");
					}else if(param.getString(item.getString("column_name")).isEmpty()){
						updatestr
						.append("\t\t")
						.append(item.get("column_name"))
						.append(" = '', \n");
					}
				}else if (item.get("data_type").equals("int")) {
					updatestr
							.append("\t\t")
							.append(item.get("column_name"))
							.append("=")
							.append(param.getString(item.get("column_name")
									.toString())).append(", \n");
				}else {
					if (param.containsKey(item.get("column_name").toString())) {
						if(param.getString(item.get("column_name").toString())==null)
						{
							updatestr
							.append("\t\t")
							.append(item.get("column_name"))
							.append("='")
							.append(param.getString(
									item.get("column_name").toString()))
							.append("', \n");
						}else{
						updatestr
								.append("\t\t")
								.append(item.get("column_name"))
								.append("='")
								.append(param.getString(
										item.get("column_name").toString())
										.replaceAll("\\'", "\\\\'"))
								.append("', \n");
						}
					}
				}
			}
		}
		updatestr.delete(updatestr.lastIndexOf(","), updatestr.length());
		updatestr.append(" \n \t\t where ").append(updatewherestr);

		return updatestr.toString();
	}

	/**
	 * 按参数自动生成Update语句
	 * 
	 * @param 表名，更新参数集合，条件参数集合
	 */
	public String generatorUpdateSqlByParam(String tablename, DataRow param,
			DataRow condition) throws Exception {
		List<DataRow> columnslist;
		if (tablefield.containsKey(tablename)) {
			columnslist = tablefield.get(tablename);
		} else {
			// 查询表字段
			columnslist = getTableColumnList(tablename);
			if (columnslist != null) {
				tablefield.put(tablename, columnslist);
			}
		}
		StringBuilder updatestr = new StringBuilder();
		StringBuilder updatewherestr = new StringBuilder();
		updatestr.append("\t\t").append("update ").append(tablename)
				.append("\n").append(" \t\tset\n");
		for (DataRow item : columnslist) {
			if (!param.containsKey(item.getString("column_name"))
					&& !condition.containsKey(item.getString("column_name"))) {
				continue;
			}
			if (condition.containsKey(item.getString("column_name"))) {
				if (updatewherestr.length() > 0) {
					if (item.get("data_type").equals("int")) {
						updatewherestr
								.append("\t\t and ")
								.append(item.get("column_name"))
								.append("=")
								.append(condition.getString(item.get(
										"column_name").toString()))
								.append(" \n");
					} else {
						if(condition.getString(item.get("column_name").toString())==null)
						{
							updatewherestr
							.append("\t\t and ")
							.append(item.get("column_name"))
							.append(" is null \n");
						}else{
							updatewherestr
								.append("\t\t and ")
								.append(item.get("column_name"))
								.append("='")
								.append(condition.getString(
										item.get("column_name").toString())
										.replaceAll("\\'", "\\\\'"))
								.append("' \n");
						}
					}
				} else {
					if (item.get("data_type").equals("int")) {
						updatewherestr
								.append("\t\t")
								.append(item.get("column_name"))
								.append("=")
								.append(condition.getString(item.get(
										"column_name").toString()))
								.append(" \n");
					} else {
						if(condition.getString(item.get("column_name").toString())==null)
						{
							updatewherestr
							.append("\t\t ")
							.append(item.get("column_name"))
							.append(" is null \n");
						}else{
							updatewherestr
								.append("\t\t")
								.append(item.get("column_name"))
								.append("='")
								.append(condition.getString(
										item.get("column_name").toString())
										.replaceAll("\\'", "\\\\'"))
								.append("' \n");
						}
					}
				}

			}
			if (param.containsKey(item.getString("column_name"))) {
				if (item.get("data_type").equals("int")) {
					updatestr
							.append("\t\t")
							.append(item.get("column_name"))
							.append("=")
							.append(param.getString(item.get("column_name")
									.toString(),"")).append(", \n");
				} else {
					if (param.containsKey(item.get("column_name").toString())) {
						updatestr
								.append("\t\t")
								.append(item.get("column_name"))
								.append("='")
								.append(param.getString(
										item.get("column_name").toString(),"")
										.replaceAll("\\'", "\\\\'"))
								.append("', \n");
					}
				}
			}
		}
		updatestr.delete(updatestr.lastIndexOf(","), updatestr.length());
		updatestr.append(" \n \t\t  where ").append(updatewherestr);

		return updatestr.toString();
	}

	/**
	 * 按参数自动生成Delete语句
	 * 
	 * @param 表名，条件参数集合
	 */

	// 自动生成按主键Delete语句
	public String generatorDeleteSqlByKey(String tablename, DataRow param)
			throws Exception {
		List<DataRow> columnslist;
		if (tablefield.containsKey(tablename)) {
			columnslist = tablefield.get(tablename);
		} else {
			// 查询表字段
			columnslist = getTableColumnList(tablename);
			if (columnslist != null) {
				tablefield.put(tablename, columnslist);
			}
		}
		StringBuilder delstr = new StringBuilder();
		StringBuilder updatewherestr = new StringBuilder();

		for (DataRow item : columnslist) {
			logger.debug(item.toString());
			if (item.containsKey("column_key")
					&& item.get("column_key").toString().equals("PRI")) {
				if (!param.containsKey(item.get("column_name").toString())) {
					throw new Exception("主键不能为空");
				}
				
				if (!param.containsKey(item.getString("column_name"))) {
					continue;
				}
				
				if (updatewherestr.length() > 0) {
					if (item.get("data_type").equals("int")) {
						updatewherestr
								.append("\t\t and ")
								.append(item.get("column_name"))
								.append("=")
								.append(param.getString(item.get("column_name")
										.toString())).append(" \n");
					} else {
						updatewherestr
								.append("\t\t and ")
								.append(item.get("column_name"))
								.append("='")
								.append(param.getString(
										item.get("column_name").toString())
										.replaceAll("\\'", "\\\\'"))
								.append("' \n");
					}
				} else {
					if (item.get("data_type").equals("int")) {
						updatewherestr
								.append("\t\t")
								.append(item.get("column_name"))
								.append("=")
								.append(param.getString(item.get("column_name")
										.toString())).append(" \n");
					} else {
						updatewherestr
								.append("\t\t")
								.append(item.get("column_name"))
								.append("='")
								.append(param.getString(
										item.get("column_name").toString())
										.replaceAll("\\'", "\\\\'"))
								.append("' \n");
					}
				}

			}
		}
		delstr.append("\t\t delete from  ").append(tablename).append("\n")
				.append("\t\t where ").append(updatewherestr);
		return delstr.toString();
	}

	/**
	 * 根据参数自动生成Delete语句
	 * @param tablename
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public String generatorDeleteSqlByParam(String tablename, DataRow param)
			throws Exception {
		List<DataRow> columnslist;
		if (tablefield.containsKey(tablename)) {
			columnslist = tablefield.get(tablename);
		} else {
			// 查询表字段
			columnslist = getTableColumnList(tablename);
			if (columnslist != null) {
				tablefield.put(tablename, columnslist);
			}
		}
		StringBuilder delstr = new StringBuilder();
		StringBuilder updatewherestr = new StringBuilder();

		for (DataRow item : columnslist) {
			if (!param.containsKey(item.getString("column_name"))) {
				continue;
			}
			if (updatewherestr.length() > 0) {
				if (item.get("data_type").equals("int")) {
					updatewherestr
							.append("\t\t and ")
							.append(item.get("column_name"))
							.append("=")
							.append(param.getString(item.get("column_name")
									.toString())).append(" \n");
				} else {
					updatewherestr
							.append("\t\t and ")
							.append(item.get("column_name"))
							.append("='")
							.append(param.getString(
									item.get("column_name").toString())
									.replaceAll("\\'", "\\\\'")).append("' \n");
				}
			} else {
				if (item.get("data_type").equals("int")) {
					updatewherestr
							.append("\t\t")
							.append(item.get("column_name"))
							.append("=")
							.append(param.getString(item.get("column_name")
									.toString())).append(" \n");
				} else {
					logger.debug(item.getString("column_name"));
					logger.debug(param.toString());
					logger.debug(param.getString(item.getString("column_name")));
					updatewherestr
							.append("\t\t")
							.append(item.get("column_name"))
							.append("='")
							.append(param.getString(
									item.getString("column_name"))
									.replaceAll("\\'", "\\\\'")).append("' \n");
				}
			}
		}
		delstr.append("\t\t delete from  ").append(tablename).append("\n")
				.append("\t\t where ").append(updatewherestr);
		return delstr.toString();
	}

	/**
	 *  根据参数自动生成查询语句
	 * @param tablename
	 * @param param
	 * @param sortstr
	 * @param limitstr
	 * @return
	 * @throws Exception
	 */
	public String generatorQuerySqlByParam(String tablename, DataRow param,
			String sortstr, String limitstr) throws Exception {
		List<DataRow> columnslist;
		if (tablefield.containsKey(tablename)) {
			columnslist = tablefield.get(tablename);
		} else {
			// 查询表字段
			columnslist = getTableColumnList(tablename);
			if (columnslist != null) {
				tablefield.put(tablename, columnslist);
			}
		}
		StringBuilder querystr = new StringBuilder();
		StringBuilder updatewherestr = new StringBuilder();

		for (DataRow item : columnslist) {
			if (param==null||param.isEmpty()||!param.containsKey(item.getString("column_name"))||param.getString(item.getString("column_name"))==null) {
				continue;
			}

			if (updatewherestr.length() > 0) {
				if (item.get("data_type").equals("int")) {
					updatewherestr
							.append("\t\t and ")
							.append(item.get("column_name"))
							.append("=")
							.append(param.getString(item.get("column_name")
									.toString())).append(" \n");
				} else {
					updatewherestr
							.append("\t\t and ")
							.append(item.get("column_name"))
							.append("='")
							.append(param.getString(
									item.getString("column_name"))
									.replaceAll("\\'", "\\\\'")).append("' \n");
				}
			} else {
				if (item.get("data_type").equals("int")) {
					updatewherestr
							.append("\t\t")
							.append(item.get("column_name"))
							.append("=")
							.append(param.getString(item.get("column_name")
									.toString())).append(" \n");
				} else {
					updatewherestr
							.append("\t\t")
							.append(item.get("column_name"))
							.append("='")
							.append(param.getString(
									item.get("column_name").toString())
									.replaceAll("\\'", "\\\\'")).append("' \n");
				}
			}
		}
		if(param==null||param.isEmpty())
		{
			querystr.append("\t\t select * from  ").append(tablename);
		}else{
			querystr.append("\t\t select * from  ").append(tablename).append("\n")
			.append("\t\t where ").append(updatewherestr);
		}
		if (sortstr != null) {
			querystr.insert(0, "select * from ( ").append(" ) order_ ").append(sortstr);
		}
		if (limitstr != null) {
			querystr.insert(0, "select * from ( ").append(" ) limit_ ").append(limitstr);
		}
		return querystr.toString();
	}

	/**
	 *  根据参数自动生成查询语句
	 * @param tablename
	 * @param simplekey
	 * @return
	 * @throws Exception
	 */
	public String generatorQuerySqlByKey(String tablename, String simplekey)
			throws Exception {
		List<DataRow> columnslist;
		if (tablefield.containsKey(tablename)) {
			columnslist = tablefield.get(tablename);
		} else {
			// 查询表字段
			columnslist = getTableColumnList(tablename);
			if (columnslist != null) {
				tablefield.put(tablename, columnslist);
			}
		}
		StringBuilder querystr = new StringBuilder();
		StringBuilder updatewherestr = new StringBuilder();
		logger.debug("columnslist:"+columnslist.size());
		for (DataRow item : columnslist) {
			if (item.containsKey("column_key")
					&& item.get("column_key").toString().equals("PRI")) {

				if (item.get("data_type").equals("int")) {
					updatewherestr.append("\t\t ")
							.append(item.get("column_name")).append("=")
							.append(simplekey).append(" \n");
				} else {
					updatewherestr.append("\t\t ")
							.append(item.get("column_name")).append("='")
							.append(simplekey.replaceAll("\\'", "\\\\'"))
							.append("' \n");
				}

			}
		}
		querystr.append("\t\t select *  from  ").append(tablename).append("\n")
				.append("\t\t where ").append(updatewherestr);
		return querystr.toString();
	}
	/**
	 * 根据工单类型查询对应的处理函数名
	 * @param tradetype
	 * @return
	 * @throws Exception
	 */
	public String getFunctionNameByTradeType(String tradetype) throws Exception
	{
		if(tradebpm.containsKey(tradetype))
		{
			return tradebpm.getString(tradetype);
		}else{
			DataRow param = new DataRow();
			param.put("tradetype", tradetype);
			DataRow item = querySimpleRowByName("bpm_dispatch.selectFunctionByTradetype", param);
			if(item!=null&&!item.isEmpty())
			{
				tradebpm.put(item.getString("bpmtype"), item.getString("funname"));
				return tradebpm.getString(tradetype);
			}else{
				return null;
			}
		}
	}
	/**
	 * 根据主工单内容调用处理函数进行工单处理
	 * @param tradeinfo
	 * @return
	 * @throws Exception
	 */
	public String callTradeServiceFunction(final DataRow tradeinfo) throws Exception
	{
		String functionname="";
		if(tradeinfo.containsKey("tradetype"))
		{
			functionname = getFunctionNameByTradeType(tradeinfo.getString("tradetype"));
		}
		if(functionname!=null&&!functionname.isEmpty())
		{
			String selSql="{? = call "+functionname+"(?,?,?)}";
			String resultstr = jdbcTemplate.execute(selSql, new CallableStatementCallback<String>() {
	             public String doInCallableStatement(CallableStatement cs) throws SQLException, DataAccessException {
	            	 cs.registerOutParameter(1, java.sql.Types.VARCHAR);
	            	 cs.setString(2, tradeinfo.getString("tradeid"));
	            	 cs.setString(3, tradeinfo.getString("orderid"));
	            	 cs.setString(4, tradeinfo.getString("tradetype"));
	                 cs.execute();
	                 return cs.getString(1);
	             }
			});
			return resultstr;
		}else{
			throw new Exception("此工单类型无对应处理函数，TradeType："+tradeinfo.getString("tradetype"));
		}
	}
	
	/**
	 * 无返回值的存储过程调用
	 * @param name 存储过程名
	 */
	public void callFunction(String name)
	{
		jdbcTemplate.execute("{?=call "+name+"}");
	}
	
	/**
	 * 根据表名生成批量语句与批量参数顺序
	 * @param tablename
	 * @param column
	 * @return
	 * @throws Exception
	 */
	public String generatorsqlByBatch(String tablename,List<DataRow> columns) throws Exception
	{
		List<DataRow> columnslist;
		if (tablefield.containsKey(tablename)) {
			columnslist = tablefield.get(tablename);
		} else {
			// 查询表字段
			columnslist = getTableColumnList(tablename);
			if (columnslist != null) {
				tablefield.put(tablename, columnslist);
			}
		}
		if(columnslist.size()==0)
		{
			throw new Exception("操作的表："+tablename+"不存在");
		}
		StringBuilder insertstr = new StringBuilder();
		StringBuilder insertvaluestr = new StringBuilder();
		insertstr.append("\t\t").append("insert into ").append(tablename)
				.append("(\n");
		insertvaluestr.append("\t\t").append("values (\n");
		for (DataRow item : columnslist) {
			insertstr.append("\t\t\t").append(item.get("column_name")).append(",\n");
			insertvaluestr.append("?,");
			columns.add(item);
		}
		insertstr.delete(insertstr.lastIndexOf(","), insertstr.length());
		insertvaluestr.delete(insertvaluestr.lastIndexOf(","),
				insertvaluestr.length());
		insertstr.append(")\n");
		insertvaluestr.append(")\n");
		insertstr.append(insertvaluestr);
		return insertstr.toString();
	}
	
	/**
	 * 批量执行插入语句
	 * @param sql
	 * @param list
	 * @param columns
	 * @throws Exception 
	 */
	public void batchInsert(String tablename ,List<DataRow> paramlist) throws Exception
	{
		final List<DataRow> list = paramlist;
		List<DataRow> columns =new ArrayList<DataRow>();
		//logger.debug("generatorsqlByBatch: ");
		String sql = generatorsqlByBatch(tablename,columns);
		final List<DataRow> columnlist = columns;
		//logger.debug("sql: "+ sql);
		//logger.debug("columnlist: "+ columns);
		jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter(){
			 @Override
			public int getBatchSize()
            {
				return list.size();
            }
			@Override
			public void setValues(PreparedStatement ps, int i)
					throws SQLException {
				DataRow item = list.get(i);
				for(int ci=0;ci<columnlist.size();ci++)
				{
					String column_name = columnlist.get(ci).getString("column_name");
					if(item.getString(column_name)==null)
					{
						//logger.debug((ci+1)+"--set--"+columnlist.get(ci).getString("column_default"));
						ps.setString(ci+1,columnlist.get(ci).getString("column_default"));
						
					}else{
						//logger.debug((ci+1)+"--set--"+item.getString(column_name));
						ps.setString(ci+1, item.getString(column_name));
						
					}
				}
			}
		});
	}
	
	
	
	/**
	 * 通过SQL查询带BLOB字段的记录
	 */
	public List<DataRow> queryBlobFILEForList(String sql) {
		final ArrayList list = new ArrayList();
		jdbcTemplate.query(sql, new RowCallbackHandler() {
			public void processRow(ResultSet rs) throws SQLException {
				DataRow data = new DataRow();
				ResultSetMetaData rsmd = rs.getMetaData();
				
				for (int column = 1; column <= rsmd.getColumnCount(); column++) {
					// logger.debug(rsmd.getColumnName(column)+" type="+rsmd.getColumnType(column));
					if (rsmd.getColumnType(column) == Types.BLOB
							|| rsmd.getColumnType(column) == Types.LONGVARBINARY) {
						Blob blob = rs.getBlob(column);
						data.put(rsmd.getColumnLabel(column), blob.getBinaryStream());
						// logger.debug(rsmd.getColumnName(column)+"="+data.getString(rsmd.getColumnName(column)));
					} else if(rsmd.getColumnType(column) == Types.DATE||
							rsmd.getColumnType(column) == Types.TIME||
							rsmd.getColumnType(column) == Types.TIMESTAMP){
						data.put(rsmd.getColumnLabel(column),
								rs.getObject(column));
					}else if(rsmd.getColumnType(column) == Types.CHAR||
							rsmd.getColumnType(column) == Types.LONGVARCHAR||
							rsmd.getColumnType(column) == Types.VARCHAR||
							rsmd.getColumnType(column) == Types.LONGNVARCHAR) {
						data.put(rsmd.getColumnLabel(column),
								rs.getString(column));
					}else{
						data.put(rsmd.getColumnLabel(column),
								rs.getObject(column));
					}
					
				}
				list.add(data);
			}
		});
		return list;
	}
	

	

     private LobHandler lobHandler = new DefaultLobHandler();  // reusable object;			// ① 定义 LobHandler 属性
     public LobHandler getLobHandler() {
     return lobHandler;
     }
     public void setLobHandler(LobHandler lobHandler) {
     this.lobHandler = lobHandler;
     }
     
	/**
	 * 执行插入语句
	 * @param sql
	 * @param list
	 * @param columns
	 * @throws Exception 
	 */
	public void executBlobInsert(String tablename ,final DataRow post) throws Exception
	{

		final 
         String sql = " INSERT INTO erp_attach(Module,ParentID,Name,Date,Data,Size,RecordID,SalesOrderNo)"
         + " VALUES(?,?,?,?,?,?,?,?)";
         jdbcTemplate.execute(sql,
         new AbstractLobCreatingPreparedStatementCallback(this.lobHandler) {
	         protected void setValues(PreparedStatement ps,LobCreator lobCreator)
	         throws SQLException {
	         ps.setString(1, post.getString("Module"));
	         ps.setString(2, post.getString("ParentID"));
	         ps.setString(3, post.getString("Name"));
	         ps.setString(4, post.getString("Date"));
	       //  ps.setString(5, post.getString("Module"));
	         
	         lobCreator.setBlobAsBytes(ps, 5,  (byte[])post.get("Data"));
	         ps.setString(6, post.getString("Size"));
	         ps.setString(7, post.getString("RecordID"));
	         ps.setString(8, post.getString("SalesOrderNo"));
//	         //③ 设置 CLOB 字段
//	         lobCreator.setClobAsString(ps, 3, post.getPostText());
//	         //④ 设置 BLOB 字段
//	         lobCreator.setBlobAsBytes(ps, 4, post.getPostAttach());
	         
	         
	         }
         });


	}	
	


}
