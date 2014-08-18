package transaction.DAOFetchTransaction;

import javax.persistence.EntityManager;

import model.Account;
import model.Application;
import persistence.DAO;
import transaction.DAOTransaction;

public class DoesIDExistTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Application app = dao.singleRead("Application.fetchByID",
				Application.class, params[0]);
		Account account = dao.singleRead("Account.fetchByID", Account.class,
				params[0], null);
		if (app == null && account == null)
			return true;
		return false;
	}

}
