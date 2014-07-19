package transaction.DAOUpdateTransaction.DAODeleteTransaction;

import javax.persistence.EntityManager;

import model.Account;
import model.Comment;
import model.Member;
import model.Post;
import persistence.DAO;
import transaction.DAOTransaction;
import utils.MemberNumManager;

public class DeleteMemberTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Account account = dao.get(Account.class, params[0]);
		account.delete();
		Member member = dao.get(Member.class, params[0]);
		for (Post post : member.getCreatedPosts()) {
			for (Comment comment : post.getComments()) {
				comment.delete();
				comment.clearAttributes();
				comment.clearLikers();
				comment.setOwner(null);
				dao.update(comment);
			}
			post.clearAttributes();
			post.clearCollectors();
			post.clearComments();
			post.clearImageLinks();
			post.clearLikers();
			post.clearParticipants();
			post.delete();
			post.setOwner(null);
			dao.update(post);
		}
		member.clearAttributes();
		member.clearCollectPost();
		member.clearFollowees();
		member.clearFollowers();
		member.clearImageLinks();
		member.clearJoinedCommunities();
		member.clearCreatedPosts();
		member.clearUnhandledEvents();
		member.delete();
		dao.update(member);
		dao.update(account);
		MemberNumManager.decrement();
		return member;
	}

}
