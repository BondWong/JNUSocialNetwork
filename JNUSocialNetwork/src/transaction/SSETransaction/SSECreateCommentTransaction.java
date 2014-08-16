package transaction.SSETransaction;

import java.util.Map;

import model.ServerSentEvent;
import model.factory.ModelFactory;
import model.modelType.SSEType;
import transaction.DAOTransaction;
import transaction.ServerSentEventTransaction;
import transaction.DAOCreateTransaction.CreateCommentTransaction;
import transaction.DAOFetchTransaction.FetchCommentTransaction;
import transaction.DAOFetchTransaction.FetchPostTransaction;

public class SSECreateCommentTransaction extends ServerSentEventTransaction {
	private DAOTransaction transaction = new CreateCommentTransaction();

	@SuppressWarnings("unchecked")
	@Override
	public Object execute(Object... params) throws Exception {
		// TODO Auto-generated method stub
		result.put("ID", params[0]);
		result.put("postID", params[1]);
		Map<String, Object> comment = (Map<String, Object>) transaction
				.execute(params);
		result.put("comment", comment);
		result.put("commentID", comment.get("ID"));
		transaction = new FetchPostTransaction();
		Map<String, Object> post = (Map<String, Object>) transaction
				.execute(params[1]);
		result.put("postOwnerID",
				((Map<String, Object>) post.get("owner")).get("ID"));
		String toCommentID = (String) ((Map<String, Object>) comment
				.get("attributes")).get("toCommentID");
		if (toCommentID != null && toCommentID != "") {
			transaction = new FetchCommentTransaction();
			Map<String, Object> toComment = (Map<String, Object>) transaction
					.execute(Long.parseLong(toCommentID));
			result.put("toCommentOwnerID",
					((Map<String, Object>) toComment.get("owner")).get("ID"));
		}

		return getServerSentEvent(result);
	}

	@Override
	protected ServerSentEvent getServerSentEvent(Object data) {
		// TODO Auto-generated method stub
		ServerSentEvent sse = ModelFactory.getInstance().create(
				ServerSentEvent.class, SSEType.CREATECOMMENT, data);
		return sse;
	}

}
