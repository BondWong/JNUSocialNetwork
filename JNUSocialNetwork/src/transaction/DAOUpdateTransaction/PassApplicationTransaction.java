package transaction.DAOUpdateTransaction;

import helper.serviceHelper.sendEmailHelper.EmailSender;
import helper.serviceHelper.sendEmailHelper.EmailType;

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

		String id = application.getAttribute("ID");
		String password = application.getAttribute("password");
		String email = application.getAttribute("email");

		String content = "ID:"
				+ id
				+ "\npassword:"
				+ password
				+ "\nPlease login using this link: http://218.244.137.34/pages/login.jsp";
		new EmailSender().send("Your application passed!", content, email, EmailType.TEXT);

		account.setID(id);
		account.setPassword(MD5.toMD5Code(password));
		account.setUserType(UserType.COMMUNITYOWNER);

		Map<String, String> attributes = application.getAttributes();
		attributes.remove("ID");
		attributes.remove("password");
		Member communityOwner = ModelFactory.getInstance().create(Member.class,
				account.getID(), account.getPassword(),
				UserType.COMMUNITYOWNER, attributes);

		application.delete();
		application.clearAttributes();
		dao.update(application);
		System.out.println("deleted");
		dao.create(communityOwner);
		System.out.println("created communityOwner");
		dao.create(account);
		System.out.println("created account");

		return null;
	}

}
