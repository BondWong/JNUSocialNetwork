package transaction.SSETransaction;

import model.ServerSentEvent;
import model.factory.ModelFactory;
import model.modelType.SSEType;
import transaction.DAOTransaction;
import transaction.ServerSentEventTransaction;
import transaction.DAOUpdateTransaction.DAODeleteTransaction.DeleteCommunityTransaction;

public class SSEDeleteCommunityTransaction extends ServerSentEventTransaction{
	private DAOTransaction transaction = new DeleteCommunityTransaction();
	
	@Override
	public Object execute(Object... params) throws Exception {
		// TODO Auto-generated method stub
		result.put("communityID", params[0]);
		transaction.execute(params);
		return getServerSentEvent(result);
	}

	@Override
	protected ServerSentEvent getServerSentEvent(Object data) {
		// TODO Auto-generated method stub
		ServerSentEvent sse = ModelFactory.getInstance().create(ServerSentEvent.class, SSEType.DELETECOMMUNITY ,data);
		return sse;
	}

}
