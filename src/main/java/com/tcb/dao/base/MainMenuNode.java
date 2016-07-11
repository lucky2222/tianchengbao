package com.tcb.dao.base;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/*
 * 主菜单节点
 */

public class MainMenuNode {
	private static final Logger logger = LoggerFactory.getLogger(MainMenuNode.class);
	private String menuName;//菜单名称
	private String menuHref;// 菜单链接
	private String rightCode;//权限编码
	private int sortNum;//顺序值
	private ArrayList<MainMenuNode> leafNode ;//子节点
	
	public String getMenuName() {
		return menuName;
	}
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	public String getMenuHref() {
		return menuHref;
	}
	public void setMenuHref(String menuHref) {
		this.menuHref = menuHref;
	}
	public String getRightCode() {
		return rightCode;
	}
	public void setRightCode(String rightCode) {
		this.rightCode = rightCode;
	}
	public int getSortNum() {
		return sortNum;
	}
	public void setSortNum(int sortNum) {
		this.sortNum = sortNum;
	}
	public ArrayList<MainMenuNode> getLeafNode() {
		if(leafNode==null)
		{
			leafNode = new ArrayList<MainMenuNode>();
		}
		return leafNode;
	}
	public void setLeafNode(ArrayList<MainMenuNode> leafNode) {
		this.leafNode = leafNode;
	}
}
