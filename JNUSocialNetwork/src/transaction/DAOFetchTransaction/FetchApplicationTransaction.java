package transaction.DAOFetchTransaction;

import javax.persistence.EntityManager;

import model.Application;
import persistence.DAO;
import transaction.DAOTransaction;

public class FetchApplicationTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Application application = dao.singleRead("Application.fetchByID", Application.class, params[0]);
		return application.toRepresentation();
	}

}
