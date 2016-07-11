package com.tcb.util;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.tcb.dao.base.DataRow;
import com.tcb.dao.base.TreeItem;

public class MenuUntil {
	
	public static TreeItem genMenuTree(List<DataRow> menus,String rootId) throws Throwable{
		
//		System.out.println("-------------menus--rootId----------"+rootId);
//		System.out.println("-------------menus------------"+menus);
		TreeItem root;
		if (rootId == null || rootId.trim().equals("")) {
			root = new TreeItem("_root", null, "我的钢", "", -1,"" );
		} else {
			root = new TreeItem(rootId, null, "我的钢", "",  -1,"");
		}
		
		for (int i = 0; i < menus.size(); i++) {
			DataRow menu = (DataRow)menus.get(i);
			String menuId = String.valueOf(menu.get("catalog_id"));
			String parentMenuId = String.valueOf(menu.get("parent_catalog_id"));
			
//			System.out.println("------dssssssssssssss--"+parentMenuId);
			String menuText = (String)menu.get("catalog_name");
			String showOrder = String.valueOf(menu.get("order_id"));
			menuText = menuText.trim().replaceAll("[\r\n]+", "");

			
			if ("".equals(menuText) || "-".equals(menuText)) {
				continue;
			}
			
			if (root.getItemOfTree(menuId) != null) {
				continue;
			}
			
			TreeItem parent = findParent(parentMenuId, menus, null, false, root);
			
			if (parent != null) {
				new TreeItem(menuId, parent, menuText, Integer.parseInt(showOrder),"");
			}
		}
		
		;
//		 System.out.println("-----------<>---------------" +JSON.toJSON(root));
		return root;
	}
	
	private static TreeItem findParent(String parentMenuId, List menus, 
			List modparams, boolean isTest, TreeItem root) throws Exception {
				TreeItem parent = null;
				
				if (parentMenuId == null || parentMenuId.trim().equals("")) {
					return null;
				}
				
				for (int i = 0; i < menus.size(); i++) {
					DataRow menu = (DataRow)menus.get(i);
					String menuId = String.valueOf(menu.get("catalog_id"));
					
					String pparentMenuId="";
					if(menu.get("parent_catalog_id") != null)
						pparentMenuId =String.valueOf(menu.get("parent_catalog_id"));
						
					String menuText = (String)menu.get("catalog_name");
					String showOrder = String.valueOf(menu.get("order_id"));
					menuText = menuText.trim().replaceAll("[\r\n]+", "");
					
					if (menuId.equals(parentMenuId)) {
						parent = root.getItemOfTree(menuId);
						
						// 有父节点，但未构造
							if (parent == null) {
								// 父节点即是顶级节点
								if (((pparentMenuId == null || pparentMenuId.trim().equals("")) && "_root".equals(root.getMenuId()))
									|| (pparentMenuId != null && pparentMenuId.equals(root.getMenuId()))) {
									parent =new TreeItem(menuId, root, menuText,  Integer.parseInt(showOrder),"");
								} else {
									TreeItem pparent = findParent(pparentMenuId, menus,	modparams, isTest, root);
									if (pparent != null) {
										parent = new TreeItem(menuId, pparent, menuText, Integer.parseInt(showOrder),"");
									}
								}
							}
						
						return parent;
					}
				}
				
				return parent;
		}
	
	
	public  static void main(String[] arg) throws Throwable{
		
		
//		String menuId = String.valueOf(menu.get("catalog_id"));
//		String pparentMenuId = String.valueOf(menu.get("parent_catalog_id"));
//		String menuText = (String)menu.get("catalog_name");
//		String showOrder = String.valueOf(menu.get("order_id"));
		
		List<DataRow> menus=new ArrayList<DataRow>();
		DataRow menu0= new DataRow();
		menu0.put("catalog_id", "0");
		menu0.put("parent_catalog_id", null);
		menu0.put("catalog_name", "menu_root");
		menu0.put("order_id", "1");
		menus.add(menu0);
		DataRow menu1= new DataRow();
		menu1.put("catalog_id", "1");
		menu1.put("parent_catalog_id", "0");
		menu1.put("catalog_name", "Galvanized Steel Pipe");
		menu1.put("order_id", "1");
		menus.add(menu1);
		DataRow menu2= new DataRow();
		menu2.put("catalog_id", "2");
		menu2.put("parent_catalog_id", "1");
		menu2.put("catalog_name", "Hot Dipped Galvanize");
		menu2.put("order_id", "1");
		menus.add(menu2);
		DataRow menu3= new DataRow();
		menu3.put("catalog_id", "LST0003");
		menu3.put("parent_catalog_id", "LST0002");
		menu3.put("catalog_name", "菜单3");
		menu3.put("order_id", "1");
		menus.add(menu3);
//		System.out.println("-------------menus------------"+menus);
//		TreeItem root;
//		if ("" == null || "".trim().equals("")) {
//			root = new TreeItem("_root", null, "连锁运营", "", -1,"" );
//		} else {
//			root = new TreeItem("_root", null, "连锁运营", "",  -1,"");
//		}
//		for (int i = 0; i < menus.size(); i++) {
//			DataRow menu = (DataRow)menus.get(i);
//			String menuId = String.valueOf(menu.get("catalog_id"));
//			String parentMenuId = String.valueOf(menu.get("parent_catalog_id"));
//			String menuText = (String)menu.get("catalog_name");
//			String showOrder = String.valueOf(menu.get("order_id"));
//
//			
//			if ("".equals(menuText) || "-".equals(menuText)) {
//				continue;
//			}
//			
//			if (root.getItemOfTree(menuId) != null) {
//				continue;
//			}
//			
//			TreeItem parent = findParent(parentMenuId, menus, null, false, root);
//			
//			if (parent != null) {
//				new TreeItem(menuId, parent, menuText, Integer.parseInt(showOrder),"");
//			}
//		}
		
//		TreeItem parent  = new  TreeItem("002", root, "dfafd", "d","www.baidu.com", Integer.parseInt("1"),"");
		
		 
//		System.out.println("------menuitem------"+   JSONObject.toJSON(root.getItems()));
		 
		 
//		 System.out.println("------menuitem------"+  JSONObject.toJSON(genMenuTree(menus,"")));
	} 
}
