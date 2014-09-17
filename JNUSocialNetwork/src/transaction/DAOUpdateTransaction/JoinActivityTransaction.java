package transaction.DAOUpdateTransaction;

import javax.persistence.EntityManager;

import model.Member;
import model.Post;
import persistence.DAO;
import transaction.DAOTransaction;

public class JoinActivityTransaction extends DAOTransaction {
	private static final int MAXIMUM = 1000;

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Member member = dao.get(Member.class, params[0]);
		Post post = dao.get(Post.class, params[1]);
		int limitation = Integer.parseInt(post.getAttribute("limitation"));
		int currentParticipantNum = post.getParticipants().size();
		if (limitation > MAXIMUM)
			limitation = MAXIMUM;
		if (currentParticipantNum < limitation) {
			member.joinActivity(post);
			dao.update(post);
		}
		return post.toRepresentation();
	}

}
