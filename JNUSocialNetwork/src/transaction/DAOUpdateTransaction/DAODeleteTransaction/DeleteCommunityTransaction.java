package transaction.DAOUpdateTransaction.DAODeleteTransaction;

import javax.persistence.EntityManager;

import model.Comment;
import model.Community;
import model.Post;
import persistence.DAO;
import transaction.DAOTransaction;
import utils.NumberManager;

public class DeleteCommunityTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Community community = dao.get(Community.class, params[0]);
		for (Post post : community.getPosts()) {
			for (Comment comment : post.getComments()) {
				comment.delete();
				comment.clearAttributes();
				comment.clearLikers();
				comment.setOwner(null);
				dao.update(comment);
			}
			post.setOwner(null);
			post.delete();
			post.clearAttributes();
			post.clearCollectors();
			post.clearComments();
			post.clearImageLinks();
			post.clearLikers();
			post.clearParticipants();
			dao.update(post);
		}
		community.setOwner(null);
		community.clearAttributes();
		community.clearMembers();
		community.clearPosts();
		community.clearTags();
		community.delete();
		dao.update(community);
		NumberManager.decrementCommunityNum();
		return community;
	}

}
