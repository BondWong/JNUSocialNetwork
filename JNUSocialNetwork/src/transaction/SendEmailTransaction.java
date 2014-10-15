package transaction;

import javax.persistence.EntityManager;

import model.Member;
import persistence.DAO;
import service.helper.EmailSender;

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
		content += (System.getProperty("line.separator")
				+ System.getProperty("line.separator") + "对方资料："
				+ System.getProperty("line.separator") + "性别："
				+ sender.getAttribute("gender")
				+ System.getProperty("line.separator") + "年级："
				+ sender.getID().substring(0, 4)
				+ System.getProperty("line.separator") + "校区："
				+ sender.getAttribute("campus")
				+ System.getProperty("line.separator") + "学院："
				+ sender.getAttribute("institution")
				+ System.getProperty("line.separator") + "专业："
				+ sender.getAttribute("major")
				+ System.getProperty("line.separator") + "详情请到："
				+ "http://www.campusite.com.cn/pages/profile.jsp?nav=about&" + sender
				.getID());

		new EmailSender().send(subject, content, toAddr);

		return null;
	}
}
