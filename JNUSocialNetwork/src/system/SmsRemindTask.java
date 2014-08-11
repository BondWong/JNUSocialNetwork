package system;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import transaction.Transaction;
import transaction.DAOFetchTransaction.FetchMembersByIDsTransaction;
import transaction.DAOFetchTransaction.FetchRemindableActivitiesTransaction;

public class SmsRemindTask implements Runnable {
	private static final String addr = "http://api.sms.cn/mt/";
	private static final String userId = "55443";
	private static final String pwd = "bcfcd8e4100c47fcd1a90195360461df";
	private static final String encode = "utf8";

	@SuppressWarnings({ "unchecked" })
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
		for (Map<String, Object> activity : activities) {
			List<String> IDs = (List<String>) activity.get("participantIDs");
			System.out.println(IDs);
			transaction = new FetchMembersByIDsTransaction();
			List<Map<String, Object>> members = new ArrayList<Map<String, Object>>();
			try {
				members = (List<Map<String, Object>>) transaction.execute(IDs);
				System.out.println(members);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			for (Map<String, Object> member : members)
				try {
					System.out.println(((Map<String, String>) member
							.get("attributes")).get("telnum"));
					/*
					 * send(mode, ((Map<String, String>)
					 * member.get("attributes")) .get("telnum"));
					 */
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		}
	}

	public static void send(String msgContent, String mobile) throws Exception {

		// 组建请求
		String straddr = addr + "?uid=" + userId + "&pwd=" + pwd + "&mobile="
				+ mobile + "&encode=" + encode + "&content=" + msgContent;

		StringBuffer sb = new StringBuffer(straddr);
		System.out.println("URL:" + sb);

		// 发送请求
		URL url = new URL(sb.toString());
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		connection.setRequestMethod("POST");
		BufferedReader in = new BufferedReader(new InputStreamReader(
				url.openStream()));

		// 返回结果
		String inputline = in.readLine();
		System.out.println("Response:" + inputline);

	}

}
