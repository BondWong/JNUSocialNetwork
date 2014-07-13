package transaction.DAOFetchTransaction;

import javax.persistence.EntityManager;

import model.Model;
import persistence.DAO;
import transaction.DAOTransaction;

public class FetchModelTransaction extends DAOTransaction{

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Model model = dao.singleRead((String)params[0], (Class)params[1], params[2]);
		return model.toRepresentation();
	}

}
