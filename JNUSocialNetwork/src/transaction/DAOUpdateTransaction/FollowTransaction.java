package transaction.DAOUpdateTransaction;

import javax.persistence.EntityManager;

import persistence.DAO;
import model.Member;
import transaction.DAOTransaction;

public class FollowTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Member member = dao.get(Member.class, params[0]);
		Member other = dao.get(Member.class, params[1]);
		member.follow(other);
		dao.update(member);
		dao.update(other);
		return other.toRepresentation();
	}

}
