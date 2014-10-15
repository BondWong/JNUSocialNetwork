package transaction.EmailTransaction;

import javax.persistence.EntityManager;

import model.Member;
import persistence.DAO;
import service.helper.EmailSender;
import transaction.DAOTransaction;

public class InviteToAddImageTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		String fromID = (String) params[0];
		String toID = (String) params[1];
		DAO dao = new DAO(em);
		Member invitor = dao.get(Member.class, fromID);
		Member member = dao.get(Member.class, toID);

		String subject = invitor.getAttribute("name") + "邀请你添加照片到CampuSite";
		String toAddr = member.getAttribute("email");

		StringBuffer sb = new StringBuffer();
		sb.append("去添加图片:http://www.campusite.com.cn/pages/profile.jsp?nav=photo&"
				+ member.getID());
		sb.append(System.getProperty("line.separator"));
		sb.append(System.getProperty("line.separator"));
		sb.append("对方资料：");
		sb.append(System.getProperty("line.separator"));
		sb.append("性别：");
		sb.append(invitor.getAttribute("gender"));
		sb.append(System.getProperty("line.separator"));
		sb.append("年级：");
		sb.append(invitor.getID().substring(0, 4));
		sb.append(System.getProperty("line.separator"));
		sb.append("校区：");
		sb.append(invitor.getAttribute("campus"));
		sb.append(System.getProperty("line.separator"));
		sb.append("学院：");
		sb.append(invitor.getAttribute("institution"));
		sb.append(System.getProperty("line.separator"));
		sb.append("专业：");
		sb.append(invitor.getAttribute("major"));
		sb.append(System.getProperty("line.separator"));
		sb.append("详情请到：");
		sb.append("http://www.campusite.com.cn/pages/profile.jsp?nav=about&"
				+ invitor.getID());

		new EmailSender().send(subject, sb.toString(), toAddr);

		return null;
	}

}
