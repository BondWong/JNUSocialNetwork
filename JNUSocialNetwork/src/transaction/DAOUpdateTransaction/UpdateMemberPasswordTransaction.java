package transaction.DAOUpdateTransaction;

import javax.persistence.EntityManager;

import model.Account;
import model.Member;
import persistence.DAO;
import transaction.DAOTransaction;

public class UpdateMemberPasswordTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Account account = dao.get(Account.class, params[0]);
		Member member = dao.get(Member.class, params[0]);
		account.setPassword((String) params[1]);
		member.setPassword((String) params[1]);
		dao.update(account);
		dao.update(member);
		return null;
	}

}
