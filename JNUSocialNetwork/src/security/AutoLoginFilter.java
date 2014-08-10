package security;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import transaction.Transaction;
import transaction.DAOFetchTransaction.FetchAccountTransaction;
import model.Account;

/**
 * Servlet Filter implementation class AutoLoginFilter
 */
public class AutoLoginFilter implements Filter {

	/**
	 * Default constructor.
	 */
	public AutoLoginFilter() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub
		// place your code here
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		Cookie[] cookies = httpRequest.getCookies();
		String autoLoginSeriesNum = "";
		for (int i = 0; cookies != null && i < cookies.length; i++) {
			if (cookies[i].getName().equals("ALG")) {
				autoLoginSeriesNum = cookies[i].getValue();

				Transaction transation = new FetchAccountTransaction();
				Account account = null;
				try {
					account = (Account) transation.execute(
							"Account.fetchBySeriesNum", autoLoginSeriesNum,
							null);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				if (account != null) {
					HttpSession session = httpRequest.getSession();
					System.out.println("autoLogin");
					synchronized (session) {
						session.setAttribute("ID", account.getID());
						session.setAttribute("userType", account.getUserType());
					}
				}
			}
		}

		// pass the request along the filter chain
		chain.doFilter(request, response);
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
