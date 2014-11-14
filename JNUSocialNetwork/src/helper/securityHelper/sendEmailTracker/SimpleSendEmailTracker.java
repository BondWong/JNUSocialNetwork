package helper.securityHelper.sendEmailTracker;

import java.util.HashMap;
import java.util.Map;

public class SimpleSendEmailTracker extends SendEmailTracker {
	private static SimpleSendEmailTracker instance;
	private static Map<String, Long> recorder;
	private static Map<String, Integer> chance;
	private final static int LIMITATION = 5;

	private SimpleSendEmailTracker() {
		recorder = new HashMap<String, Long>();
		chance = new HashMap<>();
	}

	public static SimpleSendEmailTracker getInstance() {
		if (instance == null) {
			synchronized (SimpleSendEmailTracker.class) {
				if (instance == null) {
					instance = new SimpleSendEmailTracker();
				}
			}
		}

		return instance;
	}

	public void record(Object... params) {
		synchronized (this) {
			chance.put((String) params[0], chance.get(params[0]) - 1);
			recorder.put((String) params[0], System.currentTimeMillis());
		}
	}

	public boolean canSend(Object... params) {
		synchronized (this) {
			if (!chance.containsKey(params[0]))
				chance.put((String) params[0], LIMITATION);

			if (chance.get(params[0]) > 0) {
				return true;
			} else {
				if ((System.currentTimeMillis() - recorder.get(params[0])) > 24 * 60 * 60 * 1000) {
					chance.put((String) params[0], LIMITATION);
					return true;
				} else
					return false;
			}
		}

	}

}
