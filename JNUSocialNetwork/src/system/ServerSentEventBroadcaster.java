package system;

import javax.ws.rs.core.MediaType;

import model.ServerSentEvent;

import org.glassfish.jersey.media.sse.EventOutput;
import org.glassfish.jersey.media.sse.OutboundEvent;
import org.glassfish.jersey.media.sse.SseBroadcaster;

public class ServerSentEventBroadcaster {
	private static ServerSentEventBroadcaster instance;
	private SseBroadcaster sseBroadcaster;
	private OutboundEvent.Builder builder;
	
	private ServerSentEventBroadcaster(){
		sseBroadcaster = new SseBroadcaster();
		builder = new OutboundEvent.Builder();
	}
	
	public static ServerSentEventBroadcaster getInstance(){
		if(instance == null){
			synchronized(ServerSentEventBroadcaster.class){
				if(instance == null)
					instance = new ServerSentEventBroadcaster();
			}
		}
		
		return instance;
	}
	
	public void subscribe(EventOutput eventOutput){
		this.sseBroadcaster.add(eventOutput);
	}
	
	public void broadcast(ServerSentEvent serverSentEvent){
		System.out.println(serverSentEvent.toRepresentation());
		OutboundEvent event = builder.name(serverSentEvent.getName())
				.mediaType(MediaType.APPLICATION_JSON_TYPE)
				.data(String.class, serverSentEvent.getData())
				.build();
		
		this.sseBroadcaster.broadcast(event);
	}
}
