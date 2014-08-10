package security.helper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import model.modelType.UserType;

public class ProtectedURLManager {
	private static List<String> loginProtectionURLs;
	private static Map<String, UserType> authorizationProtectionURLs;

	static {
		loginProtectionURLs = new ArrayList<String>();
		loginProtectionURLs.add("post/add");
		loginProtectionURLs.add("post/addToCommunity");
		loginProtectionURLs.add("post/delete");
		loginProtectionURLs.add("post/like");
		loginProtectionURLs.add("post/cancelLike");
		loginProtectionURLs.add("post/collect");
		loginProtectionURLs.add("post/cancelCollect");
		loginProtectionURLs.add("post/joinActivity");
		loginProtectionURLs.add("post/leaveActivity");

		loginProtectionURLs.add("community/add");
		loginProtectionURLs.add("community/delete");
		loginProtectionURLs.add("community/join");
		loginProtectionURLs.add("community/leave");
		loginProtectionURLs.add("community/updateAttributes");
		loginProtectionURLs.add("community/addTags");
		loginProtectionURLs.add("community/removeTag");

		loginProtectionURLs.add("comment/add");
		loginProtectionURLs.add("comment/delete");
		loginProtectionURLs.add("comment/like");
		loginProtectionURLs.add("comment/cancelLike");

		loginProtectionURLs.add("user/deleteMember");
		loginProtectionURLs.add("user/deleteCommunityOwner");
		loginProtectionURLs.add("user/follow");
		loginProtectionURLs.add("user/cancelFollow");
		loginProtectionURLs.add("user/updateProfile");
		loginProtectionURLs.add("user/addImages");
		loginProtectionURLs.add("user/removeImages");
		loginProtectionURLs.add("user/fetchIDs");
		loginProtectionURLs.add("user/fetchCommunityOwnerByID");
		loginProtectionURLs.add("user/getIDStatus");

		loginProtectionURLs.add("chatRoom");

		loginProtectionURLs.add("application");

		loginProtectionURLs.add("event/deleteUnhandledEvent");

		loginProtectionURLs.add("fileUploader");

		authorizationProtectionURLs = new HashMap<String, UserType>();
		authorizationProtectionURLs.put("post/add", UserType.MEMBER);
		authorizationProtectionURLs.put("post/addToCommunity", UserType.MEMBER);
		authorizationProtectionURLs.put("post/delete", UserType.MEMBER);
		authorizationProtectionURLs.put("post/like", UserType.MEMBER);
		authorizationProtectionURLs.put("post/cancelLike", UserType.MEMBER);
		authorizationProtectionURLs.put("post/collect", UserType.MEMBER);
		authorizationProtectionURLs.put("post/cancelCollect", UserType.MEMBER);
		authorizationProtectionURLs.put("post/joinActivity", UserType.MEMBER);
		authorizationProtectionURLs.put("post/leaveActivity", UserType.MEMBER);

		authorizationProtectionURLs.put("community/add",
				UserType.COMMUNITYOWNER);
		authorizationProtectionURLs.put("community/delete",
				UserType.COMMUNITYOWNER);
		authorizationProtectionURLs.put("community/join", UserType.MEMBER);
		authorizationProtectionURLs.put("community/leave", UserType.MEMBER);
		authorizationProtectionURLs.put("community/updateAttributes",
				UserType.COMMUNITYOWNER);
		authorizationProtectionURLs.put("community/addTags",
				UserType.COMMUNITYOWNER);
		authorizationProtectionURLs.put("community/removeTag",
				UserType.COMMUNITYOWNER);

		authorizationProtectionURLs.put("comment/add", UserType.MEMBER);
		authorizationProtectionURLs.put("comment/delete", UserType.MEMBER);
		authorizationProtectionURLs.put("comment/like", UserType.MEMBER);
		authorizationProtectionURLs.put("comment/cancelLike", UserType.MEMBER);

		authorizationProtectionURLs.put("user/deleteMember", UserType.GOD);
		authorizationProtectionURLs.put("user/deleteCommunityOwner",
				UserType.GOD);
		authorizationProtectionURLs.put("user/removeImages", UserType.MEMBER);
		authorizationProtectionURLs.put("user/fetchIDs", UserType.GOD);
		authorizationProtectionURLs.put("user/fetchCommunityOwnerByID",
				UserType.GOD);
		authorizationProtectionURLs.put("user/addImages", UserType.MEMBER);
		authorizationProtectionURLs.put("user/updateProfile", UserType.MEMBER);
		authorizationProtectionURLs.put("user/follow", UserType.MEMBER);
		authorizationProtectionURLs.put("user/cancelFollow", UserType.MEMBER);
		authorizationProtectionURLs.put("user/getIDStatus", UserType.GOD);

		authorizationProtectionURLs.put("chatRoom/fetch", UserType.MEMBER);
		authorizationProtectionURLs.put("chatRoom/fetchMessages",
				UserType.MEMBER);
		authorizationProtectionURLs.put("chatRoom/delete", UserType.GOD);

		authorizationProtectionURLs.put("application/create", UserType.MEMBER);
		authorizationProtectionURLs.put("application/fetchIDs", UserType.GOD);
		authorizationProtectionURLs.put("application/reject", UserType.GOD);
		authorizationProtectionURLs.put("application/pass", UserType.GOD);

		authorizationProtectionURLs.put("event/deleteUnhandledEvents",
				UserType.MEMBER);

	}

	public static boolean needLoginProtection(String url) {
		for (String u : loginProtectionURLs) {
			if (url.contains(u))
				return true;
		}

		return false;
	}

	public static boolean isAuthorized(String url, UserType userType) {
		for (String u : authorizationProtectionURLs.keySet()) {
			if (url.contains(u)) {
				if (authorizationProtectionURLs.get(u).equals(userType))
					return true;
				else
					return false;
			}
		}

		return true;
	}

}
