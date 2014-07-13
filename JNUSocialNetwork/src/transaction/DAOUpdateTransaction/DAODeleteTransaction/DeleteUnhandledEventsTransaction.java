package transaction.DAOUpdateTransaction.DAODeleteTransaction;

import javax.persistence.EntityManager;

import model.Member;
import model.ServerSentEvent;
import persistence.DAO;
import transaction.DAOTransaction;

public class DeleteUnhandledEventsTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Member member = dao.get(Member.class, params[0]);
		for(ServerSentEvent sse : member.getUnhandledEvents()) {
			sse.delete();
			dao.update(sse);
		}
		member.clearUnhandledEvents();
		dao.update(member);
		return member.toRepresentation();
	}

}
