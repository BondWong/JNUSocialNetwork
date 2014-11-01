package transaction.EmailTransaction;

import helper.securityHelper.SendEmailTracker;
import transaction.Transaction;
import utils.ExecutorUtil;

public class EmailTransaction implements Transaction {
	private Transaction transaction;
	private SendEmailTracker tracker;

	public EmailTransaction(Transaction transaction) {
		this.transaction = transaction;
		tracker = SendEmailTracker.getInstance();
	}

	@Override
	public Object execute(final Object... params) {
		// TODO Auto-generated method stub
		if (tracker.canSend((String) params[0])) {
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

			tracker.record((String) params[0]);
			return true;
		} else
			return false;
	}

}
