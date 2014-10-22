package service;

import helper.serviceHelper.ListEncoder;
import helper.serviceHelper.MapDecoder;
import helper.serviceHelper.MapEncoder;
import helper.serviceHelper.MessageStorage;
import helper.serviceHelper.OnlineUserIDArray;

import java.io.IOException;
import java.util.ArrayList;
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
import transaction.Transaction;
import transaction.DAOCreateTransaction.CreateMessagesTransaction;
import transaction.DAOCreateTransaction.CreateUnhandledEventsTransaction;
import transaction.DAOFetchTransaction.FetchChatRoomsTransaction;
import transaction.DAOFetchTransaction.FetchUnhandledEventsTransaction;
import transaction.DAOFetchTransaction.FetchUnreadMessagesTransaction;
import transaction.DAOUpdateTransaction.UpdateMessageStatusTransaction;
import transaction.SSETransaction.SSEConnectTransaction;
import transaction.SSETransaction.SSEDisconnectTransaction;

@ServerEndpoint(value = "/endpoint/connect/{ID}", encoders = {
		MapEncoder.class, ListEncoder.class }, decoders = { MapDecoder.class })
public class WebSocketEndPoint {
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
		Map<String, Object> contactsMap = new HashMap<String, Object>();
		transaction = new FetchChatRoomsTransaction();
		List<Map<String, Object>> contacts = (List<Map<String, Object>>) transaction
				.execute(ID);
		contactsMap.put("action", "SENDCONTACT");

		for (Map<String, Object> contact : contacts)
			contact.put("online", false);

		for (Session sess : session.getOpenSessions()) {
			sess.getBasicRemote().sendObject(sse.toRepresentation());
			for (int i = 0; i < contacts.size(); i++) {
				if (sess.getUserProperties().get("ID")
						.equals(contacts.get(i).get("m1ID"))
						|| sess.getUserProperties().get("ID")
								.equals(contacts.get(i).get("m2ID")))
					contacts.get(i).put("online", true);
			}
		}

		contactsMap.put("contacts", contacts);

		Map<String, Object> info = new HashMap<String, Object>();
		transaction = new FetchUnreadMessagesTransaction();
		info.put("unreadMessages",
				(List<Map<String, Object>>) transaction.execute(ID));
		transaction = new FetchUnhandledEventsTransaction();
		info.put("unhandledEvents",
				(List<Map<String, Object>>) transaction.execute(ID));
		info.put("action", "OFFLINEREMIND");

		Map<String, Object> onlineIDs = new HashMap<String, Object>();
		OnlineUserIDArray.deserialize();
		onlineIDs.put("onlineUserIDs", OnlineUserIDArray.getOnline());
		onlineIDs.put("action", "ONLINEUSERIDS");
		try {
			session.getBasicRemote().sendObject(info);
			session.getBasicRemote().sendObject(contactsMap);
			session.getBasicRemote().sendObject(onlineIDs);
			OnlineUserIDArray.add(ID);
			OnlineUserIDArray.serialize();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}

	}

	@OnClose
	public void close(@PathParam("ID") String ID, Session session,
			CloseReason respn) throws Exception {
		OnlineUserIDArray.deserialize();
		OnlineUserIDArray.remove(ID);
		OnlineUserIDArray.serialize();

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
		messageStorage.removeMessagesQueue(ID);
	}

	@OnError
	public void error(Session session, Throwable error) throws IOException {
		error.printStackTrace();
		if (session.isOpen())
			session.close();
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@OnMessage
	public void message(@PathParam("ID") String ID, Session session, Map param) {
		WebSocketAction action = WebSocketAction.valueOf((String) param
				.get("action"));
		switch (action) {
		case EVENT:
			try {
				handleEvent(session, param);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			break;
		case CHAT:
			try {
				handleMessageTransimit(session, param);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			break;
		case UPDATEMESSAGESTATUS:
			try {
				handleUpdateMessageStatus(session, param);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			break;
		case UPDATEMESSAGESTATUSTOSERVER:
			try {
				handleUpdateMessageStatusToServer(session, param);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			break;
		case SENDCONTACT:
			break;
		}

	}

	@SuppressWarnings("unchecked")
	private void handleEvent(Session session, Map<String, Object> param)
			throws Exception {
		System.out.println(param);
		((Map<String, Object>) param.get("data")).put("eventID",
				System.currentTimeMillis());
		String toID = (String) param.get("toID");

		int i = 0;
		for (Session sess : session.getOpenSessions()) {
			if (sess.getUserProperties().containsValue(toID)) {
				sess.getBasicRemote().sendObject(param);
				i++;
			}
		}

		if (i == 0) {
			SSEType sseType = SSEType.valueOf((String) param.get("name"));
			Map<String, Object> data = (Map<String, Object>) param.get("data");
			Long eventID = System.currentTimeMillis();
			data.put("eventID", eventID);
			ServerSentEvent sse = ModelFactory.getInstance().create(
					ServerSentEvent.class, sseType, data);
			sse.setID(eventID);
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
		boolean online = false;
		for (Session sess : session.getOpenSessions()) {
			if (sess.getUserProperties().containsValue(param.get("toID"))) {
				sess.getBasicRemote().sendObject(param);
				online = true;
			}
		}
		Map<String, Object> sent = new HashMap<String, Object>();
		sent.put("action", "UPDATEMESSAGESTATUS");
		sent.put("fromID", param.get("fromID"));
		sent.put("ID", param.get("ID"));
		sent.put("status", "SENT");
		session.getBasicRemote().sendObject(sent);
		if (!online) {
			List<Map<String, Object>> params = new ArrayList<Map<String, Object>>();
			param.put("status", "SENT");
			params.add(param);
			transaction = new CreateMessagesTransaction();
			transaction.execute(params);
		} else
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

	private void handleUpdateMessageStatusToServer(Session session,
			Map<String, Object> param) throws Exception {
		transaction = new UpdateMessageStatusTransaction();
		try {
			transaction.execute(param.get("ID"), param.get("status"));
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		param.put("action", "UPDATEMESSAGESTATUS");
		for (Session sess : session.getOpenSessions()) {
			if (sess.getUserProperties().containsValue(param.get("fromID"))) {
				sess.getBasicRemote().sendObject(param);
			}
		}
	}

}
