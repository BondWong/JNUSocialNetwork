package transaction.DAOUpdateTransaction.DAODeleteTransaction;

import javax.persistence.EntityManager;

import model.Comment;
import model.Community;
import model.Member;
import model.Post;
import persistence.DAO;
import service.helper.CommunitySearchMap;
import service.helper.NumberManager;
import transaction.DAOTransaction;

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
			for (Member member : post.getParticipants())
				member.leaveActivity(post);
			post.clearParticipants();
			dao.update(post);
		}
		community.setOwner(null);
		CommunitySearchMap.deserialize();
		CommunitySearchMap.removeRecord(community.getAttribute("name"),
				params[0] + "");
		CommunitySearchMap.serialize();
		community.clearAttributes();
		for (Member member : community.getMembers()) {
			member.leaveCommunity(community);
		}
		community.clearMembers();
		community.clearPosts();
		community.clearTags();
		community.delete();
		dao.update(community);
		NumberManager.decrementCommunityNum();
		return community;
	}

}
