package transaction.DAOFetchTransaction;

import javax.persistence.EntityManager;

import persistence.DAO;
import model.CommunityOwner;
import transaction.DAOTransaction;

public class GetCommunityOwnerIDStatusTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		return (dao.singleRead("CommunityOwner.fetchByID",
				CommunityOwner.class, params[0]) == null);
	}

}
