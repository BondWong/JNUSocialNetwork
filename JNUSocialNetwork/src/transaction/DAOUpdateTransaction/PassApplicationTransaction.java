package transaction.DAOUpdateTransaction;

import java.util.Map;

import javax.persistence.EntityManager;

import model.Account;
import model.Application;
import model.Member;
import model.factory.ModelFactory;
import model.modelType.UserType;
import persistence.DAO;
import transaction.DAOTransaction;
import utils.MD5;

public class PassApplicationTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Application application = dao.get(Application.class, params[0]);
		Account account = new Account();
		account.setID(application.getAttribute("ID"));
		account.setPassword(MD5.toMD5Code(application.getAttribute("password")));
		account.setUserType(UserType.COMMUNITYOWNER);

		Map<String, String> attributes = application.getAttributes();
		attributes.remove("ID");
		attributes.remove("password");
		Member communityOwner = ModelFactory.getInstance().create(Member.class,
				account.getID(), account.getPassword(),
				UserType.COMMUNITYOWNER, attributes);

		System.out.println("email him:" + application.getAttribute("email"));

		application.delete();
		application.clearAttributes();
		dao.update(application);
		dao.create(communityOwner);
		dao.create(account);
		return null;
	}

}
