package security;

import helper.securityHelper.UAgentInfo;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
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
import utils.MD5;
import model.Account;
import model.modelType.UserType;

/**
 * Servlet implementation class UserLoginServlet
 */
@WebServlet("/security/Login")
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
		String type = request.getParameter("userType");
		if (type == null)
			type = "";
		switch (type) {
		case "GOD":
			godLogin(request, response);
			break;
		default:
			login(request, response);
		}

	}

	private void login(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		Account account = null;
		String ID = request.getParameter("ID");
		String password = request.getParameter("password");
		String hiddenCode = request.getParameter("hiddenCode");
		String origin = request.getParameter("origin");
		System.out.println(origin);
		boolean fromRegister = false;
		fromRegister = new Boolean(true).equals(request
				.getAttribute("fromRegister")) ? true : false;

		HttpSession session = request.getSession();
		String sessionHiddenCode = "";
		synchronized (session) {
			sessionHiddenCode = (String) session.getAttribute("hiddenCode");
			session.removeAttribute("hiddenCode");
		}
		if (!fromRegister
				&& (sessionHiddenCode == null || hiddenCode == null || !sessionHiddenCode
						.equals(hiddenCode)))
			response.sendRedirect("/pages/login.jsp");
		else {
			if (fromRegister)
				try {
					password = MD5.toMD5Code(password);
				} catch (NoSuchAlgorithmException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			Transaction transaction = new FetchAccountTransaction();
			try {
				account = (Account) transaction.execute("Account.fetchByID",
						ID, null);
			} catch (Exception e) {
				e.printStackTrace();
				response.setStatus(500);
				return;
			}

			if (account != null && !account.isProtected(new Date())) {
				if (password.equals(account.getPassword())) {
					UAgentInfo uai = new UAgentInfo(request);
					session.invalidate();
					HttpSession newSession = request.getSession(true);
					synchronized (newSession) {
						newSession.setAttribute("ID", account.getID());
						newSession.setAttribute("userType",
								account.getUserType());
						newSession.setAttribute("isIE", uai.detectMSIE());

						account.setAutoLoginSeriesNum(newSession.getId());
						Cookie cookie = new Cookie("ALG", newSession.getId());
						cookie.setHttpOnly(true);
						cookie.setPath("/");
						cookie.setMaxAge(15 * 24 * 60 * 60);

						response.addCookie(cookie);
						if (origin.equals(null) || origin.equals(""))
							response.sendRedirect("/pages/activity.jsp?nav=discovery");
						else
							response.sendRedirect(origin.substring(origin
									.indexOf("/pages")));
					}
				} else {
					account.setLastAccessDate(new Date());
					account.setChance((account.getChance() - 1));
					response.sendRedirect("/pages/login.jsp?success=false");
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
				response.sendRedirect("/pages/login.jsp?success=false");
			}
		}
	}

	private void godLogin(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		Account account = null;
		String ID = request.getParameter("ID");
		String password = request.getParameter("password");
		Transaction transaction = new FetchAccountTransaction();
		try {
			account = (Account) transaction.execute(
					"Account.fetchByIDAndUserType", ID, UserType.GOD);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(500);
			return;
		}

		if (account != null && !account.isProtected(new Date())) {
			if (password.equals(account.getPassword())) {
				if (request.getSession(false) != null)
					request.getSession(false).invalidate();
				HttpSession session = request.getSession();
				synchronized (session) {
					session.setAttribute("ID", account.getID());
					session.setAttribute("userType", account.getUserType());
				}
				response.setStatus(200);
			} else {
				account.setLastAccessDate(new Date());
				account.setChance((account.getChance() - 1));
				response.sendError(401);
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
			response.sendError(401);
		}
	}

}
