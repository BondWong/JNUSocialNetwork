package transaction.DAOUpdateTransaction.DAODeleteTransaction;

import javax.persistence.EntityManager;

import model.Comment;
import model.Post;
import persistence.DAO;
import transaction.DAOTransaction;

public class DeleteCommentTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Post post = dao.get(Post.class, params[0]);
		Comment comment = dao.get(Comment.class, params[1]);
		comment.setOwner(null);
		comment.clearLikers();
		comment.clearAttributes();
		comment.delete();
		post.removeComment(comment);
		dao.update(comment);
		dao.update(post);
		return comment;
	}

}
