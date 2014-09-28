package service.helper;

import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import model.modelType.PostType;

import com.google.gson.reflect.TypeToken;

import transaction.Transaction;
import transaction.DAOFetchTransaction.FetchPostsTransaction;
import utils.JsonUtil;

public class ActivitySearchMap {
	private final static String PATH = "activitysearchmap.txt";
	private final static Type TYPE = new TypeToken<Map<Long, Long>>() {
	}.getType();
	private static Map<Long, Long> activityMap = new HashMap<Long, Long>();

	@SuppressWarnings("unchecked")
	public static void initializeEnvironment() throws Exception {
		if (!Files.exists(Paths.get(PATH))) {
			List<Map<String, Object>> activities;
			Transaction transaction = new FetchPostsTransaction();
			try {
				activities = (List<Map<String, Object>>) transaction.execute(
						"Post.fetchByTypeASC", PostType.ACTIVITY, 0, 500);
				for (Map<String, Object> activity : activities) {
					if (activity.get("available").equals(true)
							&& ((Map<String, String>) activity
									.get("attributes")).get("reminded").equals(
									"false"))
						addRecord((Long) activity.get("ID"),
								Long.parseLong(((Map<String, String>) activity
										.get("attributes")).get("remindDate")));
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			serialize();
		}
	}

	public static synchronized void addRecord(Long ID, Long startDate) {
		activityMap.put(ID, startDate);
	}

	public static synchronized void removeRecord(Long ID) {
		activityMap.remove(ID);
	}

	public static List<Long> fecthRemindableIDs() {
		List<Long> IDs = new ArrayList<Long>();
		synchronized (ActivitySearchMap.class) {
			for (Map.Entry<Long, Long> entrySet : activityMap.entrySet()) {
				if (System.currentTimeMillis() - entrySet.getValue() >= 0)
					IDs.add(entrySet.getKey());
			}

			for (Long ID : IDs)
				removeRecord(ID);

		}
		System.out.println("remindIDs:" + IDs);
		return IDs;
	}

	public static synchronized void serialize() throws IOException {
		try {
			if (!Files.exists(Paths.get(PATH))) {
				Files.createFile(Paths.get(PATH));
			}
			Files.write(Paths.get(PATH), JsonUtil.toJson(activityMap, TYPE)
					.getBytes());
			System.out.println(activityMap);
			activityMap.clear();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
	}

	public static synchronized void deserialize() throws IOException {
		byte[] bytes;
		try {
			bytes = Files.readAllBytes(Paths.get(PATH));
			String strSearchMap = new String(bytes, "utf8");
			activityMap = JsonUtil.fromJson(strSearchMap, TYPE);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
	}
}
