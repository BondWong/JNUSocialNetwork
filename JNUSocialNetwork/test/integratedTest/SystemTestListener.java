package integratedTest;

import java.util.HashMap;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import model.modelType.UserType;
import transaction.Transaction;
import transaction.DAOCreateTransaction.RegisterCommunityOwnerTransaction;
import utils.MD5;

/**
 * Application Lifecycle Listener implementation class UserSystemTestListener
 * 
 */
@WebListener
public class SystemTestListener implements ServletContextListener {

	/**
	 * Default constructor.
	 */
	public SystemTestListener() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see ServletContextListener#contextDestroyed(ServletContextEvent)
	 */
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
	}

	/**
	 * @see ServletContextListener#contextInitialized(ServletContextEvent)
	 */
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		Transaction transaction;
		try {
			transaction = new RegisterCommunityOwnerTransaction();
			transaction.execute("13750046645", MD5.toMD5Code("123456"),
					new HashMap<String, Object>(), UserType.COMMUNITYOWNER);
			transaction.execute("13750000059", MD5.toMD5Code("123456"),
					new HashMap<String, Object>(), UserType.COMMUNITYOWNER);
			transaction.execute("13750046461", MD5.toMD5Code("123456"),
					new HashMap<String, Object>(), UserType.COMMUNITYOWNER);
			transaction.execute("13750044737", MD5.toMD5Code("123456"),
					new HashMap<String, Object>(), UserType.COMMUNITYOWNER);
			transaction.execute("13631263784", MD5.toMD5Code("123456"),
					new HashMap<String, Object>(), UserType.COMMUNITYOWNER);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
