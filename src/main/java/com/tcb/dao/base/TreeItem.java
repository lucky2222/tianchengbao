package com.tcb.dao.base;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Hashtable;
import java.util.List;

public class TreeItem {

	String menuId;
	final String menuTitle;
	final int orderId;
	private Object nodeParam;
	private Hashtable table = null;
	private final TreeItem parent;
	private final List items = new ArrayList(); // 同级菜单归结在一起

	public TreeItem(String menuId, TreeItem parent, String menuTitle, int orderId,Object nodeParam) {
		this.menuId = menuId;
		this.menuTitle = menuTitle;
		this.orderId = orderId;
		this.nodeParam = nodeParam;
		this.parent = parent;
		if (parent != null) {
			parent.items.add(this);
			this.table = parent.table;
		} else {
			table = new Hashtable();
		}
		table.put(menuId, this);
	}

	public TreeItem(String menuId, TreeItem parent, String menuTitle,
			String menuSrc, int showOrder, Object nodeParam) {
		this(menuId, parent, menuTitle, showOrder, nodeParam);
	}

	public TreeItem getItemOfTree(String id) {
		return (TreeItem) this.table.get(id);
	}
	
	public List getItems() {
		Collections.sort(items, new ItemComparator());
		return items;
	}
	
	public String getMenuId() {
		return menuId;
	}

	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}

	public Object getNodeParam() {
		return nodeParam;
	}

	public void setNodeParam(Object nodeParam) {
		this.nodeParam = nodeParam;
	}

	public String getMenuTitle() {
		return menuTitle;
	}

	public int getOrderId() {
		return orderId;
	}

	
	protected class ItemComparator implements Comparator {
		public int compare(Object obj1, Object obj2) {
			TreeItem item1 = (TreeItem) obj1;
			TreeItem item2 = (TreeItem) obj2;
			int showOrder1 = item1.getOrderId();
			int showOrder2 = item2.getOrderId();
			return showOrder1 == showOrder2 ? 0 : (showOrder1 < showOrder2 ? -1 : 1);
		}
	}
}
