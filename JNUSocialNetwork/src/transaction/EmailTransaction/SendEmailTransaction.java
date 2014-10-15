package transaction.EmailTransaction;

import javax.persistence.EntityManager;

import model.Member;
import persistence.DAO;
import service.helper.EmailSender;
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
		sb.append(System.getProperty("line.separator"));
		sb.append(System.getProperty("line.separator"));
		sb.append("对方资料：");
		sb.append(System.getProperty("line.separator"));
		sb.append("性别：");
		sb.append(sender.getAttribute("gender"));
		sb.append(System.getProperty("line.separator"));
		sb.append("年级：");
		sb.append(sender.getID().substring(0, 4));
		sb.append(System.getProperty("line.separator"));
		sb.append("校区：");
		sb.append(sender.getAttribute("campus"));
		sb.append(System.getProperty("line.separator"));
		sb.append("学院：");
		sb.append(sender.getAttribute("institution"));
		sb.append(System.getProperty("line.separator"));
		sb.append("专业：");
		sb.append(sender.getAttribute("major"));
		sb.append(System.getProperty("line.separator"));
		sb.append("详情请到：");
		sb.append("http://www.campusite.com.cn/pages/profile.jsp?nav=about&"
				+ sender.getID());
		content = sb.toString();

		new EmailSender().send(subject, content, toAddr);

		return null;
	}
}
