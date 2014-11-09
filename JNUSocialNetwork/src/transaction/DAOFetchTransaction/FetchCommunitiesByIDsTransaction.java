package transaction.DAOFetchTransaction;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import model.Community;
import transaction.DAOTransaction;

public class FetchCommunitiesByIDsTransaction extends DAOTransaction {

	@SuppressWarnings("unchecked")
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		List<Long> communityIDs = (List<Long>) params[0];
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		if (communityIDs.size() > 0) {
			String query = "SELECT c FROM Community c WHERE c.available = 1 AND c.ID IN (";
			Iterator<Long> iter = communityIDs.iterator();
			while (iter.hasNext()) {
				query += iter.next();
				if (iter.hasNext())
					query += ",";
				else
					query += ")";
			}
			System.out.println(query);
			TypedQuery<Community> q = em.createQuery(query, Community.class);
			for (Community community : q.getResultList())
				results.add(community.toRepresentation());
		}

		return results;
	}

}
