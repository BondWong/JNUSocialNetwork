package security;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import transaction.Transaction;
import transaction.DAOFetchTransaction.FetchAccountTransaction;
import transaction.DAOUpdateTransaction.UpdateAccountTransaction;
import model.Account;
import model.modelType.UserType;

/**
 * Servlet implementation class UserLoginServlet
 */
@WebServlet("/security/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public LoginServlet() {
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
		Account account = null;
		String ID = request.getParameter("ID");
		String password = request.getParameter("password");
		String type = request.getParameter("userType");
		UserType userType = UserType.valueOf(type);

		Transaction transaction = new FetchAccountTransaction();
		try {
			account = (Account) transaction.execute(
					"Account.fetchByIDAndUserType", ID, userType);
		} catch (Exception e) {
			System.out.println(e);
			response.setStatus(500);
			return;
		}

		if (account != null && !account.isProtected(new Date())) {
			if (password.equals(account.getPassword())) {
				HttpSession session = request.getSession();
				synchronized (session) {
					session.setAttribute("ID", account.getID());
					session.setAttribute("userType", userType);
					if (userType.equals(UserType.MEMBER)) {
						account.setAutoLoginSeriesNum(session.getId());
						Cookie cookie = new Cookie("ALG", session.getId());
						cookie.setHttpOnly(true);
						cookie.setPath("/JNUSocialNetwork");
						cookie.setMaxAge(15 * 24 * 60 * 60);
						response.addCookie(cookie);
					}
					response.sendRedirect("/JNUSocialNetwork/pages/circle.jsp");
				}
			} else {
				account.setLastAccessDate(new Date());
				account.setChance((account.getChance() - 1));
				response.sendRedirect("/JNUSocialNetwork/pages/regAndLogin.jsp?invalid=true");
			}

			Transaction t = new UpdateAccountTransaction();
			try {
				t.execute(account);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				response.sendError(500);
				return;
			}

		} else {
			response.sendRedirect("/JNUSocialNetwork/pages/regAndLogin.jsp?invalid=true");
		}

	}

}
