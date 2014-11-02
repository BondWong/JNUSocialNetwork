package service;

import helper.securityHelper.ContentEncoder;

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

import model.Account;
import model.ServerSentEvent;
import system.ServerSentEventBroadcaster;
import transaction.Transaction;
import transaction.DAOFetchTransaction.DoesIDExistTransaction;
import transaction.DAOFetchTransaction.FetchAccountTransaction;
import transaction.DAOFetchTransaction.FetchMemberTransaction;
import transaction.DAOFetchTransaction.FetchMembersTransaction;
import transaction.DAOFetchTransaction.FetchMembersWithShuffleTransaction;
import transaction.DAOFetchTransaction.FetchModelColumnTransaction;
import transaction.DAOFetchTransaction.FetchTagsTransaction;
import transaction.DAOFetchTransaction.FolloweeRecommendationTransaction;
import transaction.DAOFetchTransaction.RandomlyFetchMemberTransaction;
import transaction.DAOFetchTransaction.SearchMemberTransaction;
import transaction.DAOUpdateTransaction.CancelFollowTransaction;
import transaction.DAOUpdateTransaction.MemberAddImageLinksTransaction;
import transaction.DAOUpdateTransaction.MemberAddLookingForTagTransaction;
import transaction.DAOUpdateTransaction.MemberRemoveImageLinksTransaction;
import transaction.DAOUpdateTransaction.MemberRemoveLookingForTagTransaction;
import transaction.DAOUpdateTransaction.UpdateAccountTransaction;
import transaction.DAOUpdateTransaction.UpdateMemberAttributeTransaction;
import transaction.DAOUpdateTransaction.DAODeleteTransaction.DeleteMemberTransaction;
import transaction.EmailTransaction.BegForConnectionTransaction;
import transaction.EmailTransaction.EmailTransaction;
import transaction.EmailTransaction.ProfileInvititionTransaction;
import transaction.EmailTransaction.SendConnectionTransaction;
import transaction.EmailTransaction.SendEmailTransaction;
import transaction.SSETransaction.SSEFollowTransaction;
import utils.JsonUtil;

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
	@Path("search/{ID : \\d+}/{key}/{startIndex : \\d{1,}}/{pageSize : \\d{1,}}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response searchMember(@PathParam("ID") String ID,
			@PathParam("key") String key,
			@PathParam("startIndex") int startIndex,
			@PathParam("pageSize") int pageSize) throws Exception {
		key = URLDecoder.decode(key, "utf-8");
		System.out.println(key);
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
		transaction = new EmailTransaction(new SendEmailTransaction());
		boolean result = true;
		try {
			result = (boolean) transaction.execute(fromID, toID,
					emailContent.get("content"));
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		if (!result)
			return Response.status(401).build();
		return Response.ok().build();
	}

	@Path("inviteToAddImage/{fromID : \\d+}/{toID : \\d+}")
	@POST
	public Response inviteToAddImage(@PathParam("fromID") String fromID,
			@PathParam("toID") String toID) throws Exception {
		transaction = new EmailTransaction(new ProfileInvititionTransaction());
		boolean result = true;
		try {
			result = (boolean) transaction.execute(fromID, toID,
					"去添加图片:http://www.campusite.com.cn/pages/profile.jsp?nav=photo&"
							+ toID, "邀请你去添加个人照片到CampuSite");
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		if (!result)
			return Response.status(401).build();
		return Response.ok().build();
	}

	@Path("inviteToAddAvatar/{fromID : \\d+}/{toID : \\d+}")
	@POST
	public Response inviteToAddAvatar(@PathParam("fromID") String fromID,
			@PathParam("toID") String toID) throws Exception {
		transaction = new EmailTransaction(new ProfileInvititionTransaction());
		boolean result = true;
		try {
			result = (boolean) transaction.execute(fromID, toID,
					"去添加头像:http://www.campusite.com.cn/pages/profile.jsp?nav=about&"
							+ toID, "邀请你去添加CampuSite账号头像");
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		if (!result)
			return Response.status(401).build();
		return Response.ok().build();
	}

	@Path("begForConnection/{fromID : \\d+}/{toID : \\d+}")
	@POST
	public Response begForConnection(@PathParam("fromID") String fromID,
			@PathParam("toID") String toID) throws Exception {
		transaction = new EmailTransaction(new BegForConnectionTransaction());
		boolean result = true;
		try {
			result = (boolean) transaction.execute(fromID, toID);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		if (!result)
			return Response.status(401).build();
		return Response.ok().build();
	}

	@Path("sendConnection/{fromID : \\d+}/{toID : \\d+}")
	@GET
	public Response sendConnection(@PathParam("fromID") String fromID,
			@PathParam("toID") String toID) throws Exception {
		transaction = new EmailTransaction(new SendConnectionTransaction());
		boolean result = true;
		try {
			result = (boolean) transaction.execute(fromID, toID);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		if (!result)
			return Response.status(401).build();
		return Response.ok().build();
	}

	@Path("needGuidance/{ID : \\d+}")
	@Produces(MediaType.APPLICATION_JSON)
	@GET
	public Response needGuidance(@PathParam("ID") String ID) throws Exception {
		transaction = new FetchAccountTransaction();
		Account account;
		try {
			account = (Account) transaction.execute("Account.fetchByID", ID,
					null);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		String result = account.isFirstTime() + "";
		if (account.isFirstTime()) {
			account.setFirstTime(false);
			transaction = new UpdateAccountTransaction();
			transaction.execute(account);
		}
		return Response.ok(JsonUtil.toJson(result)).build();
	}

}
