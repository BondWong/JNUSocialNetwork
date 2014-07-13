package transaction.DAODeleteTransaction;

import java.util.List;

import javax.persistence.EntityManager;

import persistence.DAO;
import transaction.DAOTransaction;

public class DeleteUnavailableModelTransaction extends DAOTransaction {
	static final int bucketSize = 10;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		List<Object> unavailableIDs = dao.combinedRead((String) params[0]);
		System.out.println(unavailableIDs);
		
		for (int i = 1, effectRowNums = 0; i <= unavailableIDs.size(); i += bucketSize) {
			try {
				effectRowNums = dao.delete((String) params[1],
						(Class) params[2], i - effectRowNums, i + bucketSize);
			} catch (Exception e) {
				System.out.println("Bond:" + e);
				System.out.println("Bond:" + (e.getCause() instanceof org.eclipse.persistence.exceptions.DatabaseException));
				if (e.getCause() instanceof org.eclipse.persistence.exceptions.DatabaseException)
					continue;
			}
		}

		return null;
	}

}
