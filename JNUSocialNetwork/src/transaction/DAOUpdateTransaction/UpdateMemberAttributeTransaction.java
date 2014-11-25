package transaction.DAOUpdateTransaction;

import helper.serviceHelper.searchHelper.MemberSearchMap;

import java.util.Map;

import javax.persistence.EntityManager;

import model.AttributeModel;
import model.Member;
import persistence.DAO;
import transaction.DAOTransaction;

public class UpdateMemberAttributeTransaction extends DAOTransaction {
	DAOTransaction transaction = new UpdateAttributeTransaction();

	@SuppressWarnings({ "unchecked" })
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		AttributeModel model = dao.get(Member.class, params[0]);
		MemberSearchMap.deserialize();
		String name = ((Map<String, String>) params[1]).get("name");
		MemberSearchMap.addRecord(name, (String) params[0]);
		String gender = ((Map<String, String>) params[1]).get("gender");
		MemberSearchMap.addRecord(gender, (String) params[0]);
		String lookingFor = ((Map<String, String>) params[1]).get("lookingFor");
		if (lookingFor != null && lookingFor != "") {
			MemberSearchMap.removeRecord(model.getAttribute("lookingFor"),
					(String) params[0]);
			MemberSearchMap.addRecord(lookingFor, (String) params[0]);
		}
		String relationship = ((Map<String, String>) params[1])
				.get("relationship");
		if (relationship != null && relationship != "") {
			MemberSearchMap.removeRecord(model.getAttribute("relationship"),
					(String) params[0]);
			MemberSearchMap.addRecord(relationship, (String) params[0]);
		}
		MemberSearchMap.serialize();
		model.updateAttributes((Map<String, String>) params[1]);
		dao.update(model);
		return model.toRepresentation();
	}

}
