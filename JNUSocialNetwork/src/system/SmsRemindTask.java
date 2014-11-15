package system;

import helper.securityHelper.sendEmailTracker.ActivityInvitationEmailTracker;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import model.Post;
import transaction.Transaction;
import transaction.DAOFetchTransaction.FetchMembersByIDsTransaction;
import transaction.DAOFetchTransaction.FetchRemindableActivitiesTransaction;
import transaction.DAOUpdateTransaction.UpdateAttributeTransaction;

public class SmsRemindTask implements Runnable {
	private static final String addr = "http://api.sms.cn/mt/";
	private static final String userId = "55443";
	private static final String pwd = "bcfcd8e4100c47fcd1a90195360461df";
	private static final String encode = "utf8";
	private static Map<String, String> reminded;
	private static String reg = "([a-zA-Z]{3,9}) (\\d{2}),2014 - (\\d{2}:\\d{2})";
	static {
		reminded = new HashMap<String, String>();
		reminded.put("reminded", "true");
	}

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
		System.out.println("remindable:" + activities);
		for (Map<String, Object> activity : activities) {
			List<String> IDs = (List<String>) activity.get("participantIDs");
			System.out.println("participantIDs:" + IDs);
			transaction = new FetchMembersByIDsTransaction();
			List<Map<String, Object>> members = new ArrayList<Map<String, Object>>();
			try {
				members = (List<Map<String, Object>>) transaction.execute(IDs);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			for (Map<String, Object> member : members)
				try {

					send(activity, member);

				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			transaction = new UpdateAttributeTransaction();
			try {
				transaction.execute(Post.class, activity.get("ID"), reminded);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			ActivityInvitationEmailTracker.getInstance().removeRecord(
					activity.get("ID"));

		}
	}

	@SuppressWarnings("unchecked")
	public static void send(Map<String, Object> activity,
			Map<String, Object> member) throws Exception {
		String dateTime = ((Map<String, String>) activity.get("attributes"))
				.get("activityTime");
		Pattern pattern = Pattern.compile(reg);
		Matcher matcher = pattern.matcher(dateTime);
		String month = "";
		String day = "";
		String time = "";
		if (matcher.find()) {
			month = matcher.group(1);
			day = matcher.group(2);
			time = matcher.group(3);
		}
		switch (month) {
		case "January":
			month = "1";
			break;
		case "February":
			month = "2";
			break;
		case "March":
			month = "3";
			break;
		case "April":
			month = "4";
			break;
		case "May":
			month = "5";
			break;
		case "June":
			month = "6";
			break;
		case "July":
			month = "7";
			break;
		case "August":
			month = "8";
			break;
		case "September":
			month = "9";
			break;
		case "October":
			month = "10";
			break;
		case "November":
			month = "11";
			break;
		case "December":
			month = "12";
			break;
		}
		String msgContent = ((Map<String, String>) member.get("attributes"))
				.get("name")
				+ "你好，你参加的\""
				+ ((Map<String, String>) activity.get("attributes"))
						.get("activityName")
				+ "\"活动将于"
				+ month
				+ "月"
				+ day
				+ "号"
				+ time
				+ "开始，地点是"
				+ ((Map<String, String>) activity.get("attributes"))
						.get("activityAddr")
				+ "，如有问题请联系"
				+ ((Map<String, String>) activity.get("attributes"))
						.get("inquery")

				+ "。[来自CampuSite\""
				+ ((Map<String, String>) activity.get("attributes"))
						.get("communityName") + "\"]";
		msgContent = java.net.URLEncoder.encode(msgContent, "UTF-8");
		// 组建请求
		String straddr = addr
				+ "?uid="
				+ userId
				+ "&pwd="
				+ pwd
				+ "&mobile="
				+ ((Map<String, String>) member.get("attributes"))
						.get("telnum") + "&encode=" + encode + "&content="
				+ msgContent;

		System.out.println(straddr);
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
