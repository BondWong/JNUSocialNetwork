package system;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import service.helper.ActivitySearchMap;
import service.helper.CommunitySearchMap;
import service.helper.DesertFileLinkMap;
import service.helper.MemberSearchMap;
import service.helper.OnlineUserIDArray;
import transaction.Transaction;
import transaction.DAOCreateTransaction.RegisterGodTransaction;
import utils.MD5;

/**
 * Application Lifecycle Listener implementation class Boostrap
 * 
 */
// @WebListener
public class Initialtor implements ServletContextListener {
	private static final int ACTIVITYREMINDTIME = 30 * 60;
	private static final int DELETEFILETIME = 12 * 60 * 60;
	private static final int DELETEMODELTIME = 24 * 60 * 60;

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
				ACTIVITYREMINDTIME, ACTIVITYREMINDTIME, TimeUnit.SECONDS);

		scheduledThreadPoolExecutor.scheduleAtFixedRate(new DeleteFileTask(),
				DELETEFILETIME, DELETEFILETIME, TimeUnit.SECONDS);

		scheduledThreadPoolExecutor.scheduleAtFixedRate(
				new DeleteUnavailableTask(), DELETEMODELTIME, DELETEMODELTIME,
				TimeUnit.SECONDS);

		servletContextEvent.getServletContext().setAttribute(
				"scheduledThreadPoolExecutor", scheduledThreadPoolExecutor);

		Transaction transaction = new RegisterGodTransaction();
		try {
			transaction.execute("Admin", MD5.toMD5Code("123456"));
			MemberSearchMap.initializeEnvironment();
			ActivitySearchMap.initializeEnvironment();
			CommunitySearchMap.initializeEnvironment();
			DesertFileLinkMap.initializeEnvironment();
			OnlineUserIDArray.initializeEnvironment();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
