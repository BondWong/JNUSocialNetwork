package transaction.DAOFetchTransaction;

import javax.persistence.EntityManager;

import transaction.DAOTransaction;
import utils.MemberNumManager;

public class RandomlyFetchMemberTransaction extends DAOTransaction{
	DAOTransaction transaction = new FetchMembersTransaction();
	
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		return  transaction.execute("Member.fetch", null, (int) Math.round((Math.random() * MemberNumManager.get())), 500);
	}

}
