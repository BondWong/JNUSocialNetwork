package transaction.DAOUpdateTransaction;

import javax.persistence.EntityManager;

import model.Community;
import model.Member;
import persistence.DAO;
import transaction.DAOTransaction;

public class JoinCommunityTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Member member = dao.get(Member.class, params[0]);
		Community community = dao.get(Community.class, params[1]);
		member.joinCommunity(community);
		dao.update(member);
		dao.update(community);
		return community.toRepresentation();
	}

}
