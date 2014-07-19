package transaction.DAOCreateTransaction;

import javax.persistence.EntityManager;

import persistence.DAO;
import transaction.DAOTransaction;
import utils.MD5;
import model.Account;
import model.User;
import model.factory.ModelFactory;
import model.modelType.UserType;

public class RegisterTransaction extends DAOTransaction{

	@SuppressWarnings("rawtypes")
	@Override
	protected Object process(EntityManager em, Object...params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		String ID = (String) params[1];
		String password = (String) params[2];
		password = MD5.toMD5Code(password);
		
		User user = ModelFactory.getInstance().create((Class)params[0], ID, password, params[3]);
		Account account = new Account();
		account.setID(ID);
		account.setPassword(password);
		account.setUserType((UserType)params[4]);
		
		dao.create(user);
		dao.create(account);
		
		return user.toRepresentation();
	}

}
