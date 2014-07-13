package transaction.DAOUpdateTransaction;

import javax.persistence.EntityManager;

import model.Account;
import persistence.DAO;
import transaction.DAOTransaction;

public class UpdateAccountTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		dao.update((Account)params[0]);
		return null;
	}

}
