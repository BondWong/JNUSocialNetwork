package security;

import java.io.IOException;
import java.util.LinkedHashSet;
import java.util.Set;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.ws.rs.core.MediaType;

import model.Account;

/**
 * Servlet Filter implementation class LoginRegValidationFilter
 */
@WebFilter("/LoginRegValidationFilter")
public class LoginRegValidationFilter implements Filter {

	/**
	 * Default constructor.
	 */
	public LoginRegValidationFilter() {
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
		String ID = request.getParameter("ID");
		String password = request.getParameter("ID");
		Account account = new Account();
		account.setID(ID);
		account.setPassword(password);

		Validator validator = Validation.buildDefaultValidatorFactory()
				.getValidator();
		Set<ConstraintViolation<Account>> violations = new LinkedHashSet<ConstraintViolation<Account>>();
		violations = validator.validate(account);
		if (violations.size() == 0) {
			// pass the request along the filter chain
			chain.doFilter(request, response);
		} else {
			HttpServletResponse httpResponse = (HttpServletResponse) response; 
			httpResponse.setStatus(400);
			httpResponse.setContentType(MediaType.APPLICATION_JSON);
			httpResponse.getWriter().write(
					violations.iterator().next().getMessage());
		}
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
