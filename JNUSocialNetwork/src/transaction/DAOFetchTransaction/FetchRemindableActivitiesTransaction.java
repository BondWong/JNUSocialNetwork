package transaction.DAOFetchTransaction;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import model.Post;
import service.helper.ActivityMap;
import transaction.DAOTransaction;

public class FetchRemindableActivitiesTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		ActivityMap.deserialize();
		List<Long> IDs = new ArrayList<Long>();
		IDs = ActivityMap.fecthRemindableIDs();
		for (Long ID : IDs)
			ActivityMap.removeRecord(ID);
		ActivityMap.serialize();

		if (IDs.size() > 0) {
			String query = "SELECT p FROM Post p WHERE p.ID IN(";
			Iterator<Long> iter = IDs.iterator();
			while (iter.hasNext()) {
				query += iter.next();
				if (iter.hasNext())
					query += ",";
				else
					query += ")";
			}
			TypedQuery<Post> tq = em.createQuery(query, Post.class);
			for (Post post : tq.getResultList())
				results.add(post.toRepresentation());
		}

		return results;
	}

}
