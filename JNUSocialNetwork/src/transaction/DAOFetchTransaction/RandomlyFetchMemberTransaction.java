package transaction.DAOFetchTransaction;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import service.helper.NumberManager;
import transaction.DAOTransaction;

public class RandomlyFetchMemberTransaction extends DAOTransaction {
	DAOTransaction transaction = new FetchMembersTransaction();

	@SuppressWarnings("unchecked")
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		int startIndex = (int) Math.round((Math.random() * NumberManager
				.getMemberNum()));
		if (startIndex > 1)
			startIndex -= 1;
		else if(startIndex == 0 )
			startIndex += 1;
		List<Map<String, Object>> results = (List<Map<String, Object>>) transaction.execute("Member.fetch", null, null, startIndex, 500);
		Collections.shuffle(results);
		return results;
	}

}
