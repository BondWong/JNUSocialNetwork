package transaction.DAOFetchTransaction;

import javax.persistence.EntityManager;

import service.helper.NumberManager;
import transaction.DAOTransaction;

public class RandomlyFetchCommunityTransaction extends DAOTransaction {
	DAOTransaction transaction = new FetchCommunitiesTransaction();

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		int startIndex = (int) Math.round((Math.random() * NumberManager
				.getCommunityNum()));
		if (startIndex > 1)
			startIndex -= 1;
		else if (startIndex == 0)
			startIndex += 1;
		return transaction.execute("Community.fetch", null, null, startIndex,
				params[0]);
	}

}
