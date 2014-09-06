package security.helper;

import java.util.HashMap;
import java.util.Map;

import model.modelType.UserType;

public class LoginUserManager {
	private static Map<String, UserType> usersMap;
	static {
		usersMap = new HashMap<>();
	}

	public static synchronized void add(String ID, UserType userType) {
		usersMap.put(ID, userType);
	}

	public static synchronized void remove(String ID) {
		usersMap.remove(ID);
	}

	public static synchronized boolean isLogin(String ID) {
		return usersMap.containsKey(ID);
	}

	public static synchronized boolean isAuthorized(String ID, UserType userType) {
		return usersMap.get(ID).equals(userType);
	}

}
