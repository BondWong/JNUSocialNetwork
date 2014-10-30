package helper.serviceHelper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import transaction.Transaction;
import transaction.DAOFetchTransaction.FetchMembersTransaction;
import utils.JsonUtil;

public class MemberSearchMap {
	private final static String PATH = "membersearchmap.txt";
	private static Map<String, String> searchMap = new HashMap<String, String>();

	@SuppressWarnings("unchecked")
	public static void initializeEnvironment() throws Exception {
		if (!Files.exists(Paths.get(PATH))) {
			Transaction transaction = new FetchMembersTransaction();
			List<Map<String, Object>> results;
			try {
				results = (List<Map<String, Object>>) transaction.execute(
						"Member.fetch", null, null, 0, 500);
				for (Map<String, Object> result : results) {
					addRecord(
							((Map<String, String>) result.get("attributes"))
									.get("name"),
							(String) result.get("ID"));

					addRecord(
							((Map<String, String>) result.get("attributes"))
									.get("gender"),
							(String) result.get("ID"));

					Map<String, String> attributes = (Map<String, String>) result
							.get("attributes");

					if (attributes.get("relationship") != null
							&& !attributes.get("relationship").equals(""))
						addRecord(attributes.get("relationship"),
								(String) result.get("ID"));

					if (attributes.get("campus") != null
							&& !attributes.get("campus").equals(""))
						addRecord(attributes.get("campus"),
								(String) result.get("ID"));

					if (attributes.get("major") != null
							&& !attributes.get("major").equals(""))
						addRecord(attributes.get("major"),
								(String) result.get("ID"));

					if (attributes.get("season") != null
							&& !attributes.get("season").equals(""))
						addRecord(attributes.get("season"),
								(String) result.get("ID"));

					if (attributes.get("institution") != null
							&& !attributes.get("institution").equals(""))
						addRecord(attributes.get("institution"),
								(String) result.get("ID"));

					if (attributes.get("major") != null
							&& attributes.get("season") != null
							&& !attributes.get("major").equals("")
							&& !attributes.get("season").equals(""))
						addRecord(
								attributes.get("season")
										+ attributes.get("major"),
								(String) result.get("ID"));
				}
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
		synchronized (MemberSearchMap.class) {
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
		synchronized (MemberSearchMap.class) {
			searchMap.put(key, ID);
		}
	}

	public static void removeRecord(String key, String ID) {
		String IDs = null;
		synchronized (MemberSearchMap.class) {
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
			synchronized (MemberSearchMap.class) {
				if (IDs.length() == 0)
					searchMap.remove(key);
				else
					searchMap.put(key, IDs);
			}
		}

	}

	public static String[] searchIDs(String key) {
		String IDs = "";
		synchronized (MemberSearchMap.class) {
			Set<String> keys = searchMap.keySet();
			for (String k : keys)
				if (k.contains(key)) {
					IDs += searchMap.get(k);
					IDs.trim();
					IDs += " ";
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
			System.out.println("memberSearchMap:" + searchMap);
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
