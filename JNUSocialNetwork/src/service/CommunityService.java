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
import transaction.DAOCreateTransaction.CreateCommunityTransaction;
import transaction.DAOFetchTransaction.FetchCommunitiesTransaction;
import transaction.DAOFetchTransaction.FetchCommunityTransaction;
import transaction.SSETransaction.SSEDeleteCommunityTransaction;

@Path("/community")
public class CommunityService {
	private Transaction transaction;
	private ServerSentEvent sse;
	private ServerSentEventBroadcaster broadcaster = ServerSentEventBroadcaster
			.getInstance();

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Path("/add/{ID : \\d+}")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addCommunity(@PathParam("ID") String ID, Map community)
			throws Exception {
		transaction = new CreateCommunityTransaction();
		Map<String, Object> result;
		try {
			result = (Map<String, Object>) transaction.execute(ID,
					community.get("attributes"), community.get("tags"), community.get("communityType"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}

		return Response.ok(new GenericEntity<Map<String, Object>>(result) {
		}).build();
	}

	@Path("/delete/{communityID : \\d+}")
	@PUT
	public Response deleteCommunity(@PathParam("communityID") Long communityID)
			throws Exception {
		transaction = new SSEDeleteCommunityTransaction();
		try {
			sse = (ServerSentEvent) transaction.execute(communityID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		broadcaster.broadcast(sse);

		return Response.ok().build();
	}

	@SuppressWarnings("unchecked")
	@Path("/fetch/{startIndex : \\d{1,}}/{pageSize : \\d{1,}}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetch(@PathParam("startIndex") int startIndex,
			@PathParam("pageSize") int pageSize) throws Exception {
		transaction = new FetchCommunitiesTransaction();
		List<Map<String, Object>> results;
		try {
			results = (List<Map<String, Object>>) transaction.execute(
					"Community.fetch", startIndex, pageSize);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}

		return Response.ok(
				new GenericEntity<List<Map<String, Object>>>(results) {
				}).build();
	}

	@SuppressWarnings("unchecked")
	@Path("/fetchByID/{communityID : \\d+}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchByID(@PathParam("communityID") Long communityID)
			throws Exception {
		transaction = new FetchCommunityTransaction();
		Map<String, Object> result;
		try {
			result = (Map<String, Object>) transaction.execute(communityID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}

		return Response.ok(new GenericEntity<Map<String, Object>>(result) {
		}).build();
	}
	
}
