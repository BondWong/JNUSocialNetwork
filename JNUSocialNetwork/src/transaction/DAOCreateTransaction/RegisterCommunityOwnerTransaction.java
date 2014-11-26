package transaction.DAOCreateTransaction;

import helper.serviceHelper.NumberManager;
import helper.serviceHelper.searchHelper.MemberSearchMap;

import java.util.Map;

import javax.persistence.EntityManager;

import model.Member;
import model.modelType.UserType;
import transaction.DAOTransaction;

public class RegisterCommunityOwnerTransaction extends DAOTransaction {
	DAOTransaction transaction = new RegisterTransaction();

	@SuppressWarnings("unchecked")
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		NumberManager.incrementMemberNum();
		MemberSearchMap.deserialize();
		String name = ((Map<String, String>) params[2]).get("name");
		MemberSearchMap.addRecord(name, (String) params[0]);
		MemberSearchMap.serialize();
		((Map<String, String>) params[2]).put("telnum", (String) params[0]);
		return transaction.execute(Member.class, params[0], params[1],
				params[2], UserType.COMMUNITYOWNER);
	}

}
