package helper.securityHelper;

import java.util.HashMap;
import java.util.Map;

public class SendEmailTracker {
	private static SendEmailTracker instance;
	private static Map<String, Long> recorder;
	private static Map<String, Integer> chance;
	private final static int LIMITATION = 5;

	private SendEmailTracker() {
		recorder = new HashMap<String, Long>();
		chance = new HashMap<>();
	}

	public static SendEmailTracker getInstance() {
		if (instance == null) {
			synchronized (SendEmailTracker.class) {
				if (instance == null) {
					instance = new SendEmailTracker();
				}
			}
		}

		return instance;
	}

	public synchronized void record(String ID) {
		chance.put(ID, chance.get(ID) - 1);
		recorder.put(ID, System.currentTimeMillis());
	}

	public synchronized boolean canSend(String ID) {
		if (!chance.containsKey(ID))
			chance.put(ID, LIMITATION);

		if (chance.get(ID) > 0) {
			System.out.println(chance.get(ID));
			return true;
		} else {
			if ((System.currentTimeMillis() - recorder.get(ID)) > 24 * 60 * 60 * 1000) {
				chance.put(ID, LIMITATION);
				return true;
			} else
				return false;
		}

	}

}
