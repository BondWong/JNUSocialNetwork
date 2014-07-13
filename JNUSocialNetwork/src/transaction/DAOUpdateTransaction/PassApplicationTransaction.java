package transaction.DAOUpdateTransaction;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManager;

import model.Account;
import model.CommunityOwner;
import model.Application;
import model.Member;
import model.ServerSentEvent;
import model.factory.ModelFactory;
import model.modelType.SSEType;
import model.modelType.UserType;
import persistence.DAO;
import transaction.DAOTransaction;

public class PassApplicationTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Application application = dao.get(Application.class, params[0]);
		Member member = application.getApplicant();
		Account account = new Account();
		account.setID(System.currentTimeMillis() + "");
		account.setPassword(application.getAttribute("password"));
		account.setUserType(UserType.COMMUNITYOWNER);
		CommunityOwner communityOwner = ModelFactory.getInstance().create(CommunityOwner.class, account.getID(), account.getPassword());
		
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("application", application.toRepresentation());
		data.put("communityOwner", communityOwner.toRepresentation());
		ServerSentEvent event = ModelFactory.getInstance().create(ServerSentEvent.class, SSEType.APPLICATIONPASSED, data);
		member.addUnhandledEvent(event);
		
		application.delete();
		application.clearAttributes();
		application.setApplicant(null);
		dao.update(application);
		dao.update(member);
		dao.create(communityOwner);
		dao.create(account);
		return null;
	}

}
