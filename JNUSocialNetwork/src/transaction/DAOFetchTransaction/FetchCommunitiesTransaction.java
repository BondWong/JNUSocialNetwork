package transaction.DAOFetchTransaction;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import model.Community;
import persistence.DAO;
import transaction.DAOTransaction;

public class FetchCommunitiesTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		List<Community> communities = dao.read((String)params[0], (int)params[3], (int)params[4], Community.class, params[1], params[2]);
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		for(Community community : communities) {
			results.add(community.toRepresentation());
		}
		return results;
	}

}
