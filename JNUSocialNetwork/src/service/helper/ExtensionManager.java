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
