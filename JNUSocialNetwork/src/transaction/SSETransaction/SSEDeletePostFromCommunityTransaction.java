package transaction.SSETransaction;

import model.ServerSentEvent;
import model.factory.ModelFactory;
import model.modelType.SSEType;
import transaction.DAOTransaction;
import transaction.ServerSentEventTransaction;
import transaction.DAOUpdateTransaction.DAODeleteTransaction.DeletePostFromCommunityTransaction;

public class SSEDeletePostFromCommunityTransaction extends ServerSentEventTransaction{
	private DAOTransaction transaction = new DeletePostFromCommunityTransaction();
	
	@Override
	public Object execute(Object... params) throws Exception {
		// TODO Auto-generated method stub
		result.put("communityID", params[0]);
		result.put("postID", params[1]);
		transaction.execute(params);
		return getServerSentEvent(result);
	}

	@Override
	protected ServerSentEvent getServerSentEvent(Object data) {
		// TODO Auto-generated method stub
		ServerSentEvent sse = ModelFactory.getInstance().create(ServerSentEvent.class, SSEType.DELETEPOSTFROMCOMMUNITY ,data);
		return sse;
	}

}
