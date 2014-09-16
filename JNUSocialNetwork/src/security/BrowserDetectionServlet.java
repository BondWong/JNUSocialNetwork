package security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.ws.rs.core.MediaType;

import security.helper.UAgentInfo;

/**
 * Servlet implementation class BrowserDetectionServlet
 */
@WebServlet("/security/detect")
public class BrowserDetectionServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public BrowserDetectionServlet() {
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
		boolean reminded = false;
		synchronized (session) {
			reminded = (boolean) session.getAttribute("reminded");
		}
		response.setContentType(MediaType.APPLICATION_JSON);
		if (!reminded) {
			UAgentInfo info = new UAgentInfo(request);
			boolean needUpdateRemind = false;
			needUpdateRemind = info.detectChrome() || info.detectFirefox()
					|| info.detectSafari() || info.detectMSIE10()
					|| info.detectMSIE11();
			synchronized (session) {
				session.setAttribute("reminded", true);
			}
			System.out.println("needUpdateRemind:" + needUpdateRemind);
			if (needUpdateRemind)
				response.getWriter().write("true");
			else
				response.getWriter().write("false");
		} else {
			System.out.println("needUpdateRemind:" + false);
			response.getWriter().write("false");
		}

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
