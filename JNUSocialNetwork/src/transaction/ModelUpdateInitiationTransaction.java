package transaction;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import model.Member;
import persistence.DAO;
import transaction.DAOFetchTransaction.GetNumTransaction;
import utils.ConstantValue;

public class ModelUpdateInitiationTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		List<Member> members = new ArrayList<Member>();
		members = dao.read("Member.fetchMembers", Member.class);
		Transaction numTransaction = new GetNumTransaction();
		for (Member member : members) {
			long postNum = (long) numTransaction.execute(
					"Post.fetchByOwnerSize", member.getID());
			long commentNum = (long) numTransaction.execute(
					"Comment.fetchByOwnerSize", member.getID());
			member.setLonelinessDegree(postNum * ConstantValue.POSTWEIGHT
					+ commentNum * ConstantValue.COMMENTWEIGHT);
			dao.update(member);
		}
		return null;
	}

}
