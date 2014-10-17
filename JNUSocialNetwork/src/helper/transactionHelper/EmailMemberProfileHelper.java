package helper.transactionHelper;

import model.Member;

public class EmailMemberProfileHelper {

	public StringBuffer generateMemberProfile(Member member) {
		StringBuffer sb = new StringBuffer();
		sb.append(System.getProperty("line.separator"));
		sb.append(System.getProperty("line.separator"));
		sb.append("对方资料：");
		sb.append(System.getProperty("line.separator"));
		sb.append("性别：");
		sb.append(member.getAttribute("gender"));
		sb.append(System.getProperty("line.separator"));
		sb.append("年级：");
		sb.append(member.getID().substring(0, 4));
		sb.append(System.getProperty("line.separator"));
		sb.append("校区：");
		sb.append(member.getAttribute("campus"));
		sb.append(System.getProperty("line.separator"));
		sb.append("学院：");
		sb.append(member.getAttribute("institution"));
		sb.append(System.getProperty("line.separator"));
		sb.append("专业：");
		sb.append(member.getAttribute("major"));
		sb.append(System.getProperty("line.separator"));
		sb.append("详情请到：");
		sb.append("http://www.campusite.com.cn/pages/profile.jsp?nav=about&"
				+ member.getID());
		return sb;
	}
}
