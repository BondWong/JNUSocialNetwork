package service;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import model.Member;
import model.ServerSentEvent;
import system.ServerSentEventBroadcaster;
import transaction.Transaction;
import transaction.DAOFetchTransaction.CampusRecommendationTransaction;
import transaction.DAOFetchTransaction.ClassRecommendationTransaction;
import transaction.DAOFetchTransaction.FetchCommunityOwnersTransaction;
import transaction.DAOFetchTransaction.FetchMemberTransaction;
import transaction.DAOFetchTransaction.FetchMembersTransaction;
import transaction.DAOFetchTransaction.FolloweeRecommendationTransaction;
import transaction.DAOFetchTransaction.MajorRecommendationTransaction;
import transaction.DAOFetchTransaction.SessionRecommendationTransaction;
import transaction.DAOUpdateTransaction.CancelFollowTransaction;
import transaction.DAOUpdateTransaction.MemberAddImageLinksTransaction;
import transaction.DAOUpdateTransaction.MemberRemoveImageLinksTransaction;
import transaction.DAOUpdateTransaction.UpdateAttributeTransaction;
import transaction.DAOUpdateTransaction.DAODeleteTransaction.DeleteCommunityOwnerTransaction;
import transaction.DAOUpdateTransaction.DAODeleteTransaction.DeleteMemberTransaction;
import transaction.SSETransaction.SSEFollowTransaction;

@Path("/user")
public class UserService {
	private Transaction transaction;
	private ServerSentEvent sse;
	private ServerSentEventBroadcaster broadcaster = ServerSentEventBroadcaster
			.getInstance();

	@Path("deleteMember/{ID : \\d+}")
	@PUT
	public Response deleteMember(@PathParam("ID") String ID) throws Exception {
		transaction = new DeleteMemberTransaction();
		try {
			transaction.execute(ID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return Response.ok().build();
	}

	@Path("deleteCommunityOwner/{ID : \\d+}")
	@PUT
	public Response deleteCommunityOwner(@PathParam("ID") String ID)
			throws Exception {
		transaction = new DeleteCommunityOwnerTransaction();
		try {
			transaction.execute(ID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return Response.ok().build();
	}

	@Path("follow/{ID : \\d+}/{otherID : \\d+}")
	@PUT
	public Response follow(@PathParam("ID") String ID,
			@PathParam("otherID") String otherID) throws Exception {
		transaction = new SSEFollowTransaction();
		try {
			sse = (ServerSentEvent) transaction.execute(ID, otherID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		broadcaster.broadcast(sse);

		return Response.ok().build();
	}

	@Path("cancelFollow/{ID : \\d+}/{otherID : \\d+}")
	@PUT
	public Response cancelFollow(@PathParam("ID") String ID,
			@PathParam("otherID") String otherID) throws Exception {
		transaction = new CancelFollowTransaction();
		try {
			transaction.execute(ID, otherID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}

		return Response.ok().build();
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Path("updateProfile/{ID : \\d+}")
	@Consumes(MediaType.APPLICATION_JSON)
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateProfile(@PathParam("ID") String ID, Map attributes)
			throws Exception {
		transaction = new UpdateAttributeTransaction();
		Map<String, Object> result;
		try {
			result = (Map<String, Object>) transaction.execute(Member.class,
					ID, attributes);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}

		return Response.ok(new GenericEntity<Map<String, Object>>(result) {
		}).build();
	}

	@SuppressWarnings("unchecked")
	@Path("addImages/{ID : \\d+}")
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	public Response addImages(@PathParam("ID") String ID,
			@QueryParam("imageLinks") List<String> imageLinks) throws Exception {
		transaction = new MemberAddImageLinksTransaction();
		Set<String> links = new LinkedHashSet<String>(imageLinks);
		Map<String, Object> result;
		try {
			result = (Map<String, Object>) transaction.execute(ID, links);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}

		return Response.ok(new GenericEntity<Map<String, Object>>(result) {
		}).build();
	}

	@Path("removeImages/{ID : \\d+}")
	@PUT
	public Response removeImages(@PathParam("ID") String ID,
			@QueryParam("imageLinks") List<String> imageLinks) throws Exception {
		transaction = new MemberRemoveImageLinksTransaction();
		Set<String> links = new LinkedHashSet<String>(imageLinks);
		try {
			transaction.execute(ID, links);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return Response.ok().build();
	}

	@SuppressWarnings("unchecked")
	@GET
	@Path("fetch/{startIndex : \\d{1,}}/{pageSize : \\d{1,}}/{userType : [A-Z]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetch(@PathParam("startIndex") int startIndex,
			@PathParam("pageSize") int pageSize,
			@PathParam("userType") String userType) throws Exception {
		List<Map<String, Object>> results;
		try {
			if (userType.equals("MEMBER")) {
				transaction = new FetchMembersTransaction();
				results = (List<Map<String, Object>>) transaction.execute(
						"Member.fetch", null, startIndex, pageSize);
			} else if (userType.equals("COMMUNITYOWNER")) {
				transaction = new FetchCommunityOwnersTransaction();
				results = (List<Map<String, Object>>) transaction.execute(
						"CommunityOwner.fetch", null, startIndex, pageSize);
			} else {
				throw new Exception();
			}

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
	@Path("fetchFollowees/{ID : \\d+}/{startIndex : \\d{1,}}/{pageSize : \\d{1,}}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchFollowees(@PathParam("ID") String ID,
			@PathParam("startIndex") int startIndex,
			@PathParam("pageSize") int pageSize) throws Exception {
		transaction = new FetchMembersTransaction();
		List<Map<String, Object>> results;
		try {
			results = (List<Map<String, Object>>) transaction.execute(
					"Member.fetchFollowees", ID, startIndex, pageSize);
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
	@Path("fetchFollowers/{ID : \\d+}/{startIndex : \\d{1,}}/{pageSize : \\d{1,}}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchFollowers(@PathParam("ID") String ID,
			@PathParam("startIndex") int startIndex,
			@PathParam("pageSize") int pageSize) throws Exception {
		transaction = new FetchMembersTransaction();
		List<Map<String, Object>> results;
		try {
			results = (List<Map<String, Object>>) transaction.execute(
					"Member.fetchFollowers", ID, startIndex, pageSize);
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
	@Path("fetchByID/{ID : \\d+}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchByID(@PathParam("ID") String ID) throws Exception {
		transaction = new FetchMemberTransaction();
		Map<String, Object> result;
		try {
			result = (Map<String, Object>) transaction.execute(ID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}

		return Response.ok(new GenericEntity<Map<String, Object>>(result) {
		}).build();
	}

	@SuppressWarnings("unchecked")
	@Path("recommendateViaFollowee/{ID : \\d+}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response recommendateViaFollowee(@PathParam("ID") String ID)
			throws Exception {
		transaction = new FolloweeRecommendationTransaction();
		List<Map<String, Object>> members;
		try {
			members = (List<Map<String, Object>>) transaction.execute(ID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return Response.ok(
				new GenericEntity<List<Map<String, Object>>>(members) {
				}).build();
	}

	@SuppressWarnings("unchecked")
	@Path("recommendateViaCampus/{ID : \\d+}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response recommendateViaCampus(@PathParam("ID") String ID)
			throws Exception {
		transaction = new CampusRecommendationTransaction();
		List<Map<String, Object>> members;
		try {
			members = (List<Map<String, Object>>) transaction.execute(ID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return Response.ok(
				new GenericEntity<List<Map<String, Object>>>(members) {
				}).build();
	}

	@SuppressWarnings("unchecked")
	@Path("recommendateViaMajor/{ID : \\d+}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response recommendateViaMajor(@PathParam("ID") String ID)
			throws Exception {
		transaction = new MajorRecommendationTransaction();
		List<Map<String, Object>> members;
		try {
			members = (List<Map<String, Object>>) transaction.execute(ID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return Response.ok(
				new GenericEntity<List<Map<String, Object>>>(members) {
				}).build();
	}

	@SuppressWarnings("unchecked")
	@Path("recommendateViaSession/{ID : \\d+}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response recommendateViaSession(@PathParam("ID") String ID)
			throws Exception {
		transaction = new SessionRecommendationTransaction();
		List<Map<String, Object>> members;
		try {
			members = (List<Map<String, Object>>) transaction.execute(ID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return Response.ok(
				new GenericEntity<List<Map<String, Object>>>(members) {
				}).build();
	}

	@SuppressWarnings("unchecked")
	@Path("recommendateViaClass/{ID : \\d+}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response recommendateViaClass(@PathParam("ID") String ID)
			throws Exception {
		transaction = new ClassRecommendationTransaction();
		List<Map<String, Object>> members;
		try {
			members = (List<Map<String, Object>>) transaction.execute(ID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return Response.ok(
				new GenericEntity<List<Map<String, Object>>>(members) {
				}).build();
	}

}
