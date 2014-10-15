package integratedTest;

import helper.serviceHelper.EmailSender;

import java.io.UnsupportedEncodingException;
import java.util.Properties;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.junit.Ignore;
import org.junit.Test;

public class SendingMailTest {
	// @Ignore
	@Test
	public void testSendMail() {
		Properties props = new Properties();
		props.put("mail.smtp.host", "smtp.live.com");
		props.put("mail.transport.protocol", "smtps");
		props.put("mail.smtp.port", "587");
		props.put("mail.smtp.starttls.enable", "true");
		Session session = Session.getInstance(props);
		MimeMessage msg = new MimeMessage(session);
		try {
			Address campusite = new InternetAddress(
					"kingkong_webber@outlook.com", "CampuSite");
			Address qq = new InternetAddress("694613550@qq.com", "Dear User");
			msg.setText("content : <a href=\"www.baidu.com\">link</a>");
			msg.setFrom(campusite);
			msg.setRecipient(Message.RecipientType.TO, qq);
			msg.setSubject("Test");
			Transport.send(msg, "kingkong_webber@outlook.com", "87315326");
		} catch (MessagingException | UnsupportedEncodingException ex) {
			ex.printStackTrace();
		}
	}

	@Ignore
	@Test
	public void testEmailSender() {
		new EmailSender().send("Test", "content : www.baidu.com",
				"694613550@qq.com");
	}
}
