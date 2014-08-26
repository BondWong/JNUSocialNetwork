package transaction.DAOFetchTransaction;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import model.Comment;
import persistence.DAO;
import transaction.DAOTransaction;

public class FetchCommentsTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		List<Comment> comments = dao.read((String) params[0], (int) params[2],
				(int) params[3], Comment.class, params[1]);
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		for (Comment comment : comments) {
			results.add(comment.toRepresentation());
		}

		Collections.sort(results, new Comparator<Map<String, Object>>() {

			@Override
			public int compare(Map<String, Object> o1, Map<String, Object> o2) {
				// TODO Auto-generated method stub
				return -((String) o1.get("publishDate")).compareTo((String) o2
						.get("publishDate"));
			}

		});

		return results;
	}

}
