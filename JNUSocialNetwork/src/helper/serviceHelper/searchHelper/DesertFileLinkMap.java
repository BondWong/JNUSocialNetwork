package helper.serviceHelper.searchHelper;

import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import model.structure.Image;
import model.structure.ImageTuple;
import utils.JsonUtil;
import utils.RootPathHelper;

import com.google.gson.reflect.TypeToken;

public class DesertFileLinkMap {
	private static final String PATH = "desertfilelinkmap.txt";
	private final static Type TYPE = new TypeToken<List<String>>() {
	}.getType();
	private static List<String> links = new ArrayList<String>();

	public static void initializeEnvironment() throws IOException {
		if (!Files.exists(Paths.get(PATH))) {
			serialize();
		}
	}

	public static synchronized void serialize() throws IOException {
		try {
			if (!Files.exists(Paths.get(PATH))) {
				Files.createFile(Paths.get(PATH));
			}
			Files.write(Paths.get(PATH), JsonUtil.toJson(links, TYPE)
					.getBytes());
			System.out.println("desertFileLinkMap:" + links);
			links.clear();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
	}

	public static synchronized void deserialize() throws IOException {
		byte[] bytes;
		try {
			bytes = Files.readAllBytes(Paths.get(PATH));
			String strMap = new String(bytes, "utf8");
			links = JsonUtil.fromJson(strMap, TYPE);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
	}

	public synchronized static void addLinks(Collection<String> imageLinks) {
		if (imageLinks.isEmpty())
			return;
		for (String imageLink : imageLinks)
			addLink(imageLink);
	}

	public synchronized static void addLink(String imageLink) {
		if (imageLink == null || imageLink.equals(""))
			return;
		else if (imageLink.contains("originalImage")
				&& imageLink.contains("thumbnail")
				&& imageLink.contains("croppedImage")) {
			ImageTuple tuple = JsonUtil.fromJson(imageLink, ImageTuple.class);
			String originalImage = tuple.getOriginalImage();
			String croppedImage = tuple.getCroppedImage();
			String thumbnail = tuple.getThumbnail();
			if (!originalImage.equals("")) {
				originalImage = JsonUtil.fromJson(originalImage, Image.class)
						.getSrc();
				links.add(RootPathHelper.getRootPath() + "pages/"
						+ originalImage);
			}
			if (!croppedImage.equals("")) {
				croppedImage = JsonUtil.fromJson(croppedImage, Image.class)
						.getSrc();
				links.add(RootPathHelper.getRootPath() + "pages/"
						+ croppedImage);
			}
			if (!thumbnail.equals("")) {
				thumbnail = JsonUtil.fromJson(thumbnail, Image.class).getSrc();
				links.add(RootPathHelper.getRootPath() + "pages/" + thumbnail);
			}

		} else if (imageLink.contains("src") && imageLink.contains("width")
				&& imageLink.contains("height")) {
			Image image = JsonUtil.fromJson(imageLink, Image.class);
			imageLink = image.getSrc();
			links.add(RootPathHelper.getRootPath() + "pages/" + imageLink);
		}
	}

	public synchronized static void removeLinks() {
		links.clear();
	}

	public synchronized static List<String> getLinks() {
		return links;
	}

}
