package transaction.DAOUpdateTransaction;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManager;

import model.Application;
import model.Member;
import model.ServerSentEvent;
import model.factory.ModelFactory;
import model.modelType.SSEType;
import persistence.DAO;
import transaction.DAOTransaction;

public class RejectApplicationTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Application application = dao.get(Application.class, params[0]);
		Member member = application.getApplicant();

		Map<String, Object> reason = new HashMap<String, Object>();
		Map<String, Object> a = new HashMap<String, Object>();
		a.put("submitDate", application.toRepresentation().get("submitDate"));
		a.put("attributes", application.toRepresentation().get("attributes"));
		a.put("ID", application.toRepresentation().get("ID"));
		reason.put("application", a);
		reason.put("reason", params[1]);
		ServerSentEvent sse = ModelFactory.getInstance().create(
				ServerSentEvent.class, SSEType.APPLICATIONREJECTED, reason);
		member.addUnhandledEvent(sse);

		application.delete();
		application.clearAttributes();
		application.setApplicant(null);
		dao.update(member);
		dao.update(application);
		return null;
	}

}
