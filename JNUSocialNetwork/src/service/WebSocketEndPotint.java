package service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.websocket.CloseReason;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import model.ServerSentEvent;
import model.factory.ModelFactory;
import model.modelType.SSEType;
import service.actionType.WebSocketAction;
import service.helper.MapEncoder;
import service.helper.ListEncoder;
import service.helper.MapDecoder;
import service.helper.MessageStorage;
import transaction.Transaction;
import transaction.DAOCreateTransaction.CreateMessagesTransaction;
import transaction.DAOCreateTransaction.CreateUnhandledEventsTransaction;
import transaction.DAOFetchTransaction.FetchUnhandledEventsTransaction;
import transaction.DAOFetchTransaction.FetchUnreadMessagesTransaction;
import transaction.SSETransaction.SSEConnectTransaction;
import transaction.SSETransaction.SSEDisconnectTransaction;

@ServerEndpoint(value = "/endpoint/connect/{ID}", encoders = { MapEncoder.class, ListEncoder.class }, decoders = { MapDecoder.class })
public class WebSocketEndPotint {
	static final int MAXIMUMQUEUESIZE = 100;
	static MessageStorage messageStorage = MessageStorage.getInstance();
	Transaction transaction;
	ServerSentEvent sse;

	@SuppressWarnings("unchecked")
	@OnOpen
	public void open(@PathParam(value = "ID") String ID, Session session,
			EndpointConfig conf) throws Exception {
		session.getUserProperties().put("ID", ID);

		transaction = new SSEConnectTransaction();
		try {
			sse = (ServerSentEvent) transaction.execute(ID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}

		for (Session sess : session.getOpenSessions()) {
			if (!sess.getUserProperties().containsValue(ID))
				sess.getBasicRemote().sendObject(sse.toRepresentation());
		}
		
		Map<String, List<Map<String, Object>>> info = new HashMap<String, List<Map<String, Object>>>();
		transaction = new FetchUnreadMessagesTransaction();
		info.put("unreadMessages", (List<Map<String, Object>>)transaction.execute(ID));
		transaction = new FetchUnhandledEventsTransaction();
		info.put("unhandledEvents", (List<Map<String, Object>>)transaction.execute(ID));
		try {
			session.getBasicRemote().sendObject(info);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		
	}

	@OnClose
	public void close(@PathParam("ID") String ID, Session session,
			CloseReason respn) throws Exception {
		transaction = new SSEDisconnectTransaction();
		try {
			sse = (ServerSentEvent) transaction.execute(ID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		for (Session sess : session.getOpenSessions()) {
			sess.getBasicRemote().sendObject(sse.toRepresentation());
		}

		List<Map<String, Object>> messageQueue = messageStorage
				.getMessageQueue(ID);

		transaction = new CreateMessagesTransaction();
		try {
			transaction.execute(messageQueue);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
	}

	@OnError
	public void error(Session session, Throwable eror) throws IOException {
		session.close();
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@OnMessage
	public void message(@PathParam("ID") String ID, Session session, Map param)
			throws Exception {
		WebSocketAction action = WebSocketAction.valueOf((String) param
				.get("action"));
		switch (action) {
		case REMIND:
			handleEvent(session, param);
			break;
		case CHAT:
			handleMessageTransimit(session, param);
			break;
		case UPDATEMESSAGESTATUS:
			handleUpdateMessageStatus(session, param);
		}

	}

	@SuppressWarnings("unchecked")
	private void handleEvent(Session session, Map<String, Object> param)
			throws Exception {
		String toID = (String) param.get("toID");
		SSEType sseType = SSEType.valueOf((String) param.get("SSEType"));
		Map<String, Object> data = (Map<String, Object>) param.get("data");
		ServerSentEvent sse = ModelFactory.getInstance().create(
				ServerSentEvent.class, sseType, data);

		int i = 0;
		for (Session sess : session.getOpenSessions()) {
			if (sess.getUserProperties().containsValue(toID)) {
				sess.getBasicRemote().sendObject(sse);
				i++;
			}
		}

		if (i == 0) {
			transaction = new CreateUnhandledEventsTransaction();
			try {
				transaction.execute(param.get("toID"), sse);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				throw e;
			}
		}
	}

	private void handleMessageTransimit(Session session,
			Map<String, Object> param) throws Exception {
		for (Session sess : session.getOpenSessions()) {
			if (sess.getUserProperties().containsValue(param.get("toID"))) {
				sess.getBasicRemote().sendObject(param);
			}
		}

		messageStorage.addMessage(param);
	}

	private void handleUpdateMessageStatus(Session session,
			Map<String, Object> param) throws Exception {
		for (Session sess : session.getOpenSessions()) {
			if (sess.getUserProperties().containsValue(param.get("fromID"))) {
				sess.getBasicRemote().sendObject(param);
			}
		}

		messageStorage.updateMessageStatus(param);
	}

}
