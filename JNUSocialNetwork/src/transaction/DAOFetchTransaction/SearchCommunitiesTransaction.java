package transaction.DAOFetchTransaction;

import helper.serviceHelper.searchHelper.CommunitySearchMap;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import model.Community;
import transaction.DAOTransaction;

public class SearchCommunitiesTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		CommunitySearchMap.deserialize();
		String criteria = new String(((String) params[0]).getBytes(), "utf8");
		String[] IDs = CommunitySearchMap.searchIDs(criteria);
		CommunitySearchMap.serialize();
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		if (IDs != null && IDs.length != 0) {
			String query = "";
			for (int i = 0; i < IDs.length; i++) {
				if (IDs[i].equals(params[0]))
					continue;
				else {
					query += IDs[i];
					if (i == IDs.length - 1)
						query += ")";
					else
						query += ", ";
				}
			}
			if (!query.equals("")) {
				query = "SELECT c FROM Community c WHERE c.ID IN (" + query;
				System.out.println(query);
				TypedQuery<Community> tq = em.createQuery(query,
						Community.class);
				tq.setFirstResult((int) params[1]);
				tq.setMaxResults((int) params[2]);
				List<Community> communities = tq.getResultList();
				for (Community community : communities)
					results.add(community.toRepresentation());
			}
		}
		return results;
	}

}
