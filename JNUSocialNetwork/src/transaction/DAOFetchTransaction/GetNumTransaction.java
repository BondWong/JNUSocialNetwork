package transaction.DAOFetchTransaction;

import javax.persistence.EntityManager;

import persistence.DAO;
import transaction.DAOTransaction;

public class GetNumTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);

		Object[] p = new Object[params.length - 1];
		for (int i = 1; i < params.length; i++)
			p[i - 1] = params[i];

		return dao.combinedRead((String) params[0], p).get(0);
	}

}
