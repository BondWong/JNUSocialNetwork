package transaction.DAOCreateTransaction;

import javax.persistence.EntityManager;

import model.Member;
import model.ServerSentEvent;
import persistence.DAO;
import transaction.DAOTransaction;

public class CreateUnhandledEventsTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Member member = dao.get(Member.class, params[0]);
		ServerSentEvent sse = (ServerSentEvent) params[1];
		member.addUnhandledEvent(sse);
		dao.update(member);
		return member.toRepresentation();
	}

}
