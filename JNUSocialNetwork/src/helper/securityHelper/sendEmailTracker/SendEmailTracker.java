package helper.securityHelper.sendEmailTracker;

public abstract class SendEmailTracker {
	public abstract void record(Object... params);

	public abstract boolean canSend(Object... params);

	public abstract void removeRecord(Object... params);
}
