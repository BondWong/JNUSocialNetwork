package helper.serviceHelper;

import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import transaction.Transaction;
import transaction.DAOFetchTransaction.FetchMembersTransaction;
import transaction.DAOFetchTransaction.GetNumTransaction;
import utils.ConstantValue;
import utils.JsonUtil;

import com.google.gson.reflect.TypeToken;

public class RankMap {
	private final static String PATH = "lonlinessranklist.txt";
	private final static Type TYPE = new TypeToken<Map<String, Map<String, Long>>>() {
	}.getType();
	private final static int STARTINDEX = 0;
	private final static int PAGESIZE = 500;
	private static Map<String, Map<String, Long>> rankMap = new HashMap<>();

	@SuppressWarnings("unchecked")
	public static void initializeEnvironment() throws Exception {
		if (!Files.exists(Paths.get(PATH))) {
			Transaction transaction = new FetchMembersTransaction();
			List<Map<String, Object>> members = new ArrayList<Map<String, Object>>();
			try {
				members = (List<Map<String, Object>>) transaction
						.execute("Member.fetchMembers", null, null, STARTINDEX,
								PAGESIZE);
				Transaction numTransaction = new GetNumTransaction();
				for (Map<String, Object> member : members) {
					long postNum = (long) numTransaction.execute(
							"Post.fetchByOwnerSize", member.get("ID"));
					long commentNum = (long) numTransaction.execute(
							"Comment.fetchByOwnerSize", member.get("ID"));
					addLonlinessRankRecord((String) member.get("ID"), postNum
							* ConstantValue.POSTWEIGHT + commentNum
							* ConstantValue.COMMENTWEIGHT);

				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				throw e;
			}
			serialize();
		}
	}

	public static synchronized void addLonlinessRankRecord(String memberID,
			long score) {
		if (!rankMap.containsKey("lonliness"))
			rankMap.put("lonliness", new HashMap<String, Long>());

		if (!rankMap.get("lonliness").containsKey(memberID))
			rankMap.get("lonliness").put(memberID, score);
		else
			rankMap.get("lonliness").put(memberID,
					rankMap.get("lonliness").get(memberID) + score);
	}

	public static synchronized void removeLonlinessRankRecord(String memberID) {
		rankMap.remove(memberID);
	}

	public static synchronized String[] fetchLonlinessRankRecord(int pageSize) {
		Map<String, Long> records = rankMap.get("lonliness");
		List<Entry<String, Long>> entries = new ArrayList<>(records.entrySet());
		entries.sort(new Comparator<Entry<String, Long>>() {

			@Override
			public int compare(Entry<String, Long> e1, Entry<String, Long> e2) {
				// TODO Auto-generated method stub
				if (e1.getValue() > e2.getValue())
					return -1;
				else if (e1.getValue() < e2.getValue())
					return 1;
				else
					return 0;
			}

		});

		if (pageSize > entries.size())
			pageSize = entries.size();
		entries = entries.subList(0, pageSize);
		String[] IDs = new String[entries.size()];
		for (int i = 0; i < entries.size(); i++)
			IDs[i] = entries.get(i).getKey();

		return IDs;

	}

	public static synchronized void serialize() throws IOException {
		try {
			if (!Files.exists(Paths.get(PATH))) {
				Files.createFile(Paths.get(PATH));
			}
			Files.write(Paths.get(PATH), JsonUtil.toJson(rankMap, TYPE)
					.getBytes());
			System.out.println(rankMap);
			rankMap.clear();
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
			rankMap = JsonUtil.fromJson(strSearchMap, TYPE);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
	}
}
