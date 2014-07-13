package transaction.DAOUpdateTransaction;

import javax.persistence.EntityManager;

import model.Community;
import persistence.DAO;
import transaction.DAOTransaction;

public class CommunityRemoveTagTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Community community = dao.get(Community.class, params[0]);
		community.removeTag((String)params[1]);
		dao.update(community);
		return community.toRepresentation();
	}

}
