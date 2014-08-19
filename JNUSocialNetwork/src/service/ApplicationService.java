package service;

import java.util.ArrayList;
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

import org.glassfish.grizzly.http.util.URLDecoder;

import transaction.Transaction;
import transaction.DAOCreateTransaction.CreateApplicationTransaction;
import transaction.DAOFetchTransaction.FetchModelColumnTransaction;
import transaction.DAOUpdateTransaction.PassApplicationTransaction;
import transaction.DAOUpdateTransaction.RejectApplicationTransaction;

@Path("/application")
public class ApplicationService {
	private Transaction transaction;

	@SuppressWarnings("rawtypes")
	@Path("create")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response create(Map attributes)
			throws Exception {
		transaction = new CreateApplicationTransaction();
		try {
			transaction.execute(attributes);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return Response.ok().build();
	}

	@SuppressWarnings({ "rawtypes" })
	@Path("fetchIDs")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response fetchIDs() throws Exception {
		transaction = new FetchModelColumnTransaction();
		List results;
		try {
			results = (List) transaction.execute("Application.fetchIDs");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		List<String> r = new ArrayList<String>();
		for(Object o : results) 
			r.add(o + "");
		return Response.ok(new GenericEntity<List<String>>(r) {
		}).build();
	}

	@Path("reject/{applicationID : \\d+}/{reason : [\\w|\\+]+}")
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public Response reject(@PathParam("applicationID") String applicationID,
			@PathParam("reason") String reason) throws Exception {
		transaction = new RejectApplicationTransaction();
		try {
			transaction.execute(applicationID, URLDecoder.decode(reason));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		return Response.ok().build();
	}

	@Path("pass/{applicationID : \\d+}")
	@PUT
	public Response pass(@PathParam("applicationID") String applicationID)
			throws Exception {
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
