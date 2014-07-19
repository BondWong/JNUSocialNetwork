package transaction.DAOFetchTransaction;

import java.util.List;

import javax.persistence.EntityManager;

import model.Member;
import transaction.DAOTransaction;
import utils.MemberNumManager;

public class RandomlyFetchMemberTransaction extends DAOTransaction{
	DAOTransaction transaction = new FetchMembersTransaction();
	
	@SuppressWarnings("unchecked")
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		List<Member> members = (List<Member>) transaction.execute("Member.fetch", null, Math.round((Math.random() * MemberNumManager.get())), 500);
		return members;
	}

}
