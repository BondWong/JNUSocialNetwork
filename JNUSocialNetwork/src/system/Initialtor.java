package system;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import service.helper.ActivityMap;
import service.helper.SearchMap;
import transaction.Transaction;
import transaction.DAOCreateTransaction.RegisterGodTransaction;
import utils.MD5;

/**
 * Application Lifecycle Listener implementation class Boostrap
 * 
 */
@WebListener
public class Initialtor implements ServletContextListener {

	/**
	 * Default constructor.
	 */
	public Initialtor() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see ServletContextListener#contextDestroyed(ServletContextEvent)
	 */
	public void contextDestroyed(ServletContextEvent servletContextEvent) {
		// TODO Auto-generated method stub
		ThreadPoolExecutor executor = (ThreadPoolExecutor) servletContextEvent
				.getServletContext().getAttribute("executor");
		executor.shutdown();

		ScheduledThreadPoolExecutor scheduledThreadPoolExecutor = (ScheduledThreadPoolExecutor) servletContextEvent
				.getServletContext()
				.getAttribute("scheduledThreadPoolExecutor");
		scheduledThreadPoolExecutor.shutdownNow();
	}

	/**
	 * @see ServletContextListener#contextInitialized(ServletContextEvent)
	 */
	public void contextInitialized(ServletContextEvent servletContextEvent) {
		// TODO Auto-generated method stub
		Executor executor = Executors.newCachedThreadPool();
		servletContextEvent.getServletContext().setAttribute("executor",
				executor);

		ScheduledThreadPoolExecutor scheduledThreadPoolExecutor = (ScheduledThreadPoolExecutor) Executors
				.newScheduledThreadPool(5);
		scheduledThreadPoolExecutor.scheduleAtFixedRate(new SmsRemindTask(),
				30, 30, TimeUnit.SECONDS);

		scheduledThreadPoolExecutor.scheduleAtFixedRate(new Runnable() {

			@Override
			public void run() {
				// TODO Auto-generated method stub
				// System.out.println("test2");
			}

		}, 4, 4, TimeUnit.SECONDS);

		scheduledThreadPoolExecutor.scheduleAtFixedRate(new Runnable() {

			@Override
			public void run() {
				// TODO Auto-generated method stub
				// System.out.println("test3");
			}

		}, 3, 3, TimeUnit.SECONDS);

		servletContextEvent.getServletContext().setAttribute(
				"scheduledThreadPoolExecutor", scheduledThreadPoolExecutor);

		Transaction transaction = new RegisterGodTransaction();
		try {
			transaction.execute("WongZeonbong", MD5.toMD5Code("1901103390"));
			SearchMap.initializeEnvironment();
			ActivityMap.initializeEnvironment();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
