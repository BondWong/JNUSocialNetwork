package utils;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorUtil {
	private static ExecutorService es;
	private static ExecutorUtil eu;

	private ExecutorUtil() {
		es = Executors.newCachedThreadPool();
	}

	public static ExecutorUtil createInstance() {
		if (eu == null)
			synchronized (ExecutorUtil.class) {
				if (eu == null)
					eu = new ExecutorUtil();
			}

		return eu;
	}

	public synchronized void execute(Runnable task) {
		es.execute(task);
	}

	public static void destory() {
		es.shutdownNow();
		eu = null;
	}

}
