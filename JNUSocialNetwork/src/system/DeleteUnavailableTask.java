package system;

import transaction.Transaction;
import transaction.DAODeleteTransaction.DeleteUnavailableModelTransaction;

public class DeleteUnavailableTask implements Runnable {
	private Transaction transaction;

	@Override
	public void run() {
		// TODO Auto-generated method stub
		System.out.println("[Running delete unavailanle model task]");
		transaction = new DeleteUnavailableModelTransaction();
		try {
			transaction.execute("ServerSentEvent.fetchUnavailableIDs",
					"ServerSentEvent.deleteUnavailable");
			transaction.execute("Message.fetchUnavailableIDs",
					"Message.deleteUnavailable");
			transaction.execute("Application.fetchUnavailableIDs",
					"Application.deleteUnavailable");
			transaction.execute("Comment.fetchUnavailableIDs",
					"Comment.deleteUnavailable");
			transaction.execute("Post.fetchUnavailableIDs",
					"Post.deleteUnavailable");
			transaction.execute("Community.fetchUnavailableIDs",
					"Community.deleteUnavailable");
			transaction.execute("Member.fetchUnavailableIDs",
					"Member.deleteUnavailable");
			transaction.execute("Account.fetchUnavailableIDs",
					"Account.deleteUnavailable");
		} catch (Exception e) {
			// TODO Auto-generated catch block

		}
	}

}
