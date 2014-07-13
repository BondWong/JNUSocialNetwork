package transaction.SSETransaction;

import java.util.Map;

import model.ServerSentEvent;
import model.factory.ModelFactory;
import model.modelType.SSEType;
import transaction.DAOTransaction;
import transaction.ServerSentEventTransaction;
import transaction.DAOUpdateTransaction.LeaveCommunityTransaction;

public class SSELeaveCommunityTransaction extends ServerSentEventTransaction{
	private DAOTransaction transaction = new LeaveCommunityTransaction();
	
	@SuppressWarnings("unchecked")
	@Override
	public Object execute(Object... params) throws Exception {
		// TODO Auto-generated method stub
		Map<String, Object> result = (Map<String, Object>) transaction.execute(params);
		return getServerSentEvent(result);
	}

	@Override
	protected ServerSentEvent getServerSentEvent(Object data) {
		// TODO Auto-generated method stub
		ServerSentEvent sse = ModelFactory.getInstance().create(ServerSentEvent.class, SSEType.LEAVECOMMUITY ,data);
		return sse;
	}

}
