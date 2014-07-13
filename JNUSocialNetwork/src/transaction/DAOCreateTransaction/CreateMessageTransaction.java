package transaction.DAOCreateTransaction;

import javax.persistence.EntityManager;

import model.ChatRoom;
import model.Member;
import model.Message;
import model.factory.ModelFactory;
import persistence.DAO;
import transaction.DAOTransaction;

public class CreateMessageTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Member from = dao.get(Member.class, params[0]);
		Member to = dao.get(Member.class, params[1]);
		ChatRoom chatRoom = dao.get(ChatRoom.class, params[2]);
		Message message = ModelFactory.getInstance().create(Message.class, params[3], params[4], params[5]);
		message.setChatRoom(chatRoom);
		message.setTo(to);
		message.setFrom(from);
		dao.create(message);
		dao.update(chatRoom);
		return message.toRepresentation();
	}

}
