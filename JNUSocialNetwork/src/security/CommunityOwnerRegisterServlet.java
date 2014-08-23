package security;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import transaction.DAOTransaction;
import transaction.DAOCreateTransaction.CreateApplicationTransaction;

/**
 * Servlet implementation class CommunityOwnerRegisterServlet
 */
@WebServlet("/security/CORegServlet")
public class CommunityOwnerRegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public CommunityOwnerRegisterServlet() {
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
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String hiddenCode = request.getParameter("hiddenCode");
		HttpSession session = request.getSession();
		String sessionHiddenCode = "";
		synchronized (session) {
			sessionHiddenCode = (String) session.getAttribute("hiddenCode");
			session.removeAttribute("hiddenCode");
		}
		if (hiddenCode == null || sessionHiddenCode == null
				|| !hiddenCode.equals(sessionHiddenCode))
			response.sendRedirect("/pages/applyCommunity.jsp");
		else {
			String applicationID = request.getParameter("applicationID");
			String password = request.getParameter("password");
			String email = request.getParameter("email");
			String reason = request.getParameter("reason");

			Map<String, String> parameters = new HashMap<String, String>();
			parameters.put("ID", applicationID);
			parameters.put("password", password);
			parameters.put("email", email);
			parameters.put("reason", new String(reason.getBytes("ISO-8859-1")));

			DAOTransaction transaction = new CreateApplicationTransaction();
			try {
				transaction.execute(parameters);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.sendError(500);
				return;
			}

			response.sendRedirect("/pages/applyCommunity.jsp?success=true");

		}
	}

}
