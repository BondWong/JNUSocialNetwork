package system;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class RemindUnaTask implements Runnable {
	private static final String addr = "http://api.sms.cn/mt/";
	private static final String userId = "55443";
	private static final String pwd = "bcfcd8e4100c47fcd1a90195360461df";
	private static final String encode = "utf8";
	private static final String telnum = "13750066417";

	@Override
	public void run() {
		String msgContent = "古捷靓女，记得去睇牙医（来自10年前黃俊邦）";
		try {
			msgContent = java.net.URLEncoder.encode(msgContent, "UTF-8");
			// 组建请求
			String straddr = addr + "?uid=" + userId + "&pwd=" + pwd
					+ "&mobile=" + telnum + "&encode=" + encode + "&content="
					+ msgContent;

			// 发送请求
			URL url = new URL(straddr);
			HttpURLConnection connection = (HttpURLConnection) url
					.openConnection();
			connection.setRequestMethod("POST");
			BufferedReader in = new BufferedReader(new InputStreamReader(
					url.openStream()));

			// 返回结果
			String inputline = in.readLine();
			System.out.println("Response:" + inputline);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
