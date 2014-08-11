package service.helper;

import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.reflect.TypeToken;

import utils.JsonUtil;

public class ActivityMap {
	private final static String PATH = "activitymap.txt";
	private final static Type TYPE = new TypeToken<Map<Long, Long>>() {
	}.getType();
	private static Map<Long, Long> activityMap = new HashMap<Long, Long>();

	public static void initializeEnvironment() throws IOException {
		serialize();
	}

	public static synchronized void addRecord(Long ID, Long startDate) {
		activityMap.put(ID, startDate);
	}

	public static synchronized void removeRecord(Long ID) {
		activityMap.remove(ID);
	}

	public static List<Long> fecthRemindableIDs() {
		List<Long> IDs = new ArrayList<Long>();
		synchronized (ActivityMap.class) {
			for (Map.Entry<Long, Long> entrySet : activityMap.entrySet())
				if (System.currentTimeMillis() - entrySet.getValue() <= 30 * 60 * 1000)
					IDs.add(entrySet.getKey());
		}
		return IDs;
	}

	public static synchronized void serialize() throws IOException {
		try {
			if (!Files.exists(Paths.get(PATH))) {
				Files.createFile(Paths.get(PATH));
			}
			Files.write(Paths.get(PATH), JsonUtil.toJson(activityMap, TYPE)
					.getBytes());
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
