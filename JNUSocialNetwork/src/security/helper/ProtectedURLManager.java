package security.helper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import model.modelType.UserType;

public class ProtectedURLManager {
	private static List<String> protectedURLs;
	private static List<String> deleteHiddenCodeProtectionURLs;
	private static List<String> loginProtectionURLs;
	private static Map<String, UserType> authorizationProtectionURLs;
	
	static{
		protectedURLs = new ArrayList<String>();
		protectedURLs.add("app");
		protectedURLs.add("security");
		
		deleteHiddenCodeProtectionURLs = new ArrayList<String>();
		deleteHiddenCodeProtectionURLs.add("login");
		deleteHiddenCodeProtectionURLs.add("register");
		
		loginProtectionURLs = new ArrayList<String>();
		loginProtectionURLs.add("post/add");
		loginProtectionURLs.add("post/delete");
		loginProtectionURLs.add("post/like");
		loginProtectionURLs.add("post/cancelLike");
		loginProtectionURLs.add("post/collect");
		loginProtectionURLs.add("post/cancelCollect");
		loginProtectionURLs.add("post/join");
		loginProtectionURLs.add("comment");
		loginProtectionURLs.add("user");
		loginProtectionURLs.add("event");
		loginProtectionURLs.add("fileUploader");
		loginProtectionURLs.add("logout");
		loginProtectionURLs.add("deleteUser");
		
		authorizationProtectionURLs = new HashMap<String, UserType>();
	}
	
	public static boolean needHiddenCodeProtection(String url) {
		for(String u : protectedURLs) {
			if(url.contains(u))
				return true;
		}
		
		return false;
	}
	
	public static boolean needDeleteHiddenCodeProtection(String url) {
		for(String u : deleteHiddenCodeProtectionURLs) {
			if(url.contains(u))
				return true;
		}
		
		return false;
	}
	
	public static boolean needLoginProtection(String url) {
		for(String u : loginProtectionURLs) {
			if(url.contains(u))
				return true;
		}
		
		return false;
	}
	
	public static boolean authorized(String url, UserType userType) {
		for(String u : authorizationProtectionURLs.keySet()) {
			if(url.contains(u)) {
				if(authorizationProtectionURLs.get(u).equals(userType))
					return true;
				else
					return false;
			}
		}
		
		return true;
	}
	
}
