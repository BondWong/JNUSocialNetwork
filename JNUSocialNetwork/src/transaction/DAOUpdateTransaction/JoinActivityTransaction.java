package transaction.DAOUpdateTransaction;

import javax.persistence.EntityManager;

import model.Member;
import model.Post;
import persistence.DAO;
import transaction.DAOTransaction;

public class JoinActivityTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Member member = dao.get(Member.class, params[0]);
		Post post = dao.get(Post.class, params[1]);
		member.joinActivity(post);
		dao.update(post);
		return post.toRepresentation();
	}

}
