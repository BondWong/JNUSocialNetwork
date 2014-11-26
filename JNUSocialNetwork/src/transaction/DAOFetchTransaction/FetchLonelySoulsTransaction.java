package transaction.DAOFetchTransaction;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import helper.serviceHelper.searchHelper.RankMap;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import model.Member;
import transaction.DAOTransaction;

public class FetchLonelySoulsTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		RankMap.deserialize();
		String[] IDs = RankMap.fetchLonlinessRankRecord((int) params[0]);
		RankMap.deserialize();

		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>(
				IDs.length);

		String query = "";
		for (int i = 0; i < IDs.length; i++) {
			query += IDs[i];
			if (i != IDs.length - 1)
				query += ", ";
			else
				query += ")";
			results.add(new HashMap<String, Object>());
		}

		if (!query.equals(")")) {
			query = "SELECT m FROM Member m WHERE m.ID IN (" + query;
			System.out.println(query);
			TypedQuery<Member> tq = em.createQuery(query, Member.class);
			tq.setMaxResults((int) params[0]);
			List<Member> members = tq.getResultList();
			for (Member member : members)
				for (int i = 0; i < IDs.length; i++)
					if ((member.getID() + "").equals(IDs[i]))
						results.add(i, member.toRepresentation());

		}

		return results;
	}
}
