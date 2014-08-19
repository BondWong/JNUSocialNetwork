package transaction.DAOCreateTransaction;

import javax.persistence.EntityManager;

import model.Application;
import persistence.DAO;
import transaction.DAOTransaction;

public class CreateApplicationTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Application application = new Application();
		application.init(params[0]);
		dao.create(application);
		return application.toRepresentation();
	}

}
