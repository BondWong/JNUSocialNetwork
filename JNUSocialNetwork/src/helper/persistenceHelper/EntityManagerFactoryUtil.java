package helper.persistenceHelper;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class EntityManagerFactoryUtil {
	private static EntityManagerFactory emf = null;
	private static EntityManagerFactoryUtil emfc = null;

	private EntityManagerFactoryUtil() {
		emf = Persistence.createEntityManagerFactory("JnuSocialNetwork");
	}

	public static EntityManagerFactoryUtil getInstance() {
		if (emfc == null) {
			synchronized (EntityManagerFactoryUtil.class) {
				if (emfc == null)
					emfc = new EntityManagerFactoryUtil();
			}
		}

		return emfc;
	}

	public EntityManagerFactory getEntityManagerFactory() {
		return emf;
	}

	public void closeEntityManagerFactory() {
		emf.close();
	}

}
