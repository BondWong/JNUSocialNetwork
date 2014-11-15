package helper.securityHelper.sendEmailTracker;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ActivityInvitationEmailTracker extends SendEmailTracker {
	private static ActivityInvitationEmailTracker instance;
	private static Map<Long, Map<String, Integer>> recorder;
	private final static int LIMITATION = 5;

	private ActivityInvitationEmailTracker() {
		recorder = new HashMap<Long, Map<String, Integer>>();
	}

	public static ActivityInvitationEmailTracker getInstance() {
		if (instance == null) {
			synchronized (ActivityInvitationEmailTracker.class) {
				if (instance == null) {
					instance = new ActivityInvitationEmailTracker();
				}
			}
		}

		return instance;
	}

	@SuppressWarnings("unchecked")
	@Override
	public void record(Object... params) {
		// TODO Auto-generated method stub
		Long activityID = (Long) params[1];
		String ID = (String) params[0];
		int times = ((List<String>) params[2]).size();

		synchronized (this) {
			int chances = recorder.get(activityID).get(ID);
			recorder.get(activityID).put(ID, chances - times);
		}

	}

	@Override
	public boolean canSend(Object... params) {
		// TODO Auto-generated method stub
		Long activityID = (Long) params[1];
		String ID = (String) params[0];
		synchronized (this) {
			if (!recorder.containsKey(activityID))
				recorder.put(activityID, new HashMap<String, Integer>());

			if (!recorder.get(activityID).containsKey(ID))
				recorder.get(activityID).put(ID, LIMITATION);

			if (recorder.get(activityID).get(ID) > 0)
				return true;
			else
				return false;
		}
	}

	@Override
	public void removeRecord(Object... params) {
		// TODO Auto-generated method stub
		Long activityID = (Long) params[0];
		synchronized (this) {
			recorder.remove(activityID);
		}
	}
}
