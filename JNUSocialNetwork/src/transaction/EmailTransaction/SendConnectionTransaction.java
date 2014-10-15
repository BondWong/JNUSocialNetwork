package transaction.EmailTransaction;

import helper.serviceHelper.EmailSender;
import helper.transactionHelper.EmailMemberProfileHelper;

import javax.persistence.EntityManager;

import model.Member;
import persistence.DAO;
import transaction.DAOTransaction;

public class SendConnectionTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		String fromID = (String) params[0];
		String toID = (String) params[1];
		DAO dao = new DAO(em);
		Member sender = dao.get(Member.class, fromID);
		Member member = dao.get(Member.class, toID);

		String subject = "在CampuSite死皮赖脸帮助下，" + sender.getAttribute("name")
				+ "给了你联系方式";
		String toAddr = member.getAttribute("email");
		StringBuffer sb = new StringBuffer();
		sb.append("邮箱：" + sender.getAttribute("email"));
		sb.append(System.getProperty("line.separator"));
		sb.append("电话：" + sender.getAttribute("telnum"));
		sb.append(System.getProperty("line.separator"));
		sb.append("微信：" + sender.getAttribute("wechat"));
		sb.append(System.getProperty("line.separator"));

		sb.append(new EmailMemberProfileHelper().generateMemberProfile(sender));

		new EmailSender().send(subject, sb.toString(), toAddr);

		return null;
	}

}
