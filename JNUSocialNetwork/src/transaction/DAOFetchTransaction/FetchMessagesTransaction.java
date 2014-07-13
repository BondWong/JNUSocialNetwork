package transaction.DAOFetchTransaction;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import model.Message;
import persistence.DAO;
import transaction.DAOTransaction;

public class FetchMessagesTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		List<Message> messages = dao.read("Message.fetchByChatRoom", (int) params[1], (int) params[2], Message.class, params[0]);
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		for(Message message : messages) {
			results.add(message.toRepresentation());
		}
		return results;
	}

}
