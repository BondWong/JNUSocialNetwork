package utils;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

public class DateTimeUtil {
	private static DateTimeFormatter formatter = DateTimeFormat.forPattern("YYYY-MM-dd HH:mm:ss");
	
	public static String getCurrnetDateTime() {
		DateTime dateTime = new DateTime();
		return formatter.print(dateTime);
	}
}
