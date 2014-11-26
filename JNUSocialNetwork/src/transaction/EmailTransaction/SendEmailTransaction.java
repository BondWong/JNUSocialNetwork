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

		new EmailSender().send(subject, sb.toString(), toAddr, EmailType.TEXT);

		RankMap.deserialize();
		RankMap.addLonlinessRankRecord(sender.getID(),
				ConstantValue.ASKFORAVATARWEIGHT);
		RankMap.serialize();

		return null;
	}
}
