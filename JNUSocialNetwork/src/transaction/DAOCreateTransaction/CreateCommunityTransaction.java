package transaction.DAOCreateTransaction;

import javax.persistence.EntityManager;

import model.Community;
import model.CommunityOwner;
import model.factory.ModelFactory;
import persistence.DAO;
import transaction.DAOTransaction;

public class CreateCommunityTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		CommunityOwner co = dao.get(CommunityOwner.class, params[0]);
		Community community = ModelFactory.getInstance().create(Community.class, params[1], params[2], params[3]);
		co.createCommunity(community);
		dao.update(co);
		return community.toRepresentation();
	}

}
