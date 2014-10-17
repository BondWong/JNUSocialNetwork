package helper.serviceHelper;

import java.util.concurrent.atomic.AtomicLong;

public class NumberManager {
	private static AtomicLong memberNum = new AtomicLong(0);
	private static AtomicLong communityNum = new AtomicLong(0);

	public static void initiate(long mnum, long cnum) {
		memberNum.set(mnum);
		communityNum.set(cnum);
	}

	public static void incrementMemberNum() {
		memberNum.getAndIncrement();
	}

	public static void decrementMemberNum() {
		memberNum.getAndDecrement();
	}

	public static long getMemberNum() {
		return memberNum.get();
	}

	public static void incrementCommunityNum() {
		communityNum.getAndIncrement();
	}

	public static void decrementCommunityNum() {
		communityNum.getAndDecrement();
	}

	public static long getCommunityNum() {
		return communityNum.get();
	}

}
