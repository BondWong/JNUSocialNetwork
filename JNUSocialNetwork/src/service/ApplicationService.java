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

import transaction.Transaction;
import transaction.DAOCreateTransaction.CreateApplicationTransaction;
import transaction.DAOFetchTransaction.FetchApplicationsTransaction;
import transaction.DAOUpdateTransaction.PassApplicationTransaction;
import transaction.DAOUpdateTransaction.RejectApplicationTransaction;

@Path("/application")
public class ApplicationService {
	private Transaction transaction;
	
	@SuppressWarnings("rawtypes")
	@Path("create/{ID : \\d+}")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response create(@PathParam("ID") String ID, Map attributes) throws Exception {
		transaction = new CreateApplicationTransaction();
		try {
			transaction.execute(ID, attributes);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return Response.ok().build();
	}
	
	@SuppressWarnings("unchecked")
	@Path("fetch/{startIndex : \\d+}/{pageSize : \\d+}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetch(@PathParam("startIndex") int startIndex, @PathParam("pageSize") int pageSize) throws Exception {
		transaction = new FetchApplicationsTransaction();
		List<Map<String, Object>> results;
		try {
			results = (List<Map<String, Object>>) transaction.execute(startIndex, pageSize);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return Response.ok(new GenericEntity<List<Map<String, Object>>>(results){}).build();
	}
	
	@Path("reject/{applicationID : \\d+}")
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public Response reject(@PathParam("applicationID") Long applicationID, String reason) throws Exception {
		transaction = new RejectApplicationTransaction();
		try {
			transaction.execute(applicationID, reason);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return Response.ok().build();
	}
	
	@Path("pass/{applicationID : \\d+}")
	@PUT
	public Response pass(@PathParam("applicationID") Long applicationID) throws Exception {
		transaction = new PassApplicationTransaction();
		try {
			transaction.execute(applicationID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return Response.ok().build();
	}
	
}
