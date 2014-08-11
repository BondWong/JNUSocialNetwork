package transaction.DAOCreateTransaction;

import java.util.Map;

import javax.persistence.EntityManager;

import persistence.DAO;
import model.Community;
import model.Post;
import model.User;
import model.factory.ModelFactory;
import model.modelType.PostType;
import service.helper.ActivityMap;
import transaction.DAOTransaction;

public class CreatePostInCommunityTransaction extends DAOTransaction {

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		System.out.println(params[0]);
		System.out.println(params[1]);
		DAO dao = new DAO(em);
		User user = dao.get((Class) params[2], params[0]);
		Community community = dao.get(Community.class, params[1]);
		Post post = ModelFactory.getInstance().create(Post.class, params[3],
				params[4], params[5]);
		user.createPost(community, post);
		dao.update(community);
		if (params[3].equals(PostType.ACTIVITY)) {
			ActivityMap.deserialize();
			ActivityMap.addRecord(post.getID(), Long
					.parseLong((String) ((Map<String, Object>) params[4])
							.get("startDate")));
			ActivityMap.serialize();
		}

		return post.toRepresentation();
	}

}
