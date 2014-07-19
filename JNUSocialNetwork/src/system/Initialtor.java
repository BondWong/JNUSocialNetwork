package system;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

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
    }

	/**
     * @see ServletContextListener#contextInitialized(ServletContextEvent)
     */
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        // TODO Auto-generated method stub
    	Executor executor = Executors.newCachedThreadPool(); 
    	servletContextEvent.getServletContext().setAttribute("executor", executor); 
    	
    	Transaction transaction = new RegisterGodTransaction();
    	try {
			transaction.execute("WongZeonbong", MD5.toMD5Code("1901103390"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
    }
	
}
