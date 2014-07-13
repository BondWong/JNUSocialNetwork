package transaction.DAOCreateTransaction;

import java.util.HashMap;

import javax.persistence.EntityManager;

import persistence.DAO;
import transaction.DAOTransaction;
import utils.MD5;
import model.Account;
import model.Member;
import model.factory.ModelFactory;
import model.modelType.UserType;

public class RegisterTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object...params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		String ID = (String) params[0];
		String password = (String) params[1];
		password = MD5.toMD5Code(password);
		
		Member member = ModelFactory.getInstance().create(Member.class, ID, password, new HashMap<String, String>());
		Account account = new Account();
		account.setID(ID);
		account.setPassword(password);
		account.setUserType(UserType.MEMBER);
		
		dao.create(member);
		dao.create(account);
		
		return null;
	}

}
