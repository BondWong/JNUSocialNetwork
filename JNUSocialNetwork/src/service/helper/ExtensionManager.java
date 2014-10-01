package service.helper;

import java.util.HashMap;
import java.util.Map;

public class ExtensionManager {
	private static Map<String, String> mimeExtensionMap;
	static {
		mimeExtensionMap = new HashMap<String, String>();
		mimeExtensionMap.put("image/png", ".png");
		mimeExtensionMap.put("image/gif", ".gif");
		mimeExtensionMap.put("image/jpeg", ".jpg");
		mimeExtensionMap.put("application/pdf", ".pdf");
		mimeExtensionMap.put("text/plain", ".txt");
		mimeExtensionMap.put("application/x-gzip", ".gz");
		mimeExtensionMap.put("application/x-tar", ".tar");
		mimeExtensionMap.put("application/x-bittorrent", ".torrent");
		mimeExtensionMap
				.put("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
						".xlsx");
		mimeExtensionMap.put("application/vnd.ms-excel", ".xls");
		mimeExtensionMap.put("application/kset", ".et");
		mimeExtensionMap
				.put("application/vnd.openxmlformats-officedocument.wordprocessingml.document",
						".docx");
		mimeExtensionMap
				.put("application/vnd.openxmlformats-officedocument.wordprocessingml.document",
						".docx");
		mimeExtensionMap.put("application/msword", ".doc");
		mimeExtensionMap.put("application/kswps", ".wps");
	}

	public static boolean containsKey(String mimeType) {
		System.out.println(mimeType);
		return mimeExtensionMap.containsKey(mimeType);
	}

	public static boolean containsValue(String extension) {
		System.out.println(extension);
		return mimeExtensionMap.containsValue(extension);
	}

	public static String getExtention(String mimeType) {
		return mimeExtensionMap.get(mimeType);
	}
}
