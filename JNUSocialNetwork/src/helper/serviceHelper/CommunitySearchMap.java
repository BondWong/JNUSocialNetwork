package helper.serviceHelper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import transaction.Transaction;
import transaction.DAOFetchTransaction.FetchCommunitiesTransaction;
import utils.JsonUtil;

public class CommunitySearchMap {
	private final static String PATH = "communitysearchmap.txt";
	private static Map<String, String> searchMap = new HashMap<String, String>();

	@SuppressWarnings("unchecked")
	public static void initializeEnvironment() throws Exception {
		if (!Files.exists(Paths.get(PATH))) {
			Transaction transaction = new FetchCommunitiesTransaction();
			List<Map<String, Object>> communities;
			try {
				communities = (List<Map<String, Object>>) transaction.execute(
						"Community.fetch", null, null, 0, 500);
				for (Map<String, Object> community : communities)
					addRecord(
							((Map<String, String>) community.get("attributes"))
									.get("name"),
							community.get("ID") + "");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			serialize();
		}
	}

	public static void addRecord(String key, String ID) {
		if (key == null)
			return;
		String IDs = null;
		synchronized (CommunitySearchMap.class) {
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
		synchronized (CommunitySearchMap.class) {
			searchMap.put(key, ID);
		}
	}

	public static void removeRecord(String key, String ID) {
		String IDs = null;
		synchronized (CommunitySearchMap.class) {
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
			synchronized (CommunitySearchMap.class) {
				if (IDs.length() == 0)
					searchMap.remove(key);
				else
					searchMap.put(key, IDs);
			}
		}

	}

	public static String[] searchIDs(String key) {
		String IDs = "";
		synchronized (CommunitySearchMap.class) {
			Set<String> keys = searchMap.keySet();
			for (String k : keys) {
				if (k.contains(key)) {
					IDs += searchMap.get(k);
					IDs.trim();
					IDs += " ";
					System.out.println(IDs);
				}
			}
		}
		if (IDs.equals(""))
			return new String[0];
		else
			return IDs.split(" ");
	}

	public static synchronized void serialize() throws IOException {
		try {
			if (!Files.exists(Paths.get(PATH))) {
				Files.createFile(Paths.get(PATH));
			}
			Files.write(Paths.get(PATH), JsonUtil.toJson(searchMap).getBytes());
			System.out.println("communitySearchMap:" + searchMap);
			searchMap.clear();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
	}

	@SuppressWarnings("unchecked")
	public static synchronized void deserialize() throws IOException {
		byte[] bytes;
		try {
			bytes = Files.readAllBytes(Paths.get(PATH));
			String strSearchMap = new String(bytes, "utf8");
			searchMap = JsonUtil.fromJson(strSearchMap, Map.class);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
	}
}
