package transaction.DAOUpdateTransaction;

import helper.serviceHelper.ActivitySearchMap;

import java.util.Map;

import javax.persistence.EntityManager;

import model.AttributeModel;
import model.Post;
import persistence.DAO;
import transaction.DAOTransaction;
import utils.ConstantValue;

public class UpdatePostAttributeTransaction extends DAOTransaction {
	DAOTransaction transaction = new UpdateAttributeTransaction();

	@SuppressWarnings("unchecked")
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		AttributeModel model = dao.get(Post.class, params[0]);
		Map<String, String> attributes = (Map<String, String>) params[1];
		if (model.getAttribute("reminded").equals("false")) {
			Long startDate = Long.parseLong(attributes.get("startDate"));
			Long remindDate = Long.parseLong(attributes.get("remindDate"));
			if (startDate < remindDate
					|| (startDate - remindDate) < ConstantValue.ACTIVITYINTERVAL)
				return model.toRepresentation();

			if (Long.parseLong(model.getAttribute("remindDate")) == ConstantValue.NONREMINDABLEMARK)
				attributes.put("remindDate", ""
						+ ConstantValue.NONREMINDABLEMARK);
			else {
				ActivitySearchMap.deserialize();
				ActivitySearchMap.addRecord((Long) params[0], remindDate);
				ActivitySearchMap.serialize();
			}
			model.updateAttributes((Map<String, String>) params[1]);
			dao.update(model);
		}
		return model.toRepresentation();
	}

}
