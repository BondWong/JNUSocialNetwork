package transaction.DAOUpdateTransaction;

import javax.persistence.EntityManager;

import model.Message;
import model.modelType.MessageStatus;
import persistence.DAO;
import transaction.DAOTransaction;

public class ChageMessagesStatusTransaction extends DAOTransaction{

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		DAO dao = new DAO(em);
		MessageStatus status = (MessageStatus) params[0];
		for(int i=1;i<params.length;i++){
			Message message = dao.get(Message.class, params[i]);
			message.setMessageState(status);
			dao.update(message);
		}
		return null;
	}

}
