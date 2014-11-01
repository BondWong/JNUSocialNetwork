package utils;

public class Logger {
	private static ExecutorUtil eu;

	public static void initialize() {
		eu = ExecutorUtil.createInstance();
	}

	public static void log(final String log) {
		eu.execute(new Runnable() {

			@Override
			public void run() {
				// TODO Auto-generated method stub
				System.out.println(log);
			}
			
		});
	}

}
