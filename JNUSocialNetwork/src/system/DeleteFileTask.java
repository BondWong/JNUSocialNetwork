package system;

import helper.serviceHelper.searchHelper.DesertFileLinkMap;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import model.structure.Image;

import org.apache.commons.io.FileUtils;

import utils.JsonUtil;

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
			if (link == null || link == "")
				continue;
			if (link.contains("src") && link.contains("width")
					&& link.contains("height"))
				link = JsonUtil.fromJson(link, Image.class).getSrc();

			try {
				if (Files.isDirectory(Paths.get(link)))
					FileUtils.deleteDirectory(new File(link));
				else
					Files.deleteIfExists(Paths.get(link));
				
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
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
