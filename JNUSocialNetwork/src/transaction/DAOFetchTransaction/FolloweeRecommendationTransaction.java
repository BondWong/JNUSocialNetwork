package transaction.DAOFetchTransaction;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import transaction.DAOTransaction;

public class FolloweeRecommendationTransaction extends DAOTransaction {
	DAOTransaction transaction;

	@SuppressWarnings("unchecked")
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		List<Map<String, Object>> recommendations = new LinkedList<Map<String, Object>>();

		transaction = new RandomlyFetchMemberTransaction();
		List<Map<String, Object>> members = (List<Map<String, Object>>) transaction
				.execute();
		transaction = new FetchMemberTransaction();
		Map<String, Object> member = (Map<String, Object>) transaction
				.execute(params);

		for (Map<String, Object> m : members) {
			List<String> retains = (List<String>) m.get("followeeIDs");
			retains.retainAll((List<String>) member.get("followeeIDs"));
			if (retains.size() > 0
					&& !((List<String>) member.get("followeeIDs")).contains(m
							.get("ID"))
					&& !member.get("ID").equals(m.get("ID")))
				recommendations.add(m);
		}

		Collections.shuffle(recommendations);
		return recommendations;
	}

}
