package transaction.EmailTransaction;

import helper.serviceHelper.sendEmailHelper.EmailSender;
import helper.serviceHelper.sendEmailHelper.EmailType;
import helper.transactionHelper.EmailMemberProfileHelper;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import model.Member;
import model.Post;
import persistence.DAO;
import transaction.DAOTransaction;
import utils.EmailDetector;

public class ActivityInvitationTransaction extends DAOTransaction {
	private final static String TITLE = "邀请你参加活动";

	@SuppressWarnings("unchecked")
	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		String senderID = (String) params[0];
		List<String> temp = (List<String>) params[2];
		List<String> receiverEmails = new ArrayList<String>();
		Long activityID = (Long) params[1];
		DAO dao = new DAO(em);
		Member sender = dao.get(Member.class, senderID);
		Post activity = dao.get(Post.class, activityID);

		EmailSender es = new EmailSender();

		String subject = sender.getAttribute("name") + TITLE;

		StringBuffer sb = new StringBuffer();
		sb.append(sender.getAttribute("name"));
		if (sender.getAttribute("gender").equals("男"))
			sb.append("帅哥");
		else
			sb.append("美女");
		sb.append("邀请你参加\"" + activity.getAttribute("name") + "\"活动");
		sb.append(System.getProperty("line.separator"));
		sb.append("活动链接:"
				+ "http://www.campusite.com.cn/pages/activityShow.jsp?"
				+ activity.getAttribute("communityID") + "&" + activity.getID());
		sb.append(new EmailMemberProfileHelper().generateMemberProfile(sender));

		for (String email : temp)
			if (email != null && !email.equals("")
					&& EmailDetector.isEmailAddress(email))
				receiverEmails.add(email);

		es.send(subject, sb.toString(), receiverEmails, EmailType.TEXT);
		return null;
	}

}
