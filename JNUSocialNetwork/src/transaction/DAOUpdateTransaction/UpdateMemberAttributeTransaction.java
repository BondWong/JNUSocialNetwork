package transaction.DAOUpdateTransaction;

import java.util.Map;

import model.Member;
import service.helper.SearchMap;
import transaction.DAOTransaction;
import transaction.Transaction;

public class UpdateMemberAttributeTransaction implements Transaction {
	DAOTransaction transaction = new UpdateAttributeTransaction();

	@SuppressWarnings("unchecked")
	@Override
	public Object execute(Object... params) throws Exception {
		// TODO Auto-generated method stub
		SearchMap.deserialize();
		String name = ((Map<String, String>)params[1]).get("name");
		SearchMap.addRecord(name, (String) params[0]);
		String gender = ((Map<String, String>)params[1]).get("gender");
		SearchMap.addRecord(gender, (String) params[0]);
		String lookingFor = ((Map<String, String>) params[1]).get("lookingFor");
		if (lookingFor != null && lookingFor != "")
			SearchMap.addRecord(lookingFor, (String) params[0]);
		String relationship = ((Map<String, String>) params[1])
				.get("relationship");
		if (relationship != null && relationship != "")
			SearchMap.addRecord(relationship, (String) params[0]);
		SearchMap.serialize();
		return transaction.execute(Member.class, params[0], params[1]);
	}

}
