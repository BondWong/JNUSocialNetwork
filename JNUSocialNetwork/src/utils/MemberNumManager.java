package utils;

import java.util.concurrent.atomic.AtomicInteger;

public class MemberNumManager {
	private static AtomicInteger memberNum = new AtomicInteger(0);
	
	public static void increment() {
		memberNum.getAndIncrement();
		System.out.println(memberNum);
	}
	
	public static void decrement() {
		memberNum.getAndDecrement();
		System.out.println(memberNum);
	}
	
	public static int get() {
		return memberNum.get();
	}
}
