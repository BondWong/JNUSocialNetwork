package utils;

import java.util.concurrent.atomic.AtomicInteger;

public class NumberManager {
	private static AtomicInteger memberNum = new AtomicInteger(0);
	private static AtomicInteger communityNum = new AtomicInteger(0);
	
	public static void incrementMemberNum() {
		memberNum.getAndIncrement();
	}
	
	public static void decrementMemberNum() {
		memberNum.getAndDecrement();
	}
	
	public static int getMemberNum() {
		return memberNum.get();
	}
	
	public static void incrementCommunityNum() {
		communityNum.getAndIncrement();
	}
	
	public static void decrementCommunityNum() {
		communityNum.getAndDecrement();
	}
	
	public static int getCommunityNum() {
		return communityNum.get();
	}
	
}
