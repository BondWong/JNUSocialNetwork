package transaction.DAOCreateTransaction;

import javax.persistence.EntityManager;

import persistence.DAO;
import model.Model;
import model.factory.ModelFactory;
import transaction.DAOTransaction;

public class CreateModelTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Model model = ModelFactory.getInstance().create(params);
		dao.create(model);
		return model.toRepresentation();
	}

}
