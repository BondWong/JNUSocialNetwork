package transaction.DAOFetchTransaction;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import transaction.DAOTransaction;

public class FetchPostsByIDsTransaction extends DAOTransaction{
private DAOTransaction transaction = new FetchPostsTransaction();
	
	@SuppressWarnings("unchecked")
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		List<Long> postIDs = (List<Long>) params[0];
		String query = "SELECT p FROM Post p WHERE p.ID IN ";
		query = query + "(";
		
		Iterator<Long> iter = postIDs.iterator();
		while(iter.hasNext()){
			query = query + iter.next();
			if(iter.hasNext())
				query = query + ",";
		}
		
		query = query + ")";
		
		List<Map<String, Object>> results = (List<Map<String, Object>>) transaction.execute(query, null, 0, 1);
		return results;
	}
}
