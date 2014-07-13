package transaction.DAOUpdateTransaction;

import java.util.Map;

import javax.persistence.EntityManager;

import model.AttributeModel;
import persistence.DAO;
import transaction.DAOTransaction;

public class UpdateAttributeTransaction extends DAOTransaction{

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		AttributeModel model = dao.get((Class)params[0], params[1]);
		model.updateAttributes((Map<String, String>)params[2]);
		dao.create(model);
		return model.toRepresentation();
	}
}
