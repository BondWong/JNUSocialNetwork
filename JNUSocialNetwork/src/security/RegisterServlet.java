package security;

import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import transaction.DAOTransaction;
import transaction.DAOCreateTransaction.RegisterMemberTransaction;
import transaction.DAOFetchTransaction.DoesIDExistTransaction;
import utils.MD5;

/**
 * Servlet implementation class LoginServlet
 */
@SuppressWarnings("deprecation")
@WebServlet(urlPatterns = "/security/RegServlet")
public class RegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private static final String JWCURL = "http://202.116.0.176";
	private static final String VALIDATIONCODE = "http://202.116.0.176/ValidateCode.aspx";
	private static final String LOGINURL = "http://202.116.0.176";
	private static final String btnLogin = "登  录";
	private static final String VALCODEERROR = "VALCODEERROR";
	private static final String BSORMMERROR = "IDORPAERROR";
	private static final String __VIEWSTATEPattern = "<input type=\"hidden\" name=\"__VIEWSTATE\" id=\"__VIEWSTATE\" value=\"(.+)\" />";
	private static final String __VIEWSTATEGENERATORPattern = "<input type=\"hidden\" name=\"__VIEWSTATEGENERATOR\" id=\"__VIEWSTATEGENERATOR\" value=\"(.+)\" />";
	private static final String __EVENTVALIDATIONPattern = "<input type=\"hidden\" name=\"__EVENTVALIDATION\" id=\"__EVENTVALIDATION\" value=\"(.+)\" />";

	private static ResponseHandler<String> responseHandler;

	/**
	 * @see HttpServlet#HttpServlet()
	 */

	public RegisterServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @throws IOException
	 * @throws ClientProtocolException
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	public void init() {
		responseHandler = new ResponseHandler<String>() {
			public String handleResponse(final HttpResponse response)
					throws ClientProtocolException, IOException {
				int status = response.getStatusLine().getStatusCode();
				if ((status >= 200 && status < 300) || status == 302) {
					HttpEntity entity = response.getEntity();
					return entity != null ? EntityUtils.toString(entity) : null;
				} else {
					throw new ClientProtocolException(
							"Unexpected response status: " + status);
				}
			}
		};
	}

	private CloseableHttpClient prepare() throws ClientProtocolException,
			IOException {
		CloseableHttpClient httpClient = new DefaultHttpClient();
		HttpGet getPage = new HttpGet(JWCURL);
		httpClient.execute(getPage);
		getPage.abort();

		return httpClient;
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		CloseableHttpClient httpClient = null;
		HttpSession session = request.getSession();
		synchronized (session) {
			httpClient = (CloseableHttpClient) (session
					.getAttribute("httpClient") == null ? prepare() : session
					.getAttribute("httpClient"));
		}
		HttpGet getHiddenCode = new HttpGet(LOGINURL);
		CloseableHttpResponse hiddenCodeResponse = httpClient
				.execute(getHiddenCode);
		String htmlResponse = responseHandler
				.handleResponse(hiddenCodeResponse);

		String __EVENTVALIDATION = "";
		String __VIEWSTATE = "";
		String __VIEWSTATEGENERATOR = "";

		Pattern pattern = Pattern.compile(__VIEWSTATEPattern);
		Matcher m = pattern.matcher(htmlResponse);
		if (m.find())
			;
		__VIEWSTATE = m.group(1);

		pattern = Pattern.compile(__VIEWSTATEGENERATORPattern);
		m = pattern.matcher(htmlResponse);
		if (m.find())
			__VIEWSTATEGENERATOR = m.group(1);
		pattern = Pattern.compile(__EVENTVALIDATIONPattern);
		m = pattern.matcher(htmlResponse);
		if (m.find())
			__EVENTVALIDATION = m.group(1);

		synchronized (session) {
			session.setAttribute("__VIEWSTATE", __VIEWSTATE);
			session.setAttribute("__VIEWSTATEGENERATOR", __VIEWSTATEGENERATOR);
			session.setAttribute("__EVENTVALIDATION", __EVENTVALIDATION);
		}

		HttpGet getValCode = new HttpGet(VALIDATIONCODE);
		CloseableHttpResponse valCodeResponse = httpClient.execute(getValCode);

		try {
			HttpEntity entity = valCodeResponse.getEntity();
			if (entity != null) {
				InputStream instream = entity.getContent();
				try {
					// do something useful
					byte[] buffer = new byte[instream.available()];
					instream.read(buffer);
					instream.close();

					response.addHeader("Content-length", "" + buffer.length);
					response.setContentType(" application/octet-stream ");
					OutputStream toClient = new BufferedOutputStream(
							response.getOutputStream());
					toClient.write(buffer);
					toClient.flush();
					toClient.close();

				} finally {
					instream.close();
				}
			}
		} finally {
			valCodeResponse.close();
		}
		getValCode.abort();
		synchronized (session) {
			session.setAttribute("httpClient", httpClient);
		}

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String statement = request.getParameter("statement");
		if (statement == null || !statement.equals("agree")) {
			response.sendRedirect("/pages/register.jsp?agree=false");
			return;
		}

		String txtFJM = request.getParameter("valCode");
		String txtYHBS = request.getParameter("ID");
		String txtYHMM = request.getParameter("password");
		String hiddenCode = request.getParameter("hiddenCode");

		HttpSession session = request.getSession();
		String sessionHiddenCode = "";
		synchronized (session) {
			sessionHiddenCode = (String) session.getAttribute("hiddenCode");
			session.removeAttribute("hiddenCode");
		}
		if (hiddenCode == null || sessionHiddenCode == null
				|| !hiddenCode.equals(sessionHiddenCode))
			response.sendRedirect("/pages/register.jsp");
		else {

			DAOTransaction transaction = new DoesIDExistTransaction();
			boolean result = false;
			try {
				result = (boolean) transaction.execute(txtYHBS);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if (!result) {
				response.sendRedirect("/pages/login.jsp?registerExist=true");
				return;
			}

			CloseableHttpClient httpClient = null;
			synchronized (session) {
				httpClient = (CloseableHttpClient) session
						.getAttribute("httpClient");
			}

			HttpPost post = new HttpPost(LOGINURL);

			String __EVENTVALIDATION = (String) session
					.getAttribute("__EVENTVALIDATION");
			String __VIEWSTATE = (String) session.getAttribute("__VIEWSTATE");
			String __VIEWSTATEGENERATOR = (String) session
					.getAttribute("__VIEWSTATEGENERATOR");

			List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>(1);
			nameValuePairs.add(new BasicNameValuePair("__EVENTVALIDATION",
					__EVENTVALIDATION));
			nameValuePairs.add(new BasicNameValuePair("__VIEWSTATE",
					__VIEWSTATE));
			nameValuePairs.add(new BasicNameValuePair("__VIEWSTATEGENERATOR",
					__VIEWSTATEGENERATOR));
			nameValuePairs.add(new BasicNameValuePair("btnLogin", btnLogin));
			nameValuePairs.add(new BasicNameValuePair("txtFJM", txtFJM));
			nameValuePairs.add(new BasicNameValuePair("txtYHBS", txtYHBS));
			nameValuePairs.add(new BasicNameValuePair("txtYHMM", txtYHMM));
			System.out.println(nameValuePairs);
			post.setEntity(new UrlEncodedFormEntity(nameValuePairs));

			CloseableHttpResponse httpResponse = httpClient.execute(post);
			try {
				if (isOK(httpResponse)) {

					post.abort();
					transaction = new RegisterMemberTransaction();
					try {
						transaction.execute(txtYHBS, MD5.toMD5Code(txtYHMM),
								new HashMap<String, String>());
						new UserInfoCrawler().crawl(httpClient,
								responseHandler, txtYHBS);
					} catch (Exception e) {
						// TODO Auto-generated catch block

						e.printStackTrace();
						response.sendError(500);
						return;
					}

					RequestDispatcher dispatcher = getServletContext()
							.getRequestDispatcher("/security/Login");
					request.setAttribute("fromRegister", true);
					dispatcher.forward(request, response);

				} else {
					response.sendRedirect("/pages/register.jsp?error="
							+ findErrorMessage(httpResponse));
				}
			} catch (Exception e) {
				e.printStackTrace();
				response.sendError(500);
				return;
			} finally {
				httpResponse.close();
			}
		}
	}

	private boolean isOK(HttpResponse response) {
		return response.containsHeader("Location");
	}

	private String findErrorMessage(HttpResponse response)
			throws ClientProtocolException, IOException {
		String responsePage = responseHandler.handleResponse(response);
		Pattern p = Pattern.compile("附加码不一致");
		Matcher m = p.matcher(responsePage);
		if (m.find())
			return VALCODEERROR;
		else
			return BSORMMERROR;
	}
}
