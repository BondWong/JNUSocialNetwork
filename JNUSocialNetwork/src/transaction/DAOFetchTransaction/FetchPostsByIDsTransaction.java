package transaction.DAOFetchTransaction;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import model.Post;
import transaction.DAOTransaction;

public class FetchPostsByIDsTransaction extends DAOTransaction{
	
	@SuppressWarnings("unchecked")
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		List<Long> postIDs = (List<Long>) params[0];
		String query = "SELECT p FROM Post p WHERE p.ID IN ";
		query = query + "(";
		
		Iterator<Long> iter = postIDs.iterator();
		while(iter.hasNext()){
			query = query + iter.next();
			if(iter.hasNext())
				query = query + ",";
		}
		
		query = query + ")";
		
		TypedQuery<Post> q = em.createQuery(query, Post.class);
		List<Post> posts = q.getResultList();
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		for(Post post : posts) {
			results.add(post.toRepresentation());
		}
		
		return results;
	}
}
