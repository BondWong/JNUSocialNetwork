package utils;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class EntityManagerFactoryCreator {
	private static EntityManagerFactory emf = null;
	private static EntityManagerFactoryCreator emfc = null;
	
	private EntityManagerFactoryCreator(){
		emf = Persistence.createEntityManagerFactory("JnuSocialNetwork");
	}
	
	public static EntityManagerFactoryCreator getInstance(){
		if(emfc==null){
			synchronized(EntityManagerFactoryCreator.class){
				if(emfc==null)
					emfc = new EntityManagerFactoryCreator();
			}
		}
		
		return emfc;
	}
	
	public EntityManagerFactory getEntityManagerFactory(){
		return emf;
	}
	
}
