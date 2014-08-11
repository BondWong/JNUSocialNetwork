package transaction.DAOFetchTransaction;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import model.Member;
import transaction.DAOTransaction;

public class FetchMembersByIDsTransaction extends DAOTransaction {

	@SuppressWarnings("unchecked")
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		List<String> IDs = (List<String>) params[0];
		if (IDs.size() > 0) {
			String query = "SELECT m FROM Member m WHERE m.ID IN (";
			Iterator<String> iter = IDs.iterator();
			while (iter.hasNext()) {
				query += iter.next();
				if (iter.hasNext())
					query += ",";
				else
					query += ")";
			}
			TypedQuery<Member> tq = em.createQuery(query, Member.class);
			for (Member member : tq.getResultList())
				results.add(member.toRepresentation());
		}
		return results;
	}

}
