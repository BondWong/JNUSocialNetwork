package service.helper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import utils.JsonUtil;

public class SearchMap {
	private final static String PATH = "searchmap.txt";
	private static Map<String, String> searchMap = new HashMap<String, String>();

	public static void initializeEnvironment() throws IOException {
		serialize();
	}
	
	public static void addRecord(String key, String ID) {
		String IDs = null;
		synchronized (SearchMap.class) {
			IDs = searchMap.get(key);
		}
		if (IDs != null) {
			String[] tempIDs = IDs.split(" ");
			int i;
			for (i = 0; i < tempIDs.length; i++)
				if (tempIDs[i].equals(ID))
					break;
			if (i == tempIDs.length)
				IDs += " " + ID;
			ID = IDs.trim();

		}
		synchronized (SearchMap.class) {
			searchMap.put(key, ID);
		}
	}

	public static void removeRecord(String key, String ID) {
		String IDs = null;
		synchronized (SearchMap.class) {
			IDs = searchMap.get(key);
		}

		if (IDs != null) {
			String[] tempIDs = IDs.split(" ");
			IDs = "";
			for (int i = 0; i < tempIDs.length; i++) {
				if (tempIDs[i].equals(ID))
					continue;
				else
					IDs += " " + tempIDs[i];
			}
			IDs = IDs.trim();
			synchronized (SearchMap.class) {
				searchMap.put(key, IDs);
			}
		}

	}

	public static String[] searchIDs(String key) {
		String IDs = "";
		synchronized (SearchMap.class) {
			IDs = searchMap.get(key);
		}
		if (IDs == null)
			return new String[0];
		else
			return IDs.split(" ");
	}

	public static void serialize() throws IOException {
		try {
			if (!Files.exists(Paths.get(PATH))) {
				Files.createFile(Paths.get(PATH));
			}
			Files.write(Paths.get(PATH), JsonUtil.toJson(searchMap).getBytes());
			System.out.println("s:" + searchMap);
			searchMap.clear();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
	}

	@SuppressWarnings("unchecked")
	public static void deserialize() throws IOException {
		byte[] bytes;
		try {
			bytes = Files.readAllBytes(Paths.get(PATH));
			String strSearchMap = new String(bytes, "utf8");
			searchMap = JsonUtil.fromJson(strSearchMap, Map.class);
			System.out.println("d:" + searchMap);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
	}

}
