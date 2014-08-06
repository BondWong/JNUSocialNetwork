package security;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.AsyncContext;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;

import transaction.CrawAttributesTransaction;
import transaction.Transaction;

public class UserInfoCrawler implements Runnable{
	private static String URL = "http://202.116.0.176/Secure/Xjgl/Xjgl_Xsxxgl_Xjxxxg_XS.aspx";
	private static String CAMPUSPATTERN = "name=\"txtXQ\" type=\"text\" value=\"(.+)\" readonly=\"readonly\"";
	private static String INSTITUTIONPATTERN = "name=\"txtXY_X\" type=\"text\" value=\"(.+)\" readonly=\"readonly\"";
	private static String NAMEPATTERN = "name=\"txtXM_X\" type=\"text\" value=\"(.+)\" readonly=\"readonly\"";
	private static String MAJORPATTERN = "name=\"txtZY_X\" type=\"text\" value=\"(.+)\" readonly=\"readonly\"";
	private static String GENDERPATTERN = "name=\"txtXB_X\" type=\"text\" value=\"(.+)\" readonly=\"readonly\"";
	private static String BDAYPATTERN = "name=\"txtCSRQ_X\" type=\"text\" value=\"(\\d{4})-(\\d{2})-(\\d{2})\" readonly=\"readonly\"";
	private static String TELNUMPATTERN = "name=\"txtSJHM\" type=\"text\" value=\"(.+)\" id=\"txtSJHM\"";
	private static String EMAILPATTERN = "name=\"txtYX\" type=\"text\" value=\"(.+)\" id=\"txtYX\"";
	private static Map<String, String> patternMap;
	static{
		patternMap = new HashMap<String, String>();
		patternMap.put("campusPattern", CAMPUSPATTERN);
		patternMap.put("institutionPattern", INSTITUTIONPATTERN);
		patternMap.put("namePattern", NAMEPATTERN);
		patternMap.put("majorPattern", MAJORPATTERN);
		patternMap.put("genderPattern", GENDERPATTERN);
		patternMap.put("bdayPattern", BDAYPATTERN);
		patternMap.put("telnumPattern", TELNUMPATTERN);
		patternMap.put("emailPattern", EMAILPATTERN);
	}
	
	private AsyncContext asyncContext;
	
	public UserInfoCrawler(AsyncContext asyncCtx) { 
        this.asyncContext = asyncCtx; 
    }
	
	@Override
	public void run() {
		// TODO Auto-generated method stub
		CloseableHttpClient httpClient = (CloseableHttpClient) asyncContext.getRequest().getAttribute("httpClient");
		HttpGet get = new HttpGet(URL);
		@SuppressWarnings("unchecked")
		ResponseHandler<String> responseHandler = (ResponseHandler<String>) asyncContext.getRequest().getAttribute("responseHandler");
		String response = "";
		try {
			response = httpClient.execute(get, responseHandler);
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		String ID = asyncContext.getRequest().getParameter("ID");
		Transaction transaction = new CrawAttributesTransaction();
		try {
			transaction.execute(response, patternMap, ID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		asyncContext.complete();
		
	}

}
