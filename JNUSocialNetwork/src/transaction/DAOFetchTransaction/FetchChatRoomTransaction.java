package transaction.DAOFetchTransaction;

import java.util.HashMap;

import javax.persistence.EntityManager;

import model.ChatRoom;
import model.Member;
import model.factory.ModelFactory;
import persistence.DAO;
import transaction.DAOTransaction;

public class FetchChatRoomTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		String ID = "" + ((Long.parseLong((String)params[0]) + Long.parseLong((String)params[1])) 
				+ (Long.parseLong(((String)params[0]).substring(4)) * Long.parseLong(((String)params[1]).substring(4))));
		ChatRoom chatRoom = dao.get(ChatRoom.class, ID);
		if(chatRoom == null) {
			chatRoom = ModelFactory.getInstance().create(ChatRoom.class, params[0], params[1], new HashMap<String, String>());
			Member m1 = dao.get(Member.class, (String)params[0]);
			Member m2 = dao.get(Member.class, (String)params[1]);
			chatRoom.setM1(m1);
			chatRoom.setM2(m2);
			dao.create(chatRoom);
		}
		return chatRoom.toRepresentation();
	}

}
