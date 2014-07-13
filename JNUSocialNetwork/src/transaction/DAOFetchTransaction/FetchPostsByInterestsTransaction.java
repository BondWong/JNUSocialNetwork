package transaction.DAOFetchTransaction;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import model.Post;
import persistence.DAO;
import transaction.DAOTransaction;

public class FetchPostsByInterestsTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		List<Post> posts1 = dao.read("Post.fetchByJoinedCommunity", (int)params[1], (int)params[2], Post.class, params[0]);
		List<Post> posts2 = dao.read("Post.fetchByFollowee", (int)params[1], (int)params[2], Post.class, params[0]);
		posts1.addAll(posts2);
		posts1.sort(new Comparator<Post>() {

			@Override
			public int compare(Post p1, Post p2) {
				// TODO Auto-generated method stub
				return -p1.getPublishDate().compareTo(p2.getPublishDate());
			}
			
		});
		posts1 = posts1.subList(0, 5);
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		for(Post post : posts1) {
			results.add(post.toRepresentation());
		}
		return results;
	}

}
