package transaction.SSETransaction;

import model.ServerSentEvent;
import model.factory.ModelFactory;
import model.modelType.SSEType;
import transaction.DAOTransaction;
import transaction.ServerSentEventTransaction;
import transaction.DAOUpdateTransaction.DAODeleteTransaction.DeleteCommentTransaction;

public class SSEDeleteCommentTransaction extends ServerSentEventTransaction{
	private DAOTransaction transaction = new DeleteCommentTransaction();
	
	@Override
	public Object execute(Object... params) throws Exception {
		// TODO Auto-generated method stub
		result.put("postID", params[0]);
		result.put("comment", params[1]);
		transaction.execute(params);
		return getServerSentEvent(result);
	}

	@Override
	protected ServerSentEvent getServerSentEvent(Object data) {
		// TODO Auto-generated method stub
		ServerSentEvent sse = ModelFactory.getInstance().create(ServerSentEvent.class, SSEType.DELETECOMMENT ,data);
		return sse;
	}

}
