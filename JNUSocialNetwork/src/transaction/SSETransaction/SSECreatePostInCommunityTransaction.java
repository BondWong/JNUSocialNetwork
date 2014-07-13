package transaction.SSETransaction;

import java.util.Map;

import model.ServerSentEvent;
import model.factory.ModelFactory;
import model.modelType.SSEType;
import transaction.DAOTransaction;
import transaction.ServerSentEventTransaction;
import transaction.DAOCreateTransaction.CreatePostInCommunityTransaction;

public class SSECreatePostInCommunityTransaction extends ServerSentEventTransaction{
	private DAOTransaction transaction = new CreatePostInCommunityTransaction();
	
	@SuppressWarnings("unchecked")
	@Override
	public Object execute(Object... params) throws Exception {
		// TODO Auto-generated method stub
		result.put("ID", params[0]);
		result.put("communityID", params[1]);
		result.put("post", (Map<String, Object>) transaction.execute(params));
		return getServerSentEvent(result);
	}

	@Override
	protected ServerSentEvent getServerSentEvent(Object data) {
		// TODO Auto-generated method stub
		ServerSentEvent sse = ModelFactory.getInstance().create(ServerSentEvent.class, SSEType.CREATEPOSTINCOMMUNITY ,data);
		return sse;
	}

}
