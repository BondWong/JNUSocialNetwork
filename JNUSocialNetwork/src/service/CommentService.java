package service;

import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import model.ServerSentEvent;
import system.ServerSentEventBroadcaster;
import transaction.Transaction;
import transaction.DAOFetchTransaction.FetchCommentTransaction;
import transaction.DAOFetchTransaction.FetchCommentsTransaction;
import transaction.SSETransaction.SSECancelLikeCommentTransaction;
import transaction.SSETransaction.SSECreateCommentTransaction;
import transaction.SSETransaction.SSEDeleteCommentTransaction;
import transaction.SSETransaction.SSELikeCommentTransaction;

@Path("/comment")
public class CommentService {
	private Transaction transaction;
	private ServerSentEvent sse;
	private ServerSentEventBroadcaster broadcaster = ServerSentEventBroadcaster
			.getInstance();

	@SuppressWarnings("rawtypes")
	@Path("add/{ID : \\d+}/{postID : \\d+}")
	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	public Response addComment(@PathParam("ID") String ID,
			@PathParam("postID") Long postID, Map comment) throws Exception {
		transaction = new SSECreateCommentTransaction();
		try {
			sse = (ServerSentEvent) transaction.execute(ID, postID,
					comment.get("attributes"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		broadcaster.broadcast(sse);

		return Response.ok().build();
	}

	@Path("delete/{postID : \\d+}/{commentID : \\d+}")
	@PUT
	public Response deleteComment(@PathParam("postID") Long postID,
			@PathParam("commentID") Long commentID) throws Exception {
		transaction = new SSEDeleteCommentTransaction();
		try {
			sse = (ServerSentEvent) transaction.execute(postID, commentID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		broadcaster.broadcast(sse);

		return Response.ok().build();
	}

	@Path("like/{ID : \\d+}/{commentID : \\d+}")
	@PUT
	public Response likeComment(@PathParam("ID") String ID,
			@PathParam("commentID") Long commentID) throws Exception {
		transaction = new SSELikeCommentTransaction();
		try {
			sse = (ServerSentEvent) transaction.execute(ID, commentID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		broadcaster.broadcast(sse);

		return Response.ok().build();
	}

	@Path("cancelLike/{ID : \\d+}/{commentID : \\d+}")
	@PUT
	public Response cancelLike(@PathParam("ID") String ID,
			@PathParam("commentID") Long commentID) throws Exception {
		transaction = new SSECancelLikeCommentTransaction();
		try {
			sse = (ServerSentEvent) transaction.execute(ID, commentID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		broadcaster.broadcast(sse);

		return Response.ok().build();
	}

	@Path("fetchByID/{commentID : \\d+}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@SuppressWarnings("unchecked")
	public Response fetchByID(@PathParam("commentID") Long commentID)
			throws Exception {
		transaction = new FetchCommentTransaction();
		Map<String, Object> result;
		try {
			result = (Map<String, Object>) transaction.execute(commentID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return Response.ok(new GenericEntity<Map<String, Object>>(result) {
		}).build();
	}

	@SuppressWarnings("unchecked")
	@Path("fetchByPost/{postID : \\d+}/{startIndex : \\d{1,}}/{pageSize : \\d{1,}}")
	@GET
	public Response fetchByPost(@PathParam("postID") Long postID,
			@PathParam("startIndex") int startIndex,
			@PathParam("pageSize") int pageSize) throws Exception {
		transaction = new FetchCommentsTransaction();
		List<Map<String, Object>> results;
		try {
			results = (List<Map<String, Object>>) transaction.execute(
					"Comment.fetchByPost", postID, startIndex, pageSize);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}

		return Response.ok(
				new GenericEntity<List<Map<String, Object>>>(results) {
				}).build();
	}

}
