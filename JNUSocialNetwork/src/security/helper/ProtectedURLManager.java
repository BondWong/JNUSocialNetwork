package security.helper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import model.modelType.UserType;

public class ProtectedURLManager {
	private static List<String> loginProtectionURLs;
	private static Map<String, Set<UserType>> authorizationProtectionURLs;

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
		loginProtectionURLs.add("post/updateAttributes");

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

		loginProtectionURLs.add("user/delete");
		loginProtectionURLs.add("user/follow");
		loginProtectionURLs.add("user/cancelFollow");
		loginProtectionURLs.add("user/updateProfile");
		loginProtectionURLs.add("user/addImages");
		loginProtectionURLs.add("user/removeImages");
		loginProtectionURLs.add("user/fetchIDs");

		loginProtectionURLs.add("chatRoom");

		loginProtectionURLs.add("application");

		loginProtectionURLs.add("event/deleteUnhandledEvent");

		loginProtectionURLs.add("fileUploader");
		loginProtectionURLs.add("fileDownloader");

		authorizationProtectionURLs = new HashMap<String, Set<UserType>>();
		Set<UserType> userTypes = new LinkedHashSet<UserType>();
		userTypes.add(UserType.MEMBER);
		userTypes.add(UserType.COMMUNITYOWNER);
		Set<UserType> member = new LinkedHashSet<UserType>();
		member.add(UserType.MEMBER);
		Set<UserType> communityOwner = new LinkedHashSet<UserType>();
		communityOwner.add(UserType.COMMUNITYOWNER);
		Set<UserType> god = new LinkedHashSet<UserType>();
		god.add(UserType.GOD);

		authorizationProtectionURLs.put("post/add", userTypes);
		authorizationProtectionURLs.put("post/addToCommunity", userTypes);
		authorizationProtectionURLs.put("post/delete", userTypes);
		authorizationProtectionURLs.put("post/like", userTypes);
		authorizationProtectionURLs.put("post/cancelLike", userTypes);
		authorizationProtectionURLs.put("post/collect", userTypes);
		authorizationProtectionURLs.put("post/cancelCollect", userTypes);
		authorizationProtectionURLs.put("post/joinActivity", userTypes);
		authorizationProtectionURLs.put("post/leaveActivity", userTypes);
		authorizationProtectionURLs.put("post/updateAttributes", userTypes);

		authorizationProtectionURLs.put("community/add", communityOwner);
		authorizationProtectionURLs.put("community/delete", communityOwner);
		authorizationProtectionURLs.put("community/join", userTypes);
		authorizationProtectionURLs.put("community/leave", userTypes);
		authorizationProtectionURLs.put("community/updateAttributes",
				communityOwner);
		authorizationProtectionURLs.put("community/addTags", communityOwner);
		authorizationProtectionURLs.put("community/removeTag", communityOwner);

		authorizationProtectionURLs.put("comment/add", userTypes);
		authorizationProtectionURLs.put("comment/delete", userTypes);
		authorizationProtectionURLs.put("comment/like", userTypes);
		authorizationProtectionURLs.put("comment/cancelLike", userTypes);

		authorizationProtectionURLs.put("user/delete", god);
		authorizationProtectionURLs.put("user/removeImages", userTypes);
		authorizationProtectionURLs.put("user/fetchIDs", god);

		authorizationProtectionURLs.put("user/addImages", userTypes);
		authorizationProtectionURLs.put("user/updateProfile", userTypes);
		authorizationProtectionURLs.put("user/follow", userTypes);
		authorizationProtectionURLs.put("user/cancelFollow", userTypes);

		authorizationProtectionURLs.put("chatRoom/fetch", userTypes);
		authorizationProtectionURLs.put("chatRoom/fetchMessages", userTypes);
		authorizationProtectionURLs.put("chatRoom/delete", god);

		authorizationProtectionURLs.put("application/create", member);
		authorizationProtectionURLs.put("application/fetchIDs", god);
		authorizationProtectionURLs.put("application/reject", god);
		authorizationProtectionURLs.put("application/pass", god);

		authorizationProtectionURLs.put("event/deleteUnhandledEvents",
				userTypes);

		authorizationProtectionURLs.put("fileUploader", userTypes);
		authorizationProtectionURLs.put("fileDownloader", userTypes);

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
				if (authorizationProtectionURLs.get(u).contains(userType))
					return true;
				else
					return false;
			}
		}

		return true;
	}

}
