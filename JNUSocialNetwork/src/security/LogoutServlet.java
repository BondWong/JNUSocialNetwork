package security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import security.helper.LoginUserManager;

/**
 * Servlet implementation class UserLogoutServlet
 */
@WebServlet("/security/UserLogoutServlet")
public class LogoutServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public LogoutServlet() {
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
		HttpSession session = request.getSession();
		String ID = "";
		synchronized (session) {
			ID = (String) session.getAttribute("ID");
			session.removeAttribute("ID");
			session.removeAttribute("userType");
			session.removeAttribute("isIE");
			session.invalidate();
		}

		Cookie newCookie = new Cookie("ALG", null);
		newCookie.setMaxAge(0);
		newCookie.setPath("/");

		LoginUserManager.remove(ID);

		response.addCookie(newCookie);
		response.sendRedirect("/pages/home.jsp");
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
