package transaction.DAOUpdateTransaction;

import java.util.Set;

import javax.persistence.EntityManager;

import model.Member;
import persistence.DAO;
import transaction.DAOTransaction;

public class MemberAddImageLinksTransaction extends DAOTransaction{

	@SuppressWarnings("unchecked")
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Member member = dao.get(Member.class, params[0]);
		member.addImageLink((Set<String>)params[1]);
		dao.update(member);
		return member.toRepresentation();
	}

}
