package com.tcb.dao.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;

import org.omg.CORBA.PUBLIC_MEMBER;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.sun.corba.se.impl.oa.poa.ActiveObjectMap.Key;
import com.sun.istack.internal.FinalArrayList;
import com.tcb.dao.base.DBService;
import com.tcb.dao.base.DataRow;
import com.tcb.util.ConstantMap;
import com.tcb.util.MapUtil;
import com.tcb.util.StringUtil;

@Service(value = "CommonService")
public class CommonService {
	private static final Logger logger = LoggerFactory
			.getLogger(CommonService.class);
	@Autowired
	private DBService dbservice;
	// 定义缓存
	private static Cache<String, String> cache = CacheBuilder.newBuilder()
			.maximumSize(1000).build();
	private static Cache<String, String> basetypecache = CacheBuilder
			.newBuilder().maximumSize(1000).build();

	/**
	 * 根据BaseTypeId查询相应定义的Name
	 * 
	 * @param basetypeid
	 * @return TypeName
	 * @throws Exception
	 */
	public String getTypeNameById(final String basetypeid) throws Exception {
		String resultVal = basetypecache.get(basetypeid,
				new Callable<String>() {
					public String call() throws Exception {
						logger.debug("load basetype cache ...");
						DataRow param = new DataRow();
						param.put("flag", 1);
						List<DataRow> datalist = dbservice.queryListByParam(
								"td_basetype", param, "", "");
						String typename = "";
						for (DataRow item : datalist) {
							basetypecache.put(item.getString("basetypeid"),
									item.getString("typename"));
							if (basetypeid.equals(item.getString("basetypeid"))) {
								typename = item.getString("typename");
							}
						}
						return typename;
					}
				});
		return resultVal;
	}

	/*
	 * 根据categoryid+initvalue+placeholder获取下拉框内容
	 */
	public String getBaseTypeStringByKey(final String key, final DataRow param)
			throws Exception {
		String resultVal = cache.get(key, new Callable<String>() {
			public String call() throws Exception {
				logger.debug("load cache by " + key);
				StringBuffer optionstr = new StringBuffer();
				// 默认行
				if (param.containsKey("placeholder")
						&& param.get("placeholder") != null
						&& !param.getString("placeholder").isEmpty()) {
					optionstr.append("<option value=''>")
							.append(param.getString("placeholder"))
							.append("</option>");
				}
				List<DataRow> datalist = dbservice.queryForListByCodeKey(
						"td_basetype.selectListByCategoryid", param);
				for (Map item : datalist) {
					if (item.containsKey("typename")
							&& item.containsKey("basetypeid")) {
						// 默认选择项
						if (param.containsKey("initvalue")
								&& item.get("basetypeid").toString()
										.equals(param.getString("initvalue"))) {
							optionstr.append("<option selected value='")
									.append(item.get("basetypeid"))
									.append("'>").append(item.get("typename"))
									.append("</option>");
						} else {
							optionstr.append("<option value='")
									.append(item.get("basetypeid"))
									.append("'>").append(item.get("typename"))
									.append("</option>");
						}
					}
				}
				return optionstr.toString();
			}
		});

		return resultVal;
	}

	/*
	 * 根据委托单位获取付费单位下拉框内容
	 */

	public String getInvoiceNameByCompanyId(final String key,
			final String hostid) throws Exception {
		String resultVal = cache.get(key, new Callable<String>() {
			public String call() throws Exception {
				logger.debug("getFeepayDepartByCompanyID cache by " + key);
				StringBuffer optionstr = new StringBuffer();
				DataRow param = new DataRow();
				param.put("companyid", key);
				param.put("hostid", hostid);
				List<DataRow> datalist = dbservice.queryForListByCodeKey(
						"td_accounts_receivable.selectInvoiceNameByCompanyId",
						param);
				for (Map item : datalist) {
					if (item.containsKey("InvoiceName")) {
						optionstr.append("<li><a href='#'>")
								.append(item.get("InvoiceName"))
								.append("</a></li>");
					}
				}
				return optionstr.toString();
			}
		});

		return resultVal;
	}

	/*
	 * 获取货物类型
	 */
	public List<DataRow> getCargoCateGory() throws Exception {
		DataRow paramForCargoCategory = new DataRow();
		paramForCargoCategory.put("categoryid", ConstantMap.Category_Cargo);
		List<DataRow> cargoCategory = new ArrayList<DataRow>();
		cargoCategory = dbservice.queryForListByCodeKey(
				"td_basetype.selectListByCategoryid", paramForCargoCategory);
		return cargoCategory;
	}

	/*
	 * 通过OrderID查询主提单
	 */
	public DataRow getMainLadingbillByOrderID(String orderID) throws Exception {
		DataRow paramForLadingbill = new DataRow();
		paramForLadingbill.put("orderid", orderID);
		paramForLadingbill.put("flag", 1);
		paramForLadingbill.put("ismain", 1);

		DataRow ladingbill = dbservice.querySimpleRowByParam("te_ladingbill",
				paramForLadingbill, null);
		if (!MapUtil.isEmpty(ladingbill)) {
			return ladingbill;
		} else {
			return null;
		}
	}

	/*
	 * 通过OrderID查询主提单号
	 */
	public String getMainLadingbillNoByOrderID(String orderID) throws Exception {
		DataRow paramForLadingbill = new DataRow();
		paramForLadingbill.put("orderid", orderID);
		paramForLadingbill.put("flag", 1);
		paramForLadingbill.put("ismain", 1);

		DataRow ladingbill = dbservice.querySimpleRowByParam("te_ladingbill",
				paramForLadingbill, null);
		if (!MapUtil.isEmpty(ladingbill)) {
			return ladingbill.getString("LadingBillNo");
		} else {
			return null;
		}
	}

	/*
	 * 通过主键查询BaseType表的Name
	 */
	public String getBaseTypeNameByID(String basetypeid) throws Exception {
		if (StringUtil.isNullOrEmpty(basetypeid)) {
			return null;
		}
		DataRow dr = dbservice.querySimpleRowByKey("td_basetype", basetypeid);
		if (dr != null && !dr.isEmpty()) {
			return dr.getString("TypeName");
		}
		return null;
	}

	/*
	 * 通过名称查询BaseType表的ID
	 */
	public String getBaseTypeIDByName(String typename, String categoryID,
			String hostID) throws Exception {
		if (StringUtil.isNullOrEmpty(typename)
				|| StringUtil.isNullOrEmpty(categoryID)) {
			return null;
		}
		DataRow param = new DataRow();
		param.put("TypeName", typename);
		param.put("CategoryID", categoryID);
		param.put("flag", 1);
		param.put("hostid", hostID);
		List<DataRow> list = new ArrayList<DataRow>();
		list = dbservice.queryListByParam("td_basetype", param, null, null);
		if (list.size() > 0) {
			return list.get(0).getString("BaseTypeID");
		}
		return null;
	}

	/**
	 * 根据港口名称获取ID
	 * 
	 * @param portname
	 * @param hostID
	 * @return
	 * @throws Exception
	 */
	public String getPortIDByName(String portname, String hostID)
			throws Exception {
		if (StringUtil.isNullOrEmpty(portname)
				|| StringUtil.isNullOrEmpty(portname.trim())) {
			return null;
		}
		DataRow param = new DataRow();
		param.put("NameEN", portname);
		param.put("flag", 1);
		param.put("hostid", hostID);
		DataRow dr = dbservice.querySimpleRowByParam("td_port", param, null);
		if (dr != null && !dr.isEmpty()) {
			return dr.getString("PortID");
		}
		return null;
	}

	/**
	 * 通过名称查询包装表的ID
	 */
	public String getPkgTypeIDByName(String packageNameEN, String hostID)
			throws Exception {
		if (StringUtil.isNullOrEmpty(packageNameEN)) {
			return null;
		}
		DataRow param = new DataRow();
		param.put("PackageNameEN", packageNameEN);
		param.put("flag", 1);
		param.put("hostid", hostID);
		List<DataRow> list = new ArrayList<DataRow>();
		list = dbservice.queryListByParam("td_package", param, null, null);
		if (list.size() > 0) {
			return list.get(0).getString("PackageID");
		}
		return null;
	}

	/**
	 * 通过名称查询包装表的ID
	 */
	public String getPkgTypeNameByID(String PackageID) throws Exception {
		if (StringUtil.isNullOrEmpty(PackageID)) {
			return null;
		}
		return dbservice.querySimpleRowByKey("td_package", PackageID)
				.getString("packageNameEN");
	}

	/**
	 * 通过角色和助记码查询对应费用类型
	 * 
	 * @param key
	 *            角色ID字符串
	 * @param hostid
	 * @return
	 * @throws Exception
	 */
	public String getFeeTypeIds(final String roleids, final String hostid,
			final String isoperator, final String ispayorrecvice)
			throws Exception {
		final String key = roleids + hostid + isoperator + ispayorrecvice;
		String resultVal = cache.get(key, new Callable<String>() {
			public String call() throws Exception {
				logger.debug("getFeeTypeIds cache by " + key);
				StringBuffer optionstr = new StringBuffer();
				DataRow param = new DataRow();
				param.put("roleids", roleids);
				param.put("hostid", hostid);
				param.put("isoperator", isoperator);
				param.put("ispayorrecvice", ispayorrecvice);
				List<DataRow> datalist = dbservice.queryForListByCodeKey(
						"td_basetype.selectFeetypeidByRoleid", param);
				for (Map item : datalist) {
					if (item.containsKey("typename")) {
						optionstr.append("<li><a href='#' idvalue='")
								.append(item.get("basetypeid")).append("'>")
								.append(item.get("typename"))
								.append("</a></li>");
					}
				}
				return optionstr.toString();
			}
		});

		return resultVal;
	}

	/**
	 * 
	 * @param roleids
	 * @param hostid
	 * @param isoperator
	 * @param ispayorrecvice
	 * @return
	 * @throws Exception
	 */
	public String getAllFeeTypeIds(final String hostid) throws Exception {
		final String key = hostid + "_allfeetypeids";
		String resultVal = cache.get(key, new Callable<String>() {
			public String call() throws Exception {
				logger.debug("getFeeTypeIds cache by " + key);
				StringBuffer optionstr = new StringBuffer();
				DataRow param = new DataRow();
				param.put("hostid", hostid);
				List<DataRow> datalist = dbservice.queryForListByCodeKey(
						"td_basetype.selectAllFeeType", param);
				for (Map item : datalist) {
					if (item.containsKey("fulltypename")) {
						optionstr.append("<li><a href='#' idvalue='")
								.append(item.get("basetypeid")).append("'>")
								.append(item.get("fulltypename"))
								.append("</a></li>");
					}
				}
				return optionstr.toString();
			}
		});

		return resultVal;
	}

	/**
	 * 根据公司hostid查询对应船东
	 * 
	 * @param hostid
	 * @return
	 * @throws Exception
	 */
	public String getCarriers(final String hostid) throws Exception {
		String resultVal = cache.get(hostid + "_carriers",
				new Callable<String>() {
					public String call() throws Exception {
						logger.debug("getCarriers cache by hostid:" + hostid);
						StringBuffer optionstr = new StringBuffer();
						DataRow param = new DataRow();
						param.put("hostid", hostid);
						param.put("flag", 1);
						List<DataRow> datalist = dbservice.queryListByParam(
								"td_carrier", param, null, null);
						for (Map item : datalist) {
							if (item.containsKey("CarrierID")) {
								optionstr.append("<li><a href='#' idvalue='")
										.append(item.get("CarrierID"))
										.append("'>")
										.append(item.get("NameEN")).append("/")
										.append(item.get("NameCN"))
										.append("</a></li>");
							}
						}
						return optionstr.toString();
					}
				});

		return resultVal;
	}

	/**
	 * 获取所有的岗位下拉列表
	 * 
	 * @param hostid
	 * @return
	 * @throws Exception
	 */
	public String getCompanyRoles(final String hostid) throws Exception {
		String resultVal = cache.get(hostid + "_companyroles",
				new Callable<String>() {
					public String call() throws Exception {
						logger.debug("getCompanyRoles cache by hostid:"
								+ hostid);
						StringBuffer optionstr = new StringBuffer();
						DataRow param = new DataRow();
						param.put("hostid", hostid);
						param.put("flag", 1);
						List<DataRow> datalist = dbservice
								.queryForListByCodeKey(
										"td_basetype.selectAllRoleList", param);
						for (Map item : datalist) {
							if (item.containsKey("basetypeid")) {
								optionstr.append("<li><a href='#' idvalue='")
										.append(item.get("basetypeid"))
										.append("'>")
										.append(item.get("typename"))
										.append("</a></li>");
							}
						}
						return optionstr.toString();
					}
				});

		return resultVal;
	}

	public String getAccountsPayableList(final String hostid) throws Exception {
		String resultVal = cache.get(hostid + "_accountspayable",
				new Callable<String>() {
					public String call() throws Exception {
						logger.debug("getAccountsPayableList cache by hostid:"
								+ hostid);
						StringBuffer optionstr = new StringBuffer();
						DataRow param = new DataRow();
						param.put("hostid", hostid);
						param.put("flag", 1);
						List<DataRow> datalist = dbservice.queryListByParam(
								"td_accounts_payable", param, null, null);
						for (Map item : datalist) {
							if (item.containsKey("accountspayableid")) {
								optionstr.append("<li><a href='#' idvalue='")
										.append(item.get("accountspayableid"))
										.append("'>")
										.append(item.get("accountname"))
										.append("</a></li>");
							}
						}
						return optionstr.toString();
					}
				});

		return resultVal;
	}

	/**
	 * 查询特殊费用定义类表
	 * 
	 * @param hostid
	 * @return
	 * @throws Exception
	 */
	public String getSpecialFeeNames(final DataRow param) throws Exception {
		if (StringUtil.isNullOrEmpty(param.getString("grouptype")))
		{
			param.remove("grouptype");
		}
		String key = "_specialfeenames";
		if (param.containsKey("grouptype")) {
			key = param.getString("hostid") + param.getString("grouptype")
					+ "_specialfeenames";
		} else {
			key = param.getString("hostid") + "_specialfeenames";
		}
		
		if (param.containsKey("receOrpay"))
		{
			key += "_"+param.getString("receOrpay");
		}

		String resultVal = cache.get(key, new Callable<String>() {
			public String call() throws Exception {
				logger.debug("getSpecialFeeNames cache by hostid:"
						+ param.getString("hostid")
						+ param.getString("grouptype"));
				StringBuffer optionstr = new StringBuffer();
				List<DataRow> datalist = dbservice.queryListByParam(
						"td_specialfeegroup", param, null, null);
				for (Map item : datalist) {
					if (item.containsKey("groupname")) {
						optionstr.append("<li><a href='#' idvalue='")
								.append(item.get("specialfeegroupid"))
								.append("'>").append(item.get("groupname"))
								.append("</a></li>");
					}
				}
				return optionstr.toString();
			}
		});

		return resultVal;
	}

	/**
	 * 根据公司hostid查询对应委托单位
	 * 
	 * @param hostid
	 * @return
	 * @throws Exception
	 */
	public String getCompanys(final String hostid, final String category)
			throws Exception {
		String resultVal = cache.get(hostid + "_" + category,
				new Callable<String>() {
					public String call() throws Exception {
						logger.debug("getCompanys cache by hostid:" + hostid);
						StringBuffer optionstr = new StringBuffer();
						DataRow param = new DataRow();
						param.put("hostid", hostid);
						param.put("categoryid", category);
						List<DataRow> datalist = dbservice
								.queryForListByCodeKey(
										"td_company.selectCompanyByType", param);
						for (Map item : datalist) {
							if (item.containsKey("CompanyID")) {
								optionstr.append("<li><a href='#' idvalue='")
										.append(item.get("CompanyID"))
										.append("'>")
										.append(item.get("CompanyName"))
										.append("</a></li>");
							}
						}
						return optionstr.toString();
					}
				});

		return resultVal;
	}

	/**
	 * 根据公司hostid查询对应航线区域
	 * 
	 * @param hostid
	 * @return
	 * @throws Exception
	 */
	public String getRouteLineAreas(final String hostid) throws Exception {
		String resultVal = cache.get(hostid + "_routelineareas",
				new Callable<String>() {
					public String call() throws Exception {
						logger.debug("getRouteLineAreas cache by hostid:"
								+ hostid);
						StringBuffer optionstr = new StringBuffer();
						DataRow param = new DataRow();
						param.put("hostid", hostid);
						param.put("flag", 1);
						List<DataRow> datalist = dbservice.queryListByParam(
								"td_routelinearea", param, null, null);
						for (Map item : datalist) {
							if (item.containsKey("NameCN")) {
								optionstr.append("<li><a href='#' idvalue='")
										.append(item.get("RouteLineAreaID"))
										.append("'>")
										.append(item.get("NameCN"))
										.append("</a></li>");
							}
						}
						return optionstr.toString();
					}
				});

		return resultVal;
	}

	/**
	 * 获取委托操作人员ID
	 * 
	 * @param 委托编号
	 * @param 角色ID
	 * @return 委托操作人员ID
	 */
	public String getOperatorUser(String orderID, String roleID)
			throws Exception {
		DataRow param = new DataRow();
		param.put("orderid", orderID);
		param.put("roleID", roleID);
		param.put("flag", 1);

		List<DataRow> opList = new ArrayList<DataRow>();
		opList = dbservice.queryListByParam("te_orderoperators", param, null,
				null);
		if (opList.size() > 0) {
			return opList.get(0).getString("Staffid");
		}
		return null;
	}

	/**
	 * 通过角色查询用户列表 author gening date 2015年5月3日
	 * 
	 * @param hostid
	 *            宿主Id
	 * @param roleid
	 *            角色Id
	 * @return
	 * @throws ExecutionException
	 */
	public String getUsersByRole(final String hostid, final String roleid)
			throws ExecutionException {
		final String key = hostid + roleid;
		String resultVal = cache.get(key, new Callable<String>() {
			public String call() throws Exception {
				logger.debug("getUsersByRole cache by " + key);
				StringBuffer optionstr = new StringBuffer();
				DataRow param = new DataRow();
				param.put("roleid", roleid);
				param.put("hostid", hostid);
				List<DataRow> datalist = dbservice.queryForListByCodeKey(
						"td_userinfo.selectUserByRole", param);
				for (Map item : datalist) {
					if (item.containsKey("StaffName")) {
						optionstr.append("<li><a href='#' idvalue='")
								.append(item.get("StaffID")).append("'>")
								.append(item.get("StaffName"))
								.append("</a></li>");
					}
				}
				return optionstr.toString();
			}
		});

		return resultVal;
	}

	public String getRouteLineArea(final String hostid)
			throws ExecutionException {
		final String key = hostid + "linearea";
		String resultVal = cache.get(key, new Callable<String>() {
			public String call() throws Exception {
				// TODO Auto-generated method stub
				logger.debug("getRouteLineArea cache by " + key);
				StringBuffer optionstr = new StringBuffer();
				DataRow param = new DataRow();
				param.put("hostid", hostid);
				param.put("flag", 1);
				List<DataRow> datalist = dbservice.queryListByParam(
						"td_routelinearea", param, null, null);
				for (Map item : datalist) {
					if (item.containsKey("NameCN")) {
						optionstr.append("<li><a href='#' idvalue='")
								.append(item.get("RouteLineAreaID"))
								.append("'>").append(item.get("NameCN"))
								.append("</a></li>");
					}
				}
				return optionstr.toString();
			}
		});
		return resultVal;
	}

	/**
	 * 通过KEY删除缓存
	 * 
	 * @param key
	 */
	public void removeFromCacheByKey(String key) {
		cache.invalidate(key);
	}

	/**
	 * 获取订单收发通
	 * 
	 * @param scntype
	 * @param orderid
	 * @return
	 * @throws Exception
	 */
	public String getOrderSCNTotalInfo(String scntype, String orderid)
			throws Exception {
		if (StringUtil.isNullOrEmpty(scntype)
				|| StringUtil.isNullOrEmpty(orderid)) {
			return null;
		}
		DataRow param = new DataRow();
		param.put("scntype", scntype);
		param.put("orderid", orderid);
		DataRow dr = dbservice.querySimpleRowByName(
				"te_orderscninfo.selectOrderSCNTotalInfo", param);
		if (dr != null && !dr.isEmpty()) {
			return dr.getString("ScnContent");
		}
		return null;
	}

	/**
	 * 获取orderCargo的信息，带唛头和货描
	 * 
	 * @param orderid
	 * @return
	 * @throws Exception
	 */
	public List<DataRow> getOrderCargoTotalList(String orderid)
			throws Exception {

		List<DataRow> drList = new ArrayList<DataRow>();
		DataRow paramForCargo = new DataRow();
		paramForCargo.put("orderid", orderid);
		paramForCargo.put("flag", 1);
		drList = dbservice.queryListByParam("te_ordercargo", paramForCargo,
				null, null);

		if (drList.size() > 0) {
			for (DataRow dr : drList) {

				String CargoTypeID = dr.getString("CargoTypeID");
				String cargoType = getBaseTypeNameByID(CargoTypeID);
				dr.put("cargoType", cargoType);

				String PkgTypeID = dr.getString("PkgTypeID");
				String pkgType = getPkgTypeNameByID(PkgTypeID);
				dr.put("pkgType", pkgType);

				List<DataRow> drMarksList = new ArrayList<DataRow>();
				DataRow param = new DataRow();
				param.put("OrderCargoID", dr.get("OrderCargoID"));
				param.put("flag", 1);
				drMarksList = dbservice.queryListByParam("te_ordercargomarks",
						param, "order by SeqNo asc", null);
				String marks = "";
				if (drMarksList.size() > 0) {
					int i = 0;
					for (DataRow drMarks : drMarksList) {
						i++;
						if (!StringUtil.isNullOrEmpty(drMarks
								.getStringInUpper("Marks"))) {
							marks += drMarks.getStringInUpper("Marks");
						}
						if (i < drMarksList.size()) {
							marks += "<br>";
						}
					}
					dr.put("marks", marks);
				}

				List<DataRow> drDesList = new ArrayList<DataRow>();
				drDesList = dbservice.queryListByParam("te_ordercargodes",
						param, "order by SeqNo asc", null);

				String des = "";
				if (drDesList.size() > 0) {
					int i = 0;
					for (DataRow drDes : drDesList) {
						i++;
						if (!StringUtil.isNullOrEmpty(drDes
								.getStringInUpper("CargoDes"))) {
							des += drDes.getStringInUpper("CargoDes");
						}
						if (i < drDesList.size()) {
							des += "<br>";
						}
					}
					dr.put("des", des);
				}

				DataRow drDanger = dbservice.querySimpleRowByParam(
						"te_ordercargodanger", param, null);
				if (drDanger != null && !drDanger.isEmpty()) {
					dr.put("UNNo", drDanger.get("UNNo"));
					dr.put("ClassNo", drDanger.get("ClassNo"));
				}
				DataRow drReefer = dbservice.querySimpleRowByParam(
						"te_ordercargoreefer", param, null);
				if (drReefer != null && !drReefer.isEmpty()) {
					dr.put("SetTemperature", drReefer.get("SetTemperature"));
					dr.put("MinTemperature", drReefer.get("MinTemperature"));
					dr.put("MaxTemperature", drReefer.get("MaxTemperature"));
					dr.put("Ventilate", drReefer.get("Ventilate"));
					dr.put("Humidity", drReefer.get("Humidity"));
				}
				DataRow drSpecial = dbservice.querySimpleRowByParam(
						"te_ordercargospecial", param, null);
				if (drSpecial != null && !drSpecial.isEmpty()) {
					dr.put("SetLength", drSpecial.get("SetLength"));
					dr.put("SetWidth", drSpecial.get("SetWidth"));
					dr.put("SetHeight", drSpecial.get("SetHeight"));
				}
			}
		}

		return drList;
	}

	/**
	 * 获取Order Scn Info author gening date 2015年5月14日
	 * 
	 * @param orderid
	 * @param scnType
	 * @return
	 * @throws Exception
	 */
	public List<String> getOrderScnInfo(String orderid, String scnType)
			throws Exception {
		DataRow param = new DataRow();
		param.put("orderid", orderid);
		param.put("SCNID", scnType);
		List<DataRow> scnInfoInDb = dbservice.queryForListByCodeKey(
				"te_orderscninfo.selectTotalScnInfo", param);

		List<String> scnList = new ArrayList<String>();

		for (DataRow dr : scnInfoInDb) {
			if (!StringUtil.isNullOrEmpty(dr.getStringInUpper("content"))) {
				scnList.add(dr.getStringInUpper("content"));
			}
		}

		return scnList;
	}

	/**
	 * 获取提单 SCN Info author gening date 2015年5月14日
	 * 
	 * @param ladingbillid
	 *            提单Id
	 * @return
	 * @throws Exception
	 */
	public DataRow getLadingbillScnInfo(String ladingbillid) throws Exception {
		DataRow param = new DataRow();
		param.put("ladingbillid", ladingbillid);
		DataRow scnInfo = dbservice.querySimpleRowByName(
				"te_ladingbillscn.selectSCNForLadingbill", param);
		return scnInfo;
	}

	public List<DataRow> getLadingbillContainerList(String ladingbillid)
			throws Exception {
		DataRow param = new DataRow();
		param.put("ladingbillid", ladingbillid);
		List<DataRow> containers = dbservice.queryForListByCodeKey(
				"te_ladingbillcontainerdetail.selectLadingbillContainDetails",
				param);
		return containers;
	}

	public String getCompanyDepartment(final String hostid,
			final String companyid) throws ExecutionException {
		final String key = hostid + "comdept" + companyid;
		String resultVal = cache.get(key, new Callable<String>() {
			public String call() throws Exception {
				// TODO Auto-generated method stub
				logger.debug("getCompanyDepartment cache by " + key);
				StringBuffer optionstr = new StringBuffer();
				DataRow param = new DataRow();
				param.put("hostid", hostid);
				param.put("CompanyId", companyid);
				param.put("flag", 1);
				List<DataRow> datalist = dbservice.queryListByParam(
						"td_companydepartment", param, null, null);
				for (Map item : datalist) {
					if (item.containsKey("CompanyDeptID")) {
						optionstr.append("<li><a href='#' idvalue='")
								.append(item.get("DepartmentName"))
								.append("' objid='")
								.append(item.get("CompanyDeptID")).append("'>")
								.append(item.get("DepartmentName"))
								.append("</a></li>");
					}
				}
				return optionstr.toString();
			}
		});
		return resultVal;
	}

	/**
	 * 根据deptid 获取staff list
	 * 
	 * @author nge
	 * @date 2015年5月26日
	 * @param hostid
	 * @param companyid
	 * @param deptid
	 * @return
	 * @throws Exception
	 */
	public String getStaffByDeptId(final String hostid, final String companyid,
			final String deptid) throws Exception {
		final String key = hostid + "staffdept" + companyid + deptid;
		String resultVal = cache.get(key, new Callable<String>() {
			public String call() throws Exception {
				// TODO Auto-generated method stub
				logger.debug("getStaffByDeptId cache by " + key);
				StringBuffer optionstr = new StringBuffer();
				DataRow param = new DataRow();
				param.put("hostid", hostid);
				param.put("CompanyID", companyid);
				param.put("DepartmentID", deptid);
				param.put("flag", 1);
				List<DataRow> datalist = dbservice.queryListByParam(
						"td_userinfo", param, null, null);
				for (Map item : datalist) {
					if (item.containsKey("StaffID")) {
						optionstr.append("<li><a href='#' idvalue='")
								.append(item.get("StaffName"))
								.append("' objid='")
								.append(item.get("StaffID")).append("'>")
								.append(item.get("StaffName"))
								.append("</a></li>");
					}
				}
				return optionstr.toString();
			}
		});
		return resultVal;
	}

	/**
	 * 获取审批状态ID
	 * 
	 * @param orderid
	 * @param tradeType
	 * @return
	 * @throws Exception
	 */
	public String getAppStatusIDForOrder(String orderid, String tradeType)
			throws Exception {
		DataRow param = new DataRow();
		param.put("orderid", orderid);
		param.put("tradetype", tradeType);
		DataRow dr = dbservice.querySimpleRowByParam("te_orderapprove", param,
				"order by CreateTime desc");
		if (!dr.isEmpty()) {
			return dr.getString("Oparg1");
		}
		return null;
	}

	/**
	 * 获取审批状态名称
	 * 
	 * @param orderid
	 * @param tradeType
	 * @return
	 * @throws Exception
	 */
	public String getAppStatusNameForOrder(String orderid, String tradeType)
			throws Exception {
		DataRow param = new DataRow();
		param.put("orderid", orderid);
		param.put("tradetype", tradeType);
		DataRow dr = dbservice.querySimpleRowByParam("te_orderapprove", param,
				"order by CreateTime desc");
		if (!dr.isEmpty()) {
			String id = dr.getString("Oparg1");
			return getBaseTypeNameByID(id);
		}

		return null;
	}

	/**
	 * 获取用户是否属于该角色
	 * 
	 * @param staffid
	 * @param roleid
	 * @return
	 */
	public boolean getCurUserIsRole(String staffid, String roleid)
			throws Exception {
		DataRow param = new DataRow();
		param.put("staffid", staffid);
		param.put("roleid", roleid);
		DataRow dr = dbservice.querySimpleRowByParam("tr_usermaprole", param,
				null);
		if (dr != null && !dr.isEmpty()) {
			return true;
		}
		return false;
	}
}
