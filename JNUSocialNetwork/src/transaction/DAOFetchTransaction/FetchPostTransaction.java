package transaction.DAOFetchTransaction;

import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import transaction.DAOTransaction;

public class FetchPostTransaction extends DAOTransaction{
	private DAOTransaction transaction = new FetchPostsTransaction();
	
	@SuppressWarnings("unchecked")
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		System.out.println(params[0]);
		List<Map<String, Object>> results = (List<Map<String, Object>>) transaction.execute("Post.fetchByID", params[0], 0, 1);
		System.out.println(results);
		return results.get(0);
	}

}
