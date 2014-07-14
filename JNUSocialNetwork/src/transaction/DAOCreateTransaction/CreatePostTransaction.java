package transaction.DAOCreateTransaction;

import javax.persistence.EntityManager;

import persistence.DAO;
import model.Member;
import model.Post;
import model.factory.ModelFactory;
import model.modelType.PostType;
import transaction.DAOTransaction;

public class CreatePostTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Member member = dao.get(Member.class, params[0]);
		Post post = ModelFactory.getInstance().create(Post.class, PostType.NORMAL, params[1], params[2]);
		member.createPost(post);
		dao.update(member);
		return post.toRepresentation();
	}

}
