package security;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import model.Account;
import transaction.Transaction;
import transaction.DAOFetchTransaction.FetchAccountTransaction;
import transaction.DAOUpdateTransaction.UpdateMemberPasswordTransaction;

/**
 * Servlet implementation class ChangePasswordServlet
 */
@WebServlet("/security/ChangePasswordServlet")
public class ChangePasswordServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ChangePasswordServlet() {
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
		if (sessionHiddenCode == null || hiddenCode == null
				|| !sessionHiddenCode.equals(hiddenCode))
			response.sendRedirect("/pages/changePassword.jsp");
		else {
			String ID = (String) session.getAttribute("ID");
			Account account = null;
			Transaction transaction = new FetchAccountTransaction();
			try {
				account = (Account) transaction.execute("Account.fetchByID",
						ID, null);
			} catch (Exception e) {
				e.printStackTrace();
				response.setStatus(500);
				return;
			}

			if (account != null) {
				String oldPassword = request.getParameter("oldPassword");
				if (account.getPassword().equals(oldPassword)) {
					String newPassword = request.getParameter("newPassword");
					try {
						new UpdateMemberPasswordTransaction().execute(ID,
								newPassword);
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
						response.setStatus(500);
						return;
					}
					RequestDispatcher dispatcher = getServletContext()
							.getRequestDispatcher("/security/UserLogoutServlet");
					dispatcher.forward(request, response);
				} else {
					response.sendRedirect("pages.chagePassword.jsp?oldPasswordError=true");
				}
			} else {
				response.sendRedirect("/pages/changePassword.jsp");
			}
		}
	}
}
