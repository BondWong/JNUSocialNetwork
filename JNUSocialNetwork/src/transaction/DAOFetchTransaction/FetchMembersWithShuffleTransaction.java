package transaction.DAOFetchTransaction;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import transaction.Transaction;

public class FetchMembersWithShuffleTransaction implements Transaction {

	@SuppressWarnings("unchecked")
	@Override
	public Object execute(Object... params) throws Exception {
		// TODO Auto-generated method stub
		Transaction transaction = new FetchMembersTransaction();
		List<Map<String, Object>> results = (List<Map<String, Object>>) transaction
				.execute(params);
		Collections.shuffle(results);
		return results;
	}

}
