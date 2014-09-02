package service.helper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import utils.JsonUtil;

public class OnlineUserIDArray {
	private final static String PATH = "onlineUserIDArray.txt";
	private static List<String> onlineUserIDs = new ArrayList<String>();

	public static void initializeEnvironment() throws IOException {
		serialize();
	}

	public synchronized static void add(String ID) {
		if (!onlineUserIDs.contains(ID))
			onlineUserIDs.add(ID);
	}

	public synchronized static void remove(String ID) {
		onlineUserIDs.remove(ID);
	}

	public synchronized static List<String> getOnline() {
		return onlineUserIDs;
	}

	public static synchronized void serialize() throws IOException {
		try {
			if (!Files.exists(Paths.get(PATH))) {
				Files.createFile(Paths.get(PATH));
			}
			Files.write(Paths.get(PATH), JsonUtil.toJson(onlineUserIDs)
					.getBytes());
			System.out.println("s:" + onlineUserIDs);
			onlineUserIDs.clear();
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
			onlineUserIDs = JsonUtil.fromJson(strSearchMap, List.class);
			System.out.println("d:" + onlineUserIDs);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
	}
}
