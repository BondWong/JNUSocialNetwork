package transaction.DAOCreateTransaction;

import java.util.Map;

import javax.persistence.EntityManager;

import model.Member;
import model.modelType.UserType;
import service.helper.SearchMap;
import transaction.DAOTransaction;
import utils.MemberNumManager;

public class RegisterMemberTransaction extends DAOTransaction {
	DAOTransaction transaction = new RegisterTransaction();

	@SuppressWarnings("unchecked")
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		MemberNumManager.increment();
		SearchMap.deserialize();
		String name = ((Map<String, String>)params[2]).get("name");
		SearchMap.addRecord(name, (String) params[0]);
		String gender = ((Map<String, String>)params[2]).get("gender");
		SearchMap.addRecord(gender, (String) params[0]);
		SearchMap.serialize();
		return transaction.execute(Member.class, params[0], params[1], params[2], UserType.MEMBER);
		
	}

}
