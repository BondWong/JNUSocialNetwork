package system;

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import model.CommunityOwner;
import model.Member;
import model.modelType.PostType;
import model.modelType.UserType;
import transaction.Transaction;
import transaction.DAOCreateTransaction.CreatePostTransaction;
import transaction.DAOCreateTransaction.RegisterTransaction;
import transaction.DAOFetchTransaction.FetchChatRoomTransaction;
import transaction.DAOUpdateTransaction.FollowTransaction;


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
    	Transaction transaction = new RegisterTransaction();
    	try{
    		transaction.execute(CommunityOwner.class, "2011052405", "1901103390", null, UserType.COMMUNITYOWNER);
    		Map<String, Object> attributes = new HashMap<String, Object>();
    		attributes.put("nickName", "Bond");
    		transaction.execute(Member.class, "2011052407", "1901103390", attributes, UserType.MEMBER);
    		attributes.put("nickName", "Obama");
    		transaction.execute(Member.class, "2011052406", "1901103390", attributes, UserType.MEMBER);
    		attributes.put("nickName", "Nobama");
    		transaction.execute(Member.class, "2011052408", "1901103390", attributes, UserType.MEMBER);
    		transaction = new FetchChatRoomTransaction();
    		transaction.execute("2011052406", "2011052407");
    		transaction = new CreatePostTransaction();
    		transaction.execute("2011052406", PostType.NORMAL, new HashMap<String, String>(), new LinkedHashSet<String>());
    		transaction.execute("2011052406", PostType.NORMAL, new HashMap<String, String>(), new LinkedHashSet<String>());
    		transaction.execute("2011052406", PostType.NORMAL, new HashMap<String, String>(), new LinkedHashSet<String>());
    		transaction = new FollowTransaction();
    		transaction.execute("2011052407", "2011052406");
    	} catch(Exception e) {
    		e.printStackTrace();
    	}
    }
	
}
