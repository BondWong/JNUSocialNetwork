package transaction.DAOFetchTransaction;

import javax.persistence.EntityManager;

import model.Community;
import persistence.DAO;
import transaction.DAOTransaction;

public class FetchCommunityTransaction extends DAOTransaction{
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Community community = dao.singleRead("Community.fetchByID", Community.class, params[0]);
		return community.toRepresentation();
	}
	
}
