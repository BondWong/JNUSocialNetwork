package transaction.DAOFetchTransaction;

import javax.persistence.EntityManager;

import model.Account;
import persistence.DAO;
import transaction.DAOTransaction;

public class FetchAccountTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		return dao.singleRead((String) params[0], Account.class, params[1], params[2]);
	}

}
