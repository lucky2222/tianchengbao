package com.tcb.util;

import java.util.Arrays;
import java.util.List;

import org.omg.CORBA.PUBLIC_MEMBER;

import com.tcb.dao.base.DataRow;

public class ConstantMap {

	/*
	 * 危险品等级
	 */
	public static String DangerLvl1 = "203101";
	public static String DangerLvl2 = "203102";
	public static String DangerLvl3 = "203103";
	public static String DangerLvl4 = "203104";
	public static String DangerLvl5 = "203105";
	public static String DangerLvl6 = "203106";
	public static String DangerLvl7 = "203107";
	public static String DangerLvl8 = "203108";
	public static String DangerLvl9 = "203109";

	/*
	 * 货物类型
	 */
	public static String WXP = "109103";// 危险品
	public static String LCWXP = "109105";// 冷藏危险品
	public static String TZXH = "109106";// 特种箱货
	public static String LH = "109104";// 冷货
	public static String PH = "109101";// 普货
	public static String YBHGP = "109102";// 一般化工品

	/*
	 * 收发通
	 */

	public static String CONSIGNEE = "104101";// 收货人
	public static String SHIPPER = "104102";// 发货人
	public static String NOTIFY = "104103";// 通知人
	public static String SECONDNOTIFY = "104104";// 第二通知人

	/*
	 * 付款方式
	 */
	public static String PREPAY = "117101";// 预付
	public static String APPOINTPREPAY = "117102";// 预付自有约
	public static String AFTERPAY = "117103";// 到付
	public static String APPOINTAFTERPAY = "117104";// 到付自有约
	public static String SPECIFYAFTERPAY = "117105";// 到付指定货

	/*
	 * 下单类型
	 */
	public static String DRAFT = "500201";// 草稿
	public static String TEMPLATE = "500202";// 模板
	public static String FORMAT = "500203";// 正式订单

	/*
	 * 币种
	 */
	public static String CNY = "133102";// 软妹币
	public static String USD = "133101";// 美金

	/*
	 * 应收海运费状态
	 */
	public static String RF_DISCUSS = "127101";// 议价
	public static String RF_REDISCUSS = "127102";// 拒绝过,再议价
	public static String RF_REFUSE = "127103";// 被拒绝
	public static String RF_APPLYING = "127104";// 运价申请中
	public static String RF_TENTATIVE = "127105";// 暂定运价
	public static String RF_CONFIRM = "127106";// 确定运价

	/*
	 * 应付海运费状态
	 */
	public static String PF_TENTATIVE = "216101";// 暂定
	public static String PF_CONFIRM = "216102";// 确定

	/*
	 * 岗位
	 */
	public static String ROLE_SERVICE = "1";// 操作中心-客服岗
	public static String ROLE_CZOPERATOR = "2";// 综合业务-产装岗
	public static String ROLE_CERT = "3";// 操作中心-单证岗
	public static String ROLE_FREIGHT = "4";// 舱位管理中心-运价岗
	public static String ROLE_BOOK = "5";// 舱位管理中心-订舱岗
	public static String ROLE_SALE = "6";// 销售员岗
	public static String ROLE_FINANCE = "7";// 操作中心-财务人员岗
	public static String ROLE_CUSTOMER = "8";// 客户
	public static String ROLE_SERVICEMANAGER = "9";// 操作中心-客服经理岗
	public static String ROLE_OPERATORMANAGER = "10";// 综合业务-经理岗
	public static String ROLE_CERTLEADER = "11";// 操作中心-单证主管岗
	public static String ROLE_BOOKMANAGER = "12";// 舱位管理中心-经理岗
	public static String ROLE_BOOKLEADER = "13";// 操作中心-订舱主管岗
	public static String ROLE_FINANCEMANAGER = "14";// 操作中心-财务经理岗
	public static String ROLE_GENERALMANAGER = "15";// 总经理
	public static String ROLE_SALELEADER = "16";// 销售主管岗
	public static String ROLE_CUSTOMERMANAGER = "17";// 客户经理
	public static String ROLE_LADINGBILLSCAN = "18";// 提单扫描员岗
	public static String ROLE_DZOPERATOR = "21";// 综合业务-堆装岗
	public static String ROLE_CUSTOMS = "22";// 综合业务-报关
	public static String ROLE_TAILER = "23";// 车队人员
	public static String ROLE_COURTYARD = "24";// 堆场人员
	public static String ROLE_FANGDAN = "25";// 操作中心-放单人员岗
	public static String ROLE_LANHUOYUAN = "26";// 揽货员
	public static String ROLE_ENTRY = "97";// 操作中心-录入岗
	public static String ROLE_ADMIN = "99";// 系统管理员岗

	public enum ROLE {
		/**
		 * 系统管理员
		 */
		ADMIN("99", 2),
		/**
		 * 综合业务部经理
		 */
		OPERATOR_DPTM_MANAGER("10", 1),
		/**
		 * 单证主管
		 */
		CERT_DPTM_MANAGER("11", 1),
		/**
		 * 舱位管理中心经理
		 */
		BOOKCENTER_DPTM_MANAGER("12", 1),
		/**
		 * 操作中心订舱主管
		 */
		BOOKER_DPTM_MANAGER("13", 1),
		/**
		 * 操作中心财务经理
		 */
		FINANCE_DPTM_MANAGER("14", 1),
		/**
		 * 总经理
		 */
		GENERAL_MANAGER("15", 2),
		/**
		 * 销售主管
		 */
		SALE_DPTM_MANAGER("16", 1),
		/**
		 * 客户经理
		 */
		CUSTOMER_DPTM_MANAGER("17", 1),
		/**
		 * 操作中心-客服经理
		 */
		SERVICE_DPTM_MANAGER("9", 1);

		/**
		 * 权限ID
		 */
		private String roleId;
		/**
		 * 权限类别 0：操作员，1：部门主管、部门经理，2：总经理、管理员
		 */
		private int roletype;

		private ROLE(String roleId, int roletype) {
			this.roleId = roleId;
			this.roletype = roletype;
		}

		/**
		 * 判断是否是经理、主管、管理员
		 * 
		 * @author nge
		 * @date 2015年5月26日
		 * @param roleIds
		 * @return
		 */
		public static boolean IsDeptManger(DataRow roleIds) {
			if (roleIds == null || roleIds.isEmpty()) {
				return false;
			}

			for (ROLE role : ROLE.values()) {
				if (role.roletype >= 1 && roleIds.containsKey(role.roleId)) {
					return true;
				}
			}

			return false;
		}

		public static boolean IsAdmin(DataRow roleIds) {
			if (roleIds == null || roleIds.isEmpty()) {
				return false;
			}

			for (ROLE role : ROLE.values()) {
				if (role.roletype == 2 && roleIds.containsKey(role.roleId)) {
					return true;
				}
			}

			return false;
		}
	}

	/*
	 * 部门
	 */
	public static String DEPARTMENT_SALES = "1001";// 销售部

	/*
	 * 出单类型
	 */
	public static String ORIGINAL = "112101";// 正本
	public static String TELEXRELEASE = "112102";// 电放
	public static String SEAWAYBILL = "112103";// 海运提单

	/*
	 * 单证状态
	 */
	public static String CERT_WSC = "102101";// 未上传
	public static String CERT_SCWQR = "102102";// 上传未确认
	public static String CERT_YQR = "102103";// 已确认
	public static String CERT_XCXSC = "102104";// 需重新上传

	/*
	 * 费用
	 */
	public static String FEE_SEAPRICE = "138145";// 海运费
	public static String FEE_AGENCYFEE = "138171";// 客服代理费

	/*
	 * 放单地点
	 */
	public static String TAKEBILL_LOADPORT = "148101";
	public static String TAKEBILL_DISCHARGEPORT = "148102";
	public static String THIRDPLACE = "148103";// 第三地

	/**
	 * 美国航线
	 */
	public static String AREA_AMERICA = "0a66ee55-ab54-11e4-80a9-782bcb12d9ef";// 美国航线

	/*
	 * 收发通内容类型
	 */
	public static String COMPANYNAME = "500301";// 公司名称
	public static String COMPANYADDRESS = "500302";// 公司地址
	public static String TEL = "500303";// 电话
	public static String EMAIL = "500304";// 邮箱
	public static String FAX = "500305";// 传真
	public static String POSTCODE = "500306";// 邮编

	// 前台查询运价 日历界面，共多少周
	public static int CalendarWeekAmount = 6;

	public static String FullContainerOrder = "500101"; // 整箱订单
	public static String LessContainerOrder = "500102"; // 拼箱订单
	public static String Packing = "500103"; // 独立堆装
	public static String OriginPacking = "500104"; // 独立产装
	public static String CustomsDeclaration = "500105"; // 独立报关
	public static String AgentBusiness = "500106"; // 代收代付
	public static String Outside = "500107"; // 外站出货

	// 开航日之前几日停止订舱
	public static int DayCloseBeforeETD = 3;

	/*
	 * 工单Trade类型
	 */
	public static String TradeType_EditVveByBook = "9001";// 订舱员修改船名航次开航日
	public static String TradeType_ChangeShipByBook = "9002";// 订舱员换船订舱
	public static String TradeType_SendMsgToSalesByBook = "9003";// 订舱员给揽货员发消息
	public static String TradeType_ChangeTempShipByBook = "9004";// 订舱员换临时船
	public static String TradeType_SaveEdiSpeInfo = "9005";// 保存EDI特殊要求
	public static String TradeType_AddContainerCargo = "9101";// 录入装箱货物信息
	public static String TradeType_UpdateContainerCargo = "9102";// 更新装箱货物信息
	public static String TradeType_DeleteContainerCargo = "9103";// 删除装箱货物信息
	public static String TradeType_PutCargoIntoContainer = "9104";// 装箱录入货物件重尺
	public static String TradeType_DeleteCargoIntoContainer = "9105";// 装箱删除货物件重尺
	public static String TradeType_GennarateSingleManifest = "9106";// 自动生成舱单，不分舱
	public static String TradeType_ReSplitManifest = "9107";// 重新分舱
	public static String TradeType_ImportManifestExcel = "9108";// 导入舱单表
	public static String TradeType_SubmitManifest = "9109";// 确认舱单OK
	public static String TradeType_SaveDeclarediIdentifier = "9110";// 录入申报标识
	public static String TradeType_EditManifestTotalInfo = "9111";// 编辑舱单信息

	public static String TradeType_ChangeShipByService = "9501";// 客服换船

	/*
	 * 基础数据类型
	 */
	public static String Category_Cargo = "01ae2441-ac4b-11e4-80a9-782bcb12d9ef";// 货物类型

	/*
	 * 公司类型
	 */
	public static String COMPANY_CARRIER = "700001";// 公司-承运人
	public static String COMPANY_WAIPEI = "700002";// 公司-外配公司
	public static String COMPANY_CUSTOMER = "700003";// 公司-客户
	public static String COMPANY_COURTYARD = "700004";// 公司-堆场
	public static String COMPANY_TRAILER = "700005";// 公司-车队
	public static String COMPANY_CUSTOMSBROKER = "700006";// 公司-报关行
	public static String COMPANY_EXPRESS = "700007";// 公司-快递公司

	/*
	 * 舱单表表头
	 */
	public static String ManifestExcelTitle_ManifestNo = "舱单号";// 舱单号
	public static String ManifestExcelTitle_ContainerType = "箱型";// 箱型
	public static String ManifestExcelTitle_ContainerNo = "箱号";// 箱号
	public static String ManifestExcelTitle_SealNo = "封号";// 封号
	public static String ManifestExcelTitle_CargoCategory = "货物类型";// 货物类型
	public static String ManifestExcelTitle_CargoNameEN = "英文品名";// 英文品名
	public static String ManifestExcelTitle_CargoNameCN = "中文品名";// 中文品名
	public static String ManifestExcelTitle_HSCode = "H.S.CODE";// H.S.CODE
	public static String ManifestExcelTitle_PackageType = "包装";// 包装
	public static String ManifestExcelTitle_Marks = "唛头";// 唛头
	public static String ManifestExcelTitle_CargoDes = "货物描述";// 货物描述
	public static String ManifestExcelTitle_Number = "件数";// 件数
	public static String ManifestExcelTitle_Weight = "重量(KGS)";// 重量(KGS)
	public static String ManifestExcelTitle_Volume = "尺寸(M3)";// 尺寸(M3)

	public static String[] ManifestExcelTitle = {
			ManifestExcelTitle_ManifestNo, ManifestExcelTitle_ContainerType,
			ManifestExcelTitle_ContainerNo, ManifestExcelTitle_SealNo,
			ManifestExcelTitle_CargoCategory, ManifestExcelTitle_CargoNameEN,
			ManifestExcelTitle_CargoNameCN, ManifestExcelTitle_HSCode,
			ManifestExcelTitle_PackageType, ManifestExcelTitle_Marks,
			ManifestExcelTitle_CargoDes, ManifestExcelTitle_Number,
			ManifestExcelTitle_Weight, ManifestExcelTitle_Volume };

	/**
	 * 基础数据类别
	 */
	public static String BaseCategory_ContainerType = "018e70e3-ac4b-11e4-80a9-782bcb12d9ef";// 箱型
	public static String BaseCategory_CargoType = "01ae2441-ac4b-11e4-80a9-782bcb12d9ef";// 货物类型
	public static String BaseCategory_CompanyType = "1504012051120001";// 公司类型
	/**
	 * 箱型
	 */
	public static String ContainerType_20FR = "106101";
	public static String ContainerType_20GP = "106102";
	public static String ContainerType_20OT = "106103";
	public static String ContainerType_20RF = "106104";
	public static String ContainerType_20TK = "106105";
	public static String ContainerType_40FR = "106106";
	public static String ContainerType_40GP = "106107";
	public static String ContainerType_40HC = "106108";
	public static String ContainerType_40NOR = "106109";
	public static String ContainerType_40OT = "106110";
	public static String ContainerType_40RF = "106111";
	public static String ContainerType_40RH = "106112";
	public static String ContainerType_45GP = "106113";
	public static String ContainerType_45HC = "106114";
	public static String ContainerType_20RH = "106115";
	public static String ContainerType_20HC = "106116";
	public static String ContainerType_20DG = "106117";
	public static String ContainerType_40DG = "106118";
	public static String ContainerType_45DG = "106119";
	public static String ContainerType_40DH = "106120";

	public enum CONTAINER_TYPE {
		FR(Arrays.asList(ContainerType_20FR, ContainerType_40FR));

		private List<String> ids;

		private CONTAINER_TYPE(List<String> ids) {
			this.ids = ids;
		}

		public boolean checkType(String id) {
			if (this.ids.indexOf(id) >= 0) {
				return true;
			}
			return false;
		}
	}

	/**
	 * 装箱方式
	 */
	public static String ContainerPkgType_CZ = "116101";// 产装
	public static String ContainerPkgType_DZ = "116102";// 堆装
	public static String ContainerPkgType_SANZI = "116103";// 三自

	/**
	 * 代理单
	 */
	public static String HBL = "146102";// 代理单
	/**
	 * 提箱单上传UploadCategoryID
	 */
	public static String UploadCategoryID = "1504161801040002";

	/**
	 * 舱单上传UploadCategoryID
	 */
	public static String UploadCdID = "1505041043540001";

	/**
	 * 服务类型 categoryid
	 */
	public static String ServiceCategory_Common = "01d816e2-ac4b-11e4-80a9-782bcb12d9ef"; // 常用服务
	public static String ServiceCategory_Other = "01c5d4eb-ac4b-11e4-80a9-782bcb12d9ef";// 其他服务
	/**
	 * 运输条款
	 */
	public static String Trans_Type = "019ee1f8-ac4b-11e4-80a9-782bcb12d9ef";
	/**
	 * 财务交单取单
	 */
	public static String Sub_Book = "1504271632090002"; // 已交单
	public static String Take_Book = "1504271632350003"; // 已取单
	public static String Update_Book = "1504271633010004"; // 已改单

	/**
	 * 财务放单状态
	 */
	public static String Finance_Approved = "208101"; // 可放单
	public static String Finance_Cancel = "208102"; // 取消放单
	public static String Finance_Pending = "208103"; // 待定

	/**
	 * 上传路径
	 */
	public static String UploadRoutelinePicPath = "resources/routelinepic";
	public static String UploadCompanyStampPath = "resources/companystamp";

	/**
	 * 上传文件类型
	 */
	public static String Upload_Txd = "1504161801040002"; // 上传文件类型，提箱单
	public static String Upload_Tdyb = "1504291631310004"; // 提单样本上传
	public static String Upload_Gsd = "1504291632030005"; // 格式单上传
	public static String Upload_ManifestExcel = "1505041043540001"; // 舱单表上传
	public static String Upload_FeeConfirm = "1505271104150001"; // 费用确认单上传

	/**
	 * 船东
	 */
	public static String MSC = "8c53590b-ac55-11e4-80a9-782bcb12d9ef"
			.toUpperCase(); // MSC
	public static String CMA = "8ca35cfe-ac55-11e4-80a9-782bcb12d9ef"
			.toUpperCase();// CMA
	public static String MAERSK = "8c493c0e-ac55-11e4-80a9-782bcb12d9ef"
			.toUpperCase();// Hanjin
	public static String ANL = "8c2acdfd-ac55-11e4-80a9-782bcb12d9ef"
			.toUpperCase();// ANL
	public static String CNC = "8c14ea11-ac55-11e4-80a9-782bcb12d9ef"
			.toUpperCase();// CNC
	public static String DELMAS = "8c1fe01b-ac55-11e4-80a9-782bcb12d9ef"
			.toUpperCase();// DELMAS
	public static String NYK = "8c5cbc20-ac55-11e4-80a9-782bcb12d9ef"
			.toUpperCase();// NYK
	public static String YML = "8c951f5a-ac55-11e4-80a9-782bcb12d9ef"
			.toUpperCase();// YML
	public static String CSCL = "8c1e1ed5-ac55-11e4-80a9-782bcb12d9ef"
			.toUpperCase();// CSCL
	public static String OOCL = "8c5e8c72-ac55-11e4-80a9-782bcb12d9ef"
			.toUpperCase();// OOCL
	public static String CSAV = "8c1c36e6-ac55-11e4-80a9-782bcb12d9ef"
			.toUpperCase();// CSAV
	public static String HANJIN = "8c3052b2-ac55-11e4-80a9-782bcb12d9ef"
			.toUpperCase();// Hanjin
	public static String HPL = "8c35e29f-ac55-11e4-80a9-782bcb12d9ef"
			.toUpperCase();// HPL

	/**
	 * 达飞子公司提单号抬头
	 */
	public static String ANL_LadingbillHead = "W";// ANL
	public static String CNC_LadingbillHead = "A";// CNC
	public static String DELMAS_LadingbillHead = "D";// DELMAS
	/**
	 * 达飞下属公司
	 */
	public static List<String> CMAArr = Arrays.asList(CMA, ANL, DELMAS, CNC);

	/**
	 * 通过Inttra订舱的船公司
	 */
	public static List<String> InttraArr_Booking = Arrays.asList(CMA, ANL,
			DELMAS, CNC, MAERSK, HPL);
	/**
	 * 与NYK订舱格式相同的船公司
	 */
	public static List<String> NYKsArr_Booking = Arrays.asList(NYK, YML);

	/**
	 * 临时换船的复制周期
	 */
	public static int CopyIntervalForChangeTempShip = 9999;

	/**
	 * 港口ID
	 */
	public static String Port_Xingang = "1001";
	/**
	 * 换行符
	 */
	public static String Line_Str_LadingbillSCN = "\n";

	/**
	 * EDI类型
	 */
	public static String EDIType_Booking = "300103";// 订舱
	public static String EDIType_Manifest = "300102";// 舱单
	public static String EDIType_Ladingbill = "300101";// 提单

	/**
	 * EDIMap类型
	 */
	public static String Edi_PortMap = "400101";// 港口
	public static String Edi_PkgsTypeMap = "400102";// 包装
	public static String Edi_ContainerTypeMap = "400103";// 箱型

	// [start] 寄送地址类型
	/**
	 * 寄送地址类型
	 */
	public static String EXPRESS_LADINGBILL = "1505131029000002";// 提单
	public static String EXPRESS_INVOICE = "1505131029210003";// 发票

	// [end]

	// [start] 快递寄送方式
	/**
	 * 快递寄送方式
	 */
	public static String EXPRESSSEND = "1505150854410002";// 快递寄送
	public static String CUSTOMERPICKUP = "1505150855010003";// 客户自取
	public static String COMPANYSEND = "1505150855200004";// 公司配送

	// [end]

	/**
	 * 默认船名航次
	 */
	public static String DefaultVesselVoyage = "TBN";

	/**
	 * EDI特殊要求的港口代码
	 */
	public static String NYK_LadingBillIssueAddressCode = "CNTXG";// NYK的提单签发地代码写死，起运港放单
	public static String CMAArr_PrePay_FreightPaidAddressCode = "CNTSN";// 达飞及子公司的付费地（预付）写死。

	/**
	 * 审批状态
	 */
	public static String AppStatus_Approved = "10031";// 同意
	public static String AppStatus_Rejected = "10032";// 拒绝
	public static String AppStatus_Processing = "10033";// 审批中

	/**
	 * 开航日周几过期
	 */
	public static int ETDExpireWeekDay = 4;
	
	/**
	 * 开航日几号过期
	 */
	public static int ETDExpireMonthDay = 5;

	/**
	 * 报错提示信息
	 */
	public static String ErrorMsg_EditETD="该船开航日已过，请联系部门经理解锁后才能修改";
}
