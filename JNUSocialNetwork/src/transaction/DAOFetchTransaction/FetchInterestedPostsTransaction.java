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

public class FetchInterestedPostsTransaction extends DAOTransaction {

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
		for (Long communityID : communityIDs) {
			cIDs += communityID + ",";
		}
		if (cIDs.endsWith(","))
			cIDs = cIDs.substring(0, cIDs.lastIndexOf(","));

		String mIDs = "";
		for (String memberID : memberIDs) {
			mIDs += memberID + ",";
		}
		if (mIDs.endsWith(","))
			mIDs = mIDs.substring(0, mIDs.lastIndexOf(","));

		String query = "SELECT p FROM Post p WHERE p.available = 1 AND p.postType = model.modelType.PostType.NORMAL AND (p.owner.ID = ?1 OR p.owner IN(SELECT f FROM Member m JOIN m.followees f WHERE m.ID = ?1) OR (p.owner.ID IN ("
				+ mIDs
				+ ") AND p IN (SELECT po FROM Community c JOIN c.posts po WHERE c.ID IN ("
				+ cIDs + ")))) ORDER BY p.ID DESC";

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
