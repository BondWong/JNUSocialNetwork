package service;

import helper.serviceHelper.SSE;

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
import transaction.DAOUpdateTransaction.DAODeleteTransaction.DeleteUnhandledEventTransaction;

@Path("/event")
public class ServerSentEventService {
	private Transaction transaction;
	private ServerSentEventBroadcaster broadcaster = ServerSentEventBroadcaster
			.getInstance();

	@GET
	@Path("subscribe")
	@Produces(SseFeature.SERVER_SENT_EVENTS)
	@SSE
	public EventOutput subscribe() {
		final EventOutput eventoutput = new EventOutput();
		this.broadcaster.subscribe(eventoutput);
		System.out.println(eventoutput);
		return eventoutput;
	}

	@GET
	@Path("IE/subscribe")
	@Produces(SseFeature.SERVER_SENT_EVENTS)
	@SSE
	public EventOutput ieSubscribe() {
		final EventOutput eventoutput = new EventOutput();
		this.broadcaster.subscribe(eventoutput);
		System.out.println(eventoutput);
		return eventoutput;
	}

	@Path("deleteUnhandledEvent/{ID : \\d+}/{eventID : \\d+}")
	@PUT
	public Response deleteUnhandledEvent(@PathParam("ID") String ID,
			@PathParam("eventID") Long eventID) throws Exception {
		transaction = new DeleteUnhandledEventTransaction();
		transaction.execute(ID, eventID);

		return Response.ok().build();
	}

}
