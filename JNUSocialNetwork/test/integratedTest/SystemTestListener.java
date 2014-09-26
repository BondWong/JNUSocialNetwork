package integratedTest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import model.modelType.CommunityType;
import model.modelType.UserType;
import model.structure.Image;
import transaction.Transaction;
import transaction.DAOCreateTransaction.CreateCommunityTransaction;
import transaction.DAOCreateTransaction.RegisterCommunityOwnerTransaction;
import utils.DateTimeUtil;
import utils.JsonUtil;
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
		try {
			Files.deleteIfExists(Paths.get("membersearchmap.txt"));
			Files.deleteIfExists(Paths.get("activitysearchmap.txt"));
			Files.deleteIfExists(Paths.get("communitysearchmap.txt"));
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
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
			transaction = new CreateCommunityTransaction();
			Map<String, String> attributes = new HashMap<String, String>();
			attributes.put("name", "測試");
			attributes.put("introduce", "test");
			attributes.put("foundDate", DateTimeUtil.getCurrnetDateTime());
			attributes.put("communityCard", JsonUtil.toJson(new Image(
					"images/default/default-community-card.png")));
			transaction.execute("13750046645", attributes,
					new LinkedList<String>(), CommunityType.OFFICIAL);
			transaction.execute("13750046645", attributes,
					new LinkedList<String>(), CommunityType.OFFICIAL);
			transaction.execute("13750046645", attributes,
					new LinkedList<String>(), CommunityType.OFFICIAL);
			transaction.execute("13750046645", attributes,
					new LinkedList<String>(), CommunityType.SCHOOLUNION);
			transaction.execute("13750046645", attributes,
					new LinkedList<String>(), CommunityType.SCHOOLUNION);
			attributes.put("name", "test");
			transaction.execute("13750046645", attributes,
					new LinkedList<String>(), CommunityType.SCHOOLUNION);
			transaction.execute("13750046645", attributes,
					new LinkedList<String>(), CommunityType.SCHOOLUNION);
			transaction.execute("13750046645", attributes,
					new LinkedList<String>(), CommunityType.SCHOOLUNION);
			transaction.execute("13750046645", attributes,
					new LinkedList<String>(), CommunityType.SCHOOLUNION);
			transaction.execute("13750046645", attributes,
					new LinkedList<String>(), CommunityType.FOLK);
			transaction.execute("13750046645", attributes,
					new LinkedList<String>(), CommunityType.FOLK);
			transaction.execute("13750046645", attributes,
					new LinkedList<String>(), CommunityType.FOLK);
			transaction.execute("13750046645", attributes,
					new LinkedList<String>(), CommunityType.FOLK);
			transaction.execute("13750046645", attributes,
					new LinkedList<String>(), CommunityType.FOLK);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
