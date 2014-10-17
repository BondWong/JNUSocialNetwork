package transaction.EmailTransaction;

import helper.serviceHelper.EmailSender;
import helper.transactionHelper.EmailMemberProfileHelper;

import javax.persistence.EntityManager;

import model.Member;
import persistence.DAO;
import transaction.DAOTransaction;

public class SendEmailTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		String fromID = (String) params[0];
		String toID = (String) params[1];
		String content = (String) params[2];

		DAO dao = new DAO(em);
		Member sender = dao.get(Member.class, fromID);
		Member receiver = dao.get(Member.class, toID);

		String subject = sender.getAttribute("name") + "通过CampuSite向您发邮件";
		String toAddr = receiver.getAttribute("email");
		StringBuffer sb = new StringBuffer(content);
		sb.append(new EmailMemberProfileHelper().generateMemberProfile(sender));

		new EmailSender().send(subject, sb.toString(), toAddr);

		return null;
	}
}
