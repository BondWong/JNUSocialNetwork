package transaction.SSETransaction;

import model.ServerSentEvent;
import model.factory.ModelFactory;
import model.modelType.SSEType;
import transaction.DAOTransaction;
import transaction.ServerSentEventTransaction;
import transaction.DAOUpdateTransaction.LeaveActivityTransaction;

public class SSELeaveActivityTransaction extends ServerSentEventTransaction{
	private DAOTransaction transaction = new LeaveActivityTransaction();
	
	@Override
	public Object execute(Object... params) throws Exception {
		// TODO Auto-generated method stub
		result.put("ID", params[0]);
		result.put("postID", params[1]);
		transaction.execute(params);
		return getServerSentEvent(result);
	}

	@Override
	protected ServerSentEvent getServerSentEvent(Object data) {
		// TODO Auto-generated method stub
		ServerSentEvent sse = ModelFactory.getInstance().create(ServerSentEvent.class, SSEType.LEAVEACTIVITY ,data);
		return sse;
	}

}
