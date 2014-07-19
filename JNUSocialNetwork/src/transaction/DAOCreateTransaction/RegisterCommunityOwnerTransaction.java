package transaction.DAOCreateTransaction;

import javax.persistence.EntityManager;

import model.CommunityOwner;
import model.modelType.UserType;
import transaction.DAOTransaction;

public class RegisterCommunityOwnerTransaction extends DAOTransaction{
	DAOTransaction transaction = new RegisterTransaction();
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		return transaction.execute(CommunityOwner.class, params[0], params[1], null, UserType.COMMUNITYOWNER);
	}

}
