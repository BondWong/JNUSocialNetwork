package system;

import helper.serviceHelper.DesertFileLinkMap;

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
