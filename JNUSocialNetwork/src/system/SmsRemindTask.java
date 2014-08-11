package system;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.http.Header;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;

import transaction.Transaction;
import transaction.DAOFetchTransaction.FetchRemindableActivitiesTransaction;

@SuppressWarnings("deprecation")
public class SmsRemindTask implements Runnable {

	@SuppressWarnings({ "resource", "unchecked" })
	@Override
	public void run() {
		// TODO Auto-generated method stub
		Transaction transaction = new FetchRemindableActivitiesTransaction();
		List<Map<String, Object>> activities = new ArrayList<Map<String, Object>>();
		try {
			activities = (List<Map<String, Object>>) transaction.execute();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(activities);
		/*
		CloseableHttpClient client = new DefaultHttpClient();
		HttpPost post = new HttpPost("http://utf8.sms.webchinese.cn");
		post.addHeader("Content-Type",
				"application/x-www-form-urlencoded;charset=utf8");// 在头文件中设置转码
		List<NameValuePair> data = new ArrayList<NameValuePair>();
		data.add(new BasicNameValuePair("Uid", "Bond"));
		data.add(new BasicNameValuePair("Key", "ff1b377184d7d48f2c24"));
		data.add(new BasicNameValuePair("smsMob", "13750046645"));
		data.add(new BasicNameValuePair("smsText",
				"毛主席您好，您参加的青年志愿者面试活动将在半小时后开始，地点为人民大会堂"));

		try {
			CloseableHttpResponse response;
			post.setEntity(new UrlEncodedFormEntity(data));
			response = client.execute(post);
			Header[] headers = post.getAllHeaders();
			int statusCode = response.getStatusLine().getStatusCode();
			System.out.println("statusCode:" + statusCode);
			for (Header h : headers) {
				System.out.println(h.toString());
			}
			String result = response.getEntity().toString();
			System.out.println(result);

			response.close();
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} */
	}

}
