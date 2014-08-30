package transaction.DAOUpdateTransaction;

import javax.persistence.EntityManager;

import persistence.DAO;
import model.Community;
import model.Member;
import transaction.DAOTransaction;

public class RemoveCommunityMemberTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Member co = dao.get(Member.class, params[0]);
		Member member = dao.get(Member.class, params[1]);
		Community community = dao.get(Community.class, params[2]);
		co.removeMember(community, member);
		dao.update(member);
		dao.update(community);
		return community.toRepresentation();
	}

}
