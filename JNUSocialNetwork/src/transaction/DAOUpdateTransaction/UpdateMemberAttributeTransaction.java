package transaction.DAOUpdateTransaction;

import java.util.Map;

import model.Member;
import service.helper.MemberSearchMap;
import transaction.DAOTransaction;
import transaction.Transaction;

public class UpdateMemberAttributeTransaction implements Transaction {
	DAOTransaction transaction = new UpdateAttributeTransaction();

	@SuppressWarnings("unchecked")
	@Override
	public Object execute(Object... params) throws Exception {
		// TODO Auto-generated method stub
		MemberSearchMap.deserialize();
		String name = ((Map<String, String>)params[1]).get("name");
		MemberSearchMap.addRecord(name, (String) params[0]);
		String gender = ((Map<String, String>)params[1]).get("gender");
		MemberSearchMap.addRecord(gender, (String) params[0]);
		String lookingFor = ((Map<String, String>) params[1]).get("lookingFor");
		if (lookingFor != null && lookingFor != "")
			MemberSearchMap.addRecord(lookingFor, (String) params[0]);
		String relationship = ((Map<String, String>) params[1])
				.get("relationship");
		if (relationship != null && relationship != "")
			MemberSearchMap.addRecord(relationship, (String) params[0]);
		MemberSearchMap.serialize();
		return transaction.execute(Member.class, params[0], params[1]);
	}

}
