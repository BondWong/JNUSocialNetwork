package security;

import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.AsyncContext;
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

import transaction.Transaction;
import transaction.DAOCreateTransaction.RegisterMemberTransaction;

/**
 * Servlet implementation class LoginServlet
 */
@SuppressWarnings("deprecation")
@WebServlet(urlPatterns = "/security/RegServlet", asyncSupported = true)
public class RegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private static final String JWCURL = "http://202.116.0.176/login.aspx";
	private static final String VALIDATIONCODE = "http://202.116.0.176/ValidateCode.aspx";
	private static final String LOGINURL = "http://202.116.0.176/login.aspx";
	private static final String btnLogin = "登  录";
	private static final String __EVENTVALIDATION = "/wEWBwKh6Oq+DwKDnbD2DALVp9zJDAKi+6bHDgKC3IeGDAKt86PwBQLv3aq9Bw==";
	private static final String __VIEWSTATE = "/wEPDwUKMjA1ODgwODUwMg9kFgJmD2QWAgIBDw8WAh4EVGV4dAUk5pqo5Y2X5aSn5a2m57u85ZCI5pWZ5Yqh566h55CG57O757ufZGRk";
	private static final String VALCODEERROR = "VALCODEERROR";
	private static final String BSORMMERROR = "IDORPAERROR";

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
		String txtFJM = request.getParameter("valCode");
		String txtYHBS = request.getParameter("ID");
		String txtYHMM = request.getParameter("password");

		CloseableHttpClient httpClient = null;
		HttpSession session = request.getSession();
		synchronized (session) {
			httpClient = (CloseableHttpClient) session
					.getAttribute("httpClient");
		}

		HttpPost post = new HttpPost(LOGINURL);

		List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>(1);
		nameValuePairs.add(new BasicNameValuePair("__EVENTVALIDATION",
				__EVENTVALIDATION));
		nameValuePairs.add(new BasicNameValuePair("__VIEWSTATE", __VIEWSTATE));
		nameValuePairs.add(new BasicNameValuePair("btnLogin", btnLogin));
		nameValuePairs.add(new BasicNameValuePair("txtFJM", txtFJM));
		nameValuePairs.add(new BasicNameValuePair("txtYHBS", txtYHBS));
		nameValuePairs.add(new BasicNameValuePair("txtYHMM", txtYHMM));
		post.setEntity(new UrlEncodedFormEntity(nameValuePairs));

		CloseableHttpResponse httpResponse = httpClient.execute(post);
		try {
			if (isOK(httpResponse)) {

				post.abort();
				request.setAttribute("responseHandler", responseHandler);
				request.setAttribute("httpClient", httpClient);
				AsyncContext asyncCtx = request.startAsync();
				asyncCtx.setTimeout(10000);
				ThreadPoolExecutor executor = (ThreadPoolExecutor) request
						.getServletContext().getAttribute("executor");
				executor.execute(new UserInfoCrawler(asyncCtx));

				Map<String, Object> params = new HashMap<String, Object>();
				params.put("ID", txtYHBS);
				params.put("password", txtYHMM);
				Transaction transaction = new RegisterMemberTransaction();
				try {
					transaction.execute(params);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					response.sendError(500);
					return;
				}

				response.sendRedirect("/GuitarWebApp/pages/regAndLogin.jsp?ok=true");

			} else {
				response.sendRedirect("/GuitarWebApp/pages/regAndLogin.jsp?error="
						+ findErrorMessage(httpResponse));
			}
		} finally {
			httpResponse.close();
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
