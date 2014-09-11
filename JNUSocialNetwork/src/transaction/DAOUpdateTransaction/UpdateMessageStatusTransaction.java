package transaction.DAOUpdateTransaction;

import javax.persistence.EntityManager;

import model.Message;
import model.modelType.MessageStatus;
import persistence.DAO;
import transaction.DAOTransaction;

public class UpdateMessageStatusTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		Message message = dao.singleRead("Message.fetchByID", Message.class,
				((Double) params[0]).longValue());
		message.setMessageState(MessageStatus.valueOf((String) params[1]));
		dao.update(message);
		return message.toRepresentation();
	}

}
