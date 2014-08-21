package service;

import java.util.List;
import java.util.Map;
import java.util.Set;

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

import model.Community;
import model.ServerSentEvent;
import model.modelType.CommunityType;
import system.ServerSentEventBroadcaster;
import transaction.Transaction;
import transaction.DAOCreateTransaction.CreateCommunityTransaction;
import transaction.DAOFetchTransaction.FetchCommunitiesTransaction;
import transaction.DAOFetchTransaction.FetchCommunityTransaction;
import transaction.DAOFetchTransaction.SearchCommunitiesTransaction;
import transaction.DAOUpdateTransaction.CommunityAddTagTransaction;
import transaction.DAOUpdateTransaction.CommunityRemoveTagTransaction;
import transaction.DAOUpdateTransaction.JoinCommunityTransaction;
import transaction.DAOUpdateTransaction.LeaveCommunityTransaction;
import transaction.DAOUpdateTransaction.UpdateAttributeTransaction;
import transaction.SSETransaction.SSEDeleteCommunityTransaction;

@Path("/community")
public class CommunityService {
	private Transaction transaction;
	private ServerSentEvent sse;
	private ServerSentEventBroadcaster broadcaster = ServerSentEventBroadcaster
			.getInstance();

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Path("add/{ID : \\d+}")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addCommunity(@PathParam("ID") String ID, Map community)
			throws Exception {
		transaction = new CreateCommunityTransaction();
		Map<String, Object> result;
		try {
			result = (Map<String, Object>) transaction.execute(ID, community
					.get("attributes"), community.get("tags"), CommunityType
					.valueOf((String) community.get("communityType")));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}

		return Response.ok(new GenericEntity<Map<String, Object>>(result) {
		}).build();
	}

	@Path("delete/{communityID : \\d+}")
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

	@Path("join/{ID : \\d+}/{communityID : \\d+}")
	@PUT
	public Response join(@PathParam("ID") String ID,
			@PathParam("communityID") Long communityID) throws Exception {
		transaction = new JoinCommunityTransaction();
		try {
			transaction.execute(ID, communityID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}

		return Response.ok().build();
	}

	@Path("leave/{ID : \\d+}/{communityID : \\d+}")
	@PUT
	public Response leave(@PathParam("ID") String ID,
			@PathParam("communityID") Long communityID) throws Exception {
		transaction = new LeaveCommunityTransaction();
		try {
			transaction.execute(ID, communityID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}

		return Response.ok().build();
	}

	@SuppressWarnings("unchecked")
	@Path("fetch/{startIndex : \\d{1,}}/{pageSize : \\d{1,}}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetch(@PathParam("startIndex") int startIndex,
			@PathParam("pageSize") int pageSize) throws Exception {
		transaction = new FetchCommunitiesTransaction();
		List<Map<String, Object>> results;
		try {
			results = (List<Map<String, Object>>) transaction.execute(
					"Community.fetch", null, null, startIndex, pageSize);
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
	@Path("fetchByMember/{ID : \\d+}/{startIndex : \\d{1,}}/{pageSize : \\d{1,}}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchByMember(@PathParam("ID") String ID,
			@PathParam("startIndex") int startIndex,
			@PathParam("pageSize") int pageSize) throws Exception {
		transaction = new FetchCommunitiesTransaction();
		List<Map<String, Object>> results;
		try {
			results = (List<Map<String, Object>>) transaction.execute(
					"Community.fetchByMember", ID, null, startIndex, pageSize);
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
	@Path("fetchByID/{communityID : \\d+}")
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

	@SuppressWarnings("unchecked")
	@Path("fetchByType/{ID : \\d+}/{communityType : [A-Z]+}/{startIndex : \\d{1,}}/{pageSize : \\d{1,}}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchByType(@PathParam("ID") String ID,
			@PathParam("communityType") String communityType,
			@PathParam("startIndex") int startIndex,
			@PathParam("pageSize") int pageSize) throws Exception {
		transaction = new FetchCommunitiesTransaction();
		List<Map<String, Object>> results;
		try {
			results = (List<Map<String, Object>>) transaction.execute(
					"Community.signInFetchByType", ID,
					CommunityType.valueOf(communityType), startIndex, pageSize);
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
	@Path("fetchByType/{communityType : [A-Z]+}/{startIndex : \\d{1,}}/{pageSize : \\d{1,}}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchByType(
			@PathParam("communityType") String communityType,
			@PathParam("startIndex") int startIndex,
			@PathParam("pageSize") int pageSize) throws Exception {
		transaction = new FetchCommunitiesTransaction();
		List<Map<String, Object>> results;
		try {
			results = (List<Map<String, Object>>) transaction.execute(
					"Community.fetchByType",
					CommunityType.valueOf(communityType), null, startIndex,
					pageSize);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}

		return Response.ok(
				new GenericEntity<List<Map<String, Object>>>(results) {
				}).build();
	}

	@Path("fetchByOwner/{ID : \\d+}/{startIndex : \\d{1,}}/{pageSize : \\d{1,}}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@SuppressWarnings("unchecked")
	public Response fetchByOwner(@PathParam("ID") String ID,
			@PathParam("startIndex") int startIndex,
			@PathParam("pageSize") int pageSize) throws Exception {
		transaction = new FetchCommunitiesTransaction();
		List<Map<String, Object>> results;
		try {
			results = (List<Map<String, Object>>) transaction.execute(
					"Community.fetchByOwner", ID, null, startIndex, pageSize);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}

		return Response.ok(
				new GenericEntity<List<Map<String, Object>>>(results) {
				}).build();
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Path("updateAttributes/{communityID : \\d+}")
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateAttributes(
			@PathParam("communityID") Long communityID, Map attributes)
			throws Exception {
		transaction = new UpdateAttributeTransaction();
		Map<String, Object> community;
		try {
			community = (Map<String, Object>) transaction.execute(
					Community.class, communityID, attributes);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}

		return Response.ok(new GenericEntity<Map<String, Object>>(community) {
		}).build();
	}

	@SuppressWarnings({ "unchecked" })
	@Path("addTags/{communityID : \\d+}")
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addTags(@PathParam("communityID") Long communityID,
			Set<String> tags) throws Exception {
		transaction = new CommunityAddTagTransaction();
		Map<String, Object> community;
		try {
			community = (Map<String, Object>) transaction.execute(communityID,
					tags);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}

		return Response.ok(new GenericEntity<Map<String, Object>>(community) {
		}).build();
	}

	@SuppressWarnings({ "unchecked" })
	@Path("removeTag/{communityID : \\d+}/{tag : \\w+}")
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public Response removeTag(@PathParam("communityID") Long communityID,
			@PathParam("tag") String tag) throws Exception {
		transaction = new CommunityRemoveTagTransaction();
		Map<String, Object> community;
		try {
			community = (Map<String, Object>) transaction.execute(communityID,
					tag);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}

		return Response.ok(new GenericEntity<Map<String, Object>>(community) {
		}).build();
	}

	@SuppressWarnings("unchecked")
	@Path("search/{key}/{startIndex : \\d{1,}}/{pageSize : \\d{1,}}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response search(@PathParam("key") String key,
			@PathParam("startIndex") int startIndex,
			@PathParam("pageSize") int pageSize) throws Exception {
		transaction = new SearchCommunitiesTransaction();
		List<Map<String, Object>> results;
		try {
			results = (List<Map<String, Object>>) transaction.execute(key,
					startIndex, pageSize);
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
