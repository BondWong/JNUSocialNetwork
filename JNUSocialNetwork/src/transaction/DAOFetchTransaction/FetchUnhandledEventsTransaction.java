package transaction.DAOFetchTransaction;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import model.ServerSentEvent;
import persistence.DAO;
import transaction.DAOTransaction;

public class FetchUnhandledEventsTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		List<ServerSentEvent> sses = dao.read("ServerSentEvent.fetchUnhandled", ServerSentEvent.class, params[0]);
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		for(ServerSentEvent sse : sses) {
			results.add(sse.toRepresentation());
		}
		return results;
	}

}
