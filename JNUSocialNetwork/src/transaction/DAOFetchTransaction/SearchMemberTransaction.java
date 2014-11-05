package transaction.DAOFetchTransaction;

import helper.serviceHelper.MemberSearchMap;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import model.Member;
import transaction.DAOTransaction;

public class SearchMemberTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		MemberSearchMap.deserialize();
		String[] IDs = MemberSearchMap.searchIDs((String) params[1]);
		MemberSearchMap.serialize();
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		if (IDs != null && IDs.length != 0) {

			List<String> temp = Arrays.asList(IDs);
			Collections.shuffle(temp);
			temp.toArray(IDs);

			String query = "";
			for (int i = 0; i < IDs.length; i++) {
				query += IDs[i];
				if (i != IDs.length - 1)
					query += ", ";
				else
					query += ")";

			}

			if (!query.equals(")")) {
				query = "SELECT m FROM Member m WHERE m.ID IN (" + query;
				System.out.println(query);
				TypedQuery<Member> tq = em.createQuery(query, Member.class);
				tq.setFirstResult((int) params[2]);
				tq.setMaxResults((int) params[3]);
				List<Member> members = tq.getResultList();
				for (Member member : members)
					results.add(member.toRepresentation());
			}

		} else if (params[0] != null && params[0].equals(params[1])) {
			TypedQuery<Member> tq = em.createNamedQuery("Member.fetchByID",
					Member.class);
			tq.setParameter(1, params[1]);
			List<Member> r = tq.getResultList();
			if (r.iterator().hasNext())
				results.add(r.iterator().next().toRepresentation());
			else
				results.add(new HashMap<String, Object>());
		} else if (params[0] == null) {
			TypedQuery<Member> tq = em.createNamedQuery("Member.fetchByID",
					Member.class);
			tq.setParameter(1, params[1]);
			List<Member> r = tq.getResultList();
			if (r.iterator().hasNext())
				results.add(r.iterator().next().toRepresentation());
			else
				results.add(new HashMap<String, Object>());
		}

		Collections.shuffle(results);
		return results;
	}

}
