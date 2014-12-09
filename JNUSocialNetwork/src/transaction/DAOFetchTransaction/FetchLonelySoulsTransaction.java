package transaction.DAOFetchTransaction;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import persistence.DAO;
import model.Member;
import transaction.DAOTransaction;

public class FetchLonelySoulsTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		List<Member> members = new ArrayList<Member>();
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		members = dao.read("Member.fetchLonelySouls", 0, (int)params[0], Member.class);
		
		for(Member member : members) {
			results.add(member.toRepresentation());
		}

		return results;
	}
}
