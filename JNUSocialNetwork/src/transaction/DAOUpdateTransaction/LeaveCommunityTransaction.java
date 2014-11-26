package transaction.DAOUpdateTransaction;

import helper.serviceHelper.searchHelper.AdmirationMap;

import javax.persistence.EntityManager;

import model.Community;
import model.Member;
import persistence.DAO;
import transaction.DAOTransaction;

public class LeaveCommunityTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Member member = dao.get(Member.class, params[0]);
		Community community = dao.get(Community.class, params[1]);
		member.leaveCommunity(community);
		dao.update(member);
		dao.update(community);
		AdmirationMap.deserialize();
		AdmirationMap.removeRecord(member.getID(), community.getID());
		AdmirationMap.serialize();
		return community.toRepresentation();
	}

}
