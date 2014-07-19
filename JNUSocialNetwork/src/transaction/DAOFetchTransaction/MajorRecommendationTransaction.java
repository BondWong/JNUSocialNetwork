package transaction.DAOFetchTransaction;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import model.Member;
import transaction.DAOTransaction;

public class MajorRecommendationTransaction extends DAOTransaction {
	DAOTransaction transaction;

	@SuppressWarnings("unchecked")
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		List<Map<String, Object>> recommendations = new LinkedList<Map<String, Object>>();

		transaction = new RandomlyFetchMemberTransaction();
		List<Member> members = (List<Member>) transaction.execute();
		transaction = new FetchMemberTransaction();
		Member member = (Member) transaction.execute(params);

		for (Member m : members) {
			if (m.getAttribute("major") != ""
					&& m.getAttribute("major") != null
					&& m.getAttribute("major") == member.getAttribute("major"))
				recommendations.add(m.toRepresentation());
		}

		return recommendations;
	}

}
