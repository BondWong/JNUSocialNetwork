package transaction.DAOCreateTransaction;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import model.ChatRoom;
import model.Member;
import model.Message;
import model.factory.ModelFactory;
import persistence.DAO;
import transaction.DAOTransaction;

public class CreateMessagesTransaction extends DAOTransaction{

	@SuppressWarnings("unchecked")
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		List<Map<String, Object>> messages = (List<Map<String, Object>>) params[0];
		for(Object param : messages) {
			Map<String, Object> messageMap = (Map<String, Object>) param;
			System.out.println(messageMap);
			Member from = dao.get(Member.class, messageMap.get("fromID"));
			Member to = dao.get(Member.class, messageMap.get("toID"));
			ChatRoom chatRoom = dao.get(ChatRoom.class, messageMap.get("chatRoomID"));
			Message message = ModelFactory.getInstance().create(Message.class, messageMap.get("messageStatus"), messageMap.get("publishDate"), messageMap.get("attributes"));
			message.setFrom(from);
			message.setTo(to);
			chatRoom.addMessage(message);
			chatRoom.setLastAccessTime(new Date());
			dao.update(chatRoom);
		}
		return null;
	}

}
