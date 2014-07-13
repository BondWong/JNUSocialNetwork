package transaction.DAOFetchTransaction;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import model.Member;
import persistence.DAO;
import transaction.DAOTransaction;

public class FetchMembersTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		List<Member> members = dao.read((String)params[0], (int)params[2], (int)params[3], Member.class, params[1]);
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		for(Member member : members) {
			results.add(member.toRepresentation());
		}
		return results;
	}

}
