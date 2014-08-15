package transaction.SSETransaction;

import java.util.Map;

import model.ServerSentEvent;
import model.factory.ModelFactory;
import model.modelType.SSEType;
import transaction.DAOTransaction;
import transaction.ServerSentEventTransaction;
import transaction.DAOUpdateTransaction.LikePostTransaction;

public class SSELikePostTransaction extends ServerSentEventTransaction{
	private DAOTransaction transaction = new LikePostTransaction();
	
	@SuppressWarnings("unchecked")
	@Override
	public Object execute(Object... params) throws Exception {
		// TODO Auto-generated method stub
		result.put("ID", params[0]);
		result.put("postID", params[1]);
		Map<String, Object> post = (Map<String, Object>) transaction.execute(params);
		result.put("postOwnerID", ((Map<String, Object>)post.get("owner")).get("ID"));
		return getServerSentEvent(result);
	}

	@Override
	protected ServerSentEvent getServerSentEvent(Object data) {
		// TODO Auto-generated method stub
		ServerSentEvent sse = ModelFactory.getInstance().create(ServerSentEvent.class, SSEType.LIKEPOST ,data);
		return sse;
	}

}
