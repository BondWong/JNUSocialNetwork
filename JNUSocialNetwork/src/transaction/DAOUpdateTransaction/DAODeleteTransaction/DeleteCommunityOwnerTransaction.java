package transaction.DAOUpdateTransaction.DAODeleteTransaction;

import javax.persistence.EntityManager;

import model.Account;
import model.Comment;
import model.Community;
import model.CommunityOwner;
import model.Post;
import persistence.DAO;
import transaction.DAOTransaction;

public class DeleteCommunityOwnerTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		CommunityOwner communityOwner = dao.get(CommunityOwner.class, params[0]);
		Account account = dao.get(Account.class, params[0]);
		account.delete();
		for(Community community : communityOwner.getCommunities()) {
			for(Post post : community.getPosts()) {
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
			}
			community.setOwner(null);
			community.clearAttributes();
			community.clearMembers();
			community.clearPosts();
			community.clearTags();
			community.setOwner(null);
			community.delete();
			dao.update(community);
		}
		communityOwner.clearCommunities();
		communityOwner.delete();
		dao.update(communityOwner);
		return communityOwner;
	}

}
