package security;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet Filter implementation class CreateApplicationHiddenCodeCheckFilter
 */
@WebFilter("/application/create")
public class CreateApplicationHiddenCodeCheckFilter implements Filter {

	/**
	 * Default constructor.
	 */
	public CreateApplicationHiddenCodeCheckFilter() {
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
		String hiddenCode = request.getParameter("hiddenCode");
		HttpSession session = ((HttpServletRequest) request).getSession();
		String sessionHiddenCode = null;
		synchronized (session) {
			sessionHiddenCode = (String) session.getAttribute("hiddenCode");
		}
		if (hiddenCode != null && sessionHiddenCode != null
				&& sessionHiddenCode.equals(hiddenCode)) {
			// pass the request along the filter chain
			session.removeAttribute("hiddenCode");
			chain.doFilter(request, response);
		} else {
			((HttpServletResponse) response).sendError(401);
		}
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
