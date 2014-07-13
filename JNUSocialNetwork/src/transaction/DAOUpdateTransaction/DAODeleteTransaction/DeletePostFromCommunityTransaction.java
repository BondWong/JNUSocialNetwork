package transaction.DAOUpdateTransaction.DAODeleteTransaction;

import javax.persistence.EntityManager;

import model.Comment;
import model.Community;
import model.Post;
import persistence.DAO;
import transaction.DAOTransaction;

public class DeletePostFromCommunityTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Community community = dao.get(Community.class, params[0]);
		Post post = dao.get(Post.class, params[1]);
		for(Comment comment : post.getComments()) {
			comment.delete();
			comment.setOwner(null);
			comment.clearAttributes();
			comment.clearLikers();
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
		community.removePost(post);
		dao.update(post);
		dao.update(community);
		return post;
	}

}
