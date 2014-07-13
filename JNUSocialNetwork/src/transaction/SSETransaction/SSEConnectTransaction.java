package transaction.SSETransaction;

import java.util.Map;

import model.ServerSentEvent;
import model.factory.ModelFactory;
import model.modelType.SSEType;
import transaction.DAOTransaction;
import transaction.ServerSentEventTransaction;
import transaction.DAOFetchTransaction.FetchMemberTransaction;

public class SSEConnectTransaction extends ServerSentEventTransaction{
	DAOTransaction transaction;
	
	@SuppressWarnings("unchecked")
	@Override
	public Object execute(Object... params) throws Exception {
		// TODO Auto-generated method stub
		transaction = new FetchMemberTransaction();
		Map<String, Object> result = (Map<String, Object>) transaction.execute(params);
		return getServerSentEvent(result);
	}

	@Override
	protected ServerSentEvent getServerSentEvent(Object data) {
		// TODO Auto-generated method stub
		ServerSentEvent sse = ModelFactory.getInstance().create(ServerSentEvent.class, SSEType.CONNECT ,data);
		return sse;
	}

}
