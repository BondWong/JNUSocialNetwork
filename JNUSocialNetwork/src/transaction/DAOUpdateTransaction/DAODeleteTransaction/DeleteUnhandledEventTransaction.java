package transaction.DAOUpdateTransaction.DAODeleteTransaction;

import javax.persistence.EntityManager;

import model.Member;
import model.ServerSentEvent;
import persistence.DAO;
import transaction.DAOTransaction;

public class DeleteUnhandledEventTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Member member = dao.get(Member.class, params[0]);
		for (ServerSentEvent sse : member.getUnhandledEvents()) {
			if (sse.getID().equals(params[1])) {
				sse.delete();
				member.removeUnhandledEvent(sse);
				dao.update(sse);
				break;
			}
		}
		dao.update(member);
		return member.toRepresentation();
	}

}
