package transaction;

import java.util.HashMap;
import java.util.Map;

import model.ServerSentEvent;

public abstract class ServerSentEventTransaction implements Transaction{
	protected Map<String, Object> result = new HashMap<String, Object>();
	protected abstract ServerSentEvent getServerSentEvent(Object data);
}
