package transaction.DAOCreateTransaction;

import javax.persistence.EntityManager;

import model.God;
import model.modelType.UserType;
import transaction.DAOTransaction;
import transaction.DAOFetchTransaction.FetchAccountTransaction;

public class RegisterGodTransaction extends DAOTransaction {
	DAOTransaction transaction;

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		transaction = new FetchAccountTransaction();
		if (transaction.execute("Account.fetchByIDAndUserType", params[0],
				UserType.GOD) == null) {
			transaction = new RegisterTransaction();
			return transaction.execute(God.class, params[0], params[1], null,
					UserType.GOD);
		} else
			return null;
	}

}
