package transaction.DAOFetchTransaction;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import model.Member;
import service.helper.SearchMap;
import transaction.DAOTransaction;

public class SearchMemberTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		SearchMap.deserialize();
		String[] IDs = SearchMap.searchIDs((String) params[1]);
		SearchMap.serialize();
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		if (IDs != null && IDs.length != 0) {
			String query = "";
			for (int i = 0; i < IDs.length; i++) {
				if (IDs[i].equals(params[0]))
					continue;
				else {
					query += IDs[i];
					if (i == IDs.length - 1)
						query += ")";
					else
						query += ", ";
				}
			}
			if (!query.equals("")) {
				query = "SELECT m FROM Member m WHERE m.ID IN (" + query;
				System.out.println(query);
				TypedQuery<Member> tq = em.createQuery(query, Member.class);
				tq.setFirstResult((int) params[2]);
				tq.setMaxResults((int) params[3]);
				List<Member> members = tq.getResultList();
				for (Member member : members)
					results.add(member.toRepresentation());
			}
		} else {
			System.out.println((String) params[1]);
			TypedQuery<Member> tq = em.createNamedQuery("Member.fetchByID",
					Member.class);
			tq.setParameter(1, params[1]);
			Member member = tq.getSingleResult();
			results.add(member.toRepresentation());
		}
		return results;
	}

}
