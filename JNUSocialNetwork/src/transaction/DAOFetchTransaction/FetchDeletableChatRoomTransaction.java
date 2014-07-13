package transaction.DAOFetchTransaction;

import java.util.List;

import javax.persistence.EntityManager;

import persistence.DAO;
import transaction.DAOTransaction;

public class FetchDeletableChatRoomTransaction extends DAOTransaction{

	@SuppressWarnings("unchecked")
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		List<String> IDs = dao.combinedRead("ChatRoom.fetchDeletable");
		return IDs;
	}

}
