package transaction.DAOFetchTransaction;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import transaction.Transaction;

public class FetchMembersWithEmailTransaction implements Transaction {

	@SuppressWarnings("unchecked")
	@Override
	public Object execute(Object... params) throws Exception {
		// TODO Auto-generated method stub
		String ID = (String) params[0];
		int startIndex = (int) params[1];
		int pageSize = (int) params[2];
		Transaction transaction = new FetchMembersTransaction();
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> temp = new ArrayList<Map<String, Object>>();
		temp = (List<Map<String, Object>>) transaction.execute(
				"Member.fetchFollowees", ID, null, startIndex, pageSize);

		for (Map<String, Object> t : temp) {
			String email = ((Map<String, String>) t.get("attributes"))
					.get("email");
			if (email != null && !email.equals(""))
				results.add(t);
		}

		return results;
	}

}
