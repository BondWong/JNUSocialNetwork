package service.helper;

import java.io.UnsupportedEncodingException;
import java.util.Properties;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class EmailSender {
	final static String PASSWORD = ")(78!@34^5";
	final static String GREETING = "Dear User";
	final static String COMPANYNAME = "CampuSite";
	static Properties props = new Properties();
	static {
		props.put("mail.smtp.host", "smtp.live.com");
		props.put("mail.transport.protocol", "smtps");
		props.put("mail.smtp.port", "587");
		props.put("mail.smtp.starttls.enable", "true");
	}

	public static synchronized void send(String subject, String test, String to) {
		Session session = Session.getInstance(props);
		MimeMessage msg = new MimeMessage(session);
		try {
			Address campusite = new InternetAddress("kingkong_webber@outlook.com",
					COMPANYNAME);
			Address toAddress = new InternetAddress(to, GREETING);
			msg.setText(test);
			msg.setFrom(campusite);
			msg.setRecipient(Message.RecipientType.TO, toAddress);
			msg.setSubject(subject);
			Transport.send(msg, "kingkong_webber@outlook.com", PASSWORD);
		} catch (MessagingException | UnsupportedEncodingException ex) {
			ex.printStackTrace();
		}
	}
}
