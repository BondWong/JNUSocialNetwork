package transaction.DAOFetchTransaction;

import javax.persistence.EntityManager;

import service.helper.NumberManager;
import transaction.DAOTransaction;

public class RandomlyFetchMemberTransaction extends DAOTransaction {
	DAOTransaction transaction = new FetchMembersTransaction();

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		int startIndex = (int) Math.round((Math.random() * NumberManager
				.getMemberNum()));
		if (startIndex > 1)
			startIndex -= 1;
		else if(startIndex == 0 )
			startIndex += 1;
		return transaction.execute("Member.fetch", null, null, startIndex, 500);
	}

}
