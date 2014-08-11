package utils;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.lang.reflect.Type;

import org.apache.commons.io.IOUtils;

import com.google.gson.Gson;

public class JsonUtil {
	private static Gson gson = new Gson();

	public static String toJson(Object object) {
		return gson.toJson(object);
	}

	public static String toJson(Object object, Type type) {
		return gson.toJson(object, type);
	}

	public static <T> T fromJson(String json, Class<T> type) {
		return gson.fromJson(json, type);
	}

	public static <T> T fromJson(String json, Type type) {
		return gson.fromJson(json, type);
	}

	public static <T> T fromJson(InputStream inputStream, Class<T> type)
			throws IOException {
		StringWriter writer = new StringWriter();
		IOUtils.copy(inputStream, writer);
		String json = writer.toString();
		return gson.fromJson(json, type);
	}

}
