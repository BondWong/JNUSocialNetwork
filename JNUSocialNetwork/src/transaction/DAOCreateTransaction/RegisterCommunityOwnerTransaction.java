package transaction.DAOCreateTransaction;

import java.util.Map;

import javax.persistence.EntityManager;

import model.Member;
import model.modelType.UserType;
import service.helper.MemberSearchMap;
import transaction.DAOTransaction;
import utils.MemberNumManager;

public class RegisterCommunityOwnerTransaction extends DAOTransaction {
	DAOTransaction transaction = new RegisterTransaction();

	@SuppressWarnings("unchecked")
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		MemberNumManager.increment();
		MemberSearchMap.deserialize();
		String name = ((Map<String, String>) params[2]).get("name");
		MemberSearchMap.addRecord(name, (String) params[0]);
		MemberSearchMap.serialize();
		return transaction.execute(Member.class, params[0], params[1],
				params[2], UserType.COMMUNITYOWNER);
	}

}
