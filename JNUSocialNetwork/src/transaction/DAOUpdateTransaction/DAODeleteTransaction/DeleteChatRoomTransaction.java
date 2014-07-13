package transaction.DAOUpdateTransaction.DAODeleteTransaction;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;

import model.ChatRoom;
import model.Message;
import persistence.DAO;
import transaction.DAOTransaction;

public class DeleteChatRoomTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		List<ChatRoom> chatRooms = dao.dateTimeRead("ChatRoom.fetchAbandoned", ChatRoom.class, (Date)params[0]);
		for(ChatRoom chatRoom : chatRooms) {
			for(Message message : chatRoom.getMessages()){
				message.delete();
				message.clearAttributes();
				message.setChatRoom(null);
				message.setTo(null);
				message.setFrom(null);
				dao.update(message);
			}
			chatRoom.delete();
			chatRoom.cleaMessages();
			chatRoom.clearAttributes();
			dao.update(chatRoom);
		}
		return null;
	}

}
