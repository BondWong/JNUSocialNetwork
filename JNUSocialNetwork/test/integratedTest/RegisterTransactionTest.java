package integratedTest;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.junit.BeforeClass;
import org.junit.Test;

import service.helper.SearchMap;
import transaction.Transaction;
import transaction.DAOCreateTransaction.RegisterCommunityOwnerTransaction;
import transaction.DAOCreateTransaction.RegisterGodTransaction;
import transaction.DAOCreateTransaction.RegisterMemberTransaction;

public class RegisterTransactionTest {
	@BeforeClass
	public static void classSetUp() throws IOException {
		SearchMap.initializeEnvironment();
	}
	
	@SuppressWarnings("unchecked")
	@Test
	public void testRegisterMemberTransaction() throws Exception {
		Transaction transaction = new RegisterMemberTransaction();
		Map<String, Object> member = (Map<String, Object>) transaction.execute("2011052406", "123456", new HashMap<String, String>());
		System.out.println(member);
	}
	
	@Test
	@SuppressWarnings("unchecked")
	public void testRegisterCommunityOwnerTransaction() throws Exception {
		Transaction transaction = new RegisterCommunityOwnerTransaction();
		Map<String, Object> member = (Map<String, Object>) transaction.execute("124131546578792", "123456", new HashMap<String, String>());
		System.out.println(member);
	}
	
	@SuppressWarnings("unchecked")
	@Test
	public void testRegisterGodTransaction() throws Exception {
		Transaction transaction = new RegisterGodTransaction();
		Map<String, Object> member = (Map<String, Object>) transaction.execute("WongChunbong", "123456", new HashMap<String, String>());
		System.out.println(member);
	}
}
