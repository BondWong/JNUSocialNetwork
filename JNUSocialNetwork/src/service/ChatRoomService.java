package service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import transaction.Transaction;
import transaction.DAOFetchTransaction.FetchChatRoomTransaction;
import transaction.DAOFetchTransaction.FetchMessagesTransaction;
import transaction.DAOUpdateTransaction.DAODeleteTransaction.DeleteChatRoomTransaction;

@Path("/chatRoom")
public class ChatRoomService {
	private Transaction transaction;

	@SuppressWarnings("unchecked")
	@Path("fetch/{ID1 : \\d+}/{ID2 : \\d+}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchChatRoom(@PathParam("ID1") String ID1,
			@PathParam("ID2") String ID2) throws Exception {
		transaction = new FetchChatRoomTransaction();
		Map<String, Object> result;
		try {
			result = (Map<String, Object>) transaction.execute(ID1, ID2);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}

		return Response.ok(new GenericEntity<Map<String, Object>>(result) {
		}).build();
	}

	@SuppressWarnings("unchecked")
	@Path("fetchMessages/{chatRoomID : \\d+}/{startSize : \\d{1,}}/{pageSize : \\d{1,}}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchMessages(@PathParam("chatRoomID") String chatRoomID,
			@PathParam("startSize") int startIndex,
			@PathParam("pageSize") int pageSize) throws Exception {
		transaction = new FetchMessagesTransaction();
		List<Map<String, Object>> results;
		try {
			results = (List<Map<String, Object>>) transaction.execute(
					chatRoomID, startIndex, pageSize);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}

		return Response.ok(
				new GenericEntity<List<Map<String, Object>>>(results) {
				}).build();
	}

	@SuppressWarnings("deprecation")
	@Path("delete/{chatRoomID : \\d+}/{year : \\d{4}}/{month : \\d{2}}/{date : \\d{2}}")
	@PUT
	public Response deleteAbandoned(@PathParam("chatRoomID") String chatRoomID,
			@PathParam("year") int year, @PathParam("month") int month,
			@PathParam("date") int date) throws Exception {
		transaction = new DeleteChatRoomTransaction();
		Date d = new Date(year - 1 - 1900, month - 1, date - 1);
		try {
			transaction.execute(d);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return Response.ok().build();
	}

}
