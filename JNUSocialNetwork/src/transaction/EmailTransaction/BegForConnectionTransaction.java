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

public class BegForConnectionTransaction extends DAOTransaction {

	@Override
	protected Object process(EntityManager em, Object... params)
			throws Exception {
		// TODO Auto-generated method stub
		String fromID = (String) params[0];
		String toID = (String) params[1];
		DAO dao = new DAO(em);
		Member begger = dao.get(Member.class, fromID);
		Member member = dao.get(Member.class, toID);

		String subject = begger.getAttribute("name") + "坏坏，求CampuSite问你联系方式";
		String toAddr = member.getAttribute("email");

		StringBuffer sb = new StringBuffer();
		sb.append("发我的联系方式给TA(邮箱，电话，微信)："
				+ "http://www.campusite.com.cn/app/user/sendConnection/"
				+ member.getID() + "/" + begger.getID());
		sb.append(System.getProperty("line.separator"));
		sb.append("去CampuSite公开:"
				+ "http://www.campusite.com.cn/pages/profile.jsp?nav=about&"
				+ member.getID());
		sb.append(new EmailMemberProfileHelper().generateMemberProfile(begger));
		new EmailSender().send(subject, sb.toString(), toAddr, EmailType.TEXT);

		RankMap.deserialize();
		RankMap.addLonlinessRankRecord(begger.getID(),
				ConstantValue.BEGFORCONNECTIONWEIGHT);
		RankMap.serialize();

		return null;
	}

}
