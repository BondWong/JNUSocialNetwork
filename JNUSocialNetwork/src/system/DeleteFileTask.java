package system;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import utils.DesertFileLinkManager;

public class DeleteFileTask implements Runnable{

	@Override
	public void run() {
		// TODO Auto-generated method stub
		for(String link : DesertFileLinkManager.getLinks()) {
			try {
				Files.deleteIfExists(Paths.get(link));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

}
