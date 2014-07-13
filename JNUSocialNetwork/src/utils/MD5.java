package utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5 {
	public static String toMD5Code(String data) throws NoSuchAlgorithmException{
		MessageDigest digest = MessageDigest.getInstance("MD5");
		digest.update(data.getBytes());
		byte[] hash = digest.digest();
		return ByteToString.bytesToHexString(hash);
	}
}
