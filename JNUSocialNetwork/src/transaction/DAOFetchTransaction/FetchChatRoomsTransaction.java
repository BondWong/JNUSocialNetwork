package transaction.DAOFetchTransaction;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import model.ChatRoom;
import persistence.DAO;
import transaction.DAOTransaction;

public class FetchChatRoomsTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		List<ChatRoom> chatRooms = dao.read("ChatRoom.fetchByMember", 0, 500,
				ChatRoom.class, params[0]);
		List<Map<String, Object>> results = new ArrayList<Map<String, Object>>();
		for (ChatRoom chatRoom : chatRooms)
			results.add(chatRoom.toRepresentation());
		return results;
	}

}
