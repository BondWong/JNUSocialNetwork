package transaction.DAOCreateTransaction;

import javax.persistence.EntityManager;

import persistence.DAO;
import model.Community;
import model.Post;
import model.User;
import model.factory.ModelFactory;
import transaction.DAOTransaction;

public class CreatePostInCommunityTransaction extends DAOTransaction {

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		User user = dao.get((Class)params[2], params[0]);
		Community community = dao.get(Community.class, params[1]);
		Post post = ModelFactory.getInstance().create(Post.class, params[3],
				params[4], params[5]);
		user.createPost(community, post);
		dao.update(community);
		return post.toRepresentation();
	}

}
