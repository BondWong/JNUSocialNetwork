package system;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import service.helper.DesertFileLinkMap;

public class DeleteFileTask implements Runnable {

	@Override
	public void run() {
		// TODO Auto-generated method stub
		try {
			DesertFileLinkMap.deserialize();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		for (String link : DesertFileLinkMap.getLinks()) {
			try {
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
