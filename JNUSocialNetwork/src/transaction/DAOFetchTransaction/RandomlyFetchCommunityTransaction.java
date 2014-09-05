package transaction.DAOFetchTransaction;

import javax.persistence.EntityManager;

import transaction.DAOTransaction;
import utils.NumberManager;

public class RandomlyFetchCommunityTransaction extends DAOTransaction {
	DAOTransaction transaction = new FetchCommunitiesTransaction();

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		return transaction.execute("Community.fetch", null, null, (int) Math
				.round((Math.random() * NumberManager.getCommunityNum())),
				params[0]);
	}

}
