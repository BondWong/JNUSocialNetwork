package transaction.DAOUpdateTransaction;

import javax.persistence.EntityManager;

import model.Comment;
import model.Member;
import persistence.DAO;
import transaction.DAOTransaction;

public class CancelLikeCommentTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Member member = dao.get(Member.class, params[0]);
		Comment comment = dao.get(Comment.class, params[1]);
		member.cancelLikeComment(comment);
		dao.update(comment);
		return comment.toRepresentation();
	}

}
