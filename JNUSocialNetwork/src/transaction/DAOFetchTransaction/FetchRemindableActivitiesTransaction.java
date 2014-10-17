package transaction.DAOFetchTransaction;

import helper.serviceHelper.ActivitySearchMap;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import model.Post;
import transaction.DAOTransaction;
import utils.ConstantValue;

public class FetchRemindableActivitiesTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		ActivitySearchMap.deserialize();
		List<Long> IDs = new ArrayList<Long>();
		IDs = ActivitySearchMap.fecthRemindableIDs();
		ActivitySearchMap.serialize();

		if (IDs.size() > 0) {
			String query = "SELECT p FROM Post p WHERE p.available = 1 AND p.ID IN(";
			Iterator<Long> iter = IDs.iterator();
			while (iter.hasNext()) {
				query += iter.next();
				if (iter.hasNext())
					query += ",";
				else
					query += ")";
			}
			TypedQuery<Post> tq = em.createQuery(query, Post.class);
			for (Post post : tq.getResultList()) {
				Long startDate = Long.parseLong(post.getAttribute("startDate"));
				Long remindDate = Long.parseLong(post
						.getAttribute("remindDate"));
				String reminded = post.getAttribute("reminded");
				if (reminded.equals("false")
						&& startDate > remindDate
						&& (startDate - remindDate) >= ConstantValue.ACTIVITYINTERVAL)
					results.add(post.toRepresentation());
			}
		}

		return results;
	}

}
