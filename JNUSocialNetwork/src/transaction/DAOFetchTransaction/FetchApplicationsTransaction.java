package transaction.DAOFetchTransaction;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import model.Application;
import persistence.DAO;
import transaction.DAOTransaction;

public class FetchApplicationsTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		List<Application> applications = dao.read("Application.fetch", (int)params[0], (int)params[1], Application.class);
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		for(Application application : applications) {
			results.add(application.toRepresentation());
		}
		return results;
	}

}
