package helper.serviceHelper;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class MessageStorage {
	private static MessageStorage instance;
	private Map<String, List<Map<String, Object>>> messagesQueueMap;

	private MessageStorage() {
		messagesQueueMap = new HashMap<String, List<Map<String, Object>>>();
	}

	public static MessageStorage getInstance() {
		if (instance == null) {
			synchronized (MessageStorage.class) {
				if (instance == null) {
					instance = new MessageStorage();
				}
			}
		}

		return instance;
	}

	public List<Map<String, Object>> getMessageQueue(String from) {
		if (messagesQueueMap.get(from) == null)
			return new LinkedList<Map<String, Object>>();
		return messagesQueueMap.get(from);
	}

	public void addMessage(Map<String, Object> message) {
		if (this.messagesQueueMap.get(message.get("fromID")) == null)
			this.messagesQueueMap.put((String) message.get("fromID"),
					new LinkedList<Map<String, Object>>());
		this.messagesQueueMap.get(message.get("fromID")).add(message);
	}

	public void removeMessagesQueue(String from) {
		this.messagesQueueMap.remove(from);
	}

	public void updateMessageStatus(Map<String, Object> params) {
		// TODO Auto-generated method stub
		for (Map<String, Object> message : this.messagesQueueMap.get(params
				.get("fromID"))) {
			if (message.containsValue(params.get("ID"))) {
				message.put("status", params.get("status"));
			}
		}
	}

}
