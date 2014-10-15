package service;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.LinkedHashSet;
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
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import model.ServerSentEvent;
import security.helper.ContentEncoder;
import service.helper.HeheUser;
import system.ServerSentEventBroadcaster;
import transaction.SendEmailTransaction;
import transaction.Transaction;
import transaction.DAOFetchTransaction.CampusRecommendationTransaction;
import transaction.DAOFetchTransaction.ClassRecommendationTransaction;
import transaction.DAOFetchTransaction.DoesIDExistTransaction;
import transaction.DAOFetchTransaction.FetchMemberTransaction;
import transaction.DAOFetchTransaction.FetchMembersTransaction;
import transaction.DAOFetchTransaction.FetchMembersWithShuffleTransaction;
import transaction.DAOFetchTransaction.FetchModelColumnTransaction;
import transaction.DAOFetchTransaction.FetchTagsTransaction;
import transaction.DAOFetchTransaction.FolloweeRecommendationTransaction;
import transaction.DAOFetchTransaction.InstitutionRecommendationTransaction;
import transaction.DAOFetchTransaction.MajorRecommendationTransaction;
import transaction.DAOFetchTransaction.RandomlyFetchMemberTransaction;
import transaction.DAOFetchTransaction.SearchMemberTransaction;
import transaction.DAOFetchTransaction.SeasonRecommendationTransaction;
import transaction.DAOUpdateTransaction.CancelFollowTransaction;
import transaction.DAOUpdateTransaction.MemberAddImageLinksTransaction;
import transaction.DAOUpdateTransaction.MemberAddLookingForTagTransaction;
import transaction.DAOUpdateTransaction.MemberRemoveImageLinksTransaction;
import transaction.DAOUpdateTransaction.MemberRemoveLookingForTagTransaction;
import transaction.DAOUpdateTransaction.UpdateMemberAttributeTransaction;
import transaction.DAOUpdateTransaction.DAODeleteTransaction.DeleteMemberTransaction;
import transaction.SSETransaction.SSEFollowTransaction;

@Path("/user")
public class UserService {
	private Transaction transaction;
	private ServerSentEvent sse;
	private ServerSentEventBroadcaster broadcaster = ServerSentEventBroadcaster
			.getInstance();
	private ContentEncoder contentEncoder = new ContentEncoder();

	@Path("delete/{ID : \\d+}")
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
		transaction = new UpdateMemberAttributeTransaction();
		Map<String, Object> result;
		try {
			result = (Map<String, Object>) transaction.execute(ID,
					contentEncoder.encodeMapContent(attributes));
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

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@GET
	@Path("fetchIDs")
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchIDs() throws Exception {
		List results;
		transaction = new FetchModelColumnTransaction();
		try {
			results = (List) transaction.execute("Member.fetchIDs", null);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}

		return Response.ok(new GenericEntity<List<String>>(results) {
		}).build();
	}

	@SuppressWarnings("unchecked")
	@GET
	@Path("fetch/{startIndex : \\d{1,}}/{pageSize : \\d{1,}}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetch(@PathParam("startIndex") int startIndex,
			@PathParam("pageSize") int pageSize,
			@PathParam("userType") String userType) throws Exception {
		List<Map<String, Object>> results;
		try {

			transaction = new FetchMembersTransaction();
			results = (List<Map<String, Object>>) transaction.execute(
					"Member.fetch", null, null, startIndex, pageSize);

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
					"Member.fetchFollowees", ID, null, startIndex, pageSize);
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
					"Member.fetchFollowers", ID, null, startIndex, pageSize);
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
	@Path("fetchRandomly")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response randomlyFetch() throws Exception {
		transaction = new RandomlyFetchMemberTransaction();
		List<Map<String, Object>> results;
		try {
			results = (List<Map<String, Object>>) transaction.execute();
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}

		return Response.ok(
				new GenericEntity<List<Map<String, Object>>>(results) {
				}).build();
	}

	@SuppressWarnings("unchecked")
	@Path("recommendate/{startIndex : \\d{1,}}/{pageSize : \\d{1,}}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response recommendate(@PathParam("startIndex") int startIndex,
			@PathParam("pageSize") int pageSize) throws Exception {
		transaction = new FetchMembersTransaction();
		List<Map<String, Object>> results;
		try {
			results = (List<Map<String, Object>>) transaction.execute(
					"Member.fetchFamous", null, null, startIndex, pageSize);
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
	@Path("recommendate/{ID : \\d+}/{startIndex : \\d{1,}}/{pageSize : \\d{1,}}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response recommendate(@PathParam("ID") String ID,
			@PathParam("startIndex") int startIndex,
			@PathParam("pageSize") int pageSize) throws Exception {
		transaction = new FetchMembersTransaction();
		List<Map<String, Object>> results;
		try {
			results = (List<Map<String, Object>>) transaction.execute(
					"Member.loginFetchFamous", ID, null, startIndex, pageSize);
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
	@Path("recommendateViaInstitution/{ID : \\d+}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response recommendateViaInstitution(@PathParam("ID") String ID)
			throws Exception {
		transaction = new InstitutionRecommendationTransaction();
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
	public Response recommendateViaSeason(@PathParam("ID") String ID)
			throws Exception {
		transaction = new SeasonRecommendationTransaction();
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

	@SuppressWarnings("unchecked")
	@Path("search/{ID : \\d+}/{key}/{startIndex : \\d{1,}}/{pageSize : \\d{1,}}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response searchMember(@PathParam("ID") String ID,
			@PathParam("key") String key,
			@PathParam("startIndex") int startIndex,
			@PathParam("pageSize") int pageSize) throws Exception {
		key = URLDecoder.decode(key, "utf-8");
		transaction = new SearchMemberTransaction();
		List<Map<String, Object>> results;
		try {
			results = (List<Map<String, Object>>) transaction.execute(ID, key,
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

	@SuppressWarnings("unchecked")
	@Path("search/{key}/{startIndex : \\d{1,}}/{pageSize : \\d{1,}}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response searchMember(@PathParam("key") String key,
			@PathParam("startIndex") int startIndex,
			@PathParam("pageSize") int pageSize) throws Exception {
		key = URLDecoder.decode(key, "utf-8");
		transaction = new SearchMemberTransaction();
		List<Map<String, Object>> results;
		try {
			results = (List<Map<String, Object>>) transaction.execute(null,
					key, startIndex, pageSize);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return Response.ok(
				new GenericEntity<List<Map<String, Object>>>(results) {
				}).build();
	}

	@Path("doesIDExist/{ID : \\d+}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response doesIDExist(@PathParam("ID") String ID) throws Exception {
		transaction = new DoesIDExistTransaction();
		boolean result;
		try {
			result = (boolean) transaction.execute(ID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return Response.ok(result).build();
	}

	@Path("addLookingForTag/{ID : \\d+}/{tagContent}")
	@PUT
	public Response addLookingForTag(@PathParam("ID") String ID,
			@PathParam("tagContent") String tagContent) throws Exception {
		transaction = new MemberAddLookingForTagTransaction();
		try {
			transaction.execute(ID, URLDecoder.decode(tagContent, "utf-8"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return Response.ok().build();

	}

	@Path("removeLookingForTag/{ID : \\d+}/{tagContent}")
	@PUT
	public Response removeLookingForTag(@PathParam("ID") String ID,
			@PathParam("tagContent") String tagContent) throws Exception {
		transaction = new MemberRemoveLookingForTagTransaction();
		try {
			transaction.execute(ID, tagContent);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return Response.ok().build();
	}

	@SuppressWarnings("unchecked")
	@Path("fetchByLookingForTag/{tagContent}/{startIndex : \\d{1,}}/{pageSize : \\d{1,}}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchByLookingForTag(@PathParam("ID") String ID,
			@PathParam("tagContent") String tagContent,
			@PathParam("startIndex") int startIndex,
			@PathParam("pageSize") int pageSize) throws Exception {
		transaction = new FetchMembersWithShuffleTransaction();
		List<Map<String, Object>> results;
		try {
			results = (List<Map<String, Object>>) transaction.execute(
					"Member.fetchByLookingForTag", tagContent, null,
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

	@SuppressWarnings("unchecked")
	@Path("fetchLookingForTag/{ID : \\d+}/{startIndex : \\d{1,}}/{pageSize : \\d{1,}}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchLookingForTag(@PathParam("ID") String ID,
			@PathParam("startIndex") int startIndex,
			@PathParam("pageSize") int pageSize) throws Exception {
		transaction = new FetchTagsTransaction();
		List<Map<String, Object>> results;
		try {
			results = (List<Map<String, Object>>) transaction.execute(
					"Member.fetchLookingForTags", ID, startIndex, pageSize);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return Response.ok(
				new GenericEntity<List<Map<String, Object>>>(results) {
				}).build();

	}

	@SuppressWarnings({ "rawtypes" })
	@Path("sendEmail/{fromID : \\d+}/{toID : \\d+}")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response sendEmail(@PathParam("fromID") String fromID,
			@PathParam("toID") String toID, Map emailContent) throws Exception {
		transaction = new SendEmailTransaction();
		try {
			transaction.execute(fromID, toID, emailContent.get("content"));
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		return Response.ok().build();
	}

	@SuppressWarnings("rawtypes")
	@Path("registerCandC")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response helpMeRegister(Map hehe) throws IOException {
		try {
			HeheUser.deserialize();
			HeheUser.addHehe(hehe);
			HeheUser.serialize();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return Response.ok().build();
	}

}
