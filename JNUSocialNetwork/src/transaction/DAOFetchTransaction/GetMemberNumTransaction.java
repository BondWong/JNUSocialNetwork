package transaction.DAOFetchTransaction;

import javax.persistence.EntityManager;

import persistence.DAO;
import transaction.DAOTransaction;

public class GetMemberNumTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		return dao.combinedRead("Member.size").get(0);
	}

}
