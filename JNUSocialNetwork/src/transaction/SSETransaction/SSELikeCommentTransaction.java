package transaction.SSETransaction;

import java.util.Map;

import model.ServerSentEvent;
import model.factory.ModelFactory;
import model.modelType.SSEType;
import transaction.DAOTransaction;
import transaction.ServerSentEventTransaction;
import transaction.DAOUpdateTransaction.LikeCommentTransaction;

public class SSELikeCommentTransaction extends ServerSentEventTransaction{
	private DAOTransaction transaction = new LikeCommentTransaction();
	
	@SuppressWarnings("unchecked")
	@Override
	public Object execute(Object... params) throws Exception {
		// TODO Auto-generated method stub
		result.put("ID", params[0]);
		result.put("postID", params[1]);
		Map<String, Object> comment = (Map<String, Object>) transaction.execute(params);
		result.put("commentID", comment.get("ID"));
		return getServerSentEvent(result);
	}

	@Override
	protected ServerSentEvent getServerSentEvent(Object data) {
		// TODO Auto-generated method stub
		ServerSentEvent sse = ModelFactory.getInstance().create(ServerSentEvent.class, SSEType.LIKECOMMENT ,data);
		return sse;
	}

}
