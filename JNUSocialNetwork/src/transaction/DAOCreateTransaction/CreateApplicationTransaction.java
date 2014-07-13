package transaction.DAOCreateTransaction;

import javax.persistence.EntityManager;

import model.Application;
import model.Member;
import persistence.DAO;
import transaction.DAOTransaction;

public class CreateApplicationTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Application application = new Application();
		application.init(params[1]);
		Member member = dao.get(Member.class, params[0]);
		application.setApplicant(member);
		dao.create(application);
		return application.toRepresentation();
	}

}
