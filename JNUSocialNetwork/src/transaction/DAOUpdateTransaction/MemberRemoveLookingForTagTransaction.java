package transaction.DAOUpdateTransaction;

import javax.persistence.EntityManager;

import model.Member;
import model.Tag;
import persistence.DAO;
import transaction.DAOTransaction;

public class MemberRemoveLookingForTagTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Tag tag = dao.get(Tag.class, params[1]);
		Member member = dao.get(Member.class, params[0]);
		member.removeLookingForTag(tag);
		dao.update(tag);
		dao.update(member);
		return member.toRepresentation();
	}

}
