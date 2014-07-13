package service;

import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.media.sse.EventOutput;
import org.glassfish.jersey.media.sse.SseFeature;

import system.ServerSentEventBroadcaster;
import transaction.Transaction;
import transaction.DAOUpdateTransaction.DAODeleteTransaction.DeleteUnhandledEventsTransaction;

@Path("/event")
public class ServerSentEventService {
	private Transaction transaction;
	private ServerSentEventBroadcaster broadcaster = ServerSentEventBroadcaster.getInstance();
	
	@GET
	@Path("subscribe")
	@Produces(SseFeature.SERVER_SENT_EVENTS)
	public EventOutput subscribe(){
		final EventOutput eventoutput = new EventOutput();
		this.broadcaster.subscribe(eventoutput);
		return eventoutput;
	}
	
	@Path("deleteUnhandledEvents/{ID : \\d+}")
	@PUT
	public Response deleteUnhandledEvents(@PathParam("ID") String ID) throws Exception {
		transaction = new DeleteUnhandledEventsTransaction();
		transaction.execute(ID);
		
		return Response.ok().build();
	}
	
}
