package transaction.DAOCreateTransaction;

import javax.persistence.EntityManager;

import model.Member;
import model.modelType.UserType;
import transaction.DAOTransaction;
import utils.MemberNumManager;

public class RegisterMemberTransaction extends DAOTransaction {
	DAOTransaction transaction = new RegisterTransaction();

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		MemberNumManager.increment();
		return transaction.execute(Member.class, params[0], params[1], params[2], UserType.MEMBER);
		
	}

}
