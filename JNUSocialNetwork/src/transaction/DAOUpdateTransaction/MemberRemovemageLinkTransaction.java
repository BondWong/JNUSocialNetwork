package transaction.DAOUpdateTransaction;

import javax.persistence.EntityManager;

import model.Member;
import persistence.DAO;
import transaction.DAOTransaction;

public class MemberRemovemageLinkTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Member member = dao.get(Member.class, params[0]);
		member.removeImageLink((String)params[1]);
		dao.update(member);
		return member.toRepresentation();
	}

}
