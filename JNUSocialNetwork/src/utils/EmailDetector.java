package utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EmailDetector {
	private static final String EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
			+ "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

	public static boolean isEmailAddress(String candidateAddress) {
		Pattern p = Pattern.compile(EMAIL_PATTERN);
		Matcher m = p.matcher(candidateAddress);
		boolean result = false;
		result = m.find();

		System.out.println(candidateAddress);
		System.out.println(result);

		return result;
	}
}
