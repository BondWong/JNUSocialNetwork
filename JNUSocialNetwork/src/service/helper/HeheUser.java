package service.helper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import utils.JsonUtil;

public class HeheUser {
	private final static String PATH = "hehe.txt";
	@SuppressWarnings("rawtypes")
	private static List<Map> heheList = new LinkedList<Map>();

	public static void initializeEnvironment() throws IOException {
		serialize();
	}

	@SuppressWarnings("rawtypes")
	public synchronized static void addHehe(Map hehe) {
		heheList.add(hehe);
	}

	public static synchronized void serialize() throws IOException {
		try {
			if (!Files.exists(Paths.get(PATH))) {
				Files.createFile(Paths.get(PATH));
			}
			Files.write(Paths.get(PATH), JsonUtil.toJson(heheList).getBytes());
			System.out.println("heheList:" + heheList);
			heheList.clear();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
	}

	@SuppressWarnings("unchecked")
	public static synchronized void deserialize() throws IOException {
		byte[] bytes;
		try {
			bytes = Files.readAllBytes(Paths.get(PATH));
			String strSearchMap = new String(bytes, "utf8");
			heheList = JsonUtil.fromJson(strSearchMap, List.class);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
	}

}
