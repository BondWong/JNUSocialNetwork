package transaction.DAOCreateTransaction;

import javax.persistence.EntityManager;

import persistence.DAO;
import model.Community;
import model.CommunityOwner;
import model.Post;
import model.factory.ModelFactory;
import transaction.DAOTransaction;

public class CreatePostInCommunityTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		CommunityOwner owner = dao.get(CommunityOwner.class, params[0]);
		Community community = dao.get(Community.class, params[1]);
		Post post = ModelFactory.getInstance().create(Post.class, params[2],
				params[3], params[4]);
		owner.createActivity(community, post);
		dao.update(community);
		return post.toRepresentation();
	}

}
