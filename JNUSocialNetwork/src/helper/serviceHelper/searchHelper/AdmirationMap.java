package helper.serviceHelper.searchHelper;

import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import transaction.Transaction;
import transaction.DAOFetchTransaction.FetchCommunitiesTransaction;
import utils.JsonUtil;

import com.google.gson.reflect.TypeToken;

public class AdmirationMap {
	private final static String PATH = "admirationmap.txt";
	private final static Type TYPE = new TypeToken<Map<String, Map<Long, String>>>() {
	}.getType();
	private static Map<String, Map<Long, String>> admirationMap = new HashMap<String, Map<Long, String>>();

	@SuppressWarnings("unchecked")
	public static void initializeEnvironment() throws Exception {
		if (!Files.exists(Paths.get(PATH))) {
			List<Map<String, Object>> communities;
			Transaction transaction = new FetchCommunitiesTransaction();
			try {
				communities = (List<Map<String, Object>>) transaction.execute(
						"Community.fetch", null, null, 0, 500);
				for (Map<String, Object> community : communities) {
					List<Map<String, String>> members = (List<Map<String, String>>) community
							.get("members");
					for (Map<String, String> member : members) {
						addRecord(member.get("ID"),
								Long.parseLong((String) community.get("ID")),
								(String) community.get("ownerID"));
					}
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			serialize();
		}
	}

	public static synchronized void addRecord(String ID, Long communityID,
			String ownerID) {
		if (!admirationMap.containsKey(ID)) {
			Map<Long, String> record = new HashMap<Long, String>();
			record.put(communityID, ownerID);
			admirationMap.put(ID, record);
		} else if (!admirationMap.get(ID).containsKey(communityID)) {
			admirationMap.get(ID).put(communityID, ownerID);
		} else {

		}

	}

	public static synchronized void removeRecord(String ID, Long communityID) {
		if (!admirationMap.containsKey(ID)
				|| !admirationMap.get(ID).containsKey(communityID))
			return;

		admirationMap.get(ID).remove(communityID);
	}

	public static synchronized Map<Long, String> getAdmirRecords(String ID) {
		if (!admirationMap.containsKey(ID))
			return new HashMap<Long, String>();

		return admirationMap.get(ID);
	}

	public static synchronized Set<Long> getAdmirCommunities(String ID) {
		if (!admirationMap.containsKey(ID))
			return new HashSet<Long>();

		return admirationMap.get(ID).keySet();
	}

	public static synchronized Collection<String> getAdmirMembers(String ID) {
		if (!admirationMap.containsKey(ID))
			return new ArrayList<String>();

		return admirationMap.get(ID).values();
	}

	public static synchronized void serialize() throws IOException {
		try {
			if (!Files.exists(Paths.get(PATH))) {
				Files.createFile(Paths.get(PATH));
			}
			Files.write(Paths.get(PATH), JsonUtil.toJson(admirationMap, TYPE)
					.getBytes());
			System.out.println("admirationMap:" + admirationMap);
			admirationMap.clear();
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
			admirationMap = JsonUtil.fromJson(strSearchMap, TYPE);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
	}
}
