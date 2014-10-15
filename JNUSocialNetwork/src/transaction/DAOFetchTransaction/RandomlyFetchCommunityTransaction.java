package transaction.DAOFetchTransaction;

import helper.serviceHelper.NumberManager;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import transaction.DAOTransaction;

public class RandomlyFetchCommunityTransaction extends DAOTransaction {
	DAOTransaction transaction = new FetchCommunitiesTransaction();

	@SuppressWarnings("unchecked")
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		int startIndex = (int) Math.round((Math.random() * NumberManager
				.getCommunityNum()));
		if (startIndex > 1)
			startIndex -= 1;
		else if (startIndex == 0)
			startIndex += 1;
		List<Map<String, Object>> results = (List<Map<String, Object>>) transaction
				.execute("Community.fetch", null, null, startIndex, params[0]);
		Collections.shuffle(results);
		return results;
	}

}
