package helper.serviceHelper.sendEmailHelper;

import java.io.UnsupportedEncodingException;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class EmailSender {
	final static String PASSWORD = "mb1003BM";
	final static String GREETING = "Dear User";
	final static String COMPANYNAME = "CampuSite";
	static Properties props = new Properties();
	static {
		props.put("mail.smtp.host", "smtp.live.com");
		props.put("mail.transport.protocol", "smtps");
		props.put("mail.smtp.port", "587");
		props.put("mail.smtp.starttls.enable", "true");
	}

	public EmailSender() {

	}

	public void send(String subject, String content, String addr,
			EmailType emailType) {
		Session session = Session.getInstance(props);
		MimeMessage msg = new MimeMessage(session);
		try {
			Address campusite = new InternetAddress("campusite@outlook.com",
					COMPANYNAME);
			Address toAddress = new InternetAddress(addr, GREETING);
			if (EmailType.TEXT.equals(emailType))
				msg.setText(content);
			else if (EmailType.HTML.equals(emailType))
				msg.setContent(content, "text/html; charset=utf-8");
			else
				throw new UnsupportedEmailTypeException("No Such Email Type");
			msg.setFrom(campusite);
			msg.setRecipient(Message.RecipientType.TO, toAddress);
			msg.setSubject(subject);
			Transport.send(msg, "campusite@outlook.com", PASSWORD);
		} catch (MessagingException | UnsupportedEncodingException
				| UnsupportedEmailTypeException ex) {
			ex.printStackTrace();
		}
	}

	public void send(String subject, String content, List<String> addrs,
			EmailType emailType) {
		Session session = Session.getInstance(props);
		MimeMessage msg = new MimeMessage(session);
		try {
			Address campusite = new InternetAddress("campusite@outlook.com",
					COMPANYNAME);
			Iterator<String> iter = addrs.iterator();
			StringBuffer sb = new StringBuffer();
			while (iter.hasNext())
				sb.append(iter.next() + ",");
			if (sb.lastIndexOf(",") == -1)
				return;
			String addresses = sb.substring(0, sb.lastIndexOf(","));
			System.out.println(addresses);
			if (EmailType.TEXT.equals(emailType))
				msg.setText(content);
			else if (EmailType.HTML.equals(emailType))
				msg.setContent(content, "text/html; charset=utf-8");
			else
				throw new UnsupportedEmailTypeException("No Such Email Type");
			msg.setFrom(campusite);
			msg.setRecipients(Message.RecipientType.TO,
					InternetAddress.parse(addresses));
			msg.setSubject(subject);
			Transport.send(msg, "campusite@outlook.com", PASSWORD);
		} catch (MessagingException | UnsupportedEncodingException
				| UnsupportedEmailTypeException ex) {
			ex.printStackTrace();
		}
	}

}
