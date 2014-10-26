package service;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.MediaType;

import utils.JsonUtil;

/**
 * Servlet implementation class GuidanceDetectionServlet
 */
@WebServlet("/app/user/needGuidance")
public class GuidanceDetectionServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final String cookieName = "NGBL";

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public GuidanceDetectionServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Cookie[] cookies = request.getCookies();
		for (Cookie cookie : cookies) {
			if (cookieName.equals(cookie.getName())) {
				response.setContentType(MediaType.APPLICATION_JSON);
				response.getWriter().write(JsonUtil.toJson("false"));
				return;
			}
		}

		Cookie cookie = new Cookie(cookieName, request.getSession().getId());
		cookie.setHttpOnly(true);
		cookie.setPath("/");
		cookie.setMaxAge(365 * 24 * 60 * 60);

		response.addCookie(cookie);
		response.setContentType(MediaType.APPLICATION_JSON);
		response.getWriter().write(JsonUtil.toJson("true"));
		return;
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
