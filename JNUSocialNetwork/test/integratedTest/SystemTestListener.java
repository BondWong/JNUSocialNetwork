package integratedTest;

import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import model.modelType.PostType;
import model.modelType.UserType;
import transaction.Transaction;
import transaction.DAOCreateTransaction.CreateApplicationTransaction;
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
		try {
			transaction = new RegisterCommunityOwnerTransaction();
			transaction.execute("636645", MD5.toMD5Code("123456"),
					new HashMap<String, Object>(), UserType.COMMUNITYOWNER);
			transaction = new RegisterMemberTransaction();
			Map<String, Object> attributes = new HashMap<String, Object>();
			attributes.put("name", "Bond");
			attributes.put("gender", "male");
			attributes.put("relationship", "single");
			attributes.put("lookingFor", "girls");
			attributes.put("中文", "测试");
			attributes.put("avatarLink", "images/user_img.jpg");
			attributes.put("major", "SE");
			attributes.put("season", "2012");
			attributes.put("campus", "珠海校区");
			attributes.put("institution", "电气信息学院");
			attributes.put("telnum", "13750046645");
			attributes.put("email", "wongzeonbong@gmail.com");
			transaction.execute("2011052404", MD5.toMD5Code("123456"),
					attributes, UserType.MEMBER);
			attributes.put("name", "Obama");
			attributes.put("gender", "male");
			attributes.put("relationship", "married");
			attributes.put("lookingFor", "geeks");
			attributes.put("avatarLink", "images/user_img.jpg");
			attributes.put("major", "SE");
			attributes.put("season", "2011");
			attributes.put("campus", "珠海校区");
			attributes.put("institution", "电气信息学院");
			attributes.put("telnum", "13750046645");
			attributes.put("email", "wongzeonbong@gmail.com");
			transaction.execute("2011052406", MD5.toMD5Code("123456"),
					attributes, UserType.MEMBER);
			attributes.put("name", "黃俊邦");
			attributes.put("gender", "male");
			attributes.put("relationship", "available");
			attributes.put("lookingFor", "girls");
			attributes.put("avatarLink", "images/user_img.jpg");
			attributes.put("major", "Math");
			attributes.put("season", "2011");
			attributes.put("campus", "珠海校区");
			attributes.put("institution", "电气信息学院");
			attributes.put("telnum", "13750046645");
			attributes.put("email", "wongzeonbong@gmail.com");
			transaction.execute("2011052408", MD5.toMD5Code("123456"),
					attributes, UserType.MEMBER);
			transaction = new FetchChatRoomTransaction();
			transaction.execute("2011052406", "2011052404");
			transaction = new CreatePostTransaction();
			transaction.execute("2011052406", PostType.NORMAL,
					new HashMap<String, String>(), new LinkedHashSet<String>());
			transaction.execute("2011052406", PostType.NORMAL,
					new HashMap<String, String>(), new LinkedHashSet<String>());
			transaction.execute("2011052406", PostType.NORMAL,
					new HashMap<String, String>(), new LinkedHashSet<String>());
			transaction = new FollowTransaction();
			transaction.execute("2011052408", "2011052406");
			transaction.execute("2011052406", "2011052404");
			transaction.execute("2011052404", "636645");
			transaction.execute("2011052406", "636645");
			transaction.execute("2011052408", "636645");

			transaction = new CreateApplicationTransaction();
			Map<String, String> parameters = new HashMap<String, String>();
			parameters.put("ID", "13750046645");
			parameters.put("password", "123456");
			parameters.put("email", "wongzeonbong@gmail.com");
			transaction.execute(parameters);
			parameters.put("ID", "787878787878");
			transaction.execute(parameters);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
