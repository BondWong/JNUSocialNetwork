package system;

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import model.modelType.PostType;
import model.modelType.UserType;
import transaction.Transaction;
import transaction.DAOCreateTransaction.CreatePostTransaction;
import transaction.DAOCreateTransaction.RegisterCommunityOwnerTransaction;
import transaction.DAOCreateTransaction.RegisterMemberTransaction;
import transaction.DAOFetchTransaction.FetchChatRoomTransaction;
import transaction.DAOUpdateTransaction.FollowTransaction;
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
    	try{
    		transaction = new RegisterCommunityOwnerTransaction();
    		transaction.execute("2011052405", "123456", null, UserType.COMMUNITYOWNER);
    		transaction = new RegisterMemberTransaction();
    		Map<String, Object> attributes = new HashMap<String, Object>();
    		attributes.put("name", "Bond");
    		attributes.put("gender", "male");
    		attributes.put("relationship", "single");
    		attributes.put("lookingFor", "girls");
    		attributes.put("中文", "测试");
    		attributes.put("avatarLink", "images/user_img.jpg");
    		transaction.execute("2011052404", MD5.toMD5Code("123456"), attributes, UserType.MEMBER);
    		attributes.put("name", "Obama");
    		attributes.put("gender", "male");
    		attributes.put("relationship", "married");
    		attributes.put("lookingFor", "geeks");
    		attributes.put("avatarLink", "images/user_img.jpg");
    		transaction.execute("2011052406", MD5.toMD5Code("123456"), attributes, UserType.MEMBER);
    		attributes.put("name", "黃俊邦");
    		attributes.put("gender", "male");
    		attributes.put("relationship", "available");
    		attributes.put("lookingFor", "girls");
    		attributes.put("avatarLink", "images/user_img.jpg");
    		transaction.execute("2011052408", MD5.toMD5Code("123456"), attributes, UserType.MEMBER);
    		transaction = new FetchChatRoomTransaction();
    		transaction.execute("2011052406", "2011052404");
    		transaction = new CreatePostTransaction();
    		transaction.execute("2011052406", PostType.NORMAL, new HashMap<String, String>(), new LinkedHashSet<String>());
    		transaction.execute("2011052406", PostType.NORMAL, new HashMap<String, String>(), new LinkedHashSet<String>());
    		transaction.execute("2011052406", PostType.NORMAL, new HashMap<String, String>(), new LinkedHashSet<String>());
    		transaction = new FollowTransaction();
    		transaction.execute("2011052408", "2011052406");
    	} catch(Exception e) {
    		e.printStackTrace();
    	}
    }
	
}
