package transaction.DAOFetchTransaction;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.EntityManager;

import model.Member;
import transaction.DAOTransaction;

public class FolloweeRecommendationTransaction extends DAOTransaction {
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
			Set<Member> retains = m.getFollowees();
			retains.retainAll(member.getFollowees());
			if (retains.size() > 0)
				recommendations.add(m.toRepresentation());
		}

		return recommendations;
	}

}
