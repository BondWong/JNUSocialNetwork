package transaction.DAOUpdateTransaction;

import java.util.Map;

import javax.persistence.EntityManager;

import model.AttributeModel;
import model.Post;
import persistence.DAO;
import service.helper.ActivitySearchMap;
import transaction.DAOTransaction;

public class UpdatePostAttributeTransaction extends DAOTransaction {
	DAOTransaction transaction = new UpdateAttributeTransaction();

	@SuppressWarnings("unchecked")
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		AttributeModel model = dao.get(Post.class, params[1]);
		Map<String, String> attributes = (Map<String, String>) params[2];
		if (model.getAttribute("reminded").equals("false")) {
			Long startDate = Long.parseLong(attributes.get("startDate"));
			Long remindDate = Long.parseLong(attributes.get("remindDate"));
			if (startDate < remindDate
					|| (startDate - remindDate) < 12 * 60 * 60 * 1000)
				return model.toRepresentation();
			ActivitySearchMap.deserialize();
			ActivitySearchMap.addRecord((Long) params[1], remindDate);
			ActivitySearchMap.serialize();
			model.updateAttributes((Map<String, String>) params[2]);
			dao.update(model);
		}
		return model.toRepresentation();
	}

}
