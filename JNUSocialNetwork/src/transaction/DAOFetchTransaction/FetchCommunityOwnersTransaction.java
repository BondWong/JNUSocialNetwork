package transaction.DAOFetchTransaction;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import model.CommunityOwner;
import persistence.DAO;
import transaction.DAOTransaction;

public class FetchCommunityOwnersTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		List<CommunityOwner> communityOwners = dao.read((String)params[0], (int)params[2], (int)params[3], CommunityOwner.class, params[1]);
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		for(CommunityOwner communityOwner : communityOwners) {
			results.add(communityOwner.toRepresentation());
		}
		return results;
	}

}
