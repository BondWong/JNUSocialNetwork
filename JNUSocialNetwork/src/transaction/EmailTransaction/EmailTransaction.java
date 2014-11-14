package transaction.EmailTransaction;

import helper.securityHelper.sendEmailTracker.SendEmailTracker;
import transaction.Transaction;
import utils.ExecutorUtil;

public class EmailTransaction implements Transaction {
	private Transaction transaction;
	private SendEmailTracker tracker;

	public EmailTransaction(Transaction transaction, SendEmailTracker tracker) {
		this.transaction = transaction;
		this.tracker = tracker;
	}

	@Override
	public Object execute(final Object... params) {
		// TODO Auto-generated method stub
		if (tracker.canSend(params)) {
			ExecutorUtil eu = ExecutorUtil.createInstance();

			eu.execute(new Runnable() {

				@Override
				public void run() {
					// TODO Auto-generated method stub
					try {
						transaction.execute(params);
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}

			});

			tracker.record(params);
			return true;
		} else
			return false;
	}
}
