package system;

import model.Comment;
import model.Community;
import model.CommunityOwner;
import model.Member;
import model.Post;
import transaction.Transaction;
import transaction.DAODeleteTransaction.DeleteUnavailableModelTransaction;

public class DeleteUnavailableTask implements Runnable{
	private Transaction transaction;

	@Override
	public void run() {
		// TODO Auto-generated method stub
		transaction = new DeleteUnavailableModelTransaction();
		try {
			transaction.execute("Comment.fetchUnavailableIDs", "Comment.deleteUnavailable", Comment.class);
			transaction.execute("Post.fetchUnavailableIDs", "Post.deleteUnavailable", Post.class);
			transaction.execute("Community.fetchUnavailableIDs", "Community.deleteUnavailable", Community.class);
			transaction.execute("CommunityOwner.fetchUnavailableIDs", "CommunityOwner.deleteUnavailable", CommunityOwner.class);
			transaction.execute("Member.fetchUnavailableIDs", "Member.deleteUnavailable", Member.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			
		}
	}

}
