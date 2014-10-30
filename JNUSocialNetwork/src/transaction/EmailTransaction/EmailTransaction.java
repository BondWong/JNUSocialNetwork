package transaction.EmailTransaction;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

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
	public Object execute(final Object... params) {
		// TODO Auto-generated method stub
		if (tracker.canSend((String) params[0])) {
			ExecutorService es = Executors.newSingleThreadExecutor();

			es.execute(new Runnable() {

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
