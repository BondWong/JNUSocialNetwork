package service.helper.extensionManager;

public class MultiMediaExtensionManager extends ExtensionManager {

	@Override
	public void init() {
		// TODO Auto-generated method stub
		mimeExtensionMap.clear();
		mimeExtensionMap.put("image/png", ".png");
		mimeExtensionMap.put("image/gif", ".gif");
		mimeExtensionMap.put("image/jpeg", ".jpg");
		// mimeExtensionMap.put("application/pdf", ".pdf");
		// mimeExtensionMap.put("text/plain", ".txt");
		// mimeExtensionMap.put("application/x-gzip", ".gz");
		// mimeExtensionMap.put("application/x-tar", ".tar");
		// mimeExtensionMap.put("application/x-bittorrent", ".torrent");
	}

}
