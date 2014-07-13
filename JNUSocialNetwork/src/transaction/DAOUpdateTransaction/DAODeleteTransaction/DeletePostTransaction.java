package transaction.DAOUpdateTransaction.DAODeleteTransaction;

import javax.persistence.EntityManager;

import model.Comment;
import model.Post;
import persistence.DAO;
import transaction.DAOTransaction;

public class DeletePostTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Post post = dao.get(Post.class, params[0]);
		for(Comment comment : post.getComments()) {
			comment.delete();
			comment.clearAttributes();
			comment.clearLikers();
			comment.setOwner(null);
			dao.update(comment);
		}
		post.delete();
		post.clearAttributes();
		post.clearCollectors();
		post.clearComments();
		post.clearImageLinks();
		post.clearLikers();
		post.clearParticipants();
		post.setOwner(null);
		dao.update(post);
		return post;
	}

}
