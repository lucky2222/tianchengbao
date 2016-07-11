<%@ tag pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	jspContext.setAttribute("StaffMenuList",request.getSession().getAttribute("StaffMenuList"));
	jspContext.setAttribute("online_staff",request.getSession().getAttribute("OnlineStaff"));

%>

				<div id="navbar" class="navbar-collapse collapse" style=" float:right;">
		        	<!-- 菜单 -->
		        	<ul class="nav navbar-nav navbar-right">
		        		
		        		<c:forEach var="mainmenu" items="${StaffMenuList}"  varStatus="flag">
		        			<li>
								<li class="dropdown">
								<a class="dropdown-toggle" data-toggle="dropdown" href="#">${mainmenu.menuName}<span class="caret"></span></a>
								<ul class="dropdown-menu" role="menu">
			        			<c:forEach var="submenu" items="${mainmenu.leafNode}"  varStatus="subflag">
			        				<li>
										<a href="${pageContext.request.contextPath}/${submenu.menuHref}" target="_self">${submenu.menuName}</a>
									</li>
			        			</c:forEach>
		        				</ul>
								</li>
							</li>
		        		</c:forEach>
		        	<!--<li class="gly"><a href="#">[${online_staff.staffname}]</a></li>
		        	<li class="gly"><a href="${pageContext.request.contextPath}/logout">退出</a></li>-->
					<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">[${online_staff.staffname}]</a>
							<ul class="dropdown-menu" role="menu">
								<li class="divider"></li>
								<li><a href="${pageContext.request.contextPath}/logout" target="_self">系统退出</a></li>
							</ul>
						</li>
		        		<!-- 
						<li class="dropdown" id="ueserxx">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="glyphicon glyphicon-user"></i> ${staff.staffid} <span class="caret"></span></a>
							<ul class="dropdown-menu" role="menu">
								<li><a href="#">个人信息</a></li>
								<li class="divider"></li>
								<li><a href="${pageContext.request.contextPath}/logout">系统退出</a></li>
							</ul>
						</li>
						 -->
					</ul>
		        	<!-- 菜单 end-->
		        </div>