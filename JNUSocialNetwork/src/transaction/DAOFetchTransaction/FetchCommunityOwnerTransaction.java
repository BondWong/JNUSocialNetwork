package transaction.DAOFetchTransaction;

import javax.persistence.EntityManager;

import model.CommunityOwner;
import persistence.DAO;
import transaction.DAOTransaction;

public class FetchCommunityOwnerTransaction extends DAOTransaction {
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		CommunityOwner owner = dao.singleRead("CommunityOwner.fetchByID", CommunityOwner.class, params[0]);
		return owner.toRepresentation();
	}

}
