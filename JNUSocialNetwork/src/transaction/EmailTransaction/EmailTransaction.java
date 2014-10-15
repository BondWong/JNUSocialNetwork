package transaction.EmailTransaction;

import helper.securityHelper.SendEmailTracker;
import transaction.Transaction;

public class EmailTransaction implements Transaction {
	private Transaction transaction;
	private SendEmailTracker tracker;

	public EmailTransaction(Transaction transaction) {
		this.transaction = transaction;
		tracker = SendEmailTracker.getInstance();
	}

	@Override
	public Object execute(Object... params) throws Exception {
		// TODO Auto-generated method stub
		if (tracker.canSend((String) params[0])) {
			transaction.execute(params);
			tracker.record((String) params[0]);
			return true;
		} else
			return false;
	}

}
