package transaction.DAOFetchTransaction;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import helper.serviceHelper.AdmirationMap;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import model.Post;
import transaction.DAOTransaction;
import transaction.Transaction;

public class FetchInterestedPostsTransaction extends DAOTransaction {
	private static final int HIT = 7;
	private static final int BUCKETSIZE = 5;

	@SuppressWarnings("unchecked")
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		String ID = (String) params[0];
		int startIndex = (int) params[1];
		int pageSize = (int) params[2];
		AdmirationMap.deserialize();
		Set<Long> communityIDs = AdmirationMap.getAdmirCommunities(ID);
		List<String> memberIDs = new ArrayList<>(
				AdmirationMap.getAdmirMembers(ID));
		AdmirationMap.serialize();

		String cIDs = "";
		String oIDs = "";

		int hit = (int) Math.round(Math.random() * 10);
		if (hit >= HIT) {
			System.out.println("fetch interested posts hits");
			Transaction transaction = new RandomlyFetchCommunityTransaction();
			List<Map<String, Object>> results = (List<Map<String, Object>>) transaction
					.execute(BUCKETSIZE);
			for (Map<String, Object> result : results) {
				if ((int) result.get("postNum") == 0)
					continue;
				oIDs += result.get("ownerID") + ",";
				cIDs += result.get("ID") + ",";
			}
		}

		for (Long communityID : communityIDs) {
			cIDs += communityID + ",";
		}
		if (cIDs.endsWith(","))
			cIDs = cIDs.substring(0, cIDs.lastIndexOf(","));

		for (String memberID : memberIDs) {
			oIDs += memberID + ",";
		}
		if (oIDs.endsWith(","))
			oIDs = oIDs.substring(0, oIDs.lastIndexOf(","));

		String query = "";
		if (cIDs.length() > 0 && oIDs.length() > 0)
			query = "SELECT p FROM Post p WHERE p.available = 1 AND p.postType = model.modelType.PostType.NORMAL AND (p.owner.ID = ?1 OR p.owner IN(SELECT f FROM Member m JOIN m.followees f WHERE m.ID = ?1) OR (p.owner.ID IN ("
					+ oIDs
					+ ") AND p IN (SELECT po FROM Community c JOIN c.posts po WHERE c.ID IN ("
					+ cIDs + ")))) ORDER BY p.ID DESC";
		else
			query = "SELECT p FROM Post p WHERE p.available = 1 AND p.postType = model.modelType.PostType.NORMAL AND (p.owner.ID = ?1 OR p.owner IN(SELECT f FROM Member m JOIN m.followees f WHERE m.ID = ?1)) ORDER BY p.ID DESC";

		System.out.println(query);
		TypedQuery<Post> q = em.createQuery(query, Post.class);
		q.setParameter(1, ID);
		q.setFirstResult(startIndex);
		q.setMaxResults(pageSize);
		List<Post> posts = q.getResultList();
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		for (Post post : posts) {
			results.add(post.toRepresentation());
		}

		return results;
	}
}
