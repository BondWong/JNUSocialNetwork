package transaction.EmailTransaction;

import helper.serviceHelper.EmailSender;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import transaction.Transaction;
import transaction.DAOFetchTransaction.FetchMembersTransaction;
import utils.EmailDetector;

public class ActivityNotificationTransaction implements Transaction {
	private static final int BUCKETSIZE = 50;
	private static final String TITLE = "CampuSite活动提醒";

	@SuppressWarnings("unchecked")
	@Override
	public Object execute(Object... params) throws Exception {
		// TODO Auto-generated method stub
		String content = (String) params[0];
		Transaction transaction = new FetchMembersTransaction();
		List<Map<String, Object>> members = new ArrayList<Map<String, Object>>();
		int startIndex = 0;
		EmailSender es = new EmailSender();
		do {
			members = (List<Map<String, Object>>) transaction.execute(
					"Member.fetchMembers", null, null, startIndex, BUCKETSIZE);
			List<String> addrs = new ArrayList<String>();
			for (Map<String, Object> member : members) {
				String receiverAddr = ((Map<String, String>) member
						.get("attributes")).get("email");
				if (receiverAddr != null && receiverAddr.length() > 0
						&& EmailDetector.isEmailAddress(receiverAddr)) {
					addrs.add(receiverAddr);
				}
			}
			es.send(TITLE, content, addrs);
			startIndex += BUCKETSIZE;
		} while (members.size() == BUCKETSIZE);

		return null;
	}
}
