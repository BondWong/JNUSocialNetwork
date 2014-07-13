package transaction.DAOCreateTransaction;

import javax.persistence.EntityManager;

import model.Comment;
import model.Member;
import model.Post;
import model.factory.ModelFactory;
import persistence.DAO;
import transaction.DAOTransaction;

public class CreateCommentTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Member member = dao.get(Member.class, params[0]);
		Post post = dao.get(Post.class, params[1]);
		Comment comment = ModelFactory.getInstance().create(Comment.class, params[2]);
		member.createComment(post, comment);
		dao.update(post);
		return comment.toRepresentation();
	}

}
