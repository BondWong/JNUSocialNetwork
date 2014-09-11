package transaction;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.OptimisticLockException;
import javax.persistence.RollbackException;

import persistence.helper.EntityManagerFactoryUtil;

public abstract class DAOTransaction implements Transaction{
	private EntityManagerFactory emf;
	private EntityManager em;
	private EntityTransaction tx;
	
	public final Object execute(Object... params) throws Exception{
		initEntityManagerFactory();
		initEntityManager();
		initEntityTransaction();
		
		return execute(em, params);
	}
	
	private void initEntityManagerFactory(){
		emf = EntityManagerFactoryUtil.getInstance().getEntityManagerFactory();
	}
	
	private void initEntityManager(){
		em = emf.createEntityManager();
	}
	
	private void initEntityTransaction(){
		tx = em.getTransaction();
	}
	
	private void beginTransaction(){
		tx.begin();
	}
	
	protected abstract Object process(EntityManager em, Object...params) throws Exception;
	
	private void commitTransaction(){
		tx.commit();
	}
	
	private void rollBackTransaction() {
		if(tx.isActive())
			tx.rollback();
	}
	
	private void close() {
		em.close();
	}
	
	private Object execute(EntityManager em, Object...params) throws Exception{
		try{
			beginTransaction();
			Object result = process(em, params);
			commitTransaction();
			return result;
		} catch(RollbackException re) {
			if (re.getCause() instanceof OptimisticLockException) {
				return execute(em, params);
			} else {
				rollBackTransaction();
				throw re;
			}
		} catch(Exception e) {
			rollBackTransaction();
			throw e;
		} finally {
			close();
		}
	}
}
