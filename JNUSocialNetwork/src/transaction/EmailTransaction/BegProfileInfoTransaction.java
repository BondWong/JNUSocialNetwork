package transaction.EmailTransaction;

import helper.serviceHelper.searchHelper.RankMap;
import helper.serviceHelper.sendEmailHelper.EmailSender;
import helper.serviceHelper.sendEmailHelper.EmailType;
import helper.transactionHelper.EmailMemberProfileHelper;

import javax.persistence.EntityManager;

import model.Member;
import persistence.DAO;
import transaction.DAOTransaction;
import utils.ConstantValue;

public class BegProfileInfoTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		String fromID = (String) params[0];
		String toID = (String) params[1];
		DAO dao = new DAO(em);
		Member invitor = dao.get(Member.class, fromID);
		Member member = dao.get(Member.class, toID);

		String subject = invitor.getAttribute("name") + params[3];
		String toAddr = member.getAttribute("email");

		StringBuffer sb = new StringBuffer();
		sb.append(params[2]);
		sb.append(new EmailMemberProfileHelper().generateMemberProfile(invitor));

		new EmailSender().send(subject, sb.toString(), toAddr, EmailType.TEXT);

		RankMap.deserialize();
		RankMap.addLonlinessRankRecord(invitor.getID(),
				ConstantValue.ASKFORAVATARWEIGHT);
		RankMap.serialize();

		return null;
	}

}
