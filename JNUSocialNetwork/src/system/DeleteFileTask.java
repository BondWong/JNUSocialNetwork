package system;

import helper.serviceHelper.searchHelper.DesertFileLinkMap;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.apache.commons.io.FileUtils;

public class DeleteFileTask implements Runnable {

	@Override
	public void run() {
		// TODO Auto-generated method stub
		System.out.println("[Running delete deserted file task]");
		try {
			DesertFileLinkMap.deserialize();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		for (String link : DesertFileLinkMap.getLinks()) {
			System.out.println(link);
			if (link == null || link.equals(""))
				continue;
			/*
			 * else if (link.contains("originalImage") &&
			 * link.contains("thumbnail") && link.contains("croppedImage")) {
			 * ImageTuple tuple = JsonUtil.fromJson(link, ImageTuple.class);
			 * String originalImage = tuple.getOriginalImage(); String
			 * croppedImage = tuple.getCroppedImage(); String thumbnail =
			 * tuple.getThumbnail(); if (!originalImage.equals(""))
			 * originalImage = JsonUtil.fromJson(originalImage,
			 * Image.class).getSrc(); if (!croppedImage.equals("")) croppedImage
			 * = JsonUtil.fromJson(croppedImage, Image.class) .getSrc(); if
			 * (!thumbnail.equals("")) thumbnail = JsonUtil.fromJson(thumbnail,
			 * Image.class) .getSrc();
			 * 
			 * try { Files.deleteIfExists(Paths.get(originalImage));
			 * Files.deleteIfExists(Paths.get(croppedImage));
			 * Files.deleteIfExists(Paths.get(thumbnail)); } catch (IOException
			 * e) { // TODO Auto-generated catch block e.printStackTrace(); }
			 * continue; } else if (link.contains("src") &&
			 * link.contains("width") && link.contains("height")) { link =
			 * JsonUtil.fromJson(link, Image.class).getSrc(); try {
			 * 
			 * Files.deleteIfExists(Paths.get(link));
			 * 
			 * } catch (IOException e) { // TODO Auto-generated catch block
			 * e.printStackTrace(); } continue; }
			 */else {
				try {
					if (Files.isDirectory(Paths.get(link)))
						FileUtils.deleteDirectory(new File(link));
					else
						Files.deleteIfExists(Paths.get(link));
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				continue;
			}

		}
		DesertFileLinkMap.removeLinks();
		try {
			DesertFileLinkMap.serialize();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
