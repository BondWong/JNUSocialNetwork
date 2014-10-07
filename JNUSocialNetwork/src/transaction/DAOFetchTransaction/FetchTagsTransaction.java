package transaction.DAOFetchTransaction;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import model.Tag;
import persistence.DAO;
import transaction.DAOTransaction;

public class FetchTagsTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		List<Tag> tags = dao.read((String) params[0], (int) params[1],
				(int) params[2], Tag.class);
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		for (Tag tag : tags) {
			results.add(tag.toRepresentation());
		}
		return results;
	}

}
